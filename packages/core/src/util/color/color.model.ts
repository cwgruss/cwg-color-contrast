export const hexValueRegex = /^(?:#|0x)([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
export const rgbValueRegex = /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\s?\)$/;
export const rgbaValueRegex = /^rgba\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?((?:\d\.)?\d{1,3})\)$/;
export const hslValueRegex = /^hsl\((\d+)\%?,\s*([\d.]+)\%?,\s*([\d.]+)\%?\)$/;

export type ColorString = string;
export type ColorValue = string | number;

export class Color {
  private _red: number;
  private _green: number;
  private _blue: number;
  private _alpha: number;


  constructor(colorStr?: ColorString);
  constructor(red?: ColorValue, green?: ColorValue, blue?: ColorValue);
  constructor(
    red?: ColorValue,
    green?: ColorValue,
    blue?: ColorValue,
    alpha?: number
  ) {
    if (isString(red)) {
      red = red as string;
      if (isHexValue(red)) {
        let _str = red.substr(1);
        if (_str.length === 3) {
          _str = Array.from(_str)
            .map((char: string) => char + char)
            .join("");
        }
        this._red = parseInt(_str.substr(0, 2), 16);
        this._green = parseInt(_str.substr(2, 2), 16);
        this._blue = parseInt(_str.substr(4, 2), 16);
        this._alpha = 1;
      }


      if (isHSLValue(red)) {
        const res = hslValueRegex.exec(red);
        const hue = parseInt(res[1]);
        const saturation = parseInt(res[2], 10) / 100;
        const lightness = parseInt(res[3], 10) / 100;
        
        let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation,
          x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1)),
          m = lightness - chroma / 2,
          redChannel = 0,
          greenChannel = 0,
          blueChannel = 0;

        if (0 <= hue && hue < 60) {
          redChannel = chroma;
          greenChannel = x;
          blueChannel = 0;
        } else if (60 <= hue && hue < 120) {
          redChannel = x;
          greenChannel = chroma;
          blueChannel = 0;
        } else if (120 <= hue && hue < 180) {
          redChannel = 0;
          greenChannel = chroma;
          blueChannel = x;
        } else if (180 <= hue && hue < 240) {
          redChannel = 0;
          greenChannel = x;
          blueChannel = chroma;
        } else if (240 <= hue && hue < 300) {
          redChannel = x;
          greenChannel = 0;
          blueChannel = chroma;
        } else if (300 <= hue && hue < 360) {
          redChannel = chroma;
          greenChannel = 0;
          blueChannel = x;
        }
        this._red = Math.round((redChannel + m) * 255);
        this._green = Math.round((greenChannel + m) * 255);
        this._blue = Math.round((blueChannel + m) * 255);
        this._alpha = 1;        
      }

      if (isRGBValue(red) || isRGBAValue(red)) {
        const res = rgbValueRegex.exec(red);
        this._red = parseInt(res[1], 10);
        this._green = parseInt(res[2], 10);
        this._blue = parseInt(res[3], 10);
        this._alpha = res[5] ? parseFloat(res[5]) : 1;
      }

    } else {
      this._red = <number>red;
      this._green = <number>green;
      this._blue = <number>blue;
      this._alpha = <number>alpha || 1;
    }
  }

  get redChannel(): number {
    return this._red;
  }
  get greenChannel(): number {
    return this._green;
  }
  get blueChannel(): number {
    return this._blue;
  }

  toHex(): string {
    let red = this._red.toString(16);
    let green = this._green.toString(16);
    let blue = this._blue.toString(16);

    red = red.length === 1 ? `0${red}` : red;
    green = green.length === 1 ? `0${green}` : green;
    blue = blue.length === 1 ? `0${blue}` : blue;
    return `#${red}${green}${blue}`;
  }

  toHexA(): string {
    let alpha = this._alpha.toString(16);
    alpha = alpha.length === 1 ? `0${alpha}` : alpha;
    return `${this.toHex()}${this._alpha}`;
  }

  toRGB(): string {
    return `rgb(${this._red}, ${this._green}, ${this._blue})`;
  }

  toRGBA(): string {
    return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})`;
  }

  toHSL(): string {
    /* R,G,B fractions of 1. */
    let r = this._red / 255;
    let g = this._green / 255;
    let b = this._blue / 255;

    /* Find greatest/smallest channel values. */
    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);

    /* The difference between channels */
    let delta = max - min,
      hue = 0,
      sat = 0,
      light = 0;

    /* Calculate hue */
    if (delta === 0) {
      hue = 0;
    } else if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }

    hue = Math.round(hue * 60);
    hue = hue < 0 ? (hue += 360) : hue;

    /* Calculate lightness*/
    light = (max + min) / 2;

    /* Calculate saturation */
    sat = delta === 0 ? 0 : delta / (1 - Math.abs(2 * light - 1));

    sat = +(sat * 100).toFixed(1);
    light = +(light * 100).toFixed(1);

    return `hsl(${hue}, ${sat}%, ${light}%)`;
  }
}

export function isHexValue(value: string): boolean {
  if (isString(value)) {
    return hexValueRegex.test(value);
  }
  return false;
}

export function isRGBValue(value: string): boolean {
  if (isString(value)) {
    return rgbValueRegex.test(value);
  }
  return false;
}

export function isRGBAValue(value: string): boolean {
  if (isString(value)) {
    return rgbaValueRegex.test(value);
  }
  return false;
}

export function isHSLValue(value: string): boolean {
  if (isString(value)) {
    return hslValueRegex.test(value);
  }
  return false;
}

export function hsl(
  color: Color
): { hue: number; saturation: number; lightness: number } {
  const res = hslValueRegex.exec(color.toHSL());
  return {
    hue: +res[1],
    saturation: +res[2],
    lightness: +res[3]
  };
}

export function rgb(
  color: Color
): { red: number; green: number; blue: number } {
  const res = rgbValueRegex.exec(color.toRGB());
  
  return {
    red: +res[1],
    green: +res[2],
    blue: +res[3]
  };
}

function isString(value: any): boolean {
  return typeof value === "string";
}
