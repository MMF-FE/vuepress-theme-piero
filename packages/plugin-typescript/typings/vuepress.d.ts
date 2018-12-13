declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

declare namespace Vuepress {
    interface Vue<ThemeConfigType, Frontmatter> {
        $lang: string
        $description: string
        $title: string
        $page: Post<Frontmatter>

        $site: {
            logo?: string
            base: string
            description: string
            title: string
            pages: Post<Frontmatter>[]
            themeConfig: ThemeConfigType
            locales: {
                [k: string]: LocaleConfig
            }
        }
        $siteTitle: string

        $tag: ClassifiableItem<Frontmatter>
        $tags: Classifiable<Frontmatter>
        $categories: Classifiable<Frontmatter>
        $category: ClassifiableItem<Frontmatter>

        $localePath: string
        $localeConfig: any
        $themeConfig: ThemeConfigType
        $themeLocaleConfig: {}

        $pagination: {
            paginationIndex: number
            hasNext: boolean
            hasPrev: boolean
            length: number
            nextLink?: string
            prevLink?: string
            posts: Post<Frontmatter>[]
            _posts: Post<Frontmatter>[]
            _paginationPages: Array<{
                path: string
                interval: [number, number]
            }>
        }

        $vuepress: any
    }

    interface LocaleConfig {
        lang: string
        path: string
        title: string
    }

    interface Post<T> {
        excerpt?: string
        frontmatter: T
        headers?: Header[]
        key: string
        path: string
        regularPath: string
        title: string
        type: string
    }

    interface Header {
        level: number
        title: string
        slug: string
    }

    interface ClassifiableItem<T> {
        path: string
        pageKeys: string[]
        posts: Post<T>[]
    }

    interface ClassifiableListItem<T> {
        name: string
        path: string
        posts: Post<T>[]
    }

    interface ClassifiableMap<T> {
        [k: string]: ClassifiableItem<T>
    }

    interface Classifiable<T> {
        length: number
        _metaMap: ClassifiableMap<T>
        list: ClassifiableListItem<T>[]
        map: ClassifiableMap<T>
    }
}
