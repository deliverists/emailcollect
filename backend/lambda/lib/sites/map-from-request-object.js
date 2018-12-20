const getIp = require('../request/get-ip')

module.exports = req => {
  const ip = getIp(req)
  const {
    body: { site },
    requestContext: {
      identity: { cognitoIdentityId },
    },
    headers,
  } = req
  return {
    site,
    email: cognitoIdentityId,
    verified: false,
    ip,
    ua: headers['user-agent'].substring(0, 500),
    date: new Date().toISOString(),
  }
}
