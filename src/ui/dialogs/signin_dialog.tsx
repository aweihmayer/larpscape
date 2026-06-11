import { Component, SubmitEvent } from "react";
import { App, Button, Dialog, Link, Loadable, PasswordInput, TextInput, Toast, translate } from "@/core";
import { Routes, UserModel, AuthService, I18N, USER_FIELDS } from "@/src";

export class SigninDialog extends Component<{}, Loadable> {
    data = new UserModel();

    constructor(props: {}) {
        super(props)
        this.state = { loading: false };
    }

    render() {
        return <dialog>
            <form
                onSubmit={ev => this.handleSubmit(ev)}
            >
                <TextInput field={USER_FIELDS.username} data={this.data} />
                <PasswordInput field={USER_FIELDS.password} data={this.data} />
                <Button
                    type="submit"
                    className="btn blue-solid full"
                    loading={this.state.loading}
                >
                    {translate(I18N.buttons.signin)}
                </Button>
                <Link
                    route={Routes.app.user.create}
                    className="btn blue full"
                    loading={this.state.loading}
                >
                    <span>
                        {translate(I18N.buttons.signup)}
                    </span>
                </Link>
            </form>
        </dialog>;
    }

    handleSubmit(ev: SubmitEvent) {
        console.log(this.state)
        ev.preventDefault();
        if (this.state.loading) return
        this.setState({ loading: true })
        return
        AuthService.signin(this.data)
            .then(x => {
                if (x.response.ok) {
                    Toast.success(I18N.toasts.signedIn);
                    Dialog.close();
                    App.reload();
                } else {
                    Toast.error(I18N.toasts.error, I18N.toasts.userNotFound);
                }
            });
    }
}