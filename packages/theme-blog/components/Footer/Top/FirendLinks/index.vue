<template>
    <pr-footer-section
        class="pr-footer__firend-links"
        title="firend links"
    >
        <ul
            slot="info"
            class="firend-link__list"
        >
            <li
                v-for="item in firendLinks"
                :key="item.link"
                class="firend-link__item"
            >
                <pr-link
                    :color="Enums.LinkColor.Light"
                    :href="item.link"
                    :title="item.title || item.label"
                >{{ item.label }}</pr-link>
            </li>
        </ul>
    </pr-footer-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import Link from '@Core/components/Link/index.vue'
import Section from '../Section/index.vue'

interface IFirendLink {
    label: string
    link: string
    title: string
}

@Component({
    name: 'PrFooterFirendLinks',
    components: {
        [Section.name]: Section,
        [Link.name]: Link
    }
})
export default class PrFooterFirendLinks extends Base {
    public get firendLinks() {
        return this.$themeConfig.firendLinks
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

