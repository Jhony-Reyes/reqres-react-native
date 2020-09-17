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
    /*
      'react-native/no-raw-text': 2,
      'padded-blocks': 'off',
      'comma-dangle': 'off',
      'arrow-body-style': 'off',
      'react-native/split-platform-components': 2,
      'react-native/no-color-literals': 2,
      'react-native/no-single-element-style-arrays': 2,
      'react-hooks/exhaustive-deps': 'warn', */
  },
};
