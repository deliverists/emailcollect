const jestPlugin = require('serverless-jest-plugin')
const mod = require('./../lambda/index')

const { lambdaWrapper } = jestPlugin
const wrapped = lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('health', () => {
  it('always responds with a-okay', () =>
    wrapped
      .run({
        headers: {
          Host: 'localhost:3000',
          Connection: 'keep-alive',
          'Cache-Control': 'max-age=0',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'If-None-Match': 'W/"6-T1n80esREtcp0eCEVRtc0lY3Pts"',
        },
        multiValueHeaders: {
          Host: ['localhost:3000'],
          Connection: ['keep-alive'],
          'Cache-Control': ['max-age=0'],
          'Upgrade-Insecure-Requests': ['1'],
          'User-Agent': [
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
          ],
          Accept: [
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          ],
          'Accept-Encoding': ['gzip, deflate, br'],
          'Accept-Language': ['en-GB,en-US;q=0.9,en;q=0.8'],
          'If-None-Match': ['W/"6-T1n80esREtcp0eCEVRtc0lY3Pts"'],
        },
        path: '/health',
        pathParameters: null,
        requestContext: {
          accountId: 'offlineContext_accountId',
          resourceId: 'offlineContext_resourceId',
          apiId: 'offlineContext_apiId',
          stage: 'dev',
          requestId: 'offlineContext_requestId_6816581031547295',
          identity: {
            cognitoIdentityPoolId: 'offlineContext_cognitoIdentityPoolId',
            accountId: 'offlineContext_accountId',
            cognitoIdentityId: 'offlineContext_cognitoIdentityId',
            caller: 'offlineContext_caller',
            apiKey: 'offlineContext_apiKey',
            sourceIp: '127.0.0.1',
            cognitoAuthenticationType: 'offlineContext_cognitoAuthenticationType',
            cognitoAuthenticationProvider:
              'offlineContext_cognitoAuthenticationProvider',
            userArn: 'offlineContext_userArn',
            userAgent:
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
            user: 'offlineContext_user',
          },
          authorizer: { principalId: 'offlineContext_authorizer_principalId' },
          protocol: 'HTTP/1.1',
          resourcePath: '/health',
          httpMethod: 'GET',
        },
        resource: '/health',
        httpMethod: 'GET',
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        stageVariables: null,
        body: null,
        isOffline: true,
      })
      .then(response => {
        console.log('info', response)
        expect(response.body).toEqual('a-okay')
      }))
})
