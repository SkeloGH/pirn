/* eslint-env node */
module.exports = {
  root: true, // Indicates that this is the root configuration
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: [
        'packages/**/**/*.ts'
      ],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked'],
      parserOptions: {
        project: ['packages/**/tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'max-len': ['error', { code: 100 }],
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': ['error', { max: 2 }],
      }
    }
  ]
};