import { Component } from "react";
import { CONFIG_VALUE_FIELDS, ConfigService, ConfigValueDto, I18N, LarpscapeLayout } from "@/src";
import { Settings } from "lucide-react";
import { App, FieldRow, Loader, translate } from "@/core";

interface State {
	config: ConfigValueDto | null
}

export class ConfigReadView extends Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { config: null };
	}

	
	componentDidMount() {
		const params = App.instance?.state.params
		ConfigService.find(params?.id)
			.then(x => {
				this.setState({ config: x });
			})
	}

	render() {
		return <LarpscapeLayout>
			{
				this.state.config ? (
					<section>
						<h1>
							<Settings />
							<span> {this.state.config.id}</span>
						</h1>
						<FieldRow widget={CONFIG_VALUE_FIELDS.value} data={this.state.config} />
						<FieldRow widget={CONFIG_VALUE_FIELDS.initial_value} data={this.state.config} />
						<FieldRow widget={CONFIG_VALUE_FIELDS.data_type} data={this.state.config} />
						<FieldRow widget={CONFIG_VALUE_FIELDS.is_secret} data={this.state.config} />
						<FieldRow widget={CONFIG_VALUE_FIELDS.is_editable} data={this.state.config} />
						<FieldRow widget={CONFIG_VALUE_FIELDS.description} data={this.state.config} />
					</section>
				) : (
					<section>
						<Loader />
					</section>
				)
			}
		</LarpscapeLayout>;
	}
}