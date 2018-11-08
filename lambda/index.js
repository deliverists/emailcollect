const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')
const response = require('./lib/responses')
const siteAllowed = require('./lib/sites').siteAllowed

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.get('/health', () => response.success('a-okay'))

api.get('/emails', req => response.serverError('not implemented'))

const validateInput = (body) => {
  if (!body.site) return response.badRequest('body must include site')
  if (!siteAllowed(body.site)) return response.badRequest('site not registered, sign up at https://www.emailcollect.com!')

  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/;
  if (!body.email) return response.badRequest('body must include email')
  if (!body.email.includes('@')) return response.badRequest('email must include an @')
  if (!re.test(body.email.trim())) return response.badRequest('email is not valid')
  
  // TODO - validate site of email AND sourceIp AND userAgent to stop crazy big objects getting into dynamo
  // TODO - how to lock endpoint down to stop hackers spamming me?
  // TODO - what about stopping silly email addresses?
  // what about stopping duplicates - currently overwrites?
  // check the referrer is from valid domain as well

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

api.corsOrigin(req => {
  if (!req.headers.origin) return ''
  const origin = req.headers.origin.replace('https://', '')
  return siteAllowed(origin) ? req.headers.origin : ''
})

api.post('/emails', req => {
  const validationError = validateInput(req.body)
  if (validationError) return validationError

  return updateDynamoDb(req).then(result => response.success('subscribed'))
})


module.exports = api
