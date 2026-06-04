import { Component } from "react";
import { translate } from "../i18n";

export class ItemTableHeaderData {
	name: string | Record<string, string>;
	getter: ((x: any) => any);
	render: ((x: any) => any) | null;
	size: number;

	constructor(
		name: string | Record<string, string>,
		getter: ((x: any) => any),
		size: number = 1,
		render: ((x: any) => any) | null = null,
	) {
		this.name = name;
		this.getter = getter;
		this.size = size;
		this.render = render;
	}
}

interface TableProps {
	headers: ItemTableHeaderData[],
}

interface TableState {
	items: object[]
}

export class ItemTable extends Component<TableProps, TableState> {
	constructor(props: TableProps) {
		super(props);
		this.state = { items: [] };
	}

	render() {
		let headers = this.props.headers;
		if (this.state.items.length > 0) {
			const item = this.state.items[0];
			headers = this.props.headers.filter(x => {
				try {
					x.getter(item);
					return true;
				} catch (ex) {
					return false;
				}
			})
		}

		let size = this.props.headers.map(x => x.size + 'fr');
		const style = { gridTemplateColumns: size.join(' ') };

		return <div className="item-table">
			<header style={style}>
				{
					headers.map(x => <div>
						{translate(x.name)}
					</div>)
				}
			</header>
			<ul>
				{this.state.items.map(x => <ItemTableRow headers={headers} item={x} />)}
			</ul>
		</div>;
  }
}

interface ItemProps {
	headers: ItemTableHeaderData[],
	item: object
}

class ItemTableRow extends Component<ItemProps, {}> {
	constructor(props: ItemProps) {
		super(props);
		this.state = { items: [] };
	}

	render() {
		let size = this.props.headers.map(x => x.size + 'fr');
		const style = { gridTemplateColumns: size.join(' ') };
		return <li style={style}>
			{this.props.headers.map(x => {
				return <div>{
					x.render
						? x.render(this.props.item)
						: x.getter(this.props.item)
				}</div>
			})}
		</li>
	}
}