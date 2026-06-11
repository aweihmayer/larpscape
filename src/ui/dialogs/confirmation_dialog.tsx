import { Component } from "react";
import { Button, Dialog, translate } from "@/core";
import { I18N } from "@/src";
import { CircleAlert } from "lucide-react";

interface Props {
    onConfirm: (() => any)
    message: Record<string, string>
}

export class ConfirmationDialog extends Component<Props> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        return <dialog>
            <h1>
                <CircleAlert />
            </h1>
            <p>
                {translate(this.props.message)}
            </p>
            <Button
                className="btn blue full"
                onClick={() => {
                    Dialog.close()
                    this.props.onConfirm()
                }}
            >
                {translate(I18N.buttons.confirm)}
            </Button>
            <Button
                className="btn blue-solid full"
                onClick={() => Dialog.close()}
            >
                {translate(I18N.buttons.cancel)}
            </Button>
        </dialog>;
    }
}