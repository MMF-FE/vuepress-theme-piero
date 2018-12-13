<template>
    <pr-sider-section
        class="pr-sider-posts"
        title="RECENT POSTS"
    >
        <ul class="pr-sider-posts__list">
            <li
                v-for="post in posts"
                :key="post.href"
                class="pr-sider-posts__item"
            >
                <pr-link
                    :href="post.href"
                    :title="post.title"
                    class="sider-post"
                >
                    <div class="sider-post__cover">
                        <pr-image
                            :src="post.cover"
                            alt="COVER"
                        ></pr-image>
                    </div>
                    <div class="sider-post__desc">
                        <p class="sider-post__title">{{ post.title }}</p>
                        <p
                            class="sider-post__date"
                        >{{ post.date | dateFormat('ddd MMM YYYY') }}</p>
                    </div>
                </pr-link>
            </li>
        </ul>
    </pr-sider-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Image from '@Core/components/Image/index.vue'
import Link from '@Core/components/Link/index.vue'
import Section from '../Section/index.vue'

interface IPost {
    cover: string
    date: string
    title: string
    href: string
}

@Component({
    name: 'PrSiderRecentPosts',
    components: {
        [Section.name]: Section,
        [Link.name]: Link,
        [Image.name]: Image
    }
})
export default class PrSiderRecentPosts extends Base {
    protected get posts(): IPost[] {
        return this.$site.pages
            .filter((page) => page.type === 'post')
            .sort(
                (first, next) =>
                    new Date(next.frontmatter.date || '').getTime() -
                    new Date(first.frontmatter.date || '').getTime()
            )
            .slice(0, 5)
            .map((post) => ({
                cover: post.frontmatter.cover || this.DefaultSetting.cover,
                date: post.frontmatter.date || '',
                title: post.title,
                href: post.path
            }))
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

