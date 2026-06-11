import { ModelField } from "@/core/model/model_field"

export class WidgetField<TSource, TTarget> {
    label?: Record<string, string>
    optionLabels?: Record<string, any>
    placeholder?: Record<string, string>
    tooltip?: Record<string, string>
    condition: ((x: TSource) => any)
    setter?: ((target: TTarget, value: any) => void)
    getter?: ((source: TSource) => any)
    model?: ModelField
    render?: ((source: TSource) => any)

    constructor(params: {
        label?: Record<string, string>,
        optionLabels?: Record<string, any>,
        placeholder?: Record<string, string>,
        tooltip?: Record<string, string>,
        condition?: ((x: TSource) => any),
        setter?: ((target: TTarget, value: any) => void),
        getter?: ((source: TSource) => any),
        model?: ModelField
        render?: ((source: TSource) => any)
    }) {
		this.label = params.label
        this.optionLabels = params.optionLabels
        this.placeholder = params.placeholder
        this.tooltip = params.tooltip
		this.condition = params.condition ?? (x => true)
        this.setter = params.setter
        this.getter = params.getter
        this.model = params.model
        this.render = params.render
	}
}