<template>
    <div class="pr-header-wrap">
        <header
            :class="{
                'pr-header': true,
                'pr-header--before-enter': isBeforeStickyHeader,
                'pr-header--sticky': isStickyHeader,
                'pr-header--has-banner': hasBanner
            }"
        >
            <pr-header-logo
                :color="logoColor"
                class="pr-header__logo"
            ></pr-header-logo>

            <div class="pr-header__main">
                <pr-header-menu
                    :list="menu"
                    class="pr-header__menu"
                ></pr-header-menu>
            </div>

            <pr-header-search class="pr-header__search"></pr-header-search>

            <pr-header-popup-menu
                :list="menu"
                class="pr-header__popup-menu"
            ></pr-header-popup-menu>
        </header>
        <pr-banner v-if="hasBanner"></pr-banner>
    </div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'

import Banner from './Banner/index.vue'
import Logo from './Logo/index.vue'
import Menu from './Menu/index.vue'
import PopupMenu from './PopupMenu/index.vue'
import Search from './Search/index.vue'
import { EventType } from '@Core/common/enums'

@Component({
    name: 'PrHeader',
    components: {
        [Logo.name]: Logo,
        [Menu.name]: Menu,
        [PopupMenu.name]: PopupMenu,
        [Search.name]: Search,
        [Banner.name]: Banner
    }
})
export default class PrHeader extends Base {
    @Prop({
        type: Boolean,
        default: false
    })
    protected hasBanner!: boolean

    protected isStickyHeader = false
    protected isBeforeStickyHeader = false
    protected resizeHandler!: Function
    protected scrollHandler!: Function

    protected get logoColor() {
        return this.hasBanner && !this.isStickyHeader ? '#fff' : '#000'
    }

    protected get menu() {
        return this.$themeConfig.menu || []
    }

    private mounted() {
        this.setStickyHeader()
    }

    private beforeDestroy() {
        this.$event.removeEventListener(EventType.Scroll, this.scrollHandler)
        this.$event.removeEventListener(EventType.Resize, this.resizeHandler)
    }

    // 设置导航栏悬浮
    private setStickyHeader() {
        const headerEl = this.$el.querySelector('.pr-header')

        if (headerEl) {
            const el = headerEl as HTMLElement
            const targetEle = window

            let inserNode: HTMLElement | null
            let cloneEle: HTMLElement | null
            let baseRect: ClientRect
            let elOffsetTop = 0

            this.scrollHandler = async (resize: boolean = false) => {
                if (!cloneEle) {
                    cloneEle = el.cloneNode(true) as HTMLElement
                    baseRect = el.getBoundingClientRect()
                    elOffsetTop = el.offsetTop
                }

                if (resize && inserNode) {
                    baseRect = inserNode.getBoundingClientRect()

                    Object.assign(el.style, {
                        position: 'fixed',
                        top: 0 + 'px',
                        left: baseRect.left + 'px',
                        width: baseRect.width + 'px'
                    })
                }

                const scrollTop = targetEle.scrollY

                if (scrollTop >= elOffsetTop + baseRect.height && !inserNode) {
                    inserNode = el.parentElement
                        ? el.parentElement.insertBefore(cloneEle, el)
                        : null

                    Object.assign(el.style, {
                        position: 'fixed',
                        top: 0 + 'px',
                        left: baseRect.left + 'px',
                        width: baseRect.width + 'px'
                    })
                    this.isBeforeStickyHeader = true
                    await this.Utils.sleep()
                    if (inserNode) this.isStickyHeader = true
                } else if (
                    scrollTop < elOffsetTop + baseRect.height &&
                    inserNode
                ) {
                    if (el.parentElement) {
                        el.parentElement.removeChild(inserNode)
                    }
                    el.style.cssText = ''
                    inserNode = null
                    this.isStickyHeader = false
                    this.isBeforeStickyHeader = false
                }
            }
            this.resizeHandler = () => this.scrollHandler(true)

            this.$event.addEventListener(EventType.Scroll, this.scrollHandler)
            this.$event.addEventListener(EventType.Resize, this.resizeHandler)
        }
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

