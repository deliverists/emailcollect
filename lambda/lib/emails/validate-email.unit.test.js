const validateEmail = require('./validate-email')

describe('email validation', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = { body: { email: null } }
    res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    }
    next = jest.fn()
  })

  const testEmail = (email, message) => {
    req.body.email = email
    validateEmail(req, res, next)
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message }))
  }

  test('empty email will send 422 with message', () => {
    testEmail(null, 'your email address must be included')
  })

  test('email 255 chars will send 422 with message', () => {
    testEmail(''.padStart(255, 'a'), 'email must be shorter than 255 characters')
  })

  test('invalid email will send 422 with message', () => {
    testEmail('@.$', 'email must be in the form: "recipient@domain.com"')
  })

  test('email on blacklist will send 422 with message', () => {
    testEmail(
      'test@example.com',
      'email must be on an allowed domain (e.g. not "example.com")',
    )
  })

  test('valid email will call next', () => {
    req.body.email = 'mickey@mouse.com'
    validateEmail(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
