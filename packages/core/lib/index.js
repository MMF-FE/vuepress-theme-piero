module.exports = {
    plugins: [
        require('./scripts/plugin'),
        [
            '@yzfe/vuepress-plugin-postcss',
            {
                path: __dirname
            }
        ],
        '@yzfe/vuepress-plugin-markdown',
        '@yzfe/vuepress-plugin-back-top',
        [
            '@yzfe/vuepress-plugin-flexsearch',
            {
                encode: 'icase',
                tokenize: 'strict',
                threshold: 1,
                resolution: 3,
                depth: 2
            }
        ]
    ]
}