<template>
    <router-link
        v-if="!Utils.isExternal(href) && !isAnchor"
        :class="[
            'pr-link',
            {
                'pr-link--light': color === LinkColor.Light,
                'pr-link--inherit': color === LinkColor.Inherit
            }
        ]"
        :to="href"
    >
        <slot></slot>
    </router-link>
    <a
        v-else
        :class="[
            'pr-link',
            {
                'pr-link--light': color === LinkColor.Light,
                'pr-link--inherit': color === LinkColor.Inherit
            }
        ]"
        :href="href"
        :rel="Utils.isMailto(href) || Utils.isTel(href) ? null : 'noopener noreferrer'"
        :target="Utils.isMailto(href) || Utils.isTel(href) || isAnchor ? null : '_blank'"
    >
        <slot></slot>
    </a>
</template>

<script lang="ts">
import Base from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { LinkColor } from '../../common/enums'
import * as Utils from '../../common/utils'

@Component({
    name: 'PrLink'
})
export default class PrLink extends Base {
    @Prop({ default: '/' })
    protected readonly href!: string

    @Prop()
    protected readonly color!: CoreEnums.LinkColor

    @Prop({ default: false })
    protected readonly isAnchor!: boolean

    protected readonly LinkColor = LinkColor
    protected readonly Utils = Utils
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
