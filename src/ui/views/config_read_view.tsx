import { Component } from "react";
import { AuthService, CONFIG_VALUE_FIELDS, ConfigService, ConfigValueDto, ConfigValueUpdateDialog, ConfirmationDialog, I18N, LarpscapeLayout, Role } from "@/src";
import { Settings } from "lucide-react";
import { App, Button, Dialog, FieldRow, Loader, translate } from "@/core";

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
		const editable = (this.state.config
			&& this.state.config.is_editable
			&& AuthService.user.hasPermissions(Role.ADMIN))

		return <LarpscapeLayout>
			{
				this.state.config ? (
					<section>
						<h1>
							<Settings />
							<span> {this.state.config.id}</span>
						</h1>
						{
							editable ? (
								<div>
									<Button className="btn blue-solid full" onClick={ev => this.openUpdateDialog()}>
										{translate(I18N.buttons.update)}
									</Button>
									<Button className="btn blue full"  onClick={ev => this.openResetDialog()}>
										{translate(I18N.buttons.reset)}
									</Button>
								</div>
							) : null
						}
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

	openUpdateDialog() {
		Dialog.open(
			<ConfigValueUpdateDialog
				config={this.state.config!}
				callback={x => this.setState({ config: x.data })} />
		)
	}

	openResetDialog() {
		Dialog.open(
			<ConfirmationDialog
				message={I18N.dialogs.confirm.config}
				onConfirm={() => {
					ConfigService
						.reset(this.state.config!)
						.then(x => this.setState({ config: x }))
					}
				}
			/>
		)
	}
}