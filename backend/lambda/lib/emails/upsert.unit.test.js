const connection = require('../data-connection')
const upsert = require('./upsert')

jest.mock('../data-connection', () => ({
  upsert: jest.fn(() => Promise.resolve()),
}))
jest.mock('../variables', () => () => ({
  EMAILS_TABLE: 'table-namey-thing',
}))
jest.mock('./map-from-request-object', () => () => ({
  site: 'ohhai.com',
  email: 'me@there.com',
  ip: 'some-ip-address',
  ua: 'some user agent',
  date: '1970-01-01T00:00:42.000Z',
}))

describe('emails upserting', () => {
  let res

  beforeEach(() => {
    res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    }
  })

  test('calls upsert', () => {
    upsert({}, res)
    expect(connection.upsert).toHaveBeenCalledWith('table-namey-thing', {
      site: 'ohhai.com',
      email: 'me@there.com',
      ip: 'some-ip-address',
      ua: 'some user agent',
      date: '1970-01-01T00:00:42.000Z',
    })
  })

  test('sends 200 if connection resolves promise', async () => {
    await upsert({}, res)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.send).toHaveBeenCalled()
  })

  test('sends 500 if connection rejects promise', async () => {
    connection.upsert.mockImplementation(() => Promise.reject())
    await upsert({}, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalled()
  })
})
