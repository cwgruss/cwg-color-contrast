import { h, render } from 'preact';
import Root from './app-root';
import { main } from './global.scss';

const container = document.body.querySelector('.app')!;
container.classList.add(main);
render(<Root />, container, container.firstChild as any);

