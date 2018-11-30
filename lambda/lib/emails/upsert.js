const variables = require('../variables')
const connection = require('../data-connection')

const { EMAILS_TABLE } = variables
module.exports = email => connection.upsert(EMAILS_TABLE, email)
