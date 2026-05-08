import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    files: ["**/*.vue", "**/*.js"],
    rules: {
      "no-console": "off",
      "vue/multi-word-component-names": "off"
    }
  }
];

