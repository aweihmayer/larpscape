import { Component } from "react";
import { ItemTableField, translate } from "@/core";
import { ItemTableRow } from "./item_table_row"

interface TableProps<T> {
	fields: ItemTableField<T>[]
	k: ((v: any, i: number) => any)
}

interface TableState<T> {
	items: T[]
}

export class ItemTable<T> extends Component<TableProps<T>, TableState<T>> {
	static defaultProps = {
		k: (v: any, i: number) => i
	}

	constructor(props: TableProps<T>) {
		super(props);
		this.state = { items: [] };
	}

	render() {
		let fields = this.props.fields;
		if (this.state.items.length > 0) {
			const item = this.state.items[0];
			fields = this.props.fields.filter(x => {
				try {
					return !!x.widget.condition(item);
				} catch (ex) {
					return false;
				}
			})
		}

		let size = this.props.fields.map(x => x.size + 'fr');
		const style = { gridTemplateColumns: size.join(' ') };

		return <div className="item-table">
			<header style={style}>
				{
					fields.map(x => <div key={translate(x.widget.label)}>
						{translate(x.widget.label)}
					</div>)
				}
			</header>
			<ul>
				{this.state.items.map((v, i) => 
					<ItemTableRow
						key={this.props.k(v, i)}
						fields={fields}
						item={v}
					/>
				)}
			</ul>
		</div>;
  }
}