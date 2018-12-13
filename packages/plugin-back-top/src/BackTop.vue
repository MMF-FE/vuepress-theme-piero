<template>
    <transition name="fade">
        <div
            v-if="show"
            class="back-top"
            @click="scrollToTop"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
function throttleFunc(func, gapTime) {
    let lastTime

    return function fun(...args) {
        let nowTime = Date.now()

        if (nowTime - lastTime > gapTime || !lastTime) {
            func.apply(this, args)
            lastTime = nowTime
        }
    }
}

export default {
    name: 'BackTop',

    props: {
        threshold: {
            type: Number,
            default: 300
        }
    },

    data() {
        return {
            scrollTop: 0
        }
    },

    computed: {
        show() {
            return this.scrollTop > this.threshold
        }
    },

    mounted() {
        this.scrollTop = this.getScrollTop()
        window.addEventListener(
            'scroll',
            throttleFunc(() => {
                this.scrollTop = this.getScrollTop()
            }, 100)
        )
    },

    methods: {
        getScrollTop() {
            return (
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0
            )
        },

        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>

<style scoped>
.back-top {
    cursor: pointer;
    position: fixed;
    bottom: 25px;
    right: 25px;
    z-index: 1;
    transform: translateY(0%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateY(100%);
}
</style>
