import { Component, h } from 'preact';
import {
  bottomBarLink
} from './style.scss';

interface Props {
  link: string,
  label: string,
}

interface State {
  isActive: boolean,
}

export class NavItem extends Component<Props, State> {
  state: State = {
    isActive: false
  };


  deactivate() {
    this.setState({ isActive: false });
  }

  activate() {
    this.setState({ isActive: true });
  }


	toggle() {
    this.setState({ isActive: !this.state.isActive });
  }

  render({link, label}: Props) {
    return (
    <a class={bottomBarLink} href={link || 'javascript:'}>{label}</a>
    )
  }
}