const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')

const emails = require('./lib/emails')

const app = express()

app.use(bodyParser.json({ strict: false }))

app.get('/health', (req, res) => res.send('a-okay'))

app.get('/emails', (req, res) => res.status(500).send('not implemented'))

app.post('/emails', (req, res) => emails.upsert(req, res))

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
