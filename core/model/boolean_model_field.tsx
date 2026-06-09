import { ModelField } from "./model_field";

export class BooleanModelField extends ModelField {
    serialize(value: any) : any {
        return Boolean(value)
    }
}