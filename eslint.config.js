// eslint.config.js
const { defineConfig } = require('eslint');
const globals = require('globals');
const pluginReact = require('eslint-plugin-react');

module.exports = defineConfig({
  overrides: [
    {
      files: ['**/*.{js,mjs,cjs,jsx}'],
      plugins: {
        react: pluginReact,
      },
      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2020, // Ensure ECMAScript version is set
        sourceType: 'module', // Ensure we're using ESM
      },
      env: {
        browser: true,
        node: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      rules: {
        'no-unused-vars': 'warn', // Example of custom rule
      },
    },
  ],
});
