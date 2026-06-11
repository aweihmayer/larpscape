import { Component, JSX } from "react";
import { Dialog, getRelativeUrl, Route } from "@/core";

interface Props {
    routes: Route[]
    lang?: string
    loading?: boolean
    loadRender?: (() => JSX.Element)
    errorRender?: ((code: number) => JSX.Element)
    isUserAuthenticated?: (() => boolean)
}

interface State {
    route: Route | null
    params: Record<string, any>
    isLoading: boolean
    lang: string
}

export class App extends Component<Props, State> {
    static instance: App | null = null
    static defaultProps = {
        lang: 'en',
        loading: false,
        loadRender: () => null,
        errorRender: (code: number) => <div>{code}</div>,
        isUserAuthenticated: () => false
    }

    constructor(props: Props) {
        super(props)
        App.instance = this
        this.state = {
            ...this.getCurrentRoute(),
            lang: this.props.lang!,
            isLoading: this.props.loading!
        }
    }

    render() {
        if (this.state.isLoading) {
            return this.props.loadRender!()
        } else if (!this.state.route) {
            return this.props.errorRender!(404)
        } else if (!this.state.route.auth()) {
            const code = this.props.isUserAuthenticated!() ? 403 : 401
            return this.props.errorRender!(code)
        } else {
            return this.state.route.view!(this.state.params)
        }
    }

    componentDidMount() {
        if (App.instance) return
        window.addEventListener('popstate', ev => App.instance!.setState({
            ...this.getCurrentRoute(),
            isLoading: false
        }))
    }

    getCurrentRoute() {
        let url = getRelativeUrl()
        let route: Route | null = null
        let params = {}
        for (const r of this.props.routes) {
            if (!r.matches(url)) continue
            route = r
            params = r.getParams(url)
            break
        }
        
        return { route, params }
    }

    static replaceRoute(
        route: Route,
        params: object = {},
        force: boolean = false
    ) {
        App.changeRoute(
            route,
            params,
            x => { 
                window.history.replaceState('', '', x);
            },
            force);
    }

    static goTo(
        route: Route,
        params: object = {},
        force: boolean = false
    ) {
        App.changeRoute(
            route,
            params,
            x => {
                window.history.pushState('', '', x)
                window.scrollTo(0, 0)
            },
            force)
    }

    static reload(
        route: Route | null = null,
        params: object = {},
        force: boolean = false
    ) {
        App.changeRoute(
            route ?? App.instance!.state.route,
            route ? params : App.instance!.state.params,
            x => {
                window.history.replaceState('', '', x)
                window.scrollTo(0, 0)
            },
            force)
    }

    private static changeRoute (
        route: Route | null,
        params: object,
        action: ((url: string) => void),
        force: boolean = false
    ) {
        if (!route) return
        let url = route.getRelativeUrl(params)
        document.body.className = ''
        Dialog.close()
        // if (!force && url === (getRelativeUrl())) return
        action(url)
        App.instance!.setState({
            route: route,
            params: params
        })
    }
}