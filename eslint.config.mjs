import pluginReact from 'eslint-plugin-react';
import globals from 'globals';

export default {
  files: ["**/*.{js,jsx,mjs,cjs}"],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,  // Enable JSX parsing
      }
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
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
};
