<template>
    <section class="pr-post">
        <div class="pr-post__cover">
            <pr-image
                :alt="$page.title"
                :src="cover"
            ></pr-image>
        </div>

        <header class="pr-post__header">
            <h1 class="pr-post__title">{{ $page.title }}</h1>
            <div class="pr-post__mark">
                <pr-post-mark-block
                    :list="authors"
                    icon="write"
                >
                    <pr-link
                        slot-scope="{ item }"
                        :color="Enums.LinkColor.Inherit"
                        :href="item.link"
                        :title="item.name"
                        class="mark__text"
                    >{{ item.name }}</pr-link>
                </pr-post-mark-block>

                <pr-post-mark-block
                    :list="[createDate]"
                    icon="calendar"
                >
                    <span
                        slot-scope="{ item }"
                        class="mark__text"
                    >{{ item | dateFormat('ddd MMM YYYY') }}</span>
                </pr-post-mark-block>

                <pr-post-mark-block
                    :list="tags"
                    icon="tag"
                >
                    <pr-link
                        slot-scope="{ item }"
                        :color="Enums.LinkColor.Inherit"
                        :href="item.path"
                        :title="item.name"
                        class="mark__text"
                    >{{ item.name }}</pr-link>
                </pr-post-mark-block>

                <pr-post-mark-block
                    :list="[1]"
                    icon="read"
                >
                    <template slot-scope="{ item }">
                        <span
                            id="busuanzi_value_page_pv"
                            :key="item"
                            class="mark__text"
                        ></span>
                    </template>
                </pr-post-mark-block>

                <pr-post-mark-block
                    :list="[commentCount]"
                    icon="comment"
                >
                    <template slot-scope="{ item }">
                        <span
                            :key="item"
                            class="mark__text"
                        >{{ commentCount }}</span>
                    </template>
                </pr-post-mark-block>
            </div>
        </header>

        <Content class="pr-post__content"></Content>

        <pr-post-announce></pr-post-announce>

        <pr-post-prevs></pr-post-prevs>

        <pr-comment @updateCount="updateCount"></pr-comment>
    </section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import mediumZoom, { Zoom } from 'medium-zoom'
import Comment from '@Theme/components/Comment/index.vue'
import Image from '@Core/components/Image/index.vue'
import Link from '@Core/components/Link/index.vue'
import Announce from './Announce/index.vue'
import MarkBlock from './MarkBlock/index.vue'
import Prevs from './Prevs/index.vue'

@Component({
    name: 'PrPost',
    components: {
        [Comment.name]: Comment,
        [Prevs.name]: Prevs,
        [Image.name]: Image,
        [Link.name]: Link,
        [MarkBlock.name]: MarkBlock,
        [Announce.name]: Announce
    }
})
export default class PrPost extends Base {
    protected commentCount = 0
    protected mermaid: any
    protected zoom!: Zoom

    protected get cover() {
        return this.$page.frontmatter.cover || this.DefaultSetting.cover
    }

    protected get createDate() {
        return this.$page.frontmatter.date || Date.now()
    }

    protected get authors() {
        let authorList: Types.IAuthorItem[] = []
        let author = this.$page.frontmatter.author || this.$themeConfig.admin

        if (Array.isArray(author)) {
            authorList = Array.from(author)
        } else {
            authorList.push(author)
        }

        return authorList
    }

    protected get tags() {
        let { frontmatter } = this.$page
        let categories: string[] = Array.from(frontmatter.tags || [])

        return categories.map((item) => ({
            name: item,
            path: `/tag/${item}.html`
        }))
    }

    protected async mounted() {
        await this.$nextTick()
        this.loadBusuanziScript()
        this.initMermaid()
        this.initMediumZoom()
    }

    protected updated() {
        this.initMermaid()
        this.initMediumZoom()
    }

    protected updateCount(num: number) {
        this.commentCount = num
    }

    protected async initMermaid() {
        const TIME = 100
        
        if (!this.mermaid) {
            // @ts-ignore
            this.mermaid = await import('mermaid/dist/mermaid.js')
        }
        
        await this.Utils.sleep(TIME)
        this.mermaid.init()
    }

    protected async initMediumZoom() {
        await this.$nextTick()

        if (this.zoom) {
            this.zoom.detach()
        }
        this.zoom = mediumZoom(
            this.$el.querySelectorAll('img'),
            { margin: 24 }
        )
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
