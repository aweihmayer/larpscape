import { Component } from "react";
import { ItemTableField, translate } from "@/core";

interface ItemProps<T> {
	fields: ItemTableField<T>[],
	item: T
}

export class ItemTableRow<T> extends Component<ItemProps<T>, {}> {
	constructor(props: ItemProps<T>) {
		super(props);
		this.state = { items: [] };
	}

	render() {
		let size = this.props.fields.map(x => x.size + 'fr');
		const style = { gridTemplateColumns: size.join(' ') };
		return <li style={style}>
			{this.props.fields.map((v, i) => {
				let render
				if (v.render) render = v.render
				else if (v.widget.render) render = v.widget.render
				else if (v.widget.getter) render = v.widget.getter
				else throw Error('No valid render')
				return <div key={i} data-label={translate(v.widget.label)}>
					{render(this.props.item)}
				</div>
			})}
		</li>
	}
}