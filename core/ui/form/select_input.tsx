import { JSX } from "react";
import { Input } from "@/core/ui/form/input";
import { translate } from "@/core";

export class SelectInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
                <select
                    onChange={this.handleChange}
                >
                    <option></option>
                    {
                        Object.entries(this.props.model.options).map(([k, v]) => {
                            return <option
                                key={v}
                                value={v}
                            >
                                {translate(this.props.widget.optionLabels[v])}
                            </option>
                        })
                    }
                </select>
            </div>;
    }
}