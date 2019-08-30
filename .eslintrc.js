module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'jsx-a11y',
    'import'
  ],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'import/no-internal-modules': 'warn'
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},

      typescript: {
        directory: './src'
      }
    }
  }
}
