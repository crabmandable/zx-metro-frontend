module.exports = {
  mode: "development",
  entry:  __dirname + "/src/index.js",
  module: {
      rules: [
        {
          test: /.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
            test: /\.(png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader",
            options: {
                publicPath: "frontend",
            }
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }
      ]
  },
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  }
}
