import { CircleQuestionMark } from "lucide-react";
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
        return <span className="tooltip">
            <CircleQuestionMark />
        </span>
    }
}