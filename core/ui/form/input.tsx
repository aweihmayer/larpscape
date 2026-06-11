import { ChangeEvent, Component, JSX } from "react";
import { Tooltip, translate, WidgetField } from "@/core";

interface Props {
    field: WidgetField<any, any>,
    data: object,
    onChange?: ((x: any) => void)
}

export class Input extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <div className="input-container">
            {
                this.props.field?.label ? (
                    <div className="input-label-container">
                        <label htmlFor={"TODO"}>{translate(this.props.field.label)}</label>
                        <Tooltip tip={this.props.field.tooltip} />
                    </div>
                ) : null
            }
            {this.renderInput()}
            <div className="input-error-container">
                <p></p>
            </div>
        </div>;
    }

    renderInput() : JSX.Element {
        throw new Error('Not implemented');
    }

    handleChange(ev: ChangeEvent<HTMLInputElement>) {
        if (this.props.onChange) this.props.onChange(ev)
        if (!this.props.field.setter) return
        this.props.field.setter(
            this.props.data,
            ev.target.value);
    }
}