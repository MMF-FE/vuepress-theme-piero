declare namespace Types {
    interface IBlogArchivePluginOptions {
        pageEnhancers: IPageEnhancer[]
        indexPageUrl: string
        dateFormat: string
    }

    interface IPageEnhancer {
        when: (pageCtx: IPageCtx) => boolean
        frontmatter: IPageFrontmatter
        data?: IPageData
    }

    interface IPageFrontmatter {
        [k: string]: string | number
    }

    interface IPageData {
        [k: string]: any
    }

    interface IPageCtx {
        key: string
        path: string
        title: string
        type: string
        regularPath: string
        frontmatter: IPageFrontmatter
    }

    interface IArchiveMap {
        [k: string]: {
            path: string
            pageKeys: string[]
        }
    }
}
