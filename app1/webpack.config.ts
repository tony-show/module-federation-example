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
    port: 4001,
    open: true,
    historyApiFallback: true,
    hot: true,
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
  devtool: 'source-map',
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      remotes: {
        host: 'host@http://localhost:4000/remoteEntry.js',
        ui_kit: 'ui_kit@http://localhost:4002/remoteEntry.js',
      },
      exposes: {
        './RemoteComponent': './src/RemoteComponent.tsx',
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
