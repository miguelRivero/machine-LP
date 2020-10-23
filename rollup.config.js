import svelte from "rollup-plugin-svelte";
//import polyfill from "rollup-plugin-polyfill";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import alias from "rollup-plugin-alias";
import preprocess from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";
import del from "rollup-plugin-delete";
import visualizer from "rollup-plugin-visualizer";
import entrypointHashmanifest from "rollup-plugin-entrypoint-hashmanifest";

//import bundleSize from "rollup-plugin-bundle-size";

//import json from "@rollup/plugin-json";
//import jscc from "rollup-plugin-jscc";

var path = require("path");
let svelteConfig, buildType;
const production = !process.env.ROLLUP_WATCH;
const bundle = true;

buildType = getBuildType();
function getBuildType(type) {
  if (type === "amd") {
    return {
      sourcemap: true,
      format: "amd",
      dir: "public/build/amd",
      chunkFileNames: "[name].js",
    };
  } else if (type === "iife-p") {
    return {
      sourcemap: true,
      format: "iife",
      name: "app",
      dir: "public/build/iife",
      entryFileNames: "[name]-[hash].js",
      chunkFileNames: "[name]-[hash].js",
    };
  } else {
    return {
      sourcemap: true,
      format: "iife",
      name: "app",
      dir: "public/build/iife",
      entryFileNames: "[name].js",
      chunkFileNames: "[name].js",
    };
  }
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

if (!bundle) {
  svelteConfig = {
    // enable run-time checks when not in production
    dev: !production,
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css: (css) => {
      if (!bundle) css.write("bundle.css");
    },
    preprocess: preprocess(),
  };
} else {
  svelteConfig = {
    dev: !production,
    preprocess: preprocess(),
  };
}

export default {
  input: "src/main.js",
  output: buildType,
  plugins: [
    svelte(svelteConfig),
    // jscc({
    //   values: { _LEGACY: 1 },
    // }),
    resolve(),
    commonjs(),
    //json(),
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      exclude: [
        "node_modules/@babel/**",
      ] /**/ /*use in conjunction with preset-env.corejs ,'node_modules/core-js/**' */,
      /*runtimeHelpers: true,*/
      presets: [
        [
          "@babel/preset-env",
          {
            targets: "ie 11",
            loose: true,
            useBuiltIns: "entry",
            corejs: 3,
            /*include: [
              "es.object.create",
              "es.array.fill",
            ],*/
            /*exclude: [
              "transform-async-to-generator",
            ],*/
          },
        ],
      ],
      plugins: ["transform-async-to-promises"],
    }),
    postcss({
      modules: true,
      extensions: [".sass", ".scss"],
      namedExports: true,
      use: [
        [
          "sass",
          {
            includePaths: [path.resolve("node_modules")],
          },
        ],
      ],
    }),
    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    terser(),
    //production && terser(),
    //production && terser({ output: { comments: false } })
    //bundleSize(),
    del({ targets: "public/build/*" }),
    entrypointHashmanifest(),
    alias({
      entries: {
        "api-client": "src/api/index.js",
      },
    }),
    visualizer(),
  ],
  watch: {
    clearScreen: false,
  },
};
