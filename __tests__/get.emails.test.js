const lambda = require('../test-lib/lambda')
const requestContext = require('../test-lib/request-context')

describe('get emails', () => {
  const run = () => lambda.run(requestContext('get', '/emails'))

  test('responds with 500', async () => {
    const response = await run()
    expect(response.statusCode).toEqual(500)
  })

  test('responds with "not implemented"', async () => {
    const response = await run()
    expect(response.body).toEqual('not implemented')
  })
})
