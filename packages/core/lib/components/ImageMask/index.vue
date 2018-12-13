<template>
    <div class="pr-image-mask">
        <img
            :src="src"
            class="pr-image-mask__img"
            v-bind="$attrs"
        >
        <div
            :style="{
                backgroundColor: color,
                maskImage: `url('${src}')`,
                webkitMaskImage: `url('${src}')`
            }"
            class="pr-image-mask__view"
        ></div>
    </div>
</template>

<script lang="ts">
import Base from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'PrImageMask',
    inheritAttrs: false
})
export default class PrImageMask extends Base {
    @Prop({
        type: String,
        default: ''
    })
    public readonly src!: string

    @Prop({
        type: String,
        default: '#fff'
    })
    public readonly color!: string
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
