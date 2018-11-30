const AWS = require('aws-sdk')

const connection = () =>
  new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  })

module.exports.getEmailByAddress = email =>
  connection()
    .query({
      ExpressionAttributeValues: {
        ':e': { S: email },
      },
      KeyConditionExpression: 'email = :e',
      TableName: 'emails',
    })
    .promise()
