<template>
    <div class="page about">now is about page</div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'About'
})
export default class About extends Base {
    private created() {
        console.log(this)
    }
}
</script>

<style lang="postcss" scoped>
.about {
    color: red;
}
</style>
