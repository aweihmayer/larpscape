import { ModelField } from "./model_field";

export class TextModelField extends ModelField {
    serialize(value: any) : any {
        return String(value)
    }
}