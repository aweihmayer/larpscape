import { App } from "@/core";

export function translate(
    value?: string | Record<string, string>,
    replacements: Record<string, string> | null = null
) : string | undefined {
    if (value == undefined) {
        return null
    } else if (typeof value == 'object') {
        return translate(value[App.instance!.state.lang], replacements);
    } else if (replacements == null) {
        return value;
    } else {
        for (const [k, v] of Object.entries(replacements)) value = value.replaceAll('{' + k + '}', v);
        if (value.includes('{')) throw new Error('Missing placements replacements for ' + value);
        return value;
    }
}