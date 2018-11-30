const lambdaModule = require('./index')
const wrapper = require('../test-lib/lambda-wrapper')
const requestContext = require('../test-lib/request-context')
const dynamoTester = require('../test-lib/dynamodb')
const stringHelper = require('../test-lib/string')

jest.mock('./lib/variables', () => ({
  IS_OFFLINE: true,
  EMAILS_TABLE: 'emails',
}))

describe('post emails', () => {
  const run = body =>
    wrapper(lambdaModule).run(requestContext('post', '/emails', body))

  const newEmailAddress = () => `${stringHelper.randomString()}@test.com`

  test('responds with 200', async () => {
    const email = newEmailAddress()
    const response = await run({ site: 'somewhere.com', email })

    if (response.statusCode === 500) console.log('info', response.body)
    expect(response.statusCode).toEqual(200)
  })

  test('dynamodb record is created', async () => {
    const email = newEmailAddress()
    await run({ site: 'somewhere.com', email })

    const queryResponse = await dynamoTester.getEmailByAddress(email)

    expect(queryResponse.Count).toEqual(1)
    expect(queryResponse.Items[0].email.S).toEqual(email)
    expect(queryResponse.Items[0].site.S).toEqual('somewhere.com')
  })
})
