import { ESLint } from 'eslint';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

const config = [
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020, // or 2021/2022 depending on your requirements
        sourceType: 'module', // for ES modules
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/jsx-uses-react': 'off', // React 17+ doesn't need this anymore
      'react/react-in-jsx-scope': 'off', // React 17+ doesn't require this either
      'no-console': 'warn', // Adjust to your needs
      'no-unused-vars': 'warn', // Adjust to your needs
    },
  },
];

export default config;
