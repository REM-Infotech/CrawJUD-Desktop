import { fileURLToPath, URL } from "node:url";

// unplugin
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { getFileBasedRouteName } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

import { BootstrapVueNextResolver } from "bootstrap-vue-next/resolvers";

import IconsResolve from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({
      dirs: ["app/components"],
      deep: true,
      resolvers: [BootstrapVueNextResolver(), IconsResolve({ prefix: "Icon" })],
      dts: "app/typings/components.d.ts",
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),
    VueRouter({
      // how and what folders to scan for files
      routesFolder: [
        {
          src: "app/pages",
          path: "",
          // override globals
          exclude: (excluded) => excluded,
          filePatterns: (filePatterns) => filePatterns,
          extensions: (extensions) => extensions,
        },
      ],

      // what files should be considered as a pages
      extensions: [".vue"],

      // what files to include
      filePatterns: ["**/*"],

      // files to exclude from the scan
      exclude: [],

      // where to generate the types
      dts: "app/typings/routes.d.ts",

      // how to generate the route name
      getRouteName: (routeNode) => getFileBasedRouteName(routeNode),

      // default language for <route> custom blocks
      routeBlockLang: "json5",

      // how to import routes, can also be a string
      importMode: "async",

      // where are paths relative to
      root: process.cwd(),

      // options for the path parser
      pathParser: {
        // should `users.[id]` be parsed as `users/:id`?
        dotNesting: true,
      },

      // modify routes individually
      async extendRoute(route) {
        // ...
      },

      // modify routes before writing
      async beforeWriteFiles(rootRoute) {
        // ...
      },
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        "vue",
        "vue-router",
        // custom
        {
          "@vueuse/core": [
            // named imports
            "useMouse", // import { useMouse } from '@vueuse/core',
            // alias
            ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          axios: [
            // default imports
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
        },
        // example type import
        {
          from: "vue-router",
          imports: ["RouteLocationRaw"],
          type: true,
        },
      ],

      // Array of strings of regexes that contains imports meant to be filtered out.
      ignore: ["useMouse", "useFetch"],

      // Enable auto import by filename for default module exports under directories
      defaultExportByFilename: false,

      // Options for scanning directories for auto import
      dirsScanOptions: {
        filePatterns: ["*.ts"], // Glob patterns for matching files
        fileFilter: (file) => file.endsWith(".ts"), // Filter files
        types: true, // Enable auto import the types under the directories
      },

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [
        "./app/hooks",
        "./app/composables", // only root modules
        "./app/composables/**", // all nested modules
        "./app/layout/**",
        "./app/stores/**",
        "./app/utils/**",
        "./app/plugins/**",
        // {
        //   glob: "./hooks",
        //   types: true, // enable import the types
        // },
        // {
        //   glob: "./composables",
        //   types: false, // If top level dirsScanOptions.types importing enabled, just only disable this directory
        // },
        // ...
      ],

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: "app/typings/imports.d.ts",

      // The mode for generating the .d.ts file.
      // 'overwrite': overwrite the whole existing .d.ts file with the new type definitions.
      // 'append': only append the new type definitions to the existing .d.ts file, means the existing type definitions will be kept.
      // Default to 'append'
      dtsMode: "append",

      // Preserve the original file extensions in the generated .d.ts file.
      // Set to `true` to keep the extensions for .ts and .tsx files.
      // Default to false
      dtsPreserveExts: false,

      // Array of strings of regexes that contains imports meant to be ignored during
      // the declaration file generation. You may find this useful when you need to provide
      // a custom signature for a function.
      ignoreDts: ["ignoredFunction", /^ignore_/],

      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: false,

      // Auto import directives inside Vue template
      // see https://github.com/unjs/unimport/pull/374
      vueDirectives: undefined,

      // Custom resolvers, compatible with `unplugin-vue-components`
      // see https://github.com/antfu/unplugin-auto-import/pull/23/
      resolvers: [],

      // Include auto-imported packages in Vite's `optimizeDeps` options
      // Recommend to enable
      viteOptimizeDeps: true,

      // Inject the imports at the end of other imports
      injectAtEnd: true,

      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
        filepath: "./json/.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },

      // Generate corresponding .biomelintrc-auto-import.json file.
      // biomejs extends Docs - https://biomejs.dev/guides/how-biome-works/#the-extends-option
      biomelintrc: {
        enabled: false, // Default `false`
        filepath: "./json/.biomelintrc-auto-import.json", // Default `./.biomelintrc-auto-import.json`
      },

      // Save unimport items into a JSON file for other tools to consume
      dumpUnimportItems: "./json/auto-imports.json", // Default `false`
    }),
  ],
});
