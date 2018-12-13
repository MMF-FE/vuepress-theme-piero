import '@Theme/style/vssue.styl'
import { VssueComponent } from 'vssue'

export default ({ Vue, router }) => {
    const golbalComponents = [
        {
            name: 'Vssue',
            comp: VssueComponent
        }
    ]

    golbalComponents.forEach((item) => {
        Vue.component(item.name, item.comp)
    })
}
