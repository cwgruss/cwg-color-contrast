/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { readFileSync } from "fs";
import CharacterSet from "characterset";

import ejs from "ejs";
  import {
    findChunkWithName,
    findAssetWithName,
    getCodeAndDependencies
  } from "./bundle-utils";


function generateShell(bundle, templatePath) {

  const charset = new CharacterSet("abcdefghijklmnopqrstuvwxyz 12345678910");
  const template = readFileSync(templatePath, { encoding: "utf8" });

  return ejs.render(template, {
    title: "JUXTAPOSE — a color-contrast checker",
    description:
      "Help your crew navigate space by marking out the black holes using proxx, your proximity scanner.",
    locale: "en_US",
    fonts: [
      {
        asset: findAssetWithName(bundle, "montserrat-regular.woff2").fileName,
        weight: 400,
        inline: readFileSync(
          "src/assets/Montserrat/montserrat-regular.woff2"
        ).toString("base64"),
        inlineRange: charset.toHexRangeString()
      },
      {
        asset: findAssetWithName(bundle, "montserrat-bold.woff2").fileName,
        weight: 700,
        inline: readFileSync(
          "src/assets/Montserrat/montserrat-bold.woff2"
        ).toString("base64"),
        inlineRange: charset.toHexRangeString()
      },
    ],
  });
}

export default function createHTMLPlugin() {
  const templatePath = "src/index.ejs";

  return {
    name: "create-html-plugin",
    buildStart() {
      this.addWatchFile(templatePath);
    },
    async generateBundle(options, bundle) {
      bundle["no-prerender.html"] = {
        fileName: "index.html",
        isAsset: true,
        source: await generateShell(bundle, templatePath)
      };
    }
  };
}
