import { ColorGroup } from "./color-group.model";
import { Color } from "../color/color.model";

export class Palette extends ColorGroup {
    constructor(private _name: string, _colors: Color[]) {
        super(_colors);
    }
}