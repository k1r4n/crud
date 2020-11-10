/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');

module.exports = () => ({
    mode: "development",
    target: 'web',
    entry: path.resolve(srcPath, 'js', 'index.jsx'),
    output: {
        path: distPath,
        filename: 'js/[name].[contenthash].js',
        publicPath: '/'
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.jsx', '.json']
    },
    module: {
        rules: [{
                // test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: "file-loader",
                options: {
                    name: "media/[name].[ext]",
                },
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: "fonts/[name].[ext]",
                },
            },
            {
                test: /\.(txt|pem)$/,
                loader: 'raw-loader',
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.(css|scss)$/,
                exclude: /\.module\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.module\.(css|scss)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[hash:base64:5]',
                            },
                            sourceMap: true,
                            importLoaders: 2,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader'
                    },
                ]
            },
            {
                test: /\.(js|jsx)$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        emitWarning: true,
                    },
                }],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 7000,
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${srcPath}/index.html.template`,
            title: 'Crud',
        }),
    ],
});