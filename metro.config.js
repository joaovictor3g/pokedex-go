const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

// Nativewind 5.0.0-rc.1 swaps every `import "react-native"` for a wrapper whose export list
// predates React Native 0.88 and misses `AssetRegistry`, which breaks expo-asset (icon fonts).
// Only app code needs className support, so libraries in node_modules get the real module.
const nativewindResolveRequest = config.resolver.resolveRequest;
const nodeModules = `${path.sep}node_modules${path.sep}`;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native" && context.originModulePath.includes(nodeModules)) {
    return context.resolveRequest(context, moduleName, platform);
  }
  return nativewindResolveRequest(context, moduleName, platform);
};

module.exports = config;
