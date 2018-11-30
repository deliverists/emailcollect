const AWS = require('aws-sdk-mock')
const lambda = require('../test-lib/lambda')
const requestContext = require('../test-lib/request-context')
const mod = require('./../lambda/index')

describe('post emails', () => {
  const run = body => lambda.run(requestContext('post', '/emails', body))
  beforeAll(() => {
    AWS.mock('DynamoDB', 'putItem', (params, callback) => {
      callback(null, 'successfully put item in database')
    })
    mod.injectAwsSdk(AWS)
  })

  afterAll(() => AWS.restore('DynamoDB'))

  test('responds with 200', async () => {
    const response = await run({ site: 'somewhere.com', email: 'mickey@disney.com' })
    if (response.statusCode === 500) console.log('info', response.body)
    expect(response.statusCode).toEqual(200)
  })
})
