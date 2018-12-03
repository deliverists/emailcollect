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
  test('upsert calls put on aws sdk', async () => {
    const output = await connection.upsert('table-name', {
      foo: 'bart',
    })

    expect(output).toEqual({ Item: { foo: 'bart' }, TableName: 'table-name' })
  })
})
