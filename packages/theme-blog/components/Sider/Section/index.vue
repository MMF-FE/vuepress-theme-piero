<template>
    <section class="pr-sider-section">
        <h3 class="pr-sider-section__title">{{ title }}</h3>
        <slot>
            <ul class="pr-sider-section__list">
                <li
                    v-for="item in list"
                    :key="item.label"
                    class="pr-sider-section__list-item"
                >
                    <pr-link
                        :color="Enums.LinkColor.Deep"
                        :href="item.href"
                    >{{ item.label }}</pr-link>
                </li>
            </ul>
        </slot>
    </section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'

interface IListItem {
    label: string
    href: string
}

export { IListItem }

@Component({
    name: 'PrSiderSection',
    components: {
        [Link.name]: Link
    }
})
export default class PrSiderSection extends Base {
    @Prop({ default: 'section title' })
    protected readonly title!: string

    @Prop({ type: Array })
    protected readonly list!: IListItem[]
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

