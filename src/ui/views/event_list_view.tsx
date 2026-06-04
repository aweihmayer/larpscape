import { Component } from "react";
import { LarpscapeLayout } from "@/src";

interface State {}

export class EventListView extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return <LarpscapeLayout>
            <section>
                Events
            </section>
        </LarpscapeLayout>;
  }
}