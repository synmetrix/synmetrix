const react = require('@neutrinojs/react');
const compileLoader = require('@neutrinojs/compile-loader');
const { join } = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const getEnv = (envValue, defaultValue) => {
  if (typeof(envValue) === 'undefined') {
    return defaultValue;
  }

  return envValue;
};

const __DEV__ = process.env.NODE_ENV !== 'production';
const GRAPHQL_SERVER_URL = getEnv(process.env.GRAPHQL_SERVER_URL, 'http://localhost:8080/v1/graphql');
const GRAPHQL_PLUS_SERVER_URL = getEnv(process.env.GRAPHQL_PLUS_SERVER_URL, 'http://localhost:8081');
const GRAPHQL_WS_URL = getEnv(process.env.GRAPHQL_WS_URL, 'ws://localhost:8080/v1/graphql');
const CUBEJS_MYSQL_API_URL = getEnv(process.env.CUBEJS_MYSQL_API_URL, 'localhost:13306');
const CUBEJS_PG_API_URL = getEnv(process.env.CUBEJS_PG_API_URL, 'localhost:15432');
const AUTH_PREFIX = getEnv(process.env.AUTH_PREFIX, '/~');

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
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-nullish-coalescing-operator',
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
        hot: false,
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
          GRAPHQL_PLUS_SERVER_URL: JSON.stringify(GRAPHQL_PLUS_SERVER_URL),
          GRAPHQL_WS_URL: JSON.stringify(GRAPHQL_WS_URL),
          AUTH_PREFIX: JSON.stringify(AUTH_PREFIX),
          CUBEJS_MYSQL_API_URL: JSON.stringify(CUBEJS_MYSQL_API_URL),
          CUBEJS_PG_API_URL: JSON.stringify(CUBEJS_PG_API_URL),
          __DEV__: JSON.stringify(__DEV__),
        },
      }]);
    }
  ],
};
