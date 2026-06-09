import { ChangeEvent, Component, JSX } from "react";
import { Tooltip, translate, WidgetField } from "@/core";
import { ModelField } from "@/core/model/model_field";

interface Props {
    widget: WidgetField<any, any>,
    model: ModelField,
    data: object
}

export class Input extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return <div className="input-container">
            <div className="label-container">
                <label htmlFor={"TODO"}>{translate(this.props.widget.label)}</label>
                <Tooltip tip={this.props.widget.tooltip} />
            </div>
            {this.renderInput()}
            <div className="error-container">
                <p></p>
            </div>
        </div>;
    }

    renderInput() : JSX.Element {
        throw new Error('Not implemented');
    }

    handleChange(ev: ChangeEvent<HTMLInputElement>) {
        if (!this.props.widget.setter) return
        this.props.widget.setter(
            this.props.data,
            ev.target.value);
    }
}