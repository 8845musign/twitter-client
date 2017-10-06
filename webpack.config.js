const path = require('path')

module.exports = {
  target: 'electron',
  entry: {
    'main': './src/app.js',
    'renderer/app': './src/renderer/app.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map'
}
