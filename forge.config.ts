import { resolve } from "path";

import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerZIP } from "@electron-forge/maker-zip";
import { VitePlugin } from "@electron-forge/plugin-vite";

import { AutoUnpackNativesPlugin } from "@electron-forge/plugin-auto-unpack-natives";

import type { ForgeConfig } from "@electron-forge/shared-types";

import SquirrelMaker from "./makers/SquirrelMaker";
import WixMaker from "./makers/WixMaker";

const ROOT = process.cwd();

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    osxSign: {},
    icon: resolve(ROOT, "app/assets/img/crawjud2.ico"),
  },
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "app/main.ts",
          config: "vite.main.config.ts",
          target: "main",
        },
        {
          entry: "app/preload.ts",
          config: "vite.preload.config.ts",
          target: "preload",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
  makers: [
    WixMaker,
    SquirrelMaker,
    new MakerZIP({}, ["darwin"]),
    new MakerDeb({}, ["linux"]),
    new MakerRpm({}, ["linux"]),
  ],
};

export default config;
