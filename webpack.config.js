var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: {
        /** put your file location here */
        Sample01Cube : "./app/Samples/Sample01_Cube.js",
        Sample02CubeSphere : "./app/Samples/Sample02_Cube_Sphere.js",
        Sample03CubesColorLight : "./app/Samples/Sample03_Cubes_Color_Light.js",
        Sample04OtherSample : "./app/Samples/Sample04_Other_Sample.js"
     },
     output: {
        path: path.resolve(__dirname, 'build/Samples'),
        filename: '[name].bundle.js'    
     },
     module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel-loader',
              query: {
                  presets: ['es2015']
              }
          }
      ]
  },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };