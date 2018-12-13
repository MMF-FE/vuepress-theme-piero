
module.exports = {
    plugins: [
        require('./scripts/plugin'),
        require('@yzfe/vuepress-theme-piero-core'),
        [
            '@yzfe/vuepress-plugin-typescript',
            {
                // 锁定 tsconfig，避免 ts-loader 自行查找导致 tsconfig 错误
                context: __dirname,
                configFile: require.resolve('./tsconfig.json')
            }
        ],
        '@vuepress/plugin-blog',
        '@yzfe/vuepress-plugin-blog-archive',
        [
            '@vuepress/plugin-pagination',
            {
                perPagePosts: 12
            }
        ]
    ]
}
