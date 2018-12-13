import './golbal.css'
import 'highlight.js/styles/tomorrow.css'
import EnTodo from './EnTodo.vue'

export default ({ Vue, router }) => {
    Vue.component(EnTodo.name, EnTodo)
}
