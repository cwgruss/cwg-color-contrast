import { Color } from './color.model';

/* Red, green, and blue coefficients */
const rc = 0.2126;
const gc = 0.7152;
const bc = 0.0722;

export function contrastRatio(foreground: Color, background: Color): string {
    const ratio = (1 / luminance(foreground, background)).toFixed(4);
    return ratio;
}

export function luminance(foreground: Color, background: Color): any {
    const fLumininance = calcRelativeLuminance(foreground);
    const bLumininance = calcRelativeLuminance(background);
    const L1 = Math.min(fLumininance, bLumininance);
    const L2 = Math.max(fLumininance, bLumininance);
    return (L1 + 0.05) / (L2 + 0.05);
}

function channelLuminance(RGBnum: number): number {
    const threshold = 0.03928;
    const sRGB = (RGBnum/255);
    const lum = sRGB <= threshold ? (sRGB/12.92) : Math.pow((sRGB + 0.055)/1.055, 2.4);
    return lum;
}

function calcRelativeLuminance(RGBnum: Color): number {
    const relLuminance = (rc * channelLuminance(RGBnum.redChannel)) 
        + (gc * channelLuminance(RGBnum.greenChannel)) 
        + (bc * channelLuminance(RGBnum.blueChannel));
    return relLuminance;
}