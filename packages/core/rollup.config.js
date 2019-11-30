import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es'
		},
		{
			file: pkg.browser,
			format: 'iife',
			name: 'cwgColorContrast'
		}
    ],
    external : [
        ...Object.keys(pkg.dependencies || {})
    ],
    plugins: [
        typescript({
			clean: true,
            typescript: require('typescript')
        }),
        terser(),
    ]
}