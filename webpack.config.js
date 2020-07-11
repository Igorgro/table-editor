var HtmlWebpackPlugin =  require('html-webpack-plugin');

const frontConfig = {
    entry: './src/app/index.tsx',
    mode: 'development',
    target: 'web',
    output: {
        filename: './app/js/main.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test : /\.css$/,
                use:['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'app/fonts/',
                            publicPath: 'fonts'
                        }
                    }
                ]
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin ({
            filename: 'app/index.html',
            template : 'src/app/html/index.html'
        })
    ]
}

const backConfig = {
    entry: './src/index.ts',
    mode: 'development',
    target: 'electron-main',
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
}

module.exports = [frontConfig, backConfig];
