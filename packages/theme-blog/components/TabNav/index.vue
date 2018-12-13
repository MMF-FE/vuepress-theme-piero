<template>
    <nav class="pr-tab-nav">
        <ul class="nav__list">
            <li
                v-for="item in list"
                :key="item.label"
                :class="{
                    'nav__item': true,
                    'nav__item--actived': item.value === current
                }"
                @click="changeSelect(item)"
            >
                <template v-if="!$scopedSlots.item">{{ item.label }}</template>
                <slot
                    :item="item"
                    name="item"
                ></slot>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Model, Prop } from 'vue-property-decorator'
import PrVnode from '@Core/common/vnode'

interface INavTabItem {
    label: string
    value: string | number
}

export { INavTabItem }

@Component({
    name: 'PrTabNav',
    components: {
        [PrVnode.name]: PrVnode
    }
})
export default class PrTabNav extends Base {
    @Model('change', {
        type: [String, Number],
        default: null
    })
    protected readonly current!: string | number

    @Prop({ default: () => [] })
    protected readonly list!: INavTabItem[]

    private changeSelect(target: INavTabItem) {
        this.$emit('change', target.value)
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
