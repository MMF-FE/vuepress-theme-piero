<template>
    <div class="page">now is page</div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'Page'
})
export default class Page extends Base {
    private created() {
        console.log(this)
    }
}
</script>

<style lang="postcss" scoped>
.Page {
    color: red;
}
</style>
