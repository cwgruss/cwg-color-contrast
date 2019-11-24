import { ColorGroup } from './palette/color-group.model';
import { Color, HSL } from './color/color.model';
import { Palette } from './palette/palette.model';
import { clamp } from './util/number-util';
import { darken, saturate, desaturate } from './color/color-util';

export { Color, isHSLValue, isHexValue,isRGBAValue, isRGBValue } from './color/color.model';
export { luminance, contrastRatio } from './color/wcag-color-contrast';

const colorGroup = new Palette('Simple Palette', [
    new Color('#F00'),
    new Color('#030'),
    new Color('#00D')
]);

console.log(colorGroup);





for (const color of colorGroup) {
    console.log(`HSL: ${color.toHSL()}`);
    console.log(`luminosity: ${color.luminosity()}`);
    const dark = desaturate(color, 0.86);
    console.log(`desaturated by 10%: ${dark.toHSL()}`);
    console.log(dark);
    
    console.log('----');
    
}

console.log(`The average luminosity is : ${colorGroup.averageLuminostiy()}`);
