import { JSX } from "react";
import { Input } from "@/core/ui/form/input";
import { translate } from "@/core";

export class SelectInput extends Input {
    renderInput() : JSX.Element {
        console.log(this.props)
        return <div className="input">
            <div className="input-outer">
                <select
                    onChange={ev => this.handleChange(ev)}
                >
                    <option></option>
                    {
                        Object.entries(this.props.field.model?.options).map(([k, v]) => {
                            return <option
                                key={v}
                                value={v}
                            >
                                {
                                    this.props.field.optionLabels ? (
                                        translate(this.props.field.optionLabels[v])
                                    ) : (
                                        v
                                    )
                                }
                            </option>
                        })
                    }
                </select>
            </div>
        </div>;
    }
}