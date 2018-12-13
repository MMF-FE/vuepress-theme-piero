<template>
    <div class="pr-banner">
        <div class="pr-banner__bg">
            <transition name="slide-top">
                <div
                    v-show="startRender"
                    :style="{
                        backgroundImage: `url(${bannerImage})`
                    }"
                    class="bg__image"
                ></div>
            </transition>
            <div class="bg__modal"></div>
        </div>
        <div class="pr-banner__meta">
            <transition name="slide-fade-top-d300">
                <pr-image
                    v-show="startRenderMeta && $themeConfig.bannerMark"
                    :src="$themeConfig.bannerMark"
                    class="meta__mark"
                ></pr-image>
            </transition>
            <transition name="slide-fade-top">
                <p
                    v-show="startRenderMeta"
                    class="meta__sub-title"
                >{{ $themeConfig.subTitle }}</p>
            </transition>
            <transition name="slide-fade-bottom">
                <p
                    v-show="startRenderMeta"
                    class="meta__title"
                >{{ $site.title }}</p>
            </transition>
            <transition name="slide-fade-bottom-d300">
                <p
                    v-show="startRenderMeta"
                    class="meta__desc"
                >{{ $site.description }}</p>
            </transition>
        </div>
    </div>
</template>


<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Image from '@Core/components/Image/index.vue'
import Link from '@Core/components/Link/index.vue'
import DefaultSetting from '@Theme/common/default-setting'

@Component({
    name: 'PrBanner',
    components: {
        [Link.name]: Link,
        [Image.name]: Image
    },
    filters: {
        coverFilter(src: string) {
            return src || DefaultSetting.cover
        }
    }
})
export default class PrBanner extends Base {
    protected get bannerImage() {
        return this.$themeConfig.bannerBackground || this.DefaultSetting.banner
    }
    protected startRender = false
    protected startRenderMeta = false

    protected async startAnimation() {
        const SLEEP_TIME = 300
        const SLEEP_TIME_META = 300
        await this.Utils.sleep(SLEEP_TIME)
        this.startRender = true
        await this.Utils.sleep(SLEEP_TIME_META)
        this.startRenderMeta = true
    }

    private mounted() {
        this.startAnimation()
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
