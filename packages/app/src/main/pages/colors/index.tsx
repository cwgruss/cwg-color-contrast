import { Component, h } from 'preact';

interface Props {}

interface State {}

export default class Colors extends Component<Props, State> {
  
  constructor() {
    super();
  }

  render(_: Props, state: State) {
    return (
      <div>
        <h1>JUXTAPOSE -- Colors Pages</h1>
      </div>
    )
  }
}