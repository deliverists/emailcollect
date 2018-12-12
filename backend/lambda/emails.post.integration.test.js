const rp = require('request-promise')
const variables = require('./lib/variables')
const dynamoTester = require('../test-lib/dynamodb')
const stringHelper = require('../test-lib/string')

jest.mock('./lib/variables', () => () => ({
  IS_OFFLINE: true,
  EMAILS_TABLE: 'emails-table-dev',
}))

describe('post emails', () => {
  const testSite = 'www.emailswan.com'
  const newEmailAddress = () => `${stringHelper.randomString()}@test.com`
  const makeRequest = async ({ email, ip } = {}) => {
    if (!email) email = newEmailAddress()
    return rp({
      method: 'POST',
      uri: 'http://localhost:3000/emails',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36',
      },
      resolveWithFullResponse: true,
      simple: false,
      body: JSON.stringify({ site: testSite, email }),
    })
  }

  test('responds with 200', async () => {
    const response = await makeRequest()
    if (response.statusCode !== 200) console.log('info', response.body)
    expect(response.statusCode).toEqual(200)
  })

  test('dynamodb record is created', async () => {
    const email = newEmailAddress()
    await makeRequest({ email })

    const queryResponse = await dynamoTester.getEmailByAddress(
      variables().EMAILS_TABLE,
      email,
    )

    expect(queryResponse.Count).toEqual(1)
    expect(queryResponse.Items[0].email.S).toEqual(email)
    expect(queryResponse.Items[0].site.S).toEqual(testSite)
  })

  test('validates email address', async () => {
    const email = '@@@!'
    const response = await makeRequest({ email })

    expect(response.statusCode).toEqual(422)
    expect(JSON.parse(response.body).message).toEqual(
      'email must be in the form: "recipient@domain.com"',
    )
  })
})
