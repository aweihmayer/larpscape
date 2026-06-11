import { Component, MouseEvent, ReactNode } from "react";
import { App, Loadable, Loader, Route } from "@/core";

interface Props extends Loadable {
    route: Route
    params?: object
    children?: ReactNode
    className?: string
    onClick?: ((ev: MouseEvent) => void)
}

export class Link extends Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        let href = this.props.route.getRelativeUrl(this.props.params)
        return <a
            onClick={ev => this.handleClick(ev)}
            className={this.props.className}
            href={href}
        >
            <span>
                {this.props.loading ? <Loader /> : this.props.children}
            </span>
        </a>
    }

    handleClick(ev: MouseEvent) {
        ev.preventDefault()
        ev.stopPropagation()
        if (this.props.onClick) this.props.onClick(ev)
        App.goTo(this.props.route, this.props.params)
    }
}