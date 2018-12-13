<template>
    <transition-group
        class="list-transition-group"
        name="list"
        v-bind="$attrs"
        @leave="leaveHandler"
    >
        <slot></slot>
    </transition-group>
</template>

<script lang="ts">
import Base from 'vue'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'ListTransitionGroup'
})
export default class ListTransitionGroup extends Base {
    public leaveHandler(el: HTMLElement, done: () => void) {
        const rect = el.getBoundingClientRect()
        const handle = () => {
            done()
            el.removeEventListener('transitionend', handle)
        }

        el.classList.add('list-leave-active')
        Object.assign(el.style, {
            position: 'absolute',
            width: rect.width + 'px',
            height: rect.height + 'px',
            left: '0px',
            top: '0px'
        })

        el.addEventListener('transitionend', handle)
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
