import { Color } from './color.model';
import { assert } from 'chai';

describe('Color', () => {
    describe('Color Model', () => {
        it('should be instantiable', () => {
            const color = new Color();
            assert.isDefined(color, 'Color is not instantiable');
        });
    });
});

