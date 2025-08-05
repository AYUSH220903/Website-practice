import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import pluginReactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist/**"] },
  pluginJs.configs.recommended,
  { ...pluginReactConfig, files: ["**/*.{js,jsx}"] },
  pluginReactJsxRuntime,
  {
    languageOptions: {
      globals: { ...globals.browser },
    },
    settings: { react: { version: "18.2" } }, // "18.2" is fine, or you can use "detect"
    plugins: {
      "react-hooks": pluginReactHooks,
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      // The recommended rules are now active.
      // You can override any specific rule here if you disagree with it.
      ...pluginReactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
