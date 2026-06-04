import { Component } from "react";
import { LarpscapeHeader } from "./larpscape_header";
import { LarpscapeFooter } from "./larpscape_footer";
import { Loader } from "@/core";


export class LarpscapeLayout extends Component {
    render() {
        return <div id="view">
            <LarpscapeHeader />
            <main>
                {this.props.isLoading
                    ? <section><Loader /></section>
                    : this.props.children}
            </main>
            <LarpscapeFooter />
        </div>
    }
}