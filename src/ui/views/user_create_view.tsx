import { Component, SubmitEvent } from "react";
import { I18N, LarpscapeLayout, USER_FIELDS, UserModel, UserService } from "@/src";
import { Button, DateInput, EmailInput, PasswordInput, SelectInput, TelInput, TextInput, translate } from "@/core";
import { UserPlus } from "lucide-react";

interface State {
    isLoading: boolean
}

export class UserCreateView extends Component<{}, State> {
	data: object = {};

	constructor(props: {}) {
		super(props);
		this.state = { isLoading: false };
	}

	render() {
		return <LarpscapeLayout>
			<section>
				<h1>
					<UserPlus />
					<span> {translate(I18N.headings.newUser)} </span>
				</h1>

				<form onSubmit={ev => this.handleSubmit(ev)}>
					<fieldset>
						<legend>{translate(I18N.headings.credentials)}</legend>
						<TextInput widget={USER_FIELDS.username} model={UserModel.fields.username} data={this.data} />
						<EmailInput widget={USER_FIELDS.email} model={UserModel.fields.email} data={this.data} />
						<TelInput widget={USER_FIELDS.phone} model={UserModel.fields.phone} data={this.data} />
						<PasswordInput widget={USER_FIELDS.password} model={UserModel.fields.password} data={this.data} />
					</fieldset>

					<fieldset>
						<legend>{translate(I18N.headings.personalDetails)}</legend>
						<TextInput widget={USER_FIELDS.first_name} model={UserModel.fields.first_name} data={this.data} />
						<TextInput widget={USER_FIELDS.last_name} model={UserModel.fields.last_name} data={this.data} />
						<SelectInput widget={USER_FIELDS.gender} model={UserModel.fields.gender} data={this.data} />
						<DateInput widget={USER_FIELDS.date_of_birth} model={UserModel.fields.date_of_birth} data={this.data} />
					</fieldset>

					<Button type="submit" className="btn blue-solid full">
						{translate(I18N.buttons.create)}
					</Button>
				</form>
			</section>
		</LarpscapeLayout>;
	}

	handleSubmit(ev: SubmitEvent) {
		ev.preventDefault();
		if (this.state.isLoading) return
		UserService.create(this.data);
	}
}