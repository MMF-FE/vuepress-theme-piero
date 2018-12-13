import '../common/icons'
import '../style/index.pcss'
import dateFormat from 'date-fns/format'
import EventHandler from '../common/Event'
import SvgIcon from 'vue-svgicon'
import BackTop from '../components/BackTop/index.vue'
import IconList from '../components/IconList/index.vue'

function getIconComp(name) {
    return {
        name: name,
        functional: true,
        render(h) {
            return h('svg-icon', {
                attrs: {
                    name
                }
            })
        }
    }
}

export default ({ Vue, router }) => {
    Vue.prototype.$event = new EventHandler()

    Vue.use(SvgIcon, {
        tagName: 'SvgIcon'
    })

    Vue.filter('dateFormat', (date, format = 'YYYY-MM-DDTHH:mm:ss.SSSZ') =>
        dateFormat(new Date(date), format)
    )

    const golbalComponents = [
        {
            name: IconList.name,
            comp: IconList
        },
        {
            name: BackTop.name,
            comp: BackTop
        },
        {
            name: 'EnToDoUnCheck',
            comp: getIconComp('uncheck')
        },
        {
            name: 'EnToDoChecked',
            comp: getIconComp('checked')
        }
    ]

    golbalComponents.forEach((item) => {
        Vue.component(item.name, item.comp)
    })

    router.options.scrollBehavior = (to, from, saved) => {
        return { x: 0, y: 0 }
    }
}
