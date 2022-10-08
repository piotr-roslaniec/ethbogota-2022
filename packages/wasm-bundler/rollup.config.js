import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import wasm from '@rollup/plugin-wasm';

import pkg from './package.json';

export default [
    {
        input: 'index.js',
        output: {
            name: 'wasmBundler',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(),
            commonjs(),
            wasm(),
        ]
    },
];