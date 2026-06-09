import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class DateInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
                <input
                    type="date"
                    min={this.props.model.min}
                    onChange={this.handleChange}
                />
            </div>;
    }
}