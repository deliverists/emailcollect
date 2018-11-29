const AWS = require('aws-sdk')

const connection = () => {
  const { IS_OFFLINE } = process.env
  console.log('in connection', IS_OFFLINE)
  return new AWS.DynamoDB.DocumentClient(
    IS_OFFLINE
      ? {
          region: 'localhost',
          endpoint: 'http://localhost:8000',
        }
      : { region: 'us-east-1' },
  )
}

module.exports.upsert = (TableName, Item) =>
  connection()
    .put({
      TableName,
      Item,
    })
    .promise()
