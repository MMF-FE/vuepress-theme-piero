<template>
    <span class="en-todo">
        <template v-if="checked">
            <template v-if="UnCheckComp">
                <EnToDoUnCheck></EnToDoUnCheck>
            </template>
            <input
                v-else
                class="check-input"
                disabled
                type="checkbox"
            >
        </template>
        <template v-else>
            <template v-if="CheckedComp">
                <EnToDoChecked></EnToDoChecked>
            </template>
            <input
                v-else
                checked
                class="check-input"
                disabled
                type="checkbox"
            >
        </template>
    </span>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'EnTodo',

    props: {
        checked: {
            default: '',
            type: String
        }
    },

    data() {
        return {}
    },

    computed: {
        UnCheckComp() {
            return Vue.component('EnToDoUnCheck')
        },

        CheckedComp() {
            return Vue.component('EnToDoChecked')
        }
    }
}
</script>

<style scoped>
.en-todo {
    position: relative;
    font-size: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: sub !important;
}

.check-input {
    margin: 0;
    padding: 0;
    display: block;
    height: 10px;
    width: 10px;
}
</style>

