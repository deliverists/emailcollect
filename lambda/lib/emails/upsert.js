const variables = require('../variables')
const connection = require('../data-connection')
const mapFromRequestObject = require('./map-from-request-object')

const { EMAILS_TABLE } = variables()

module.exports = (req, res) => {
  const email = mapFromRequestObject(req)
  connection
    .upsert(EMAILS_TABLE, email)
    .then(data => {
      res.send({ status: 'subscribed', data })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}
