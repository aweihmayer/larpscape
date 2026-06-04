import { ReactElement } from "react";
import { formatToRegex } from "@/core";
import { removeQueryString, replacePlaceholders } from "@/core";

export class Route {
    path: string;
    method: string;
    view: ((params: object) => ReactElement) | null;

    static refreshRoute: Route | null = null;
    static refreshPromise: Promise = null;

    constructor(
        path: string,
        method: string = 'GET',
        view: ((params: object) => ReactElement) | null = null
    ) {
        this.path = path;
        this.method = method;
        this.view = view;
    }

    async fetch(
        body: object | null = null,
        query: object | null = null,
        headers: Record<string, string> | null = null,
        retries: number = 0
    ) : Promise<{ response: Response, data: any }> {
        // Build headers
        let requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        if (headers) Object.keys(headers).forEach(h => requestHeaders.append(h, headers[h]));

        // Build request
        let url = this.getRelativeUrl(query);
        const request = new Request(url, {
            method: this.method,
            body: body ? JSON.stringify(body) : null,
            headers: requestHeaders});
        
        // Execute request
        const response = await fetch(request);
        if (
            retries === 0
            && response.status === 401
            && Route.refreshRoute
        ) {
            try {
                // Only ONE refresh request runs at a time
                if (!Route.refreshPromise) {
                    Route.refreshPromise = Route.refreshRoute.fetch();
                }

                // Wait for shared refresh
                await Route.refreshPromise;
            }
            finally {
                // Clear promise after completion/failure
                Route.refreshPromise = null;
            }

            // Retry original request
            return this.fetch(
                body,
                query,
                headers,
                retries + 1
            );
        }

        // Parse response safely
        let data = null;
        try { data = await response.json(); }
        catch { /* Response had no JSON body */ }
        return { response, data };
    }

    matches(url: string) : boolean {
        url = removeQueryString(url);
        let regex = formatToRegex(this.path);
        return regex.test(url);
    }

    getParams(url: string) : object {
        url = removeQueryString(url);
        let regex = formatToRegex(this.path);
        let match = url.match(regex);
        if (match == null) return {};
        else if (match.groups == undefined) return {}
        else if (Object.hasOwn(match, 'groups')) return match.groups;
        else return {}
    }

    getRelativeUrl(params: object | null = null) : string {
        return replacePlaceholders(this.path, params ?? {});
    }
}