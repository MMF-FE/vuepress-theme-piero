<template>
    <aside class="pr-sider">
        <pr-sider-search class="pr-sider__section"></pr-sider-search>
        <pr-sider-recent-posts class="pr-sider__section"></pr-sider-recent-posts>
        <pr-sider-categories class="pr-sider__section"></pr-sider-categories>
        <pr-sider-archives class="pr-sider__section"></pr-sider-archives>
        <pr-sider-tags class="pr-sider__section"></pr-sider-tags>
    </aside>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import Archives from './Archives/index.vue'
import Categories from './Categories/index.vue'
import RecentPosts from './RecentPosts/index.vue'
import Search from './Search/index.vue'
import Tags from './Tags/index.vue'

@Component({
    name: 'PrSider',
    components: {
        [Archives.name]: Archives,
        [Categories.name]: Categories,
        [RecentPosts.name]: RecentPosts,
        [Search.name]: Search,
        [Tags.name]: Tags
    }
})
export default class PrSider extends Base {}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

