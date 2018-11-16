const jestPlugin = require('serverless-jest-plugin')
const mod = require('./../lambda/index')

const { lambdaWrapper } = jestPlugin
module.exports = lambdaWrapper.wrap(mod, { handler: 'handler' })
