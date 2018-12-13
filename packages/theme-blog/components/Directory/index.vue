<template>
    <pr-sticky :top="80">
        <nav class="pr-post-dirctory">
            <pr-vnode :vnode="headersVnode"></pr-vnode>
        </nav>
    </pr-sticky>
</template>


<script lang="ts">
import Base from '@Theme/common/Base'
import { VNode } from 'vue'
import { Component } from 'vue-property-decorator'
import { EventType } from '@Core/common/enums'
import PrVnode from '@Core/common/vnode'
import Link from '@Core/components/Link/index.vue'
import PrSticky from '@Core/components/Sticky/index.vue'

interface IHeader {
    level: number
    title: string
    slug: string
    children?: IHeader[]
}

function formatHeaders(headers: Vuepress.Header[]): IHeader[] {
    return headers
        .reduce(
            (res, header) => {
                if (res.length === 0) {
                    res.push([header, []])
                } else {
                    const [parent, childrenHeaders] = res[res.length - 1]

                    if (header.level > parent.level) {
                        childrenHeaders.push(header)
                    } else {
                        res.push([header, []])
                    }
                }

                return res
            },
            [] as Array<[Vuepress.Header, Vuepress.Header[]]>
        )
        .map((section) => {
            const [parent, childrenHeaders] = section

            return {
                ...parent,
                children: formatHeaders(childrenHeaders)
            }
        })
}

@Component({
    name: 'PrDirectory',
    components: {
        [PrVnode.name]: PrVnode,
        [Link.name]: Link,
        [PrSticky.name]: PrSticky
    }
})
export default class PrDirectory extends Base {
    public activeDirctoryItem = ''
    public scrollHandler!: Function

    public get headersVnode() {
        const headers = formatHeaders(this.$page.headers || [])

        return this.$createElement(
            'ul',
            {
                class: 'pr-post-directory__list'
            },
            [this.headerVnode(headers)]
        )
    }

    protected mounted() {
        this.initScrollHandler()
    }

    protected updated() {
        this.initScrollHandler()
    }

    protected beforeDestroy() {
        this.$event.removeEventListener(EventType.Scroll, this.scrollHandler)
    }

    private async initScrollHandler() {
        await this.Utils.sleep(1000)
        this.$event.removeEventListener(EventType.Scroll, this.scrollHandler)
        
        const headerEle = document.querySelectorAll('[data-post-title]')
        this.scrollHandler = () => {
            for (let i = 0; i < headerEle.length; i ++) {
                const el = headerEle[i]
                const top = el.getBoundingClientRect().top
                if (top > 100) {
                    const beforeEl = headerEle[i - 1] || headerEle[0]
                    this.activeDirctoryItem = beforeEl.id
                    break
                } else {
                    if (i === headerEle.length - 1) {
                        this.activeDirctoryItem = el.id
                    }
                }
            }
        }

        this.scrollHandler()
        this.$event.addEventListener(EventType.Scroll, this.scrollHandler)
    }

    private headerVnode(headers: IHeader[], level = 1): VNode[] {
        const h = this.$createElement

        return headers.reduce(
            (res, header) => {
                return res.concat(
                    [
                        h(
                            'li',
                            {
                                class: [
                                    'pr-post-dirctory__item',
                                    `pr-post-dirctory__item--level${level}`,
                                    this.activeDirctoryItem === header.slug ? 'pr-post-dirctory__item--actived' : ''
                                ]
                            },
                            [
                                h(
                                    'pr-link',
                                    {
                                        props: {
                                            href: '#' + header.slug + '_',
                                            color: this.Enums.LinkColor.Inherit,
                                            isAnchor: true
                                        },
                                        domProps: {
                                            title: header.title
                                        }
                                    },
                                    header.title
                                )
                            ]
                        )
                    ],
                    this.headerVnode(header.children || [], level + 1)
                )
            },
            [] as VNode[]
        )
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style> 

