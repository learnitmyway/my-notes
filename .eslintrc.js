module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended'
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'jsx-a11y', 'jest'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  settings: { react: { version: 'detect' } }
}
