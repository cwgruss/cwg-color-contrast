import { Color, ColorString } from "./color.model";

interface ColorParam {
    key: string,
    value: string | Color
}

export class ColorPalette {
  private _paletteName: string;
  private _colors: Map<string, Color> = new Map();

  constructor(name?: string, ...colors: ColorParam[]) {
      this._paletteName = name || generateUUID();
      if(colors && colors.length) {
          colors.forEach((color: ColorParam) => this._addColor(color.key, color.value));
      }
  }

  get name(): string {
      return this._paletteName;
  }

  get colors(): Color[] {
    return Array.from(this._colors.values());
  }

  protected _addColor(key: string, color: string | Color): string {
    let uniqueKey = key || generateUUID();
    if (typeof color === "string") {
      this._colors.set(uniqueKey, new Color(color));
    } else if (color instanceof Color) {
      this._colors.set(uniqueKey, color);
    }
    return uniqueKey;
  }

  protected _getColor(key: string): Color {
    return this._colors.get(key);
  }

  protected _hasColor(key: string): boolean {
    return this._colors.has(key);
  }

  protected _removeColor(key: string): boolean {
    return this._colors.delete(key);
  }

  protected _clearColors(): Map<string, Color> {
    this._colors.clear();
    return this._colors;
  }

  _toJSON(): {key: string, color: Color }[] {
      let arr = [];
      for (const colorKey of this._colors.keys()) {
          arr.push({
              key: colorKey,
              color: this._colors.get(colorKey)
          });
      }
      return arr;
  }
}

function generateUUID(): string {
  return create_UUID() as string;
}

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}
