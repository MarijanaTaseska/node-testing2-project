import globals from "globals";
import pluginJs from "@eslint/js";

const nodeGlobals = globals.node;
const jestGlobals = globals.jest


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...nodeGlobals, ...jestGlobals}}},
  pluginJs.configs.recommended,
];