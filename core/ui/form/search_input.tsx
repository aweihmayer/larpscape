import { JSX } from "react";
import { Input } from "@/core/ui/form/input";
import { SearchIcon } from "lucide-react";
import { translate } from "@/core";

export class SearchInput extends Input {
    renderInput() : JSX.Element {
        return <div className="input">
            <div className="input-outer">
                <SearchIcon className="input-search-icon" />
                <input
                    type="search"
                    maxLength={this.props.field.model?.max}
                    onChange={ev => this.handleChange(ev)}
                    placeholder={translate(this.props.field.placeholder)}
                />
            </div>
        </div>;
    }
}