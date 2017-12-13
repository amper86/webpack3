const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const proj_path         = require('./config/path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let sourcemap, watcher;

if (process.env.NODE_ENV==='production') {
    sourcemap = 'source-maps';
    watcher   = false
} else {
    sourcemap = 'eval';
    watcher   = true
}

console.clear();
console.log('Build for production started');

module.exports = {
    // Entry directories
    entry  : {
        index      : proj_path.pages.index    + '/index.js',
	    blog       : proj_path.pages.blog     + '/blog.js',
	    about      : proj_path.pages.about     + '/about.js',
	    works      : proj_path.pages.works     + '/works.js'
    }, 
    // Output dirrectory
    output : {
        path     : proj_path.build ,
        filename : './js/[name].js'
    },
    // watching file
    watch     : watcher   ,
    // Using source maps
    devtool   : sourcemap ,
    // Settings for webpack-dev-server
    devServer : {
        contentBase      : path.join(__dirname, './dist'),
        open             : true  ,
        watchContentBase : true  ,
        port             : 9660
    },
    // Removes the extension
    resolve: {
        extensions: ['.js', '.pug', '.scss', '.less', '.jsx', '.vue']
    },
	// Using plugins for webpack
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            filename : 'index.html'        ,
            chunks   : ['index', 'common'] ,
            template : proj_path.pages.index + '/index.pug'
        }),
        new HtmlWebpackPlugin({
            filename : 'blog.html'        ,
            chunks   : ['blog', 'common'] ,
            template : proj_path.pages.blog + '/blog.pug'
        }),
        new HtmlWebpackPlugin({
            filename : 'about.html'        ,
            chunks   : ['about', 'common'] ,
            template : proj_path.pages.about + '/about.pug'
        }),
        new HtmlWebpackPlugin({
            filename : 'works.html'        ,
            chunks   : ['works', 'common'] ,
            template : proj_path.pages.works + '/works.pug'
        }),
        new CleanWebpackPlugin('dist'),
        new ExtractTextPlugin('./css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common'
        }),
        new webpack.ProvidePlugin({
            $      : 'jquery',
            jQuery : 'jquery'
        }),
        new UglifyJSPlugin()
    ],
    // Using modules and loaders
    module: {
        rules: [
            {
                test    : /\.pug$/,
                loader  : 'pug-loader',
                options : {
                    pretty : true
                }
            },
            {
                test : /\.scss$/,
                use  : ExtractTextPlugin.extract({
                    publicPath : '../',
                    use        : [{
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader', options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test : /\.css$/,
                use  : ExtractTextPlugin.extract({
                    fallback : 'style-loader',
                    use      : [{
                        loader: 'css-loader', options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                test    : /\.js$/        ,
                loader  : 'babel-loader' ,
                options : {
            	    presets : ['env', 'es2015', 'stage-1']
                } 
            },
            {
                enforce : "pre"          ,
                test    : /\.js$/        ,
                exclude : /node_modules/ ,
                loader  : "eslint-loader",
                options : {
                    fix: true
                }
            },
            {
                test    : /\.(jpg|png|svg)$/ ,
                loader  : 'file-loader'      ,
                options : {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    }
};