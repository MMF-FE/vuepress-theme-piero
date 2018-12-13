<template>
    <div class="pr-footer__bottom">
        <p class="pr-footer__statement">© Piero 2018 powered by
            <pr-link
                :color="Enums.LinkColor.Light"
                href="https://github.com/vuejs/vuepress"
            >Vuepress</pr-link>, made by
            <pr-link
                :color="Enums.LinkColor.Light"
                href="https://github.com/vuejs/vuepress"
            >YZFE</pr-link>
        </p>
    </div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'

@Component({
    name: 'PrFooterBottom',
    components: {
        [Link.name]: Link
    }
})
export default class PrFooterBottom extends Base {}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

