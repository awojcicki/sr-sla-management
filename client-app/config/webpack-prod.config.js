const webpack = require('webpack');

module.exports = {
    output: {
        filename: '[name].[chunkhash].js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            mangle: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}