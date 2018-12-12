const getIp = require('../request/get-ip')

const normalize = input => input.trim().toLowerCase()

module.exports = req => {
  const ip = getIp(req)
  const {
    body: { site, email },
    headers,
  } = req
  return {
    site,
    email: normalize(email),
    ip,
    ua: headers['user-agent'].substring(0, 500),
    date: new Date().toISOString(),
  }
}
