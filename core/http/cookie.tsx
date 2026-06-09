export class Cookie {
    name: string

    constructor(name: string) {
        this.name = name
    }

    exists() {
        return (document.cookie.indexOf(this.name + '=') != -1);
    }

    delete() {
        document.cookie = this.name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;;';
    }
}