import { Color } from "./color.model";
import { clamp } from "../util/number-util";
import { HSL } from "./color.model";

function hslToString(hsl: HSL) {
    return `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
}

export function lighten(color: Color, ratio: number): Color {
    const {
        hue,
        saturation,
        lightness
    } = color.hsl();
    let nLightness = lightness + (lightness * ratio)
	const hsl = {
        hue,
        saturation,
        lightness: clamp(nLightness, 0, 100)
    };    
    return new Color(hslToString(hsl));
}

export function darken(color: Color, ratio: number): Color {
    const {
        hue,
        saturation,
        lightness
    } = color.hsl();
    let nLightness = lightness - (lightness * ratio)
	const hsl = {
        hue,
        saturation,
        lightness: clamp(nLightness, 0, 100)
    };    
    return new Color(hslToString(hsl));
}

export function saturate(color: Color, ratio: number): Color {
    const {
        hue,
        saturation,
        lightness
    } = color.hsl();
    let nSaturation = saturation + (saturation * ratio)
	const hsl = {
        hue,
        saturation: clamp(nSaturation, 0, 100),
        lightness,
    };    
    return new Color(hslToString(hsl));
}

export function desaturate(color: Color, ratio: number): Color {
    const {
        hue,
        saturation,
        lightness
    } = color.hsl();
    let nSaturation = saturation - (saturation * ratio)
	const hsl = {
        hue,
        saturation: clamp(nSaturation, 0, 100),
        lightness,
    };    
    return new Color(hslToString(hsl));
}
