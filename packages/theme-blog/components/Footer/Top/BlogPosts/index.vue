<template>
    <pr-footer-section
        class="pr-footer__blog-posts"
        title="blog posts"
    >
        <ul
            slot="info"
            class="post__list"
        >
            <li
                v-for="post in posts"
                :key="post.key"
                class="post__item"
            >
                <pr-link
                    :href="post.path"
                    class="post__cover-wrap"
                >
                    <pr-image
                        :alt="post.title"
                        :src="post.frontmatter.cover || DefaultSetting.cover"
                        class="post__cover"
                    ></pr-image>
                </pr-link>
                <div class="post__info">
                    <h4 class="post__title">
                        <pr-link
                            :color="Enums.LinkColor.Inherit"
                            :href="post.path"
                        >{{ post.title }}</pr-link>
                    </h4>
                    <p
                        class="post__time"
                    >{{ post.frontmatter.date | dateFormat('MMM DD YYYY') }}</p>
                </div>
            </li>
        </ul>
    </pr-footer-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Image from '@Core/components/Image/index.vue'
import Link from '@Core/components/Link/index.vue'
import Section from '../Section/index.vue'

@Component({
    name: 'PrFooterBlogPosts',
    components: {
        [Link.name]: Link,
        [Section.name]: Section,
        [Image.name]: Image
    }
})
export default class PrFooterBlogPosts extends Base {
    public get posts() {
        function getTime(date?: string): number {
            return new Date(date || '').getTime()
        }

        return this.$pagination._posts
            .sort(
                (first, next) =>
                    getTime(next.frontmatter.date) -
                    getTime(first.frontmatter.date)
            )
            .slice(0, 3)
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

