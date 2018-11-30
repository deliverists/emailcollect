const connection = require('../../lambda/lib/data-connection')
const upsert = require('../../lambda/lib/emails/upsert')

jest.mock('../../lambda/lib/data-connection')
jest.mock('../../lambda/lib/variables', () => ({
  EMAILS_TABLE: 'table-namey-thing',
}))

describe('emails upserting', () => {
  test('upsert passes the object to our upsert data layer func with the correct table name', () => {
    const emailObj = {
      site: 'ohhai.com',
      email: 'me@there.com',
      ip: 'some-ip-address',
      ua: 'some user agent',
      date: '1970-01-01T00:00:42.000Z',
    }
    upsert(emailObj)
    expect(connection.upsert).toHaveBeenCalledWith('table-namey-thing', emailObj)
  })
})
