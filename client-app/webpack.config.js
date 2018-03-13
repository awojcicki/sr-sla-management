const webpack = require('webpack');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');

module.exports = function (env) {

    const commonConfig = {
        entry: {
            app: './src/app.js',
            libs: './src/libs.js'
        },
        output: {
            path: path.resolve(__dirname, './../public/js'),
            publicPath: 'public/js'
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: ['pug-loader', 'pug-html-loader']
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'html-loader'
                    }
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env'],
                            plugins: ['array-includes']
                        }
                    }
                }
            ]
        },
        plugins: [
            new ManifestPlugin({
                fileName: 'assets-manifest.json'
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ]
    };

    const envConfig = require(`./config/webpack-${env}.config.js`);

    return merge(commonConfig, envConfig);

}