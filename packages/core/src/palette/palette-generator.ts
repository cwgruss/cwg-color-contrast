// import { Color, hsl, rgb } from '../color/color.model';

// const minimax = (val: number) => Math.min(100, Math.max(0, val))

// export function mix(color1: Color, color2: Color, percentage: number): Color {
//     percentage = (typeof percentage === 'undefined') ? 50 : percentage;

//     const weight = (percentage / 100.0);
//     const w = (weight * 2 - 1);
//     const a = 0;

//     const w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
//     const w2 = (1 - w1);

//     const r = Math.round(rgb(color1).red * w1 + rgb(color2).red * w2);
//     const g = Math.round(rgb(color1).green * w1 + rgb(color2).green * w2);
//     const b = Math.round(rgb(color1).blue * w1 + rgb(color2).blue * w2);

//     return new Color(r,g,b);
// }

// function shade(base: Color, percentage: number): Color {
//     return mix(new Color('#000'), base, percentage);
// }

// function tint(base: Color, percentage: number): Color {
//     return mix(new Color('#FFF'), base, percentage);
// }

// export function shades(base: Color, steps: number): Color[] {
//     let shades: Color[] = [];
//     let percentage = 100;
//     let index = steps;

//     while(index <= 100 && index >=0) {
//         shades[index] = shade(base, percentage);
//         percentage -= (100/steps);
//         index--;
//     }
    
//     return shades;
// };

// export function tints(base: Color, steps: number): Color[] {
//     let tints: Color[] = [];
//     let percentage = 100;
//     let index = steps;

//     while(index <= 100 && index >=0) {
//         tints[index] = tint(base, percentage);
//         percentage -= (100/steps);
//         index--;
//     }
    
//     return tints;
// };