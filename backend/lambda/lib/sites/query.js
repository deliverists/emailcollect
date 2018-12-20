const variables = require('../variables')
const connection = require('../data-connection')

const { SITES_TABLE: table } = variables()

module.exports = async (req, res) => {
  const email = req.requestContext.identity.cognitoIdentityId
  try {
    const data = await connection.query(table, 'by-email', 'email', email)
    res.send({ status: 'success', data })
  } catch (err) {
    res.status(500).send(err)
  }
}
