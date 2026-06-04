import { JSX } from "react";
import { Input } from "@/core/ui/form/input";

export class PasswordInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
                <input type="password" onChange={this.handleChange} />
            </div>;
    }
}