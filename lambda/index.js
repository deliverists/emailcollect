const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const responses = require('./lib/responses')
const siteAllowed = require('./lib/sites').siteAllowed

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.get('/health', () => ({ status: 'a-okay', }))

api.get('/emails', req => responses.serverError('not implemented'))

const validateInput = body => {
  if (!body.site) return responses.badRequest('body must include site')
  if (!siteAllowed(body.site)) return responses.badRequest('site not registered, sign up at https://www.emailcollect.com!')

  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
  if (!body.email) return responses.badRequest('body must include email')
  if (!body.email.includes('@')) return responses.badRequest('email must include an @')
  if (!re.test(body.email.trim())) return responses.badRequest('email is not valid')
  
  // TODO - validate site of email AND sourceIp AND userAgent to stop crazy big objects getting into dynamo
  // TODO - how to lock endpoint down to stop hackers spamming me?
  // TODO - what about stopping silly email addresses?
  // what about stopping duplicates - currently overwrites?

  return false
}

const updateDynamoDb = ({ body: {site, email}, context: {sourceIp, userAgent} }) =>
  dynamoDb.put({
    TableName: 'emails',
    Item: {
      site: site,
      email: email.trim(),
      ip: sourceIp,
      ua: userAgent,
      date: (new Date()).toISOString(),
    },
  }).promise()

api.post('/emails', req => {
  const validationError = validateInput(req.body)
  if (validationError) return validationError

  return updateDynamoDb(req)
})

module.exports = api
