import { Component } from "react";
import { translate, WidgetField } from "@/core";

interface Props {
    widget: WidgetField<any, any>,
    data: any
}

export class FieldRow extends Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.state = { items: [] };
    }

    render() {
        if (!this.props.widget.condition(this.props.data)) return null
        
        let render
        if (this.props.widget.render) render = this.props.widget.render
        else if (this.props.widget.getter) render = this.props.widget.getter
        else throw Error('No valid render')
        console.log(render, render(this.props.data))
        return <div className="field-row">
            <div className="field-row-label">
                {translate(this.props.widget.label)}
            </div>
            <div className="field-row-contents">
                {render(this.props.data)}
            </div>
        </div>;
  }
}