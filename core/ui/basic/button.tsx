import { Component, MouseEventHandler, ReactNode } from "react";
import { Loadable, Loader } from "@/core";

interface Props extends Loadable {
    type: 'button' | 'submit' | 'reset'
    onClick:  MouseEventHandler<HTMLButtonElement>,
    children?: ReactNode | null,
    className: string
    disabled: boolean
}

export class Button extends Component<Props> {
    static defaultProps = {
        onClick: null,
        type: 'button',
        className: '',
        disabled: false
    };

    constructor(props: Props) {
        super(props)
    }

    render() {
        return <button
            className={this.props.className}
            disabled={this.props.disabled}
            type={this.props.type}
            onClick={ev => { this.handleClick(ev) }}
        >
            <span>
                {this.props.loading ? <Loader /> : this.props.children}
            </span>
        </button>;
    }

    async handleClick(ev) {
        if (!this.props.onClick) return
        else if (this.props.loading || this.props.disabled) return
        this.disable(true);
        await this.props.onClick(ev);
        this.enable();
    }

    disable(toggle: boolean | null = null) {
        if (typeof toggle === 'undefined') toggle = true;
        this.setState({ isDisabled: toggle });
    }

    enable() {
        this.setState({ isDisabled: false });
    }
}