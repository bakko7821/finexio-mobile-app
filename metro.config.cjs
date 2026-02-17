// metro.config.cjs
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Используем path.resolve для корректных абсолютных путей
const projectRoot = path.resolve(__dirname);
const config = getDefaultConfig(projectRoot);

const newConfig = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"],
  },
};

module.exports = withNativeWind(newConfig, {
  input: path.resolve(projectRoot, "global.css"),
});
