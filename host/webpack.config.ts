import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin

export default {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src', 'index.ts'),
  },
  output: {
    filename: '[name].js',
    publicPath: 'auto',
  },
  devServer: {
    port: 4000,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  module: {
    rules: [
      {
        test: /\.j|tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-typescript',
                {
                  isTSX: true,
                  allExtensions: true,
                },
              ],
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  devtool: 'source-map',
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        host: 'host@http://localhost:4000/remoteEntry.js',
        app1: 'app1@http://localhost:4001/remoteEntry.js',
        ui_kit: 'ui_kit@http://localhost:4002/remoteEntry.js',
      },
      exposes: {
        './posts': './src/services/posts.ts',
        './store': './src/store/store.tsx',
      },
      shared: {
        'react-redux': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
