<template>
    <pr-sider-section
        :list="list"
        class="pr-sider-tags"
        title="ARCHIVES"
    ></pr-sider-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Section, { IListItem } from '../Section/index.vue'
import format from 'date-fns/format'

@Component({
    name: 'PrSiderArchives',
    components: {
        [Section.name]: Section
    }
})
export default class PrSiderArchives extends Base {
    protected get list(): IListItem[] {
        return this.$archives.list.map((archive) => ({
            label: format(archive.name, 'MMM YYYY'),
            href: archive.path
        }))
    }
}
</script>
