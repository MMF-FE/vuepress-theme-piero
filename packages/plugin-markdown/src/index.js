const path = require('path')
const { PLUGINS } = require('@vuepress/markdown/lib/constant')
const RE = /{([\d,-]+)}/

module.exports = function(options, content) {
    return {
        name: 'vuepress-plugin-markdown',

        chainMarkdown(config) {
            // 集成 katex
            config.plugin('katex').use(require('markdown-it-katex'))

            // 集成 TODO list
            config.plugin('todo').use(require('markdown-it-enml-todo'))

            // 集成 mermaid
            config.plugin('mermaid').use(require('markdown-it-mermaid').default)

            // 集成 HighLight
            config
                .plugin('highlight')
                .use(require('markdown-it-highlightjs'))
                .before(PLUGINS.HIGHLIGHT_LINES)

            // 调整锚点的生成规则
            config.plugin('anchor').tap(([options]) => [
                Object.assign(options, {
                    renderPermalink(slug, opts, state, idx) {
                        state.tokens[idx].attrs = (
                            state.tokens[idx].attrs || []
                        ).concat([['class', 'post-header'], ['data-post-title', true]])

                        // 注入假锚点
                        state.tokens[idx + 1].children.unshift(
                            ...[
                                Object.assign(
                                    new state.Token('link_open', 'a', 1),
                                    {
                                        attrs: [
                                            ['id', `${slug}_`],
                                            ['class', 'post-header__anchor']
                                        ]
                                    }
                                ),
                                new state.Token('link_close', 'a', -1)
                            ]
                        )
                    }
                })
            ])

            // 调整行数生成规则
            config.plugin(PLUGINS.LINE_NUMBERS).use((md) => {
                const fence = md.renderer.rules.fence
                md.renderer.rules.fence = (...args) => {
                    const rawCode = fence(...args)
                    const code = rawCode.slice(
                        rawCode.indexOf('<code'),
                        rawCode.indexOf('</code>')
                    )
                    const lines = code.split('\n')
                    const lineNumbersCode = [...Array(lines.length - 1)]
                        .map(
                            (line, index) =>
                                `<span class="line-number">${index +
                                    1}</span><br>`
                        )
                        .join('')

                    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`

                    const finalCode = rawCode
                        .replace(
                            '<!--beforeend-->',
                            `${lineNumbersWrapperCode}<!--beforeend-->`
                        )
                        .replace('extra-class', 'line-numbers-mode')

                    return finalCode
                }
            })

            // 调整高亮行生成规则
            config.plugin(PLUGINS.HIGHLIGHT_LINES).use((md) => {
                const fence = md.renderer.rules.fence
                md.renderer.rules.fence = (...args) => {
                    const [tokens, idx, options] = args
                    const token = tokens[idx]

                    const rawInfo = token.info
                    if (!rawInfo || !RE.test(rawInfo)) {
                        return fence(...args)
                    }

                    const langName = rawInfo.replace(RE, '').trim()
                    token.info = langName

                    const lineNumbers = RE.exec(rawInfo)[1]
                        .split(',')
                        .map((v) => v.split('-').map((v) => parseInt(v, 10)))

                    const code = fence(...args)
                    const rawCode = options.highlight
                        ? options.highlight(token.content, langName)
                        : token.content

                    const highlightLinesCode = rawCode
                        .split('\n')
                        .map((split, index) => {
                            const lineNumber = index + 1
                            const inRange = lineNumbers.some(([start, end]) => {
                                if (start && end) {
                                    return (
                                        lineNumber >= start && lineNumber <= end
                                    )
                                }
                                return lineNumber === start
                            })
                            if (inRange) {
                                return `<div class="highlighted">&nbsp;</div>`
                            }

                            return '<br>'
                        })
                        .slice(0, -1)
                        .join('')

                    const highlightLinesWrapperCode = `<div class="highlight-lines">${highlightLinesCode}</div>`

                    return highlightLinesWrapperCode + code
                }
            })
        },

        extendMarkdown(md) {
            const fence = md.renderer.rules.fence
            md.renderer.rules.fence = (...args) => {
                const rawCode = fence(...args)
                return rawCode.replace(
                    /<div class="language-([^<>\s]+)\s([^<>\s]+)">/g,
                    '<div class="language-$1 $2" data-language="$1">'
                )
            }
        },

        enhanceAppFiles: [path.resolve(__dirname, 'client.js')]
    }
}
