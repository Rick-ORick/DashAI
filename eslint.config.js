import { defineConfig } from 'eslint';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

export default defineConfig({
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
        ecmaVersion: 2020,
        sourceType: 'module',
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
        'no-unused-vars': 'warn', // Example rule to catch unused variables
      },
    },
  ],
});
