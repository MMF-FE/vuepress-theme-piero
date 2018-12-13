<template>
    <pr-footer-section class="pr-footer__introduction">
        <pr-image-mask
            slot="title"
            :alt="info.title"
            :src="info.logo"
            class="footer-introduction__logo"
            color="#fff"
        ></pr-image-mask>
        <p slot="info">{{ info.introduction }}</p>
    </pr-footer-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import ImageMask from '@Core/components/ImageMask/index.vue'
import Section from '../Section/index.vue'

@Component({
    name: 'PrFooterIntroduction',
    components: {
        [Section.name]: Section,
        [ImageMask.name]: ImageMask
    }
})
export default class PrFooterIntroduction extends Base {
    public get info() {
        return {
            logo: this.$themeConfig.logo || this.$site.logo,
            introduction: this.$themeConfig.introduction || this.$description,
            title: this.$site.title
        }
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

