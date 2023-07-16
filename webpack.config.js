import { resolve as _resolve } from "path"
import path from "path"

const __dirname = path.resolve()

const config = {
	entry: "./src/index.ts",
	output: {
		path: _resolve(__dirname, 'dist', 'xtend'),
		filename: "vajroPlugin.js",
		library: "vajroPlugin"
	},
	module: {
		rules: [
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: "babel-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	devtool: "source-map"
}

export default config
