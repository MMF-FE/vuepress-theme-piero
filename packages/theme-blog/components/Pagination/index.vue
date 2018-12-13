<template>
    <nav class="pr-pagination">
        <pr-vnode :vnode="listVnode"></pr-vnode>
    </nav>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { VNodeChildren } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import PrVnode from '@Core/common/vnode'
import Link from '@Core/components/Link/index.vue'

interface IPaginationItem {
    type: Enums.PaginationType
    path: string
    idx: number
}

@Component({
    name: 'PrPagination',
    components: {
        [PrVnode.name]: PrVnode
    }
})
export default class PrPagination extends Base {
    @Prop({ default: 4 })
    protected num!: number

    protected get currentIndex() {
        return this.$pagination.paginationIndex
    }

    /* tslint:disable */
    protected get pagination() {
        const pgArr: IPaginationItem[] = []
        const allPage = this.$pagination._paginationPages
        const currentIndex = this.$pagination.paginationIndex
        const pageCount = allPage.length
        const halfPagerCount = (this.num - 1) / 2

        let showPrevMore = false
        let showNextMore = false

        const pushPage = (idx: number) =>
            pgArr.push({
                type: this.Enums.PaginationType.Page,
                path: allPage[idx].path,
                idx
            })

        if (pageCount > this.num) {
            if (currentIndex > this.num - halfPagerCount) {
                showPrevMore = true
            }

            if (currentIndex < this.num - halfPagerCount) {
                showNextMore = true
            }
        }

        if (showPrevMore && !showNextMore) {
            const startPage = pageCount - (this.num - 1)
            for (let i = startPage; i < pageCount - 1; i++) {
                pushPage(i)
            }
        } else if (!showPrevMore && showNextMore) {
            for (let i = 1; i < this.num - 1; i++) {
                pushPage(i)
            }
        } else if (showPrevMore && showNextMore) {
            const offset = Math.floor(this.num / 2) - 1
            for (
                let i = currentIndex - offset;
                i <= currentIndex + offset;
                i++
            ) {
                pushPage(i)
            }
        } else {
            for (let i = 1; i < pageCount - 1; i++) {
                pushPage(i)
            }
        }

        if (showPrevMore) {
            let i = currentIndex - this.num
            i = i < 0 ? 0 : i
            pgArr.unshift({
                type: this.Enums.PaginationType.PrevMore,
                path: allPage[i].path,
                idx: i
            })
        }

        if (showNextMore) {
            let i = currentIndex + this.num
            i = i > pageCount - 1 ? pageCount - 1 : i
            pgArr.push({
                type: this.Enums.PaginationType.NextMore,
                path: allPage[i].path,
                idx: i
            })
        }

        pgArr.unshift({
            type: this.Enums.PaginationType.Page,
            path: allPage[0].path,
            idx: 0
        })
        if (allPage.length > 1) {
            pgArr.push({
                type: this.Enums.PaginationType.Page,
                path: allPage[pageCount - 1].path,
                idx: pageCount - 1
            })
        }

        if (this.$pagination.prevLink) {
            pgArr.unshift({
                type: this.Enums.PaginationType.Prev,
                path: this.$pagination.prevLink,
                idx: currentIndex - 1
            })
        }

        if (this.$pagination.nextLink) {
            pgArr.push({
                type: this.Enums.PaginationType.Next,
                path: this.$pagination.nextLink,
                idx: currentIndex + 1
            })
        }

        return pgArr
    }

    protected get listVnode() {
        const { PaginationType } = this.Enums
        const h = this.$createElement

        return h(
            'ul',
            {
                class: 'pr-pagination__wrap'
            },
            this.pagination.map(pager =>
                h(
                    'li',
                    {
                        class: {
                            'pr-pagination__pager': true,
                            'pr-pagination__more-btn':
                                pager.type === PaginationType.PrevMore ||
                                pager.type === PaginationType.NextMore,
                            'pr-pagination__pager--actived':
                                this.currentIndex === pager.idx
                        }
                    },
                    this.createContentVnode(pager)
                )
            )
        )
    }

    private createContentVnode(pager: IPaginationItem): VNodeChildren {
        const { PaginationType } = this.Enums
        const h = this.$createElement
        const getIcon = (name: string) =>
            h('svg-icon', { props: { name }, class: 'pr-pagination__icon' })
        const MoreIcon = getIcon('more')

        if (this.currentIndex === pager.idx) {
            return (pager.idx + 1).toString()
        } else {
            let contentNode: VNodeChildren = []

            switch (pager.type) {
                case PaginationType.Page:
                    contentNode = [(pager.idx + 1).toString()]
                    break
                case PaginationType.Prev:
                    contentNode = [getIcon('prev')]
                    break
                case PaginationType.Next:
                    contentNode = [getIcon('next')]
                    break
                case PaginationType.PrevMore:
                    contentNode = [MoreIcon, getIcon('prev-more')]
                    break
                case PaginationType.NextMore:
                    contentNode = [MoreIcon, getIcon('next-more')]
                    break
            }

            return [
                h(
                    Link,
                    {
                        props: {
                            href: pager.path,
                            color: this.Enums.LinkColor.Inherit
                        }
                    },
                    contentNode
                )
            ]
        }
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

