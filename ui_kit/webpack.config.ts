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
    port: 4002,
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ui_kit',
      filename: 'remoteEntry.js',
      exposes: {
        './components': './src/components/index.ts',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
