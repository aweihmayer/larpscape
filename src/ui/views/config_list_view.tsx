import { Component } from "react";
import { LarpscapeLayout } from "@/src";
import { ConfigTable } from "@/src";

interface State {}

export class ConfigListView extends Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {};
	}

	render() {
		return <LarpscapeLayout>
			<ConfigTable />
		</LarpscapeLayout>;
	}
}