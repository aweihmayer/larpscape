import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class TelInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
            <div className="input-outer">
                <input
                    type="tel"
                    maxLength={this.props.field.model?.max}
                    onChange={ev => this.handleChange(ev)}
                />
            </div>
        </div>;
    }
}