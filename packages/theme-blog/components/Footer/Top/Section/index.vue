<template>
    <section class="pr-footer-section">
        <h3 class="pr-footer-section__title">
            <slot name="title">{{ title }}</slot>
        </h3>
        <div class="pr-footer-section__info">
            <slot name="info"></slot>
        </div>
    </section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Prop } from 'vue-property-decorator'

@Component({
    name: 'PrFooterSection'
})
export default class PrFooterSection extends Base {
    @Prop({ default: 'footer section' })
    public readonly title!: string
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

