const validate = require('../../lambda/lib/emails/validate')

describe('emails validation', () => {
  test('validation passes the request object through', () => {
    const request = {
      body: {
        site: 'ohhai.com',
      },
    }
    const output = validate(request)
    expect(output.body.site).toEqual('ohhai.com')
  })
})
