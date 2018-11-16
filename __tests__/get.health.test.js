const lambda = require('../test-lib/lambda')
const requestContext = require('../test-lib/request-context')

describe('get health', () => {
  const run = () => lambda.run(requestContext('get', '/health'))

  test('responds with 200', async () => {
    const response = await run()
    expect(response.statusCode).toEqual(200)
  })

  test('responds with a-okay', async () => {
    const response = await run()
    expect(response.body).toEqual('a-okay')
  })
})
