module.exports = {
    title: '伊智大前端',
    description:
        '伊智大前端团队简介伊智大前端团队简介伊智大前端团队简介伊智大前端团队简介伊智大前端团队简介伊智大前端团队简介',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico',
                type: 'image/ico',
                size: '32x32'
            }
        ]
    ],
    base: '/',
    dest: 'dist',
    markdown: {
        lineNumbers: true
    },

    /* theme */
    theme: '@yzfe/vuepress-theme-piero-blog',
    themeConfig: {
        subTitle: 'YZFE',
        logo: '/images/logo.png',
        blankLogo: '/images/logo-blank.png',
        bannerMark: '/images/logo-mark.png',
        bannerBackground:
            'https://qidianlife.oss-cn-shanghai.aliyuncs.com/%E5%B7%A5%E4%BD%9C%E5%AE%A4%E5%A4%B4%E5%9B%BE/1218-%E4%B8%80%E5%91%A8%E5%B9%B4%E6%88%91%E6%9C%89%E8%AF%9D%E5%AF%B9%E4%BD%A0%E8%AF%B4.jpg',
        introduction:
            '本站是基于 vuepress 搭建的静态资源博客，范德萨范德萨范德萨的范德萨发大水范德萨发大水发范德萨范德萨范德萨范德萨范德萨发',
        admin: {
            name: 'admin',
            link: '/'
        },
        contacts: {
            address: 'Guangzhou, Guangdong Province, China',
            phone: '(102) 3456 789',
            email: 'test@gmail.com',
            github: 'https://github.com/MMF-FE',
            facebook: '321312',
            twitter: '21321',
            wechat: '321312',
            weibo: '312312',
            linkedin: '231312'
        },
        firendLinks: [
            {
                label: 'JDC京东设计中心',
                title: 'JDC京东设计中心',
                link: 'https://jdc.jd.com/'
            },
            {
                label: '凹凸实验室',
                title: '京东凹凸实验室',
                link: 'https://aotu.io/'
            },
            {
                label: '百度FEX',
                title: '百度Web前端研发部',
                link: 'http://fex.baidu.com/'
            },
            {
                label: '淘宝FED',
                title: '淘宝前端团队',
                link: 'http://taobaofed.org/'
            },
            {
                label: 'TGIdeas',
                title: '腾讯互娱设计中心',
                link: 'http://tgideas.qq.com/'
            },
            {
                label: 'ISUX',
                title: '腾讯SNG设计中心',
                link: 'http://isux.tencent.com/'
            }
        ],
        menu: [
            { label: 'home', link: '/' },
            { label: 'archive', link: '/archive/' },
            { label: 'demo', link: '/demo/' },
            { label: '404', link: '/404/' },
            { label: 'about', link: '/about/' }
        ],
        comment: {
            owner: 'MinFE',
            repo: 'typescript-demo',
            clientId: 'dcecef7de1f88ab2935e',
            clientSecret: 'acb30fa65240e6111dfd64ea9447734943aed15e',
            admins: ['Mrminfive']
        }
    }
}
