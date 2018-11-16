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
  },
}
