<template>
    <main class="main">
        <pr-tab-nav
            v-model="currentClassification.current"
            :list="list"
            class="main__nav"
            @change="changeSelect"
        >
            <template
                slot="item"
                slot-scope="scope">
                <pr-link
                    :color="Enums.LinkColor.Inherit"
                    :href="scope.item.value"
                >{{ scope.item.label }}</pr-link
                >
            </template>
        </pr-tab-nav>

        <transition name="post-ani">
            <list-transition-group
                v-show="startRender"
                class="main__posts"
                tag="div"
            >
                <pr-post-card
                    v-for="post in currentClassification.posts"
                    :key="post.key"
                    :post="post"
                    class="list-item"
                ></pr-post-card>
            </list-transition-group>
        </transition>
    </main>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'
import ListTransitionGroup from '@Core/components/ListTransitionGroup/index.vue'
import PostCard from '@Theme/components/PostCard/index.vue'
import TabNav, { INavTabItem } from '@Theme/components/TabNav/index.vue'

const CATEGORY_INDEX_PATH = '/category/'
const TAG_INDEX_PATH = '/tag/'

function uniquePosts(posts: Types.IPost[]) {
    const hashMap: {
        [k: string]: boolean
    } = {}
    const result: Types.IPost[] = []

    posts.forEach((post) => {
        if (!hashMap[post.key]) {
            hashMap[post.key] = true
            result.push(post)
        }
    })

    return result
}

function getPosts(
    list: Array<
    | Vuepress.ClassifiableListItem<Types.Frontmatter>
    | Vuepress.ClassifiableItem<Types.Frontmatter>
    >
) {
    return uniquePosts(
        list.reduce((res, item) => res.concat(item.posts), [] as Vuepress.Post<
        Types.Frontmatter
        >[])
    ).sort(
        (first, next) =>
            new Date(next.frontmatter.date || 0).getTime() -
            new Date(first.frontmatter.date || 0).getTime()
    )
}

@Component({
    name: 'CategoryTag',
    components: {
        [TabNav.name]: TabNav,
        [Link.name]: Link,
        [PostCard.name]: PostCard,
        [ListTransitionGroup.name]: ListTransitionGroup
    }
})
export default class CategoryTag extends Base {
    public startRender = false

    public get currentClassification() {
        if (this.$category || this.$route.path === CATEGORY_INDEX_PATH) {
            return {
                current: this.$category
                    ? this.$category.path
                    : CATEGORY_INDEX_PATH,
                posts: getPosts(
                    this.$category ? [this.$category] : this.$archives.list
                ),
                list: this.$categories.list,
                indexPath: CATEGORY_INDEX_PATH
            }
        }

        if (this.$tag || this.$route.path === TAG_INDEX_PATH) {
            return {
                current: this.$tag ? this.$tag.path : TAG_INDEX_PATH,
                posts: getPosts(this.$tag ? [this.$tag] : this.$tags.list),
                list: this.$tags.list,
                indexPath: TAG_INDEX_PATH
            }
        }

        return {
            current: '',
            posts: [],
            list: [],
            indexPath: ''
        }
    }

    public get list(): INavTabItem[] {
        return [
            {
                label: 'All',
                value: this.currentClassification.indexPath
            }
        ].concat(
            this.currentClassification.list.map((item) => ({
                label: item.name,
                value: item.path
            }))
        )
    }

    private changeSelect(path: string) {
        this.$router.push({
            path
        })
    }

    private async mounted() {
        await this.$nextTick()
        this.startRender = true
    }
}
</script>

<style lang="postcss" scoped>
@import 'var.pcss';

.main {
    margin-bottom: 70px;

    &__posts {
        display: grid;
        grid-gap: var(--layoutBlankSize);
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(auto-fit, auto);
    }
}

@media (--viewport-medium) {
    .main__posts {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (--viewport-small) {
    .main__posts {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (--viewport-mini) {
    .main__posts {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (--viewport-phone) {
    .main__posts {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
