const AWS = require('aws-sdk')
const lambda = require('../test-lib/lambda')
const requestContext = require('../test-lib/request-context')

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
})

describe('post emails', () => {
  const run = body => lambda.run(requestContext('post', '/emails', body))

  test('responds with 200', async () => {
    dynamoDb.put = jest.fn((params, cb) => {
      cb(null, 'data')
    })
    const response = await run({ site: 'somewhere.com', email: 'mickey@disney.com' })
    if (response.statusCode === 500) console.log('info', response.body)
    expect(response.statusCode).toEqual(200)
  })
})
