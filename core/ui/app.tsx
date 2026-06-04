import { Component } from "react";
import { createRoot } from "react-dom/client";
import { Dialog, flattenObject, getRelativeUrl, Route } from "@/core";

interface State {
    route: Route | null
    params: object
};

export class App extends Component<{}, State> {
    static instance: App | null = null;
    static routes: Route[] = [];
    static lang: string = 'en';

    constructor(props: {}) {
        super(props);
        App.instance = this;
        this.state = App.currentRoute();
    }

    render() {
        if (this.state.route === null) {
            return <div>404</div>;
        } else {
            return this.state.route.view(this.state.params);
        }
    }

    static setRoutes(routes: object | Route[]) {
        if (Array.isArray(routes)) {
            App.routes = routes;
        } else {
            let flatRoutes = flattenObject(routes, Route);
            App.routes = Object.values(flatRoutes);
        }
    }

    static currentRoute(): State {
        let url = getRelativeUrl();
        for (const route of App.routes) {
            if (!route.matches(url)) continue;
            return {
                route: route,
                params: route.getParams(url)};
        }

        return { route: null, params: {} };
    }

    static main() {
        let rootElement = document.getElementById('app');
        if (!rootElement) throw new Error('App root not found');
        window.addEventListener('popstate', ev => {
            const current = App.currentRoute();
            App.reload(current.route, current.params)
        });
        const root = createRoot(rootElement);
        root.render(<App />);
    }

    static replaceRoute(
        route: Route,
        params: object = {}
    ) {
        changeRoute(
            route,
            params,
            x => { 
                window.history.replaceState('', '', x);
                window.scrollTo(0, 0);
            });
    }

    static goTo(
        route: Route,
        params: object = {}
    ) {
        changeRoute(
            route,
            params,
            x => {
                window.history.pushState('', '', x);
                window.scrollTo(0, 0);
            });
    }

    static reload(
        route: Route | null = null,
        params: object = {}
    ) {
        if (App.instance == null) return;
        route = route ?? App.instance.state.route;
        changeRoute(
            route,
            params,
            x => { window.history.replaceState('', '', x) });
    }
}

function changeRoute (
    route: Route | null,
    params: object,
    action: Function
) {
    if (!App.instance) throw Error('App not started');
    if (!route) throw Error('Null route');
    let url = route.getRelativeUrl(params);
    // Same location, do nothing
    if (url === (getRelativeUrl())) return;
    action(url);
    Dialog.close();
    App.instance.setState(App.currentRoute());
}