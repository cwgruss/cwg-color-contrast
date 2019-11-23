import { ColorGroup } from './palette/color-group.model';
import { Color } from './color/color.model';

export { Color, isHSLValue, isHexValue,isRGBAValue, isRGBValue } from './color/color.model';
export { luminance, contrastRatio } from './color/wcag-color-contrast';

const colorGroup = new ColorGroup([
    new Color('#FFF'),
    new Color('#333'),
    new Color('#000')
])

for (const color of colorGroup) {
    console.log((color as Color).toRGB());
    
}