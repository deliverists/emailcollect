const lambdaModule = require('./index')
const wrapper = require('../test-lib/lambda-wrapper')
const requestContext = require('../test-lib/request-context')

jest.mock('./lib/variables', () => ({
  IS_OFFLINE: true,
  EMAILS_TABLE: 'emails',
}))

describe('post emails', () => {
  const run = body =>
    wrapper(lambdaModule).run(requestContext('post', '/emails', body))

  test('responds with 200', async () => {
    const response = await run({ site: 'somewhere.com', email: 'mickey@disney.com' })
    if (response.statusCode === 500) console.log('info', response.body)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatch(/^subscribed.*/)
  })
})
