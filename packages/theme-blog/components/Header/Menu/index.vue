<template>
    <nav class="pr-header-menu">
        <ul class="menu__wrap">
            <li
                v-for="item in list"
                :key="item.label"
                class="menu__item"
            >
                <pr-link :href="item.link">{{ item.label }}</pr-link>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'

@Component({
    name: 'PrHeaderMenu',
    components: {
        [Link.name]: Link
    }
})
export default class PrHeaderMenu extends Base {
    @Prop({ default: () => [] })
    protected readonly list!: Types.IMenuItem[]
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

