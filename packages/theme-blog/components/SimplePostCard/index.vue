<template>
    <article
        class="pr-simple-post-card"
        itemscope
        itemtype="http://schema.org/Article">
        <div class="pr-simple-post-card__cover">
            <pr-image
                :src="cover"
                alt="COVER"
                itemprop="image"></pr-image>

            <div class="pr-simple-post-card__overlay">
                <pr-link
                    class="overlay__content"
                    :href="info.path">
                    <svg-icon
                        name="simple-search"
                        width="20"
                        height="20"></svg-icon>
                </pr-link>
            </div>
        </div>

        <div class="pr-simple-post-card__info">
            <p class="pr-simple-post-card__title">
                <pr-link
                    class="ellipsis"
                    :href="info.path"
                    :title="info.title"
                    :color="Enums.LinkColor.Inherit">{{ info.title }}</pr-link>
            </p>
            <p class="pr-simple-post-card__date">{{ info.frontmatter.date | dateFormat('ddd MMM YYYY') }}</p>
        </div>
    </article>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'
import Image from '@Core/components/Image/index.vue'
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
    name: 'PrSimplePostCard',
    components: {
        [Link.name]: Link,
        [Image.name]: Image
    }
})
export default class PrSimplePostCard extends Base {
    @Prop({ default: defaultPost })
    protected readonly info!: Types.IPost

    protected get cover() {
        return this.info.frontmatter.cover || this.DefaultSetting.cover
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
