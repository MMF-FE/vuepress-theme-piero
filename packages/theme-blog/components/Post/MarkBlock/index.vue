<template>
    <div class="pr-post-mark-block">
        <svg-icon
            :name="icon"
            class="mark__icon"
        ></svg-icon>
        <ul class="mark__list">
            <template v-for="(item, index) in list">
                <span
                    v-if="index !== 0"
                    :key="index + '_s'"
                    class="mark__separator"
                >,</span>
                <li
                    :key="index"
                    class="mark__item"
                >
                    <slot :item="item"></slot>
                </li>
            </template>
        </ul>
    </div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'PrPostMarkBlock'
})
export default class PrPostMarkBlock extends Base {
    @Prop({ default: 'write' })
    protected readonly icon!: string

    @Prop({ default: () => [] })
    protected readonly list!: any[]
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
