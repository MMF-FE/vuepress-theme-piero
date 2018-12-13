<template>
    <pr-vnode :vnode="$slots.default"></pr-vnode>
</template>

<script lang="ts">
import Base from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import PrVnode from '../../common/vnode'
import { sleep, offsetOfDocument } from '../../common/utils'
import { EventType } from '../../common/enums'

@Component({
    name: 'PrSticky',
    components: {
        [PrVnode.name]: PrVnode
    }
})
export default class PrSticky extends Base {
    @Prop({ type: Number, default: 0 })
    protected readonly top!: number

    protected scrollHandler!: Function
    protected resizeHandler!: Function

    private mounted() {
        this.initHandler()
    }

    private beforeDestroy() {
        this.removeHandler()
    }

    private async initHandler() {
        await sleep(0)
        const $el = this.$el as HTMLElement
        const top = offsetOfDocument($el).y
        const value = this.top

        this.scrollHandler = () => {
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop
            const clientHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight

            if (scrollTop >= top - value) {
                const rect = $el.getBoundingClientRect()
                const parentRect = $el.parentElement
                    ? $el.parentElement.getBoundingClientRect()
                    : null
                const parentBottom = parentRect
                    ? parentRect.bottom
                    : clientHeight

                const style = {
                    position: 'fixed',
                    height: rect.height + 'px',
                    width: rect.width + 'px',
                    top: value + 'px',
                    bottom: '',
                    left: rect.left + 'px'
                }

                if (value + rect.height > parentBottom) {
                    style.top = ''
                    style.bottom = clientHeight - parentBottom + 'px'
                }

                Object.assign($el.style, style)
            } else {
                $el.style.cssText = ''
            }
        }
        this.resizeHandler = async () => {
            $el.style.cssText = ''
            await sleep(0)
            this.scrollHandler()
        }

        this.$event.addEventListener(EventType.Scroll, this.scrollHandler)
        this.$event.addEventListener(EventType.Resize, this.resizeHandler)
    }

    private removeHandler() {
        this.$event.removeEventListener(EventType.Scroll, this.scrollHandler)
        this.$event.removeEventListener(EventType.Resize, this.resizeHandler)
    }
}

</script>
