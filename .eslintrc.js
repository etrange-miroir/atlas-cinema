module.exports = {
  extends: "next/core-web-vitals",
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['simple-import-sort'],
      rules: {
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],
        'jsx-a11y/anchor-is-valid': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // first group
              // - 'react' first
              // - 'next' second
              ['^react$', '^next'],
              // other node_modules
              ['^@?\\w'],
              // not matched yet
              ['^'],
              // side effects
              ['^\\u0000'],
              // relative imports
              ['^\\.'],
            ],
          },
        ],
      },
    },
  ],
}
