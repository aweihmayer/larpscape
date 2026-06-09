import { Component, MouseEventHandler, ReactNode } from "react";
import { Loader } from "@/core";

interface Props {
    type: 'button' | 'submit' | 'reset'
    onClick:  MouseEventHandler<HTMLButtonElement>,
    children?: ReactNode | null,
    loading: boolean
    className: string
    disabled: boolean
}

interface State {
    isDisabled: boolean
    isLoading: boolean
}

export class Button extends Component<Props, State> {
    static defaultProps = {
        onClick: null,
        type: 'button',
        loading: false,
        className: '',
        disabled: false
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            isDisabled: props.disabled,
            isLoading: props.loading
        };
    }

    render() {
        return <button
            className={this.props.className}
            disabled={this.state.isDisabled}
            type={this.props.type}
            onClick={ev => { this.handleClick(ev) }}
        >
            {this.state.isLoading ? <Loader /> : this.props.children}
        </button>;
    }

    async handleClick(ev) {
        if (!this.props.onClick) return;
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

    startLoading() {
        this.setState({ isLoading: true });
    }

    stopLoading() {
        this.setState({ isLoading: false });
    }
}