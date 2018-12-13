<template>
    <vssue
        ref="vssue"
        :options="options"
        :title="this.$page.title"
        class="pr-comment"
    ></vssue>
</template>


<script lang="ts">
import Base from '@Theme/common/Base'
import GithubV3 from '@vssue/api-github-v3'
import { Component, Watch } from 'vue-property-decorator'

@Component({
    name: 'PrComment'
})
export default class PrComment extends Base {
    public get options() {
        return {
            prefix: '[blog] ',
            api: GithubV3,
            labels: [this.$site.title].concat(
                this.$tags.list.map((tag) => tag.name)
            ),
            issueContent: this.fetchBody,
            ...this.$themeConfig.comment
        }
    }

    protected commentCount = 0

    @Watch('commentCount')
    protected changeCommentCount() {
        this.$emit('updateCount', this.commentCount)
    }

    protected async created() {
        this.initVssue()
    }

    protected async initVssue() {
        await this.$nextTick()

        const unwatch = this.$watch(
            '$refs.vssue.vssue.status.isLoadingComments',
            (status: boolean) => {
                if (!status) {
                    unwatch()

                    // @ts-ignore
                    this.commentCount = this.$refs.vssue.vssue.comments.count
                    this.$watch(
                        '$refs.vssue.vssue.comments.count',
                        (count: number) => {
                            this.commentCount = count
                        }
                    )
                }
            }
        )
    }

    private async fetchBody() {
        const path = this.$page.regularPath.replace(/.html$/, '.md')

        return fetch(path)
            .then((response) => response.text())
            .then((text) => text.replace(/^-{3}[^.]+-{3}/, ''))
            .then((body) => {
                const href = document.location.href
                return `
> [文章地址: ${href}](${href})

${body}`
            })
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>
