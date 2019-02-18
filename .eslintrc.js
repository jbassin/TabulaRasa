module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
    'max-len': 'off',
    'no-useless-escape': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-side-effects-in-computed-properties': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
