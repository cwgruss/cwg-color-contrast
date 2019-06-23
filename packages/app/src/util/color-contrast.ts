import { contrastRatio, Color, isHexValue, ColorPalette } from '@color-contrast/core/dist';

let uuid = 0;

export class ColorContrastWorker {
    private _id: number = uuid++;
    private _background: Color | undefined;
    private _foreground: Color | undefined;

    constructor() {
        console.log(`Web worker ${this._id} initated!`);
    }

    init(): void {
        console.log('initializing...');
        
    }

    contrastRatio(backgroundStr: string, foregroundStr: string): number {
        const background = new Color(backgroundStr);
        const foreground = new Color(foregroundStr);
        if(!background){
            console.error(`Invalid color: ${backgroundStr} is not a valid color input.`);
        }
        if(!foreground ) {
            console.error(`Invalid color: ${foregroundStr} is not a valid color input.`);
        }
        return +contrastRatio(foreground, background);
    }
}
