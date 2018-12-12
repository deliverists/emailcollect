const rp = require('request-promise')
const variables = require('./lib/variables')
const dynamoTester = require('../test-lib/dynamodb')
const stringHelper = require('../test-lib/string')

jest.mock('./lib/variables', () => () => ({
  IS_OFFLINE: true,
  SITES_TABLE: 'emailcollect-sites-dev',
}))

describe('post sites', () => {
  const newSite = () => `www.${stringHelper.randomString()}.com`
  const newEmailAddress = () => `${stringHelper.randomString()}@test.com`
  const makeRequest = async ({ site, email } = {}) => {
    if (!site) site = newSite()
    return rp({
      method: 'POST',
      uri: 'http://localhost:3000/sites',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36',
        'cognito-identity-id': email,
      },
      resolveWithFullResponse: true,
      simple: false,
      body: JSON.stringify({ site }),
    })
  }

  test('responds with 200', async () => {
    const response = await makeRequest()
    if (response.statusCode !== 200) console.log('info', response.body)
    expect(response.statusCode).toEqual(200)
  })

  test('dynamodb record is created', async () => {
    const site = newSite()
    const email = newEmailAddress()
    await makeRequest({ site, email })

    const queryResponse = await dynamoTester.getSiteByEmail(
      variables().SITES_TABLE,
      email,
    )

    expect(queryResponse.Count).toEqual(1)
    expect(queryResponse.Items[0].site.S).toEqual(site)
    expect(queryResponse.Items[0].email.S).toEqual(email)
  })
})
