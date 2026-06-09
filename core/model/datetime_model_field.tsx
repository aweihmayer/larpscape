import { ModelField } from "./model_field";

export class DateTimeModelField extends ModelField {
    serialize(value: any) : any {
        return Date.parse(value)
    }
}