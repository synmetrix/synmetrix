const react = require('@neutrinojs/react');
const compileLoader = require('@neutrinojs/compile-loader');
const { join } = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const __DEV__ = process.env.NODE_ENV !== 'production';
const GRAPHQL_SERVER_URL = __DEV__ ? '/graphql' : process.env.GRAPHQL_SERVER_URL;
const GRAPHQL_WS_URL = __DEV__ ? 'ws://localhost:5000/graphql' : process.env.GRAPHQL_WS_URL;

module.exports = {
  use: [
    react({
      hot: true,
      html: {
        title: 'MLCraft',
      },
      babel: {
        plugins: [
          [
            'prismjs',
            {
              languages: ['sql'],
              plugins: ['line-numbers'],
              theme: 'twilight',
              css: true
            }
          ],
          'react-hot-loader/babel',
          [
            'module-resolver',
            {
              root: ['./src'],
            },
          ],
          '@babel/plugin-proposal-nullish-coalescing-operator'
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: 3,
            },
          ],
        ],
      },
      devServer: {
        port: 3000,
        proxy: {
          '/graphql': 'http://localhost:5000/',
        },
      },
    }),
    compileLoader({
      include: [
        join(__dirname, 'node_modules/vega-lite')
      ],
      babel: {
        plugins: [
          '@babel/plugin-proposal-nullish-coalescing-operator'
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: 3,
            },
          ],
        ],
      },
      ruleId: 'vega-compile',
      useId: 'babel',
    }),
    (neutrino) => {
      neutrino.config
        .plugin('monaco')
        .use(MonacoWebpackPlugin, [{
          languages: ['javascript'],
        }]);
    },
    (neutrino) => {
      neutrino.config
        .plugin('ignore')
        .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]);
    },
    (neutrino) => {
      if (__DEV__) {
        neutrino.config.plugin('analyzer').use(BundleAnalyzerPlugin);
      }
    },
    neutrino => {
      neutrino.config.plugin('env').use(webpack.DefinePlugin, [{
        'process.env': {
          GRAPHQL_SERVER_URL: JSON.stringify(GRAPHQL_SERVER_URL),
          GRAPHQL_WS_URL: JSON.stringify(GRAPHQL_WS_URL),
          __DEV__: JSON.stringify(__DEV__),
        },
      }]);
    }
  ],
};
