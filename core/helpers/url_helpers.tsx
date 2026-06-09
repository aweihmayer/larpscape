export function getRelativeUrl() : string {
    return window.location.pathname + window.location.search;
}

export function removeQueryString(url: string) : string {
    return url.split('?')[0];
}

export function getQueryStringParams(url: string) : object {
    const searchParams = new URL(url).searchParams;
    const result = {};
    searchParams.forEach((value, key) => { result[key] = value; });
    return result;
}

export const isSecureOrLocal =
    window.location.protocol === "https:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1";