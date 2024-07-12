module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Agregar nuevas reglas aquí
    'no-console': 'warn',
		semi: 'error',
		'semi-spacing': 'error',
		eqeqeq: 'warn',
		'no-return-assign': 'error',
		'no-unused-expressions': ['error', { allowTernary: true }],
		'no-useless-concat': 'error',
		'no-useless-return': 'error',
		'no-constant-condition': 'warn',
		'no-unused-vars': ['warn', { args: 'none' }],
		quotes: ['error', 'single'],
		'max-lines': ['warn', { max: 3500 }],
		'keyword-spacing': 'error',
		'arrow-spacing': 'error',
		'no-duplicate-imports': 'error',
		'no-var': 'error',
		'object-shorthand': 'off',
		'prefer-const': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		'react-hooks/exhaustive-deps': 'off',
  },
};
