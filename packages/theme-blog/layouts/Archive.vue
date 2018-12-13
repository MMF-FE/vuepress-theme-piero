<template>
    <transition name="post-ani">
        <main
            v-show="startRender"
            class="archive">
            <div
                v-for="archive in archiveList"
                :key="archive.name"
                class="archive__item">
                <h4 class="archive__title">
                    <pr-link
                        :href="archive.path"
                        :title="archive.name"
                        :color="Enums.LinkColor.Inherit">{{ archive.name | dateFormat('MMM YYYY') }}</pr-link>
                </h4>
                <div class="archive__posts">
                    <pr-simple-post-card
                        v-for="post in archive.posts"
                        :key="post.key"
                        :info="post"
                        class="archive__post"></pr-simple-post-card>
                </div>
            </div>
        </main>
    </transition>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'
import SimplePostCard from '@Theme/components/SimplePostCard/index.vue'

@Component({
    name: 'Archive',
    components: {
        [Link.name]: Link,
        [SimplePostCard.name]: SimplePostCard
    }
})
export default class Archive extends Base {
    public startRender = false

    public get archiveList() {
        if (this.$archive) {
            const archiveDate = this.$route.meta.archiveDate

            return [
                {
                    name: archiveDate,
                    path: this.$archive.path,
                    posts: this.$archive.posts
                }
            ]
        } else {
            return this.$archives.list
        }
    }

    private async mounted() {
        await this.$nextTick()
        this.startRender = true
    }
}
</script>

<style lang="postcss" scoped>
@import 'var.pcss';

.archive {
    &__item {
        display: block;
        
        & + & {
            margin-top: 40px;
        }
    }

    &__title {
        margin-bottom: 30px;

        .pr-link {
            font-size: var(--titleFontSize);
            font-weight: var(--titleFontWidth--medium);
            line-height: 1.2;
            text-decoration: none;
        }
    }

    &__posts {
        display: grid;
        grid-gap: calc(var(--layoutBlankSize) - 10px);
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(auto-fit, auto);
    }
}


@media (--viewport-phone) {
    .archive__posts {
        grid-template-columns: 1fr;
    }
}

@media (--viewport-mini-phone) {
    .archive__posts {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (--viewport-small) {
    .archive__posts {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (--viewport-medium) {
    .archive__posts {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
