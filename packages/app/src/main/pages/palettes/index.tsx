import { Component, h } from 'preact';

interface Props {}

interface State {}

export default class Palettes extends Component<Props, State> {
  
  constructor() {
    super();
  }

  render(_: Props, state: State) {
    return (
      <div>
        <h1>Palette Page</h1>
      </div>
    )
  }
}