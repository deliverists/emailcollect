const normalize = input => input.trim().toLowerCase()

module.exports = ({ body: { site, email }, ip, headers }) => ({
  site,
  email: normalize(email),
  ip,
  ua: headers['user-agent'].substring(0, 500),
  date: new Date().toISOString(),
})
