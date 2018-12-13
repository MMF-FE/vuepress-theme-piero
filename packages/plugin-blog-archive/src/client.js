import { findPageByKey } from '@app/util'
import archiveMeta from '@dynamic/archive'

class Classifiable {
    constructor(metaMap, pages) {
        this._metaMap = Object.assign({}, metaMap)
        Object.keys(this._metaMap).forEach((name) => {
            const { pageKeys } = this._metaMap[name]
            this._metaMap[name].posts = pageKeys.map((key) =>
                findPageByKey(pages, key)
            )
        })
    }

    get length() {
        return Object.keys(this._metaMap).length
    }

    get map() {
        return this._metaMap
    }

    get list() {
        return this.toArray()
    }

    toArray() {
        const tags = []
        Object.keys(this._metaMap)
            .sort(
                (first, next) =>
                    new Date(next).getTime() - new Date(first).getTime()
            )
            .forEach((name) => {
                const { posts, path } = this._metaMap[name]
                tags.push({ name, posts, path })
            })
        return tags
    }

    getItemByName(name) {
        return this._metaMap[name]
    }
}

export default ({ Vue }) => {
    Vue.mixin({
        computed: {
            $archives() {
                const { pages } = this.$site
                const archives = new Classifiable(archiveMeta, pages)
                return archives
            },
            $archive() {
                const archiveDate = this.$route.meta.archiveDate
                return this.$archives.getItemByName(archiveDate)
            }
        }
    })
}
