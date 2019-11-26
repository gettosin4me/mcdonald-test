const path = require('path');
const merge = require('webpack-merge');
const base = require('./base');

module.exports = merge(base, {
    mode: 'production',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    target: 'node'
});
