'use strict'

const serverless = require('serverless-http');
const bodyParser = require('body-parser')
const express = require('express')
const AWS = require('aws-sdk')

const USERS_TABLE = process.env.USERS_TABLE
const IS_OFFLINE = process.env.IS_OFFLINE

const dynamoDb = new AWS.DynamoDB.DocumentClient(
  IS_OFFLINE ? {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  } : undefined
)
const app = express()

app.use(bodyParser.json({ strict: false }))

app.get('/health', (req, res) => res.send('a-okay'))

app.get('/emails', (req, res) => res.send('not implemented'))

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

const updateDynamoDb = ({ body: {site, email}, context: {sourceIp, userAgent} }) =>
  dynamoDb.put({
    TableName: 'emails',
    Item: {
      site: site,
      email: normalizeEmail(email),
      ip: sourceIp,
      ua: userAgent.substring(0, 500),
      date: (new Date()).toISOString(),
    },
  }).promise()

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
