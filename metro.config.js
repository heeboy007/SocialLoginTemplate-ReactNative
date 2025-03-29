const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require("nativewind/metro");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = mergeConfig(defaultConfig, {
    transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"]
    }
});

module.exports = withNativeWind(config, { input: "./src/global.css" });

