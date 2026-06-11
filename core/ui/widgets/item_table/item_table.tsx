import { Component } from "react";
import { ItemTableField, search, SearchInput, TextModelField, translate, WidgetField } from "@/core";
import { ItemTableRow } from "./item_table_row"

interface TableProps<T> {
	fields: ItemTableField<T>[]
	items?: T[]
	k: ((x: any, i: number) => any)
	searchKeys?: string[]
}

interface TableState<T> {
	items: T[]
}

const SEARCH_FIELD = new WidgetField({
	placeholder: { en: "Search", fr: "Rechercher" },
	model: new TextModelField()
})

export class ItemTable<T> extends Component<TableProps<T>, TableState<T>> {
	items: T[]
	typewatch?: number

	static defaultProps = {
		k: (x: any, i: number) => i
	}

	constructor(props: TableProps<T>) {
		super(props)
		this.items = props.items ? props.items : []
		this.state = { items: props.items ? props.items : [] }
		this.typewatch = undefined
	}

	setItems(items: T[]) {
		this.items = items
		this.setState({ items: items })
	}

	search(q: string) {
		if (!this.props.searchKeys) return
		clearTimeout(this.typewatch)
		this.typewatch = setTimeout(() => {
			this.setState({
				items: search<T>(
					q,
					this.items,
					this.props.searchKeys ?? []
				)
			})
		}, 350)
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

		return <div>
			{
				this.props.searchKeys ? (
					<SearchInput
						field={SEARCH_FIELD}
						data={{}}
						onChange={ev => this.search(ev.target.value)}
					/>
				) : null
			}
			<div className="item-table">
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
			</div>
		</div>;
  }
}