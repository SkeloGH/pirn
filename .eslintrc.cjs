/* eslint-env node */
module.exports = {
  root: true, // Indicates that this is the root configuration
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: [
        'packages/types/**/*.ts',
        'packages/core/**/*.ts'
      ],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-type-checked'],
      parserOptions: {
        project: ['packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'max-len': ['error', { code: 100 }],
      }
    }
  ]
};