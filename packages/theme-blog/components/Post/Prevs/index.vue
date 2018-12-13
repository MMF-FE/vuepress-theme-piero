<template>
    <nav class="pr-prevs">
        <ul class="pr-prevs__list">
            <li class="pr-prevs__item pr-prevs__item--prev">
                <pr-link
                    v-if="prev"
                    :color="Enums.LinkColor.Inherit"
                    :href="prev.path"
                >
                    <p class="item__btn-text item__btn-text--prev">
                        <svg-icon
                            class="item__icon"
                            name="prev"
                        ></svg-icon>PREVIOUS
                    </p>
                    <p class="item__title">{{ prev.title }}</p>
                </pr-link>
            </li>
            <li class="pr-prevs__item pr-prevs__item--next">
                <pr-link
                    v-if="next"
                    :color="Enums.LinkColor.Inherit"
                    :href="next.path"
                >
                    <p class="item__btn-text item__btn-text--next">NEXT
                        <svg-icon
                            class="item__icon"
                            name="next"
                        ></svg-icon>
                    </p>
                    <p class="item__title">{{ next.title }}</p>
                </pr-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'

@Component({
    name: 'PrPostPrevs',
    components: {
        [Link.name]: Link
    }
})
export default class PrPostPrevs extends Base {
    protected get prev() {
        return this.getPostLink(true)
    }

    protected get next() {
        return this.getPostLink(false)
    }

    protected getPostLink(dir: boolean): Types.IPost | null {
        const posts = Array.from(this.$pagination.posts).sort(
            (first, next) =>
                new Date(next.frontmatter.date as string).getTime() -
                new Date(first.frontmatter.date as string).getTime()
        )
        const nowIndex = posts.findIndex((post) => post.key === this.$page.key)
        let index = nowIndex + (dir ? 1 : -1)

        if (index < 0 || index > posts.length - 1) {
            return null
        } else {
            return posts[index]
        }
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
