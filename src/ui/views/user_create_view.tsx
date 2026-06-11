import { Component, SubmitEvent } from "react";
import { I18N, LarpscapeLayout, USER_FIELDS, UserService } from "@/src";
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
						<TextInput field={USER_FIELDS.username} data={this.data} />
						<EmailInput field={USER_FIELDS.email} data={this.data} />
						<TelInput field={USER_FIELDS.phone} data={this.data} />
						<PasswordInput field={USER_FIELDS.password} data={this.data} />
					</fieldset>

					<fieldset>
						<legend>{translate(I18N.headings.personalDetails)}</legend>
						<TextInput field={USER_FIELDS.first_name} data={this.data} />
						<TextInput field={USER_FIELDS.last_name} data={this.data} />
						<SelectInput field={USER_FIELDS.gender} data={this.data} />
						<DateInput field={USER_FIELDS.date_of_birth} data={this.data} />
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