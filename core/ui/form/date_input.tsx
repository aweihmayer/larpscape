import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class DateInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
            <div className="input-outer">
                <input
                    type="date"
                    min={this.props.field.model?.min}
                    onChange={ev => this.handleChange(ev)}
                />
            </div>
        </div>
    }
}