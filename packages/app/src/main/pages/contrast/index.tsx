import { Component, h } from 'preact';

interface Props {}

interface State {}

export default class Contrast extends Component<Props, State> {
  
  constructor() {
    super();
  }

  render(_: Props, state: State) {
    return (
      <div>
        <h1>Contrast Page</h1>
      </div>
    )
  }
}