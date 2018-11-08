const whiteList = [
  'mysite.com',
  'mysite2.com',
]

module.exports = {
  siteAllowed: site => whiteList.includes(site)
}
