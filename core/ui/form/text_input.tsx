import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class TextInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
                <input
                    type="text"
                    maxLength={this.props.model.max}
                    onChange={this.handleChange}
                />
            </div>;
    }
}