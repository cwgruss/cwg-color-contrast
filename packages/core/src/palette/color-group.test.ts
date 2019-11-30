import { assert, expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';

import { ColorGroup } from './color-group.model';
import { Color } from '../color/color.model';


describe('Palette', () => {
    describe('Color Group', () => {
        describe('Constructor', () => {          
            it('should be instantiable', () => {
                const colorGroup = new ColorGroup();
                assert.isDefined(colorGroup, 'ColorGroup is not instantiable');
            });

            it('should be instantiable with colors', () => {
                const colorGroup = new ColorGroup([
                    new Color('#FFF'),
                    new Color('#000'),
                ]);
                assert.isDefined(colorGroup, 'ColorGroup is not instantiable');
            });

            it('should have a defined length', () => {
                const colorGroup = new ColorGroup([
                    new Color('#FFF'),
                    new Color('#000'),
                ]);
                assert.equal(colorGroup.length, 2, 'ColorGroup does not have a defined length');
            });

            it('should have a defined length with zero colors', () => {
                const colorGroup = new ColorGroup();
                assert.equal(colorGroup.length, 0, 'ColorGroup does not have a defined length');
            });

            it('should extend the IterableIterator interface', () => {
                const colorGroup = new ColorGroup([
                    new Color('#FFF'),
                    new Color('#000'),
                ]); new ColorGroup();
                
                const spy = sinon.spy(colorGroup, 'next');
                for (const color of colorGroup) {
                    const rgb: string = color!.toRGB();
                    assert.isString(rgb);
                }

                assert(spy.called);
                assert(spy.calledThrice, '"next" function was not called three times');
            });
        });

        describe('Prototype', () => {
            let basicColorGroup: ColorGroup;

            before(() => {
                basicColorGroup = new ColorGroup([
                    new Color('#FFF'),
                    new Color('#CCC'),
                    new Color('#333'),
                    new Color('#000'),
                ])
            });

            it('should have Array method map', () => {
                const newColorGroup = basicColorGroup.map((color: Color) => {
                    let hex = color.toHex();
                    hex = hex.slice(0, -2) + 'FF';
                    return new Color(hex);
                });
                
                expect(newColorGroup).to.eql([
                    new Color('#FFF'),
                    new Color('#CCF'),
                    new Color('#33F'),
                    new Color('#00F')
                ]);
            });
        });
    });
});

