module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  rules: {
    'no-console': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['test-lib/*.js', '__tests__/*.js'],
      },
    ],
  },
}
