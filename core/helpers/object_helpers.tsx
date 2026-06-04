export function flattenObject(
    obj: object,
    exclude: any = null,
    keySuffix: string = ''
) : object {
    let flat: Record<string, any> = {}
    for (const [key, value] of Object.entries(obj)) {
        if (exclude && value instanceof exclude) {
            flat[keySuffix + key] = value;
        } else if (isPlainObject(value)) {
            let nested = flattenObject(value, exclude, keySuffix + key + '.');
            Object.assign(flat, nested);
        } else {
            flat[keySuffix + key] = value;
        }
    }

    return flat
}

export function isPlainObject(value: any) {
  return (
    value !== null
    && typeof value === 'object'
    && !Array.isArray(value));
}

export function createPromise(data: any) {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
}