const connection = require('./data-connection')

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: function DocumentClient() {
      return {
        put: input => ({ promise: () => Promise.resolve(input) }),
      }
    },
  },
}))

jest.mock('../../lambda/lib/variables', () => ({
  IS_OFFLINE: true,
}))

describe('data connection', () => {
  test('something', done => {
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
