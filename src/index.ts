import { Color } from './util/color/color.model';
import { luminance, contrastRatio } from './util/color/wcag-color-contrast';

const white = new Color('#FFF');
const black = new Color('#000');
const red = new Color('#FF0000');
const green = new Color('#00FF00');
const blue = new Color('#0000FF');

const colors: Color[] = [
   white,
   black,
   red,
   green,
   blue
];

console.log(`${white.toHex()} against ${black.toHex()}: ${contrastRatio(white, black)}`);
console.log(`${white.toHex()} against ${red.toHex()}: ${contrastRatio(white, red)}`);
console.log(`${blue.toHex()} against ${black.toHex()}: ${contrastRatio(blue, black)}`);

