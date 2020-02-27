const config = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  plugins: ['prettier', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:compat/recommended',
    'plugin:import/errors'
  ],
  rules: {
    // eslint internals
    curly: ['error', 'all'],

    // Plugins
    'prettier/prettier': 'error',

    'import/no-unresolved': 0
  }
};

module.exports = config;
