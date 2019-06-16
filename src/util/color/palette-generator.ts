import { Color, hsl } from './color.model';

const minimax = val => Math.min(100, Math.max(0, val))

const material = (base: Color) => {
    const {
        hue,
        saturation,
        lightness
    } = hsl(base);

    
};