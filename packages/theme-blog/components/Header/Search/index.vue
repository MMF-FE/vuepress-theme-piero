<template>
    <form
        action="/search/"
        class="pr-header-search"
        method="get"
        role="search"
        @submit="handleSubmit"
    >
        <label class="search__wrap">
            <input
                class="search__input"
                name="query"
                placeholder="Search..."
                type="text"
            >
            <svg-icon
                class="search__icon"
                name="search"
            ></svg-icon>
        </label>
    </form>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import { serialize } from '@Core/common/utils'

@Component({
    name: 'PrHeaderSearch'
})
export default class PrHeaderSearch extends Base {
    protected handleSubmit(event: Event) {
        if (this.$route.path === '/search/') {
            event.preventDefault()
            const target = event.target as HTMLFormElement
            const data = serialize(target.elements)

            this.$router.push({
                path: '/search/',
                query: {
                    query: data.query
                }
            })
        }
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

