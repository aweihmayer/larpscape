import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class TextInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
            <div className="input-outer">
                <input
                    type="text"
                    maxLength={this.props.field.model?.max}
                    onChange={ev => this.handleChange(ev)}
                />
            </div>
        </div>;
    }
}