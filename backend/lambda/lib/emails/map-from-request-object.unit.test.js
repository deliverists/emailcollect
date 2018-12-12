const lolex = require('lolex')
const mapFromRequestObject = require('./map-from-request-object')

describe('emails object mapping', () => {
  let clock
  beforeEach(() => {
    clock = lolex.install()
  })
  afterEach(() => {
    clock = clock.uninstall()
  })

  test('maps the request object to the emails object to be stored', () => {
    const request = {
      body: {
        site: 'ohhai.com',
        email: 'me@there.com',
      },
      ip: 'some-ip-address',
      requestContext: {
        identity: {
          sourceIp: 'some-ip-address',
        },
      },
      headers: {
        'user-agent': 'some user agent',
      },
    }
    clock.tick(42000)
    const output = mapFromRequestObject(request)
    expect(output).toEqual({
      site: 'ohhai.com',
      email: 'me@there.com',
      ip: 'some-ip-address',
      ua: 'some user agent',
      date: '1970-01-01T00:00:42.000Z',
    })
  })
})
