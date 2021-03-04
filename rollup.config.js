import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import url from '@rollup/plugin-url'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import package_ from './package.json'
require('dotenv').config()

const mode = process.env.NODE_ENV
const development = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning)

let endpoint = process.env.DEV_API_ENDPOINT
if (process.env.STAGE === 'staging') {
  endpoint = process.env.STAGING_API_ENDPOINT
}
if (process.env.STAGE === 'production') {
  endpoint = process.env.PROD_API_ENDPOINT
}

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode),
          'process.env.API_ENDPOINT': JSON.stringify(endpoint),
        },
      }),
      svelte({
        compilerOptions: {
          dev: development,
          hydratable: true,
        },
      }),
      url({
        sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
        publicPath: '/client/',
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
      }),
      commonjs(),

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead',
              },
            ],
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !development &&
        terser({
          module: true,
        }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode),
        },
      }),
      svelte({
        compilerOptions: {
          dev: development,
          generate: 'ssr',
          hydratable: true,
        },
        emitCss: false,
      }),
      url({
        sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
        publicPath: '/client/',
        emitFiles: false, // already emitted by client build
      }),
      resolve({
        dedupe: ['svelte'],
      }),
      commonjs(),
    ],
    external: [
      ...Object.keys(package_.dependencies),
      ...require('module').builtinModules,
    ],
    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        preventAssignment: true,
        values: {
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode),
        },
      }),
      commonjs(),
      !development && terser(),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },
}
