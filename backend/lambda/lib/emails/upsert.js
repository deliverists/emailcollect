const variables = require('../variables')
const connection = require('../data-connection')
const mapFromRequestObject = require('./map-from-request-object')

const { EMAILS_TABLE } = variables()

module.exports = async (req, res) => {
  const email = mapFromRequestObject(req)
  try {
    const data = await connection.upsert(EMAILS_TABLE, email)
    res.send({ status: 'subscribed', data })
  } catch (err) {
    res.status(500).send(err)
  }
}
