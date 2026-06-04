import { Component, SubmitEvent } from "react";
import { ConfigService } from "@/src";

interface Props {
    id: string
}

interface State {
    isLoading: boolean
}

export class ConfigUpdateDialog extends Component<Props, State> {
    data: object = {};

    constructor(props: Props) {
        super(props)
        this.state = { isLoading: false };
    }

    componentDidMount() {
        ConfigService.find(this.props.id);
    }

    render() {
        return <dialog>
            TODO
        </dialog>;
    }

    handleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        if (this.state.isLoading) return
    }
}