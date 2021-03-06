module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  root: true,
  extends: [
    'airbnb',
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:react-redux/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'prettier/react',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'jsx-a11y',
    'react-redux',
    'jest',
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/state-in-constructor': [0, 'always'],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': [
      1,
      'always',
      { ignoreClassFields: true },
    ],
    'react/prop-types': [0],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-use-before-define': ['error', false],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
// 'react/prop-types': [0]
