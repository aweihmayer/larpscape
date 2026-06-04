import { ModelField } from "./model_field";

export class CharModelField extends ModelField {
    min: number
    max: number

    constructor(
        name: string,
        label: Record<string, string> | null = null,
        tooltip: Record<string, string> | null = null,
        min: number | null = null,
        max: number | null = 255
    ) {
        super(name, 'string', label, tooltip)
        this.min = min;
        this.max = max;
    }
}