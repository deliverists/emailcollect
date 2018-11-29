const connection = require('../../lambda/lib/data-connection')

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: function DocumentClient() {
      return {
        put: input => ({ promise: () => Promise.resolve(input) }),
      }
    },
  },
}))

describe('data connection', () => {
  test('something', done => {
    process.env.IS_OFFLINE = true
    connection
      .upsert('table-name', {
        foo: 'bart',
      })
      .then(output => {
        expect(output).toEqual({ Item: { foo: 'bart' }, TableName: 'table-name' })
        done()
      })
  })
})
