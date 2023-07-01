const { makeMetroConfig } = require("@rnx-kit/metro-config");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");
const path = require('path');

module.exports = makeMetroConfig({
  resolver: {
    resolverMainFields: ["module", "browser", "main"],
    resolveRequest: MetroSymlinksResolver(),
  },
  watchFolders: [__dirname, path.resolve(__dirname, '..'), path.resolve(__dirname, './node_modules')]
});
