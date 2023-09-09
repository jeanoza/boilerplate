module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	env: {
		node: true,
		jest: true,
	},
  	ignorePatterns: ['.eslintrc.js'],
	overrides: [
	],
	rules: {
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1,
				"ignoredNodes": [
					`FunctionExpression > .params[decorators.length > 0]`,
					`FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
					`ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
				]
			},
		],
		'linebreak-style': [
			'warn',
			'unix'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'always'
		],
		'space-before-function-paren': [
			'warn',
			'never'
		],
		'object-curly-spacing': ['warn', 'always'],
		'space-infix-ops': 1,
		'arrow-spacing': 1,
		'no-multi-spaces': 1,
		'func-call-spacing': 1,
		'keyword-spacing': 1,
		'@typescript-eslint/type-annotation-spacing': 1,
		'space-before-blocks': 'off',
		'@typescript-eslint/space-before-blocks': 'warn',
		'no-invalid-this': 'off',
		'@typescript-eslint/no-invalid-this': 'error',
		'space-in-parens': 1,
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				'argsIgnorePattern': '^_',
				'varsIgnorePattern': '^_',
				'caughtErrorsIgnorePattern': '^_'
			}
		],
	}
};