import { Color } from './color.model';
import { assert } from 'chai';
import 'mocha';

describe('Color', () => {
    describe('Color Model', () => {
        describe('Constructor', () => {          
            it('should be instantiable', () => {
                const color = new Color();
                assert.isDefined(color, 'Color is not instantiable');
            });

            it('should be instantiable with HEX value', () => {
                const color = new Color('#FFF');
                assert.isDefined(color, 'Color is not instantiable');
                assert.isAbove(color.redChannel, -1, 'The red channel has not been set.');
                assert.isAbove(color.greenChannel, -1, 'The green channel has not been set.');
                assert.isAbove(color.blueChannel, -1, 'The blue channel has not been set.');
            });
        });

        describe('Hexadecimal', () => {
            let whiteHex: Color;
            let whiteRGB: Color;
            beforeEach(function(done) {
                whiteHex = new Color('#FFF');
                whiteRGB = new Color('rgb(255, 255, 255)');
                done();
            });

            it('should be able to read a HEX color as HEX', (done) => {
               const hex = whiteHex.toHex();
               assert.strictEqual(hex, '#FFFFFF');
               done();
            });

            it('should be able to read a HEX color as HexA', (done) => {
                const hex = whiteHex.toHexA();
                assert.strictEqual(hex, '#FFFFFF1');
                done();
             });

            it('should be able to read a RGB color as HexA', (done) => {
                const hex = whiteRGB.toHexA();
                assert.strictEqual(hex, '#FFFFFF1');
                done();
             });
        });
    });
});

