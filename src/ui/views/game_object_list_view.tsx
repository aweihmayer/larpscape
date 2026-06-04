import { Component } from "react";
import { LarpscapeLayout } from "@/src";

interface State {}

export class GameObjectListView extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return <LarpscapeLayout>
            <section>
                Game objects
            </section>
        </LarpscapeLayout>;
  }
}