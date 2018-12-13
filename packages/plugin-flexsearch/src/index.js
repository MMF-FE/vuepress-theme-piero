/* eslint-disable no-useless-escape */
const path = require('path')
const Flexsearch = require('flexsearch/flexsearch')
const CopyPlugin = require('copy-webpack-plugin')
const { Segment, useDefault } = require('segmentit')

const segmentit = useDefault(new Segment())

function deepClone(target) {
    return JSON.parse(JSON.stringify(target))
}

function tokenize(str) {
    let s = str.replace(/^\s+/, '')

    for (var i = s.length - 1; i >= 0; i--) {
        if (/\S/.test(s.charAt(i))) {
            s = s.substring(0, i + 1)
            break
        }
    }

    return s
        .split(
            /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\uFE30-\uFFA0|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]+/
        )
        .map((token) => {
            var t = token
                .replace(
                    /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\uFE30-\uFFA0|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g,
                    ''
                )
                .toLowerCase()
            return t
        })
        .reduce((res, token) => {
            let tokens = [token]

            // eslint-disable-next-line no-control-regex
            if (token.replace(/[\x00-\x7F]/g, '').trim() !== '') {
                tokens = segmentit.doSegment(token).map(i => i.w)
            }
            return res.concat(tokens)
        }, [])
}

module.exports = function plugin(options, content) {
    const CONSTANT = {
        options: {
            encode: 'icase',
            threshold: 1,
            resolution: 3,
            depth: 2,
            async: false,
            worker: false,
            ...options.config,
            doc: {
                id: 'key',
                field: ['title', 'content', 'tags', 'categories']
            }
        },

        fileName: options.path || 'assets/flexsearch.json'
    }
    const field = options.field || 'all'
    const Feeds = new Flexsearch({
        ...deepClone(CONSTANT.options),
        tokenize
    })
    const Store = {}

    return {
        async ready() {
            const { pages, themeConfig } = content
            const searchPages = pages
                .filter((page) => {
                    switch (field) {
                        case '':
                        case 'post':
                            return page.type === 'post'
                        case 'page':
                            return page.type !== 'post'
                        case 'all':
                        default:
                            return true
                    }
                })
                .sort((first, next) => {
                    const firstDate = new Date(first.date || null).getTime()
                    const nextDate = new Date(next.date || null).getTime()

                    return nextDate - firstDate
                })

            searchPages.forEach((page) => {
                const tags = page.frontmatter.tags || []
                const categories = page.frontmatter.categories || []
                const content = page._strippedContent || ''
                const key = page.key

                Feeds.add({
                    key,
                    title: page.title || '',
                    tags: tags.join(','),
                    categories: categories.join(','),
                    content
                })
                Store[key] = page.toJson()
            })

            await content.writeTemp(
                `flexsearch-plugin/${CONSTANT.fileName}`,
                JSON.stringify({
                    index: Feeds.export(),
                    store: Store
                })
            )
        },

        chainWebpack(config) {
            config.plugin('flex-search-plugin-copy').use(CopyPlugin, [
                [
                    {
                        from: path.join(
                            content.tempPath,
                            `flexsearch-plugin/${CONSTANT.fileName}`
                        ),
                        to: path.join(content.outDir, CONSTANT.fileName)
                    }
                ]
            ])
        },

        clientDynamicModules() {
            return {
                name: 'plugin-flexsearch-constant',
                content: `export default ${JSON.stringify(CONSTANT)}`
            }
        },

        enhanceAppFiles: path.resolve(__dirname, 'client.js')
    }
}
