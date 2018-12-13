<template>
    <back-top class="pr-back-top">
        <svg-icon
            height="16"
            name="top"
            width="16"
        ></svg-icon>
    </back-top>
</template>

<script lang="ts">
import Base from 'Vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'PrBackTop'
})
export default class PrBackTop extends Base {}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
