import '@yzfe/vuepress-plugin-blog-archive'
import '@yzfe/vuepress-plugin-typescript'
import '@yzfe/vuepress-theme-piero-core'
import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue
        extends Vuepress.Vue<Types.ThemeConfig, Types.Frontmatter>,
        ArchiveVuepress.Vue<Types.Frontmatter> {}
}
