import { Color } from "../color/color.model";

export class ColorGroup implements IterableIterator<Color> {
  private _pointer = 0;

  
  constructor(private _colors: Color[] = []) {}
  
  [Symbol.iterator](): IterableIterator<Color> {
    return this;
  }
  
  get length(): number {
    return this._colors.length;
  }

  [Symbol.unscopables](): { copyWithin: boolean; entries: boolean; fill: boolean; find: boolean; findIndex: boolean; keys: boolean; values: boolean; } {
    throw new Error("Method not implemented.");
  }

  pop(): Color {
    return Array.prototype.pop.call([...this._colors]);
  }

  push(...items: Color[]): number {
    return Array.prototype.push.call([...this._colors], ...items);
  }

  concat(...items: ConcatArray<Color>[]): Color[];
  concat(...items: (Color | ConcatArray<Color>)[]): Color[];
  concat(...items: any[]) {
    return Array.prototype.concat.call([...this._colors], ...items);
  }

  reverse(): Color[] {
    return Array.prototype.reverse.call([...this._colors]);
  }

  shift(): Color {
    return Array.prototype.shift.call([...this._colors]);
  }
  slice(start?: number, end?: number): Color[] {
    return Array.prototype.slice.call([...this._colors], start, end);
  }

  sort(compareFn?: (a: Color, b: Color) => number): Color[] {
    return Array.prototype.sort.call([...this._colors], compareFn);
  }

  unshift(...items: Color[]): number {
    return Array.prototype.unshift.call([...this._colors], ...items);
  }
  indexOf(searchElement: Color, fromIndex?: number): number {
    return Array.prototype.indexOf.call([...this._colors], searchElement, fromIndex);
  }
  lastIndexOf(searchElement: Color, fromIndex?: number): number {
    return Array.prototype.lastIndexOf.call([...this._colors], searchElement, fromIndex);
  }
  every(callbackfn: (value: Color, index: number, array: Color[]) => unknown, thisArg?: any): boolean {
    return Array.prototype.every.call([...this._colors], callbackfn);
  }
  some(callbackfn: (value: Color, index: number, array: Color[]) => unknown, thisArg?: any): boolean {
    return Array.prototype.some.call([...this._colors], callbackfn);
  }
  forEach(callbackfn: (value: Color, index: number, array: Color[]) => void, thisArg?: any): void {
    return Array.prototype.forEach.call([...this._colors], callbackfn);
  }

  map<Color>(callbackfn: (value: Color, index: number, array: Color[]) => Color, thisArg?: any): Color[] {
    return <Array<Color>>Array.prototype.map.call([...this._colors], callbackfn, thisArg);
  }

  filter<S extends Color>(callbackfn: (value: Color, index: number, array: Color[]) => value is S, thisArg?: any): Color[];
  filter(callbackfn: (value: Color, index: number, array: Color[]) => unknown, thisArg?: any): Color[];
  filter(callbackfn: any, thisArg?: any) {
    return Array.prototype.filter.call([...this._colors], callbackfn, thisArg);
  }
  
  reduce(callbackfn: (previousValue: Color, currentValue: Color, currentIndex: number, array: Color[]) => Color): Color;
  reduce(callbackfn: (previousValue: Color, currentValue: Color, currentIndex: number, array: Color[]) => Color, initialValue: Color): Color;
  reduce<U>(callbackfn: (previousValue: U, currentValue: Color, currentIndex: number, array: Color[]) => U, initialValue: U): U;
  reduce(callbackfn: any, initialValue?: any) {
    return Array.prototype.reduce.call([...this._colors], callbackfn, initialValue);
  }

  find<S extends Color>(predicate: (this: void, value: Color, index: number, obj: Color[]) => value is S, thisArg?: any): S;
  find(predicate: (value: Color, index: number, obj: Color[]) => unknown, thisArg?: any): Color;
  find(predicate: any, thisArg?: any) {
    return Array.prototype.find.call([...this._colors], predicate, thisArg);
  }

  fill(value: Color, start?: number, end?: number): Color[] {
    return Array.prototype.fill.call([...this._colors], value, start, end);
  }

  copyWithin(target: number, start: number, end?: number): Color[] {
    return Array.prototype.copyWithin.call([...this._colors], target, start, end);
  }
  entries(): IterableIterator<[number, Color]> {
    return Array.prototype.entries.call([...this._colors]);
  }
  keys(): IterableIterator<number> {
    return Array.prototype.keys.call([...this._colors]);
  }
  values(): IterableIterator<Color> {
    return Array.prototype.values.call([...this._colors]);
  }

  public get(index: number): Color {
    return this._colors[index];
  }

  public add(color: Color): ColorGroup {
    const _newArr = addColor(this._colors, color);
    return new ColorGroup(_newArr);
  }

  public remove(color: Color | number): ColorGroup {
    let _newArr: Color[];
    if(typeof color === 'number') {
        _newArr = removeColor(this._colors, null, color);
    } else {
        _newArr = removeColor(this._colors, color);
    }
    return new ColorGroup(_newArr);
  }

  public update(index: number, color: Color): ColorGroup {
    const _newArr = updateColorAtIndex(this._colors, index, color);
    return new ColorGroup(_newArr);
  }

  public next(): IteratorResult<Color> {
    let colors = this._colors;

    if (this._pointer < colors.length) {
      return {
        done: false,
        value: colors[this._pointer++]
      };
    } else {
      return {
        done: true,
        value: new Color(undefined)
      }
    }
  }
}

function addColor(colors: Color[], color: Color): Color[] {
    return [
        ...colors,
        color
    ];
}

function removeColor(colors: Color[], color: Color | null, index?: number): Color[] {
    let idx: number = -1;
    if (index && !color) {
        idx = index;
    } else if (color){
        idx = colors.indexOf(color);
    }
  return [
    ...colors.slice(0, idx),
    ...colors.slice(idx + 1)
  ];
}

function updateColorAtIndex(colors: Color[], index: number, color: Color): Color[] {
  if(colors[index]){
    return [
      ...colors.slice(0, index),
      Object.assign({}, color),
      ...colors.slice(index + 1)
    ];
  }
  throw new Error('Cannont find color at index');
}
