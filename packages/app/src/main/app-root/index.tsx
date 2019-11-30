import { Component, h  } from "preact";
import Router from 'preact-router';
import { BottomBar } from '../bottom-bar';
import {
  content, 
  footer,
  rootWrapper
} from './style.scss';
import Colors from '../pages/colors';
import Palettes from '../pages/palettes';
import Contrast from '../pages/contrast';

interface Props {}

interface State {}

export default class Root extends Component<Props, State> {
  
  constructor() {
    super();
  }

  render(_: Props, state: State) {
    return (
      <div class={rootWrapper}>
        <div class={content}>
          <Router onChange={this.handleRoute}>
            <Palettes path="/palettes" />
            <Colors path="/" default />
            <Contrast path="/contrast" />
          </Router>
        </div>
        <div class={footer}>
          <BottomBar  />
        </div>
      </div>
    )
  }

  handleRoute(event: any): void {
    console.log(event);
  }
}