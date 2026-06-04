import { Component } from "react";
import { LarpscapeLayout } from "@/src";

interface State {}

export class UserSignupView extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return <LarpscapeLayout>
            <section>
                Signup
            </section>
        </LarpscapeLayout>;
  }
}