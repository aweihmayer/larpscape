import { Component } from "react";
import { LarpscapeLayout } from "@/src";

interface State {}

export class ProductListView extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return <LarpscapeLayout>
            <section>
                Products
            </section>
        </LarpscapeLayout>;
  }
}