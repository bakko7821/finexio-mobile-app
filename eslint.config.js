const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    files: ["metro.config.*"],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
  },
]);
