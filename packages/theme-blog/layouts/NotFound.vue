<template>
    <main class="main">
        <h2 class="main__title">404 PAGE NOT FOUND</h2>
        <p class="main__hint">Whoops, sorry, this page does not exist.</p>
    </main>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

@Component({
    name: 'NotFound'
})
export default class NotFound extends Base {}
</script>

<style lang="postcss" scoped>
@import 'var.pcss';

.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px 0;
    text-align: center;

    &__title {
        margin: 0 0 25px;
        color: var(--themeColor--auxiliary-2);
        font-size: 36px;
    }

    &__hint {
        margin: 0;
    }
}
</style>
