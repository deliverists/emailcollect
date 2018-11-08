const whiteList = [
  'mysite.com',
]

module.exports = {
  siteAllowed: site => whiteList.includes(site)
}
