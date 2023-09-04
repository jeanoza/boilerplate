module.exports = {
	env: {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'warn',
			'tab',
			{ 'SwitchCase': 1 }
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
