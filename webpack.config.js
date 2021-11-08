const HtmlWebpackPlugin = require("html-webpack-plugin")
const CSSExtract = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "P5JS Sketch"
        }),
        new CSSExtract({
            filename: "style.css"
        })
    ],
    module: {
        rules: [

            // CSS
            {
                test: /\.css$/,
                use: [CSSExtract.loader, "css-loader"]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext][query]"
                }
            },

            // Fonts
            {
                test: /\.(ttf|otf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext][query]"
                }
            },

            // Shaders
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                type: "asset/resource",
                generator: {
                    filename: "assets/[name][ext][query]"
                }
            }
        ]
    }
}