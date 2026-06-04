import { Component } from "react";
import { I18N, LarpscapeLayout } from "@/src";
import { Settings } from "lucide-react";
import { translate } from "@/core";
import { ConfigTable } from "@/src";

interface State {}

export class ConfigListView extends Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {};
	}

	render() {
		return <LarpscapeLayout>
			<section>
			<h1>
				<Settings />
				<span> {translate(I18N.menu.configs)}</span>
			</h1>
				<ConfigTable />
			</section>
		</LarpscapeLayout>;
	}
}