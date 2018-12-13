<template>
    <transition name="post-ani">
        <div
            v-show="startRender"
            :key="$page.title"
            class="main">
            <pr-post />
        </div>
    </transition>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Directory from '@Theme/components/Directory/index.vue'
import Footer from '@Theme/components/Footer/index.vue'
import Header from '@Theme/components/Header/index.vue'
import PostMain from '@Theme/components/Post/index.vue'
import Sider from '@Theme/components/Sider/index.vue'

@Component({
    name: 'Post',
    components: {
        [Header.name]: Header,
        [Sider.name]: Sider,
        [Footer.name]: Footer,
        [PostMain.name]: PostMain,
        [Directory.name]: Directory
    }
})
export default class Post extends Base {
    public startRender = false

    private async mounted() {
        await this.$nextTick()
        this.startRender = true
    }
}
</script>

<style lang="postcss">
@import 'var.pcss';

@media (--viewport-small-mini) {
    .Post {
        .sider {
            display: none;
        }
    }
}
</style>
