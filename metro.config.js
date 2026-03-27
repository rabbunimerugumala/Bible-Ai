const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper module resolution for native modules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
};

// Add sqlite support
config.resolver.assetExts.push('db', 'sqlite');

module.exports = config;
