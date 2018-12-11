module.exports = api => {
  api.use((req, res, next) => {
    res.cors()
    next()
  })
}
