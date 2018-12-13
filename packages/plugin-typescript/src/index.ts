import chainWebpack from 'webpack-chain'

// @ts-ignore
// tslint:disable-next-line
export = function setTsLoader(options = {}, content: any) {
    return {
        chainWebpack(config: chainWebpack, isServer: boolean) {
            config.resolve.extensions.add('.ts')

            config.module
                .rule('ts')
                .test(/.ts$/)
                .use('typescript')
                .loader('ts-loader')
                .options({
                    appendTsSuffixTo: [/.vue$/],
                    happyPackMode: true,
                    ...options
                })
        }
    }
}
