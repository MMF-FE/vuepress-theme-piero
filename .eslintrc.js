
module.exports = {
    root: true,
    // parser: '@typescript-eslint/parser',
    extends: [
        './rules/eslint.js',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/recommended',
        'prettier',
        'prettier/vue',
        'prettier/@typescript-eslint',
        './rules/tslint.js',
        './rules/vuelint.js'
    ],
    plugins: [
        '@typescript-eslint',
        'prettier',
        'vue'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2018,
        sourceType: 'module',
        // project: './tsconfig.json',
        // tsconfigRootDir: '../../',
        extraFileExtensions: ['.vue']
    },
    rules: {
        // "prettier/prettier": "error"
        semi: [2, 'never']
    },
    overrides: [
        {
            files: [
                '*.js'
            ],
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        },
        {
            files: [
                '*.vue',
                '*.ts'
            ],
            rules: {
                'no-undef': 0
            }
        }
    ]
}
