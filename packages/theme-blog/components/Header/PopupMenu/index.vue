<template>
    <nav class="pr-header-popup-menu">
        <svg-icon
            :class="[
                'popup-menu__icon',
                {
                    'popup-menu__icon--actived': isShowMenuList
                }
            ]"
            name="menu"
            @click="isShowMenuList = !isShowMenuList"
        ></svg-icon>
        <transition
            @after-enter="afterEnterAndbeforeLeave"
            @after-leave="beforeEnterAndAfterLeave"
            @before-enter="beforeEnterAndAfterLeave"
            @before-leave="afterEnterAndbeforeLeave"
            @enter="enter"
            @leave="leave"
        >
            <ul
                v-show="isShowMenuList"
                class="popup-menu__list"
            >
                <li
                    v-for="item in list"
                    :key="item.label"
                    class="popup-menu__item"
                >
                    <pr-link :href="item.link">
                        {{ item.label }}
                        <svg-icon
                            class="popup-menu__arraw-icon"
                            name="next"
                        ></svg-icon>
                    </pr-link>
                </li>
            </ul>
        </transition>
    </nav>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'

@Component({
    name: 'PrHeaderPopupMenu',
    components: {
        [Link.name]: Link
    }
})
export default class PrHeaderPopupMenu extends Base {
    @Prop({ default: () => [] })
    protected readonly list!: Types.IMenuItem[]

    protected isShowMenuList = true
    protected menuListHeight = 0

    private mounted() {
        this.initMenuListHeight()
    }

    private initMenuListHeight() {
        const el = this.$el.querySelector('.popup-menu__list')

        if (el) {
            const rect = el.getBoundingClientRect()
            this.menuListHeight = rect.height - 1
            this.isShowMenuList = false
        }
    }

    private beforeEnterAndAfterLeave(el: HTMLElement) {
        el.classList.add('popup-menu__list--hidden')
        el.style.height = `${this.menuListHeight}px`
    }

    private async enter(el: HTMLElement) {
        await this.Utils.sleep()
        el.classList.remove('popup-menu__list--hidden')
    }

    private afterEnterAndbeforeLeave(el: HTMLElement) {
        el.style.height = `${this.menuListHeight}px`
        el.classList.remove('popup-menu__list--hidden')
    }

    private leave(el: HTMLElement) {
        el.classList.add('popup-menu__list--hidden')
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

