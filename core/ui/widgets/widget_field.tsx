export class WidgetField<TSource, TTarget> {
    label: Record<string, string>
    optionLabels?: Record<string, any>
    tooltip?: Record<string, string>
    condition: ((x: TSource) => any)
    setter?: ((target: TTarget, value: any) => void)
    getter?: ((source: TSource) => any)
    render?: ((source: TSource) => any)

    constructor(params: {
        label: Record<string, string>,
        optionLabels?: Record<string, any>,
        tooltip?: Record<string, string>,
        condition: ((x: TSource) => any),
        setter?: ((target: TTarget, value: any) => void),
        getter?: ((source: TSource) => any),
        render?: ((source: TSource) => any)
    }) {
		this.label = params.label
        this.optionLabels = params.optionLabels
        this.tooltip = params.tooltip
		this.condition = params.condition
        this.setter = params.setter
        this.getter = params.getter
        this.render = params.render
	}
}