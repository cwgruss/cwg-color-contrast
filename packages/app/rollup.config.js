import rimraf from "rimraf";
import nodeResolve from "rollup-plugin-node-resolve";
import postCSSUrl from 'postcss-url';
import loadz0r from "rollup-plugin-loadz0r";
import postcss from "rollup-plugin-postcss";
import { readFileSync } from "fs";

import simpleTS from './lib/simple-ts';
import ejsAssetPlugin from './lib/ejs-asset';
import createHTMLPlugin from './lib/create-html';
import cssModuleTypes from './lib/css-module-type';
import assetPlugin from './lib/asset-plugin';

// Delete 'dist/' folder
rimraf.sync("dist");

function buildConfig({ watch } = {}) {
  return {
    input: {
      bootstrap: "src/main/bootstrap.tsx"
    },
    output: {
      dir: "dist",
      format: "amd",
      entryFileNames: "[name].js",
      chunkFileNames: "[name]-[hash].js"
    },
    watch: { clearScreen: false },
    plugins: [
      {
        resolveFileUrl({ fileName }) {
          return JSON.stringify("/", fileName);
        }
      },
      postcss({
        minimize: true,
        modules: {
          generateScopedName: "[hash:base64:5]"
        },
        namedExports(name) {
          return name.replace(/-\w/g, val => val.slice(1).toUpperCase());
        },
        plugins: [
          postCSSUrl({
            url: "inline"
          })
        ]
      }),
      cssModuleTypes("src"),
      assetPlugin({
        initialAssets: [
          "./src/assets/Montserrat/montserrat-bold.woff2",
          "./src/assets/Montserrat/montserrat-regular.woff2",
        ]
      }),
      ejsAssetPlugin("./src/manifest.ejs", "manifest.json", {

      }),
    //   chunkNamePlugin(),
      loadz0r({
        loader: readFileSync('./lib/loadz0r-loader.ejs').toString()
      }),
      nodeResolve({
        mainFields: ["browser", "module", "main"],
        browser: true
      }),
      simpleTS("src/main", { watch }),
      createHTMLPlugin()
    ]
  };
}

export default function({ watch }) {
    return buildConfig({ watch })
}
