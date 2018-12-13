<template>
    <pr-sider-section
        class="pr-sider-tags"
        title="FIND BY TAGS"
    >
        <ul class="pr-sider-tags__list">
            <li
                v-for="tag in tags"
                :key="tag.label"
                class="pr-sider-tags__item"
            >
                <pr-link
                    :href="tag.href"
                    :title="tag.label"
                >{{ tag.label }}</pr-link>
            </li>
        </ul>
    </pr-sider-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'
import Section, { IListItem } from '../Section/index.vue'

@Component({
    name: 'PrSiderTags',
    components: {
        [Section.name]: Section,
        [Link.name]: Link
    }
})
export default class PrSiderTags extends Base {
    protected get tags(): IListItem[] {
        return this.$tags.list
            .sort((first, next) => next.posts.length - first.posts.length)
            .map((tag) => ({
                label: tag.name,
                href: tag.path
            }))
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

