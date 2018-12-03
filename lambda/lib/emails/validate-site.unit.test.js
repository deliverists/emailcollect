const validateSite = require('./validate-site')

describe('site validation', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = { body: { site: null } }
    res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    }
    next = jest.fn()
  })

  const testSite = (site, message) => {
    req.body.site = site
    validateSite(req, res, next)
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message }))
  }

  test('empty site will send 422 with message', () => {
    testSite(null, 'body must include site')
  })

  test('site not in whitelist will send 422 with message', () => {
    testSite(
      'www.naughtysite.com',
      'site not registered, sign up at https://www.emailswan.com!',
    )
  })

  test('site in whitelist will call next', () => {
    req.body.site = 'www.emailswan.com'
    validateSite(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
