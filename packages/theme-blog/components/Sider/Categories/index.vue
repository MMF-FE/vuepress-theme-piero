<template>
    <pr-sider-section
        :list="list"
        class="pr-sider-tags"
        title="CATEGORIES"
    ></pr-sider-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Section, { IListItem } from '../Section/index.vue'

@Component({
    name: 'PrSiderCategories',
    components: {
        [Section.name]: Section
    }
})
export default class PrSiderCategories extends Base {
    protected get list(): IListItem[] {
        return this.$categories.list.map((category) => ({
            label: category.name,
            href: category.path
        }))
    }
}
</script>

