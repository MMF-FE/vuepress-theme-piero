<template>
    <div class="pr-icon-list">
        <div
            v-for="(icon, index) in iconList"
            :key="index"
            class="list__col"
        >
            <svg-icon
                :name="icon"
                class="col__icon"
            ></svg-icon>
            <p class="col__text">{{ icon }}</p>
        </div>
    </div>
</template>


<script lang="ts">
import Base from 'vue'
import { Component } from 'vue-property-decorator'
import SvgIcon from 'vue-svgicon'

@Component({
    name: 'PrIconList'
})
export default class PrIconList extends Base {
    public get iconList() {
        return Object.keys(SvgIcon.icons)
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
