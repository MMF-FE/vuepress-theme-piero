import chainWebpack from 'webpack-chain'

interface IOptions {
    path: string
}

// tslint:disable-next-line
export = function setPostcssLoader(options: IOptions, content: any) {
    return {
        chainWebpack(config: chainWebpack, isServer: boolean) {
            const baseRule = config.module.rule('postcss')
            ;[
                // 忽略类型推导错误，@types/webpack-chain 版本过低
                // @ts-ignore
                baseRule.oneOf('modules').resourceQuery(/module/),
                // @ts-ignore
                baseRule.oneOf('normal')
            ].forEach((rule) => {
                rule.use('postcss-loader')
                    .loader('postcss-loader')
                    .options({
                        config: {
                            path: options.path
                        },
                        ...content.siteConfig.postcss
                    })
            })
        }
    }
}
