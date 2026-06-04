export class ModelField {
    name: string
    type: string
    label?: Record<string, string> 
    tooltip?: Record<string, string>

    constructor(
        name: string,
        type: string,
        label?: Record<string, string>,
        tooltip: Record<string, string> | null = null
    ) {
        this.name = name;
        this.type = type;
        this.label = label;
        this.tooltip = tooltip;
    }
}