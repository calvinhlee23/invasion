module.exports = {
  entry: "./lib/root.js",
  output: {
  	filename: "./bundle.js"
  },
  resolve: {
     extensions: ['', '.js', '.jsx']
   },
   module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel',
         query: {
           presets: ['es2015']
         }
       },
       {
         test: /\.node$/,
         loader: 'node-loader'
       }
     ]
   },
   devtool: 'source-maps'
 };
