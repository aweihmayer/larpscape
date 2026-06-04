import { Component } from "react";
import { App, Button, Dialog, Link, PasswordInput, TextInput, Toast, translate } from "@/core";
import { Routes, UserModel } from "@/src";
import { AuthService, I18N } from "@/src";
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
            <form onSubmit={ev => { this.handleSubmit(ev) }}>
                <h1>
                    <span>{translate(I18N.buttons.signin)} </span>
                    <LogIn />
                </h1>
                <TextInput field={UserModel.username} data={this.data} />
                <PasswordInput field={UserModel.password} data={this.data} />
                <Button type="submit" className="btn blue">{translate(I18N.buttons.signin)}</Button>
                <Link route={Routes.app.auth.signup} className="btn blue solid">{translate(I18N.buttons.signup)}</Link>
            </form>
        </dialog>;
    }

    handleSubmit(ev) {
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