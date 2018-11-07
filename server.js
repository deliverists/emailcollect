const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')

const api = new ApiBuilder()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

api.get('/health', () => ({
  status: 'a-okay',
})

api.get('/test', request => JSON.stringify(request))

api.get('/emails', request => {
  return dynamoDb.scan({ TableName: 'emails' })
    .promise()
    .then(response => response.Items)
})

api.post('/emails', req => {
  const params = {
    TableName: 'emails',
    Item: {
        site: req.body.site,
        email: req.body.email,
    },
  }
  return dynamoDb.put(params).promise()
})

module.exports = api
