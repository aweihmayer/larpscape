import Fuse from "fuse.js";

export function search<T>(
    q: string,
    items: T[],
    keys: string[],
    threshold: number = 0.3
) {
    const fuse = new Fuse<T>(items, {
        keys: keys,
        threshold: threshold
    });
    return fuse.search(q).map(x => x.item);
}