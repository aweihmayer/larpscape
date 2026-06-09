import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Component } from "react";
import { createRoot, Root } from "react-dom/client";
import { translate } from "@/core";

interface ToastData {
    id: number,
    type: string,
    title: string | Record<string, string>,
    timeout: number,
    message?: string | Record<string, string>
}

interface ToastProps {
    data: ToastData
}

export class Toast extends Component<ToastProps, {}> {
    static nextId = 1;
    static duration = 3500;

    constructor(props: ToastProps) {
        super(props);
    }

    render() {
        let icon = null;
        switch (this.props.data.type) {
            case 'warn':
                icon = <TriangleAlert color="#FF9700" />;
                break;
            case 'info':
                icon = <Info color="#9C28B1" />;
                break;
            case 'error':
                icon = <CircleAlert color="#E51C24" />;
                break;
            case 'success':
                icon = <CircleCheck color="#4CB050" />;
                break;
        }

        return <li>
            <article
                className={this.props.data.type}
                onMouseEnter={ev => this.onMouseEnter()}
                onMouseLeave={ev => this.onMouseLeave()}
            >
                <div>
                    {icon}
                </div>
                <div>
                    <h1>{translate(this.props.data.title)}</h1>
                    {this.props.data.message ? <p>{translate(this.props.data.message)}</p> : null}
                </div>
                <div>
                    <button onClick={ev => this.close()}>X</button>
                </div>
            </article>
        </li>;
    }

    static success(
        title: string | Record<string, string>,
        message: string | Record<string, string> | null = null
    ) {
        Toast._add('success', title, message);
    }

    static error(
        title: string | Record<string, string>,
        message: string | Record<string, string> | null = null
    ) {
        Toast._add('error', title, message);
    }

    static warn(
        title: string | Record<string, string>,
        message: string | Record<string, string> | null = null
    ) {
        Toast._add('warn', title, message);
    }

    static info(
        title: string | Record<string, string>,
        message: string | Record<string, string> | null = null
    ) {
        Toast._add('info', title, message);
    }

    onMouseEnter() {
        let toasts = [...ToastContainer.instance.state.toasts];
        let i = ToastContainer._getToastIndex(this.props.data.id);
        let toast = toasts[i];
        clearTimeout(toast.timeout);
    }

    onMouseLeave() {
        let toasts = [...ToastContainer.instance.state.toasts];
        let i = ToastContainer._getToastIndex(this.props.data.id);
        let toast = toasts[i];
        toast.timeout = setTimeout(() => this.close(), Toast.duration);
    }

    close() {
        Toast.close(this.props.data.id);
    }

    static close(id) {
        let toasts = [...ToastContainer.instance.state.toasts];
        let i = ToastContainer._getToastIndex(id);
        let toast = toasts[i];
        clearTimeout(toast.timeout);
        toasts.splice(i, 1);
        ToastContainer.instance.setState({ toasts: toasts });
    }

    static _add(
        type: string,
        title: string | Record<string, string>,
        message: string | Record<string, string> | null = null
    ) {
        ToastContainer.init();
        // Wait for React to have rendered to toast container
        function addToast() {
            if (ToastContainer.instance == null) {
                setTimeout(addToast, 50);
            } else {
                Toast.nextId++;
                let id = Toast.nextId;
                let toast: ToastData = { 
                    id: id,
                    type: type,
                    title: title,
                    message: message,
                    timeout: setTimeout(() => Toast.close(id), Toast.duration)
                };
                let toasts = [...ToastContainer.instance.state.toasts];
                toasts.push(toast);
                ToastContainer.instance.setState({ toasts: toasts });
            }
        };
        addToast();
    }
}

interface ContainerState {
    toasts: ToastData[]
}

class ToastContainer extends Component<{}, ContainerState> {
    static instance: ToastContainer = null;
    static root: Root = null;

    constructor(props) {
        super(props);
        ToastContainer.instance = this;
        this.state = { toasts: [] };
    }

    static init() {
        if (document.getElementById('app-toast')) return;
        let container = document.createElement('aside');
        container.id = 'app-toast';
        document.body.appendChild(container);
        container = document.getElementById('app-toast')
        ToastContainer.root = createRoot(container);
        ToastContainer.root.render(<ToastContainer />);
    }

    render() {
        return <aside id="toast-container">
                <ul>{this.state.toasts.map(t => {
                    return <Toast key={t.id} data={t} />
                })}</ul>
            </aside>;
    }

    static _getToastIndex(id) {
        for (let i = 0; i < ToastContainer.instance.state.toasts.length; i++) {
            if (ToastContainer.instance.state.toasts[i].id == id) return i;
        }

        return null;
    }
}