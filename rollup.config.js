import svelte from "rollup-plugin-svelte";
//import polyfill from "rollup-plugin-polyfill";
import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import preprocess from "svelte-preprocess";
import postcss from "rollup-plugin-postcss";
import bundleSize from "rollup-plugin-bundle-size";

//import json from "@rollup/plugin-json";
//import jscc from "rollup-plugin-jscc";

var path = require("path");
const production = !process.env.ROLLUP_WATCH;
const bundle = true;

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

let svelteConfig;
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
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },
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
      plugins: [
        /*'@babel/plugin-transform-runtime'*/
        "transform-async-to-promises",
      ],
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
    bundleSize(),
  ],
  watch: {
    clearScreen: false,
  },
};
