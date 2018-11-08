const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const responses = require('./lib/responses')
const siteAllowed = require('./lib/sites').siteAllowed

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.get('/health', () => ({ status: 'a-okay', }))

api.get('/emails', req => responses.serverError('not implemented'))
/*
return dynamoDb.scan({ TableName: 'emails' })
  .promise()
  .then(response => response.Items)
*/

const validateInput = body => {
  console.log('info', body.site)
  if (!body.site) return responses.badRequest('body must include site')
  if (!siteAllowed(body.site)) return responses.badRequest('site not registered, sign up at https://www.emailcollect.com!')

  if (!body.email) return responses.badRequest('body must include email')
  if (!body.email.includes('@')) return responses.badRequest('email must include an @')

  return false
}

api.post('/emails', req => {
  const validationError = validateInput(req.body)
  if (validationError) return validationError

  const params = {
    TableName: 'emails',
    Item: {
      site: req.body.site,
      email: req.body.email.trim(),
      ip: req.context.sourceIp,
      ua: req.context.userAgent,
      date: (new Date()).toString(),
    },
  }
  return dynamoDb.put(params).promise()
})

module.exports = api
