import dateFns from 'date-fns'
import path from 'path'

// tslint:disable-next-line
export = (options: Types.IBlogArchivePluginOptions, ctx: any) => {
    const { themeAPI: { layoutComponentMap }} = ctx
    const {
        pageEnhancers = [],
        indexPageUrl = '/archive/',
        dateFormat = 'YYYY-MM'
    } = options

    const isLayoutExists = (name: string) =>
        layoutComponentMap[name] !== undefined
    const getLayout = (name: string, fallback: string) =>
        isLayoutExists(name) ? name : fallback

    const enhancers: Types.IPageEnhancer[] = [
        {
            when: ({ regularPath }) => regularPath.startsWith('/archive/'),
            frontmatter: { layout: getLayout('Archive', 'Page') }
        },
        {
            when: ({ regularPath }) => regularPath === indexPageUrl,
            frontmatter: { layout: getLayout('Archive', 'Page') }
        },

        ...pageEnhancers
    ]

    return {
        extendPageData(pageCtx: Types.IPageCtx) {
            const { frontmatter: rawFrontmatter } = pageCtx

            enhancers.forEach(({ when, data = {}, frontmatter = {} }) => {
                if (when(pageCtx)) {
                    Object.assign(rawFrontmatter, frontmatter)
                    Object.assign(pageCtx, data)
                }
            })
        },

        async ready() {
            const { pages } = ctx
            const archiveMap: Types.IArchiveMap = {}
            ;(pages as Types.IPageCtx[])
                .filter((post) => post.type === 'post')
                .forEach(({ key, frontmatter: { date } }) => {
                    const pageDate = date !== undefined ? date : Date.now()

                    const pageDateStr = dateFns.format(
                        new Date(pageDate),
                        dateFormat
                    )

                    if (!archiveMap[pageDateStr]) {
                        archiveMap[pageDateStr] = {
                            path: `/archive/${pageDateStr}.html`,
                            pageKeys: []
                        }
                    }
                    archiveMap[pageDateStr].pageKeys.push(key)
                })

            ctx.archiveMap = archiveMap

            const extraPages = [
                {
                    permalink: indexPageUrl,
                    frontmatter: { title: `Archives` }
                },
                ...Object.keys(archiveMap).map((archiveDate) => ({
                    permalink: archiveMap[archiveDate].path,
                    meta: { archiveDate },
                    frontmatter: {
                        title: `${archiveDate} | Archives`
                    }
                }))
            ]

            await Promise.all(extraPages.map((page) => ctx.addPage(page)))
        },

        async clientDynamicModules() {
            return [
                {
                    name: 'archive.js',
                    content: `export default ${JSON.stringify(
                        ctx.archiveMap,
                        null,
                        2
                    )}`
                }
            ]
        },

        enhanceAppFiles: [path.resolve(__dirname, '../src/client.js')]
    }
}
