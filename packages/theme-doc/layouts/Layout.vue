<template>
    <div class="div">now is layout</div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'Layout'
})
export default class Layout extends Base {

}
</script>

<style lang="postcss" scoped>
@import "var.pcss";

.div {
    color: red;
}
</style>

