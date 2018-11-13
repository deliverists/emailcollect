const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const response = require('./lib/responses')
const emails = require('./lib/emails')
const sites = require('./lib/sites')
const ip = require('./lib/ip')

const normalizeEmail = emails.normalize
const validateEmail = emails.validate
const domainAllowed = sites.domainAllowed
const validateSite = sites.validate
const validateIp = ip.validate

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.get('/health', () => response.success('a-okay'))

api.get('/emails', req => response.serverError('not implemented'))

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
