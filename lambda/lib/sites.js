const whiteList = [
  'www.clockswan.com',
]

module.exports = {
  siteAllowed: site => whiteList.includes(site)
}
