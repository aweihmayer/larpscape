import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class IntegerInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
            <div className="input-outer">
                <input
                    type="number"
                    min={this.props.field.model?.max}
                    max={this.props.field.model?.max}
                    step="1"
                    onKeyDown={ev => { if(['.', 'e', 'E', '+', '-'].includes(ev.key)) ev.preventDefault()}}
                    onChange={ev => this.handleChange(ev)}
                />
            </div>
        </div>;
    }
}