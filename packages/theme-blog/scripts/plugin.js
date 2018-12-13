const path = require('path')
const alias = require('./alias')
const CopyPlugin = require('copy-webpack-plugin')

const enhancers = [
    {
        when: ({ regularPath }) =>
            regularPath === '/category/' ||
            regularPath === '/tag/' ||
            regularPath.startsWith('/category/') ||
            regularPath.startsWith('/tag/'),
        frontmatter: {
            layout: 'CategoryTag'
        }
    },
    {
        when: ({ regularPath }) => regularPath === '/search/',
        frontmatter: {
            layout: 'Search'
        }
    }
]

module.exports = function(options, content) {
    return {
        name: 'vuepress-theme-piero-blog',

        async ready() {
            content.pages.forEach((page) => {
                if (page.type === 'post') {
                    page.frontmatter.date =
                        page.frontmatter.date || new Date().toString()
                }
            })

            await content.addPage({
                permalink: '/search/',
                frontmatter: {
                    title: 'Search'
                }
            })
        },

        extendPageData(pageCtx) {
            enhancers.forEach(({ when, frontmatter }) => {
                if (when(pageCtx)) {
                    Object.assign(pageCtx.frontmatter, frontmatter)
                }
            })
        },

        chainWebpack(config, isServer) {
            // 配置 webpack 别名
            Object.keys(alias).reduce(
                (config, key) =>
                    config.set(
                        key,
                        path.resolve(__dirname, `../${alias[key]}`)
                    ),
                config.resolve.alias
            )

            config.plugin('custom-copy').use(CopyPlugin, [
                [
                    {
                        from: path.resolve(content.sourceDir, '_posts'),
                        to: path.join(content.outDir, '_posts')
                    }
                ]
            ])
        },

        enhanceAppFiles: [path.resolve(__dirname, 'client.js')],

        globalUIComponents: 'PrBackTop'
    }
}
