import local from './local'

const cognito = {
  REGION: 'us-east-1',
  USER_POOL_ID: 'us-east-1_89dUWStzb',
  APP_CLIENT_ID: '22vughf0hk2oaucpvdjr2cmnau',
  IDENTITY_POOL_ID: 'us-east-1:b9478dc9-047e-4190-9ab1-9c4ee14ca9f3'
}

const prod = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'unknown'
  },
  cognito,
}

const dev = {
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://7770we21f0.execute-api.us-east-1.amazonaws.com/dev'
  },
  cognito,
}

const localEnv = {
  apiGateway: local,
  cognito,
}

export default () => process.env.NODE_ENV === 'development' ? localEnv : dev
