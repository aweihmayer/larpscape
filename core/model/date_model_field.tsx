import { ModelField } from "./model_field";

export class DateModelField extends ModelField {
    serialize(value: any) : any {
        return Date.parse(value)
    }
}