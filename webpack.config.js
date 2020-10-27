const fs = require("fs")
const {BannerPlugin, optimize} = require("webpack")

module.exports = {
	entry: __dirname + "/src/main.js",
	mode: "development",
	// mode: "production",
	output: {
		filename: "awesome.plugin.js",
		path: __dirname + "/build/",
		library: "SaveToRedux",
		libraryTarget: "commonjs2",
		libraryExport: "default"
	},
	plugins: [
		new BannerPlugin({
			raw: true,
			banner: fs.readFileSync(__dirname + "/config/banner.txt", { encoding: "utf-8" })
		}),
		new optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
	],
	devtool: "inline-source-map",
	module: {
		rules: [{
			test: /\.js$/,
			exclude: ["/node_modules/"],
			use: [{
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env", "@babel/preset-react"],
					plugins: ["@babel/plugin-proposal-class-properties"],
				},
			}],
		}],
	},
	resolve: {
		alias: {
			"runtime-imports": __dirname + "/src/runtime-imports"
		}
	}
}