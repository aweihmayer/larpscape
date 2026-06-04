import { LoaderCircle } from "lucide-react";
import { Component } from "react";

export class Loader extends Component {
    render() {
        return <LoaderCircle className="animate-spin" />
    }
}