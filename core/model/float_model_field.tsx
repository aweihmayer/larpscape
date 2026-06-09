import { ModelField } from "./model_field";

export class FloatModelField extends ModelField {
    serialize(value: any) : any {
        return parseFloat(value)
    }
}