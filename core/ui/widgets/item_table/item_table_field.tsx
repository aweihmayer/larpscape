import { WidgetField } from "../widget_field"

export class ItemTableField<TSource> {
    widget: WidgetField<TSource, any>
    render?: ((x: TSource) => any)
    size: number

    constructor(params: {
        widget: WidgetField<TSource, any>,
        render?: ((x: TSource) => any),
        size: number
    }) {
        this.widget = params.widget
        this.render = params.render
        this.size = params.size
    }
}