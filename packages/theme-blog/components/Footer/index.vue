<template>
    <footer class="pr-footer">
        <pr-footer-top></pr-footer-top>
        <pr-footer-bottom></pr-footer-bottom>
    </footer>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import Bottom from './Bottom/index.vue'
import Top from './Top/index.vue'

@Component({
    name: 'PrFooter',
    components: {
        [Top.name]: Top,
        [Bottom.name]: Bottom
    }
})
export default class PrFooter extends Base {}
</script>

