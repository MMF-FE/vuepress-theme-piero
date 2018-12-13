const path = require('path')

module.exports = function(options, content) {
    return {
        name: 'vuepress-theme-piero-core',

        enhanceAppFiles: [path.resolve(__dirname, 'client.js')],

        globalUIComponents: 'PrBackTop'
    }
}