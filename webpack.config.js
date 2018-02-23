var path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
   entry: "./src/1.ts",
   output: {
       filename: "bundle.js",
       path: path.resolve(__dirname, 'dist'),

       devtoolModuleFilenameTemplate: '[absolute-resource-path]'

   },
   resolve: {
       extensions: [".js", ".ts"],


        alias: {
            "common": resolve('src/common'),
            "pojo": resolve('src/pojo'),
        },
   },

   devtool : '#inline-source-map',

   module: {
       loaders: [
            { 
            test: /\.ts$/, 
            loader: ["babel-loader","ts-loader" ]
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
   },
   
   target: 'node',
   

   
   
}