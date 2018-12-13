import Vue from 'vue'
import 'vue-router'
import EventHandler from '../lib/common/Event'

declare module 'vue/types/vue' {
    interface Vue {
        $flexsearch: any
        $event: EventHandler
    }
}