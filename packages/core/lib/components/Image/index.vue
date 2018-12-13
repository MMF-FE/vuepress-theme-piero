<template>
    <img
        :src="currentSrc"
        class="pr-image"
    >
</template>

<script lang="ts">
import Base from 'vue'
import placeholderImg from '../../images/img-placeholder.jpg'
import { Component, Prop, Watch } from 'vue-property-decorator'

@Component({
    name: 'PrImage'
})
export default class PrImage extends Base {
    public currentSrc: string = placeholderImg
    protected imager: HTMLImageElement | null = null

    @Prop()
    protected readonly src!: string

    @Watch('src')
    private changeSrc(src: string) {
        if (src) {
            this.loadingImage(src)
        } else {
            this.currentSrc = placeholderImg
        }
    }

    private mounted() {
        this.changeSrc(this.src)
    }

    private loadingImage(src: string): HTMLImageElement {
        const img = new Image()
        const handler = () => {
            if (this.imager === img) {
                this.currentSrc = src
                this.imager = null
            }
        }

        img.onload = handler
        img.onerror = handler
        img.src = src
        this.imager = img

        return img
    }
}
</script>
