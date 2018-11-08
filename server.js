const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.get('/health', () => ({ status: 'a-okay', }))

api.get('/emails', req => new ApiBuilder.ApiResponse(
  { something: 'booyah'},
  {'Content-Type': 'application/json'},
  400,
))
  /*
  return dynamoDb.scan({ TableName: 'emails' })
    .promise()
    .then(response => response.Items)
  */

api.post('/emails', req => {
  const email = req.body.email.trim()
  /*
  if (email.includes('@'))
    return
  */
  const params = {
    TableName: 'emails',
    Item: {
        site: req.body.site,
        email: email,
        sourceIp: req.context.sourceIp,
        userAgent: req.context.userAgent,
        date: new Date(),
    },
  }
  return dynamoDb.put(params).promise()
})

module.exports = api
