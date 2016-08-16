var webpack = require('webpack')
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var pxtorem = require('postcss-px2rem');
var cssLoader = { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" };
var postcssConfig = [autoprefixer({ browsers: ["android 4", "iOS 6"] }), precss, pxtorem({ remUnit: 75 })];
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: '/static/',
        filename: '[name].js?[hash:8]'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            cssLoader,
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    vue: {
        loaders: {
            css: 'style-loader!css-loader!postcss-loader',
            scss: 'style-loader!css-loader!postcss-loader',
        },
        postcss: function () {
            return postcssConfig;
        }
    },
    postcss: function () {
        return postcssConfig;
    },
    plugins: [
        new HtmlWebpackPlugin({
//            filename: path.resolve(__dirname, 'index.html'),
            filename: '../index.html',
            template: './src/index.html'
        })
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = module.exports.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
} else {
    module.exports.devtool = '#source-map'
    module.exports.devServer = {
        proxy: {
            '/api/*': {
                target: 'http://m.bd-ego.com/',
            },
        }
    }
}
