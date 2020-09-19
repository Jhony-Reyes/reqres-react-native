module.exports = {
  extends: 'airbnb',
  plugins: [
    'react',
    'react-native',
    'react-hooks',
  ],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 1,
    'react/no-unused-state': 'warn',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': ['off'],
  },
};
