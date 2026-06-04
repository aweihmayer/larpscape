import { Component, JSX } from "react";

interface Props {
    tip?: string
}

export class Tooltip extends Component<Props, {}> {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.tip) return null;
        else return <span className="tooltip" data-tip={this.props.tip}>?</span>
    }
}