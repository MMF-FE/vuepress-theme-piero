const path = require('path')

module.exports = {
    map: true,
    plugins: {
        'postcss-import': {
            path: [
                path.resolve(__dirname, 'lib/style'),
                path.resolve(__dirname, 'node_modules')
            ]
        },
        'postcss-preset-env': {
            browsers: ['> 1%', 'last 2 versions'],
            stage: 0
        },
        'postcss-nested': {}
        // cssnano: {}
    }
}
