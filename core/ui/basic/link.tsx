import { Component, MouseEvent, ReactNode } from "react";
import { App, Route } from "@/core";

interface Props {
    route: Route | null
    params?: object
    children?: ReactNode | null
    onClick: ((ev: MouseEvent) => void) | null
    className: string
};

export class Link extends Component<Props, {}> {
    static defaultProps = {
        params: {},
        children: null,
        onClick: null,
        className: ''
    };

    constructor(props: Props) {
        super(props);
    }

    render() {
        let href = this.props.route ? this.props.route.getRelativeUrl(this.props.params) : '';
        return <a
            onClick={ev => this.handleClick(ev)}
            className={this.props.className}
            href={href}>
            {this.props.children}
        </a>;
    }

    handleClick(ev: MouseEvent) {
        ev.preventDefault();
        ev.stopPropagation();
        if (this.props.onClick) {
            this.props.onClick(ev);
        } else if (this.props.route) {
            App.goTo(this.props.route, this.props.params);
        }
    }
}