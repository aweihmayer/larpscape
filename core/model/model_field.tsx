export class ModelField {
    min?: any
    max?: any
    options?: any

    constructor(params: {
        min?: any
        max?: any
        options?: any
    } = {}) {
        this.min = params.min
        this.max = params.max
        this.options = params.options
    }

    serialize(value: any) : any {
        throw Error('Not implemented')
    }
}