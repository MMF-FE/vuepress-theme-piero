<template>
    <transition name="post-ani">
        <main v-show="startRender">
            <div class="posts">
                <pr-post-card
                    v-for="post in posts"
                    :key="post.key"
                    :post="post"
                />
            </div>
            <pr-pagination />
        </main>
    </transition>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Pagination from '@Theme/components/Pagination/index.vue'
import PostCard from '@Theme/components/PostCard/index.vue'

@Component({
    name: 'Layout',
    components: {
        [Pagination.name]: Pagination,
        [PostCard.name]: PostCard
    }
})
export default class Layout extends Base {
    public startRender = false

    public get posts() {
        return this.startRender ? this.$pagination.posts : []
    }

    private async mounted() {
        await this.$nextTick()
        this.startRender = true
    }
}
</script>

<style lang="postcss" scoped>
@import 'var.pcss';

.posts {
    display: grid;
    grid-gap: var(--layoutBlankSize);
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(auto-fit, auto);
}

@media (--viewport-small-mini) {
    .posts {
        grid-template-columns: 1fr;
    }
}

@media (--viewport-medium) {
    .posts {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
