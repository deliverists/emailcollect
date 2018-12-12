const AWS = require('aws-sdk')

const connection = () =>
  new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  })

module.exports.getEmailByAddress = (TableName, email) =>
  connection()
    .query({
      ExpressionAttributeValues: {
        ':e': { S: email },
      },
      KeyConditionExpression: 'email = :e',
      TableName,
    })
    .promise()

module.exports.getSiteByEmail = (TableName, email) =>
  connection()
    .query({
      ExpressionAttributeValues: {
        ':e': { S: email },
      },
      KeyConditionExpression: 'email = :e',
      IndexName: 'by-email',
      TableName,
    })
    .promise()
