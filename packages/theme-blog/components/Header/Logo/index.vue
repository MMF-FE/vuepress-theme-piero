<template>
    <pr-link
        class="pr-header-logo"
        href="/"
    >
        <pr-image-mask
            :src="logo"
            :title="$siteTitle"
            alt="LOGO"
            v-bind="$attrs"
        ></pr-image-mask>
    </pr-link>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import ImageMask from '@Core/components/ImageMask/index.vue'
import Link from '@Core/components/Link/index.vue'

@Component({
    name: 'PrHeaderLogo',
    inheritAttrs: false,
    components: {
        [Link.name]: Link,
        [ImageMask.name]: ImageMask
    }
})
export default class PrHeaderLogo extends Base {
    protected get logo() {
        return this.$site.logo || this.$themeConfig.logo
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

