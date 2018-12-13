<template>
    <article
        class="pr-post-card"
        itemscope
        itemtype="http://schema.org/Article"
    >
        <div class="pr-post-card__header">
            <pr-image
                :src="cover"
                alt="COVER"
                class="pr-post-card__cover"
                itemprop="image"
            ></pr-image>

            <template
                v-for="(category, index) in categories">
                <pr-link
                    v-if="category.name"
                    :key="category.key"
                    :color="Enums.LinkColor.Light"
                    :href="category.path"
                    :style="{
                        top: `${20 + index * 40}px`
                    }"
                    class="pr-post-card__cat"
                >{{ category.name }}</pr-link>
            </template>

            <div class="pr-post-card__readmore">
                <pr-link
                    :color="Enums.LinkColor.Inherit"
                    :href="post.path"
                    class="readmore__btn"
                    itemprop="url"
                >READ MORE
                    <svg-icon
                        class="readmore__icon"
                        name="next"
                    ></svg-icon>
                </pr-link>
            </div>
        </div>
        <div class="pr-post-card__info">
            <div class="pr-post-card__meta">
                <h4 class="pr-post-card__title">
                    <pr-link
                        :href="post.path"
                        itemprop="url"
                    >{{ post.title }}</pr-link>
                </h4>

                <div class="pr-post-card__other-info">
                    <p
                        :content="post.frontmatter.date | dateFormat"
                        class="other-info__column pr-post-card__date"
                        itemprop="datePublished"
                    >{{ post.frontmatter.date | dateFormat('MMM DD YYYY') }}</p>

                    <div
                        class="other-info__column pr-post-card__author"
                        itemprop="author"
                        itemscope
                        itemtype="http://schema.org/Person"
                    >
                        <span>By</span>
                        <template v-for="(author, index) in authors">
                            {{ index != 0 ? ' , ' : '' }}
                            <pr-link
                                :key="author.name"
                                :href="author.link"
                                class="author__name"
                                itemprop="url"
                            >
                                <span itemprop="name">{{ author.name }}</span>
                            </pr-link>
                        </template>
                    </div>
                </div>
            </div>

            <p
                class="pr-post-card__desc"
                itemprop="articleSection"
            >{{ summary }}</p>

            <div class="pr-post-card__text-readmore">
                <pr-link
                    :color="Enums.LinkColor.Inherit"
                    :href="post.path"
                    class="text-readmore__btn"
                    itemprop="url"
                >READ MORE
                    <svg-icon
                        class="text-readmore__icon"
                        name="next"
                    ></svg-icon>
                </pr-link>
            </div>
        </div>
    </article>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'
import Image from '@Core/components/Image/index.vue'
import Link from '@Core/components/Link/index.vue'
import dateFormat from 'date-fns/format'

const defaultPost: Types.IPost = {
    frontmatter: {
        title: 'Default Post',
        layout: 'page',
        permalink: '',
        date: dateFormat(new Date()),
        cover: ''
    },
    key: '',
    path: '/',
    regularPath: '',
    title: 'Default Post',
    type: 'post'
}

@Component({
    name: 'PrPostCard',
    components: {
        [Image.name]: Image,
        [Link.name]: Link
    }
})
export default class PrPostCard extends Base {
    @Prop({ default: defaultPost })
    protected readonly post!: Types.IPost

    protected get cover() {
        return this.post.frontmatter.cover || this.DefaultSetting.cover
    }

    protected get categories() {
        let { frontmatter } = this.post
        let categories: string[] = Array.from(frontmatter.categories || [])

        return categories.map((item) => ({
            key: this.Utils.randomStr(8),
            name: item,
            path: `/category/${item}.html`
        }))
    }

    protected get summary() {
        return (this.post.excerpt || this.post.title).replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '')
    }

    protected get authors() {
        let authorList: Types.IAuthorItem[] = []
        let author = this.post.frontmatter.author || this.$themeConfig.admin

        if (Array.isArray(author)) {
            authorList = Array.from(author)
        } else {
            authorList.push(author)
        }

        return authorList
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

