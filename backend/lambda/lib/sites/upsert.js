const variables = require('../variables')
const connection = require('../data-connection')
const mapFromRequestObject = require('./map-from-request-object')

const { SITES_TABLE: table } = variables()

module.exports = async (req, res) => {
  const item = mapFromRequestObject(req)
  try {
    const data = await connection.upsert(table, item)
    res.send({ status: 'success', data })
  } catch (err) {
    res.status(500).send(err)
  }
}
