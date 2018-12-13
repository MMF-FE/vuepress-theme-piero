import { CreateElement, RenderContext } from 'vue'

export default {
    name: 'PrVnode',
    functional: true,
    render: (h: CreateElement, ctx: RenderContext) => ctx.props.vnode
}
