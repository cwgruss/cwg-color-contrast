import { Component, h } from 'preact';
import {
  bottomBar,
  bottomNav
} from './style.scss';
import { NavItem } from './components/nav-item';

interface Props {}

interface State {}



export class BottomBar extends Component<Props, State> {
  render(_: Props, state: State) {
    return (
      <div class={bottomBar}>
        <nav class={bottomNav}>
            <NavItem link="/palettes" label="Palettes"/>
            <NavItem link="/colors" label="Colors"/>
            <NavItem link="/contrast" label="Contrast"/>
        </nav>
      </div>
    )
  }

}