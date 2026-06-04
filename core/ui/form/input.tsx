import { ChangeEvent, Component, JSX } from "react";
import { Tooltip, translate } from "@/core";
import { ModelField } from "@/core/model/model_field";

interface Props {
    field: ModelField,
    data: object
}

export class Input extends Component<Props, {}> {
    field: ModelField
    data: object

    constructor(props: Props) {
        super(props);
        this.field = props.field;
        this.data = props.data;
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return <div className="form-row">
            <div className="label">
                <label htmlFor={"TODO"}>{translate(this.field.label)}</label>
                <Tooltip tip={null} />
            </div>
            {this.renderInput()}
            <div className="error">
                <p></p>
            </div>
        </div>;
    }

    renderInput() : JSX.Element {
        throw new Error('Not implemented');
    }

    setMessage(message) {
        //this.refs.message.innerHTML = message;
    }

    clearMessage() {
        //this.refs.message.innerHTML = '';
    }

    setError(message) {
        //this.refs.container.classList.add('error');
        //this.setMessage(message);
    }

    clearError() {
        //this.refs.container.classList.remove('error');
        //this.clearMessage();
    }

    hasError() {
        //return this.refs.container.classList.contains('error');
    }

    handleChange(ev: ChangeEvent<HTMLInputElement>) {
        this.data[this.field.name] = ev.target.value;
    }
}