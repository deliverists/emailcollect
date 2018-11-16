module.exports = (method, path, body) => {
  const httpMethod = method.trim().toUpperCase()
  return {
    headers: {
      Host: 'localhost:3000',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'If-None-Match': 'W/"6-T1n80esREtcp0eCEVRtc0lY3Pts"',
      'Content-Type': 'application/json',
    },
    multiValueHeaders: {
      Host: ['localhost:3000'],
      Connection: ['keep-alive'],
      'Cache-Control': ['no-cache'],
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
    path,
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
      resourcePath: path,
      httpMethod,
    },
    resource: path,
    httpMethod,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    body,
    isOffline: true,
  }
}
