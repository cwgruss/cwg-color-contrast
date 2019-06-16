import { Color } from './util/color/color.model';
import { ColorPalette } from './util/color/palette.model';
import { luminance, contrastRatio } from './util/color/wcag-color-contrast';

const white = new Color('#FFF');
const black = new Color('#000');
const red = new Color('#FF0000');
const green = new Color('#00FF00');
const blue = new Color('#0000FF');

const colors: ColorPalette = new ColorPalette('random colors', 
   {
       key: 'white',
       value: white
   },
   {
       key: 'black',
       value: black
   },
   {
       key: 'red',
       value: red
   },
   {
       key: 'blue',
       value: blue
   },
);

console.log(colors._toJSON());

colors.values().forEach(color1 => {
    const foreground = color1;

    colors.values().forEach(color2 => {
        const background = color2;
        console.log(`${foreground.toHex()} with ${background.toHex()} has a constrast of ${contrastRatio(foreground, background)}`);
    })
})
