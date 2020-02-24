var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: true
    },
    plugins: [
        new webpack.ProvidePlugin({
            // $: "jquery",
            // jQuery: "jquery",
            //swal: "sweetalert"
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'bundle.css', },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'sass-loader', options: {
                            sassOptions: {
                                includePaths: ['./node_modules']
                            }
                        }
                    },
                ]
            },
            // {
            //     test: /\.s[ac]ss$/i,
            //     use: [
            //       'style-loader',
            //       'css-loader',
            //       'sass-loader',
            //     ],
            //   },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','.scss'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

