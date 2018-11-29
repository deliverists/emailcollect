module.exports = httpResponse => upsertPromise => {
  upsertPromise
    .then(data => {
      httpResponse.send(`subscribed, ${data}`)
    })
    .catch(err => {
      httpResponse.status(500).send(err)
    })
}
