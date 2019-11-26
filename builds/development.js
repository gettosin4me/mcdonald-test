const path = require('path');
const merge = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const base = require('./base');

const nodemonConf = {
    // Arguments to pass to the script being watched.
    args: [ 'demo' ],

    // What to watch.
    watch: path.resolve('./dist'),

    // Files to ignore.
    ignore: [ '*.js.map', './node_modules', './dist', './package.json' ],

    // Detailed log.
    verbose: true,

    // Node arguments.
    nodeArgs: [ '--inspect=9222' ],

    // If using more than one entry, you can specify
    // which output file will be restarted.
    script: './dist/app.bundle.js',

    // Extensions to watch
    ext: 'js,json'
};

const minifyPluginConf = {};

module.exports = merge(base, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    plugins: [
        new NodemonPlugin(nodemonConf),
        new MinifyPlugin(minifyPluginConf)
    ],
    target: 'node'
});
