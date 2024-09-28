import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"], // Permite importar archivos sin especificar la extensión
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(process.cwd(), "dist"), // Utiliza process.cwd() para obtener la ruta correcta
    clean: true,
  },
  devServer: {
    static: path.resolve(process.cwd(), "dist"),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
