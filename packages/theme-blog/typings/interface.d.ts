declare namespace TestSSS {
    interface Inter {
        [k: string]: number
    }
}

declare namespace Types {
    type ContaceType =
        | 'address'
        | 'email'
        | 'facebook'
        | 'github'
        | 'linkedin'
        | 'phone'
        | 'twitter'
        | 'wechat'
        | 'weibo'

    type IContace = { [k in ContaceType]: string }

    type IPost = Vuepress.Post<Frontmatter>

    type IEditor = IAuthorItem

    type ISiderComponent = 'PrDirectory'

    type BaseObject<T> = Core.BaseObject<T>

    interface ILayoutConfig {
        sider: boolean | ISiderComponent
        banner: boolean
    }

    interface IFirendLink {
        label: string
        link: string
        title?: string
    }

    interface IMenuItem {
        label: string
        link: string
    }

    interface IAuthorItem {
        name: string
        link: string
    }

    interface ICommentConfig {
        owner: string
        repo: string
        clientId: string
        clientSecret: string
        admins: string[]
    }

    interface ThemeConfig {
        logo: string
        bannerBackground: string
        bannerMark: string
        introduction: string
        contacts: IContace
        firendLinks: IFirendLink[]
        menu: IMenuItem[]
        admin: IAuthorItem
        comment: ICommentConfig
    }

    interface Frontmatter {
        title: string
        layout: string
        permalink: string
        categories?: string[]
        tags?: string[]
        date?: string
        cover?: string
        author?: IAuthorItem[] | IAuthorItem
        editor?: IEditor
    }
}
