const connection = require('../data-connection')

const { EMAILS_TABLE } = process.env
module.exports = email => connection.upsert(EMAILS_TABLE, email)
