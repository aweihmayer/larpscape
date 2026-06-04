export function formatToRegex(format: string) : RegExp {
    // Escape regex special characters (like re.escape)
    let pattern = format.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Convert {placeholders} into named capture groups
    pattern = pattern.replace(/\\{(\w+)\\}/g, "(?<$1>[^\/]+)");
    return new RegExp('^' + pattern + '$')
}

export function replacePlaceholders(format: string, params: object) : string {
    return format.replace(/\{(\w+)\}/g, (_, key) => {
        if (params[key] === undefined) throw new Error(`Missing param: ${key}`);
        return String(params[key]);
    });
}