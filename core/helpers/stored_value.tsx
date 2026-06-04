export class StoredValue {
    duration?: number = null;
    value: any = undefined;

    constructor(duration: number) {
        this.duration = duration;
    }

    retrieve() : any {
        return this._retrieve(this.value);
    }

    protected _retrieve(value: any) : any {
        if (value == undefined) {
            return undefined;
        } else if (!this.duration) {
            return this.value.data;
        } else if ((value.data.storedAt + this.duration) < Date.now()) {
            this.clear();
            return undefined;
        } else {
            return value.data;
        }
    }

    put(value) {
        this.value = JSON.stringify({ data: value, storedAt: Date.now()});
    }

    clear() {
        this.value = undefined;
    }
}

export class LocalStorageValue extends StoredValue {
    name: string;

    constructor(
        name: string,
        duration: number | null = null
    ) {
        super(duration);
        this.name = name;
    }

    retrieve() {
        let value = localStorage.getItem(this.name);
        if (value == null) return undefined;
        return this._retrieve(value);
    }

    put(value) {
        const data = JSON.stringify({ data: value, storedAt: Date.now()});
        localStorage.setItem(this.name, data);
    }

    clear() {
        localStorage.removeItem(this.name);
    }
}