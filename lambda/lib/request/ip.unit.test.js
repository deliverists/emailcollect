const validateRequest = require('./ip')

describe('validate request', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = { ip: null }
    res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    }
    next = jest.fn()
  })

  const testIp = (ip, message) => {
    req.ip = ip
    validateRequest(req, res, next)
    expect(res.status).toHaveBeenCalledWith(422)
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message }))
  }

  test('ip is blank, 422 is sent with message', () => {
    testIp(null, 'source ip does not exist')
  })

  test('17 digit ip is too long, 422 is sent with message', () => {
    testIp(''.padStart(17, '1'), 'source ip is too long')
  })

  test('invalid ip format, 442 is sent with message', () => {
    testIp('12a.0.0.1', 'source ip is not valid')
  })

  test('valid ip, next is called', () => {
    req.ip = '127.0.0.1'
    validateRequest(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
