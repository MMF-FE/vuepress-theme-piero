<template>
    <main class="search">
        <div
            v-if="loading"
            class="loading-wrap">
            <svg-icon
                class="loading"
                name="loading"></svg-icon>
        </div>
        <template v-else>
            <p
                v-if="posts.length > 0"
                class="search__hint"
                v-html="hintHtml"
            ></p>
            <p
                v-else
                class="search__empty"
                v-text="emptyText"></p>

            <list-transition-group
                class="search__posts"
                tag="div">
                <pr-post-card
                    v-for="post in posts"
                    :key="post.key"
                    :post="post"
                ></pr-post-card>
            </list-transition-group>
        </template>
    </main>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component, Watch } from 'vue-property-decorator'
import ListTransitionGroup from '@Core/components/ListTransitionGroup/index.vue'
import PostCard from '@Theme/components/PostCard/index.vue'
import { compileTemplate } from '@Core/common/utils'

@Component({
    name: 'Search',
    components: {
        [ListTransitionGroup.name]: ListTransitionGroup,
        [PostCard.name]: PostCard
    }
})
export default class Search extends Base {
    public loading = false
    public posts: Types.IPost[] = []

    public get queryString() {
        return decodeURIComponent(this.$route.query.query as string) || ''
    }

    public get hintHtml() {
        const temp = `找到匹配<em>{{ queryString }}</em>的结果<em>{{ num }}</em>条`
        return compileTemplate(temp, {
            queryString: this.queryString,
            num: this.posts.length.toString()
        })
    }

    public get emptyText() {
        return '抱歉，您要的内容似乎没有哦，不如换个关键字试试吧。'
    }

    @Watch('queryString')
    protected async changeQueryString() {
        this.loading = true
        await this.$flexsearch.initSearch()
        this.loading = false
        await this.$nextTick()
        this.posts = this.$flexsearch.search(this.queryString)
    }

    private mounted() {
        this.changeQueryString()
    }

    private beforeDestroy() {
        this.$flexsearch.destroy()
    }
}
</script>

<style lang="postcss" scoped>
@import 'var.pcss';

.search {
    margin-bottom: 70px;

    &__hint {
        color: var(--titleFontColor);
        font-size: var(--titleFontSize--small);

        /deep/ {
            em {
                margin: 0 5px;
                color: var(--themeColor);
            }
        }
    }

    &__empty {
        font-size: 14px;
    }

    &__posts {
        display: grid;
        grid-gap: var(--layoutBlankSize);
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(auto-fit, auto);
    }
}

.loading-wrap {
    display: flex;
    min-height: 200px;
    align-items: center;
    justify-content: center;
}

@media (--viewport-small-mini) {
    .search__posts {
        grid-template-columns: 1fr;
    }
}

@media (--viewport-medium) {
    .search__posts {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
