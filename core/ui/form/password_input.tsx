import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class PasswordInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
            <div className="input-outer">
                <input
                    type="password"
                    maxLength={this.props.field.model?.max}
                    onChange={ev => this.handleChange(ev)}
                />
            </div>
        </div>
    }
}