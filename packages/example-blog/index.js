const path = require('path')
const { dev, build, eject } = require('@vuepress/core')
dev({
    sourceDir: path.resolve(__dirname, './src'),
    debug: true
})
