import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    ignores: ["dist/", "**/.gitignore", "**/node_modules/", ".git/"],
  },
  { files: ["**/*.{js,mjs,cjs,ts}", "tests/**/*/.{js,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: { "@typescript-eslint/no-unused-vars": "off" },
  },
  eslintPluginPrettierRecommended,
];
