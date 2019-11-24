import { ColorGroup } from "./color-group.model";
import { Color } from "../color/color.model";

export class Palette extends ColorGroup {
    constructor(private _name: string, _colors: Color[]) {
        super(_colors);
    }

    averageLuminostiy(): number {
        const sum = this.reduce((accumulation: number, currentValue: Color) => {
            return accumulation + currentValue.luminosity();
        }, 0)

        return sum / this.length;
    }
}