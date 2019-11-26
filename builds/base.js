const path = require('path');
const webpack = require('webpack');
const WebpackNodeExternal = require('webpack-node-externals');

const paths = {
    js: path.resolve(__dirname, './../bin/app.js'),
    files: [ './package.json', './.gitignore' ],
    test: {
        integration: './test/integration/**/*.js',
        unit: './test/unit/**/*.js'
    }
};

exports.entry = {
    app: paths.js
};

exports.resolve = {
    modules: [ path.resolve(__dirname, '../assets/js'), 'node_modules' ]
}

exports.module = {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader'
                }
            ]
        }
    ]
};

exports.plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
];

exports.externals = [
    WebpackNodeExternal()
];

exports.target = 'node';

exports.node = {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false // and __filename return blank or /
};
