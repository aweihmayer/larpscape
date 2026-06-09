import { ModelField } from "./model_field";

export class IntegerModelField extends ModelField {
    serialize(value: any) : any {
        return parseInt(value)
    }
}