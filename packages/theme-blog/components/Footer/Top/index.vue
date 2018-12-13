<template>
    <div class="pr-footer__top">
        <pr-footer-introduction></pr-footer-introduction>
        <pr-footer-contace></pr-footer-contace>
        <pr-footer-blog-posts></pr-footer-blog-posts>
        <pr-footer-firend-links></pr-footer-firend-links>
    </div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import BlogPosts from './BlogPosts/index.vue'
import Contace from './Contace/index.vue'
import FirendLinks from './FirendLinks/index.vue'
import Introduction from './Introduction/index.vue'

@Component({
    name: 'PrFooterTop',
    components: {
        [BlogPosts.name]: BlogPosts,
        [Contace.name]: Contace,
        [FirendLinks.name]: FirendLinks,
        [Introduction.name]: Introduction
    }
})
export default class PrFooterTop extends Base {}
</script>

<style lang="postcss">
@import './index.pcss';
</style>

