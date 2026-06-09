import { Component, SubmitEvent } from "react";
import { App, Button, Dialog, Link, PasswordInput, TextInput, Toast, translate } from "@/core";
import { Routes, UserModel, AuthService, I18N, USER_FIELDS } from "@/src";
import { LogIn } from "lucide-react";

interface State {
    isLoading: boolean
}

export class SigninDialog extends Component<{}, State> {
    data: object = {};

    constructor(props: {}) {
        super(props)
        this.state = { isLoading: false };
    }

    render() {
        return <dialog>
            <form onSubmit={ev => this.handleSubmit(ev)}>
                <TextInput widget={USER_FIELDS.username} model={UserModel.fields.username} data={this.data} />
                <PasswordInput widget={USER_FIELDS.password} model={UserModel.fields.password} data={this.data} />
                <Button type="submit" className="btn blue-solid full">
                    <span>{translate(I18N.buttons.signin)} </span>
                    <LogIn />
                </Button>
                <Link route={Routes.app.user.create} className="btn blue full">
                    {translate(I18N.buttons.signup)}
                </Link>
            </form>
        </dialog>;
    }

    handleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        if (this.state.isLoading) return
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