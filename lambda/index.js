const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')
const AWS = require('aws-sdk')

const { IS_OFFLINE, USERS_TABLE } = process.env

const normalize = input => input.trim().toLowerCase()

const initDyanmo = () =>
  new AWS.DynamoDB.DocumentClient(
    IS_OFFLINE
      ? {
          region: 'localhost',
          endpoint: 'http://localhost:8000',
        }
      : { region: 'us-east-1' },
  )

const app = express()

const updateDynamoDb = ({ body: { site, email }, ip, headers }) =>
  initDyanmo()
    .put({
      TableName: USERS_TABLE,
      Item: {
        site,
        email: normalize(email),
        ip,
        ua: headers['user-agent'].substring(0, 500),
        date: new Date().toISOString(),
      },
    })
    .promise()

app.use(bodyParser.json({ strict: false }))

app.get('/health', (req, res) => res.send('a-okay'))

app.get('/emails', (req, res) => res.status(500).send('not implemented'))

app.post('/emails', (req, res) => {
  updateDynamoDb(req)
    .then(() => res.send('subscribed'))
    .catch(err => res.status(500).send(err))
})

module.exports.handler = serverless(app)

/*

const validateInput = ({ body: {site, email}, context: {sourceIp, userAgent}, normalizedHeaders: {referer} }) => {
  const emailValidation = validateEmail(email)
  if (!emailValidation.valid) return response.badRequest(emailValidation.message)

  const siteValidation = validateSite(site, referer)
  if (!siteValidation.valid) return response.badRequest(siteValidation.message)

  const ipValidation = validateIp(sourceIp)
  if (!ipValidation.valid) return response.badRequest(ipValidation.message)

  return null
}


const originAllowed = ({ normalizedHeaders: { origin } }) => {
  return (!origin) ? false : domainAllowed(origin)
}

api.corsOrigin(req => {
  if (!req.normalizedHeaders.origin) return ''
  return originAllowed(req) ? req.normalizedHeaders.origin : ''
})

api.corsMaxAge(3600) // 1 hour in seconds

api.post('/emails', req => {
  if (!originAllowed(req)) return response.badRequest('origin not allowed')
  const validationError = validateInput(req)
  if (validationError) return validationError

  return updateDynamoDb(req).then(result => response.success('subscribed'))
})


module.exports = api
*/
