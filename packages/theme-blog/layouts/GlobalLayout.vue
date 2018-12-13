<template>
    <div
        id="global-layout"
        :class="{
            container: true,
            'container--no-sider': !layoutConfig.sider,
            [layout]: true
        }"
    >
        <pr-header
            :has-banner="layoutConfig.banner"
            class="header"></pr-header>

        <div
            v-if="layoutConfig.sider"
            class="sider">
            <component :is="layoutConfig.sider"></component>
        </div>

        <component
            :is="layout"
            class="main" />

        <pr-footer class="footer"></pr-footer>
    </div>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'
import Directory from '@Theme/components/Directory/index.vue'
import Footer from '@Theme/components/Footer/index.vue'
import Header from '@Theme/components/Header/index.vue'
import Sider from '@Theme/components/Sider/index.vue'
import LayoutConfig from '@Theme/common/layout-config'

@Component({
    name: 'GlobalLayout',
    components: {
        [Header.name]: Header,
        [Footer.name]: Footer,
        [Sider.name]: Sider,
        [Directory.name]: Directory
    }
})
export default class GlobalLayout extends Base {
    protected test!: TestSSS.Inter

    protected get layout() {
        if (this.$page.path) {
            const layout = this.$page.frontmatter.layout
            if (
                layout 
                && ( this.$vuepress.getLayoutAsyncComponent(layout) || this.$vuepress.getVueComponent(layout))
            ) {
                return layout
            }
            return 'Layout'
        }
        return 'NotFound'
    }

    protected get layoutConfig() {
        const config: Types.ILayoutConfig = LayoutConfig[this.layout] || {
            sider: true,
            banner: true
        }

        return {
            ...config,
            sider:
                config.sider && typeof config.sider === 'boolean'
                    ? 'PrSider'
                    : config.sider
        }
    }

    private mounted() {
        this.$event.init()
    }
}
</script>

<style lang="postcss" scoped>
@import 'var.pcss';

.container {
    display: grid;
    max-width: 1200px;
    min-height: 100vh;
    margin: auto;
    grid-gap: var(--layoutBlankSize);
    grid-template-areas:
        'header header'
        'main sider'
        'footer footer';
    grid-template-columns: auto 260px;
    grid-template-rows: auto 1fr auto;

    &--no-sider {
        grid-template-areas: 'header header' 'main main' 'footer footer';
    }
}

.header {
    grid-area: header;
}

.main {
    overflow: hidden;
    grid-area: main;
}

.sider {
    grid-area: sider;
}

.footer {
    grid-area: footer;
}

@media (--viewport-medium) {
    .container {
        width: 970px;
    }
}

@media (--viewport-small) {
    .container {
        width: calc(769px - 2 * var(--layoutBlankSize));
        
    }
}

@media (--viewport-mini) {
    .container {
        grid-template-areas:
            'header header'
            'main main'
            'sider sider'
            'footer footer';
        grid-template-rows: auto auto auto auto;

        &--no-sider {
            grid-template-areas:
                'header header'
                'main main'
                'footer footer';
            grid-template-rows: auto 1fr auto;
        }
    }
}
</style>
