<template>
    <div class="pr-post-announce">感谢您的阅读，本文由
        <pr-link :href="editor.link">{{ editor.name }}</pr-link>
        版权所有。如若转载，请注明出处：{{ editor.name }}（
        <pr-link :href="editor.link">{{ editor.link }}</pr-link>）
    </div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Link from '@Core/components/Link/index.vue'

@Component({
    name: 'PrPostAnnounce',
    components: {
        [Link.name]: Link
    }
})
export default class PrPostAnnounce extends Base {
    protected get editor(): Types.IEditor {
        const frontmatter = this.$page.frontmatter

        return (
            frontmatter.editor || {
                name: this.$site.title,
                link: '/'
            }
        )
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
