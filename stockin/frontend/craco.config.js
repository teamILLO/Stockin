const {
  getLoader,
  loaderByName,
  removeLoaders,
  throwUnexpectedConfigError,
} = require('@craco/craco');

const CracoLessPlugin = require('craco-less');

const path = require('path');

// Overriding CracoLessPlugin as @semantic-ui-react/craco-less to correctly load semantic-ui less files
const SemanticUiCracoLessPlugin = {
  overrideWebpackConfig: ({
    context,
    webpackConfig,
    pluginOptions,
  }) => {
    // add alias to theme.config
    webpackConfig.resolve.alias['../../theme.config$'] = path.join(context.paths.appSrc, '/semantic-ui/theme.config');

    // file-loader:
    // theme.config, *.variables and *.overrides files should be excluded
    const {
      isFound,
      match: fileLoaderMatch,
    } = getLoader(webpackConfig, loaderByName('file-loader'));

    if (!isFound) {
      throwUnexpectedConfigError({
        packageName: '@semantic-ui-react/craco-less',
        message: `Can't find "file-loader" in the ${context.env} webpack config!`,
      });
    }

    fileLoaderMatch.loader.exclude.push(/theme\.config$/);
    fileLoaderMatch.loader.exclude.push(/\.variables$/);
    fileLoaderMatch.loader.exclude.push(/\.overrides$/);

    // resolve-url-loader:
    // should be removed as it causes bugs
    // https://github.com/Semantic-Org/Semantic-UI-React/issues/3761
    removeLoaders(webpackConfig, loaderByName('resolve-url-loader'));

    // less-loader:
    // craco-less is reused
    return CracoLessPlugin.overrideWebpackConfig({
      context,
      webpackConfig,
      pluginOptions,
    });
  },
};

module.exports = {
  plugins: [
    {
      plugin: SemanticUiCracoLessPlugin,
    },
    {
      plugin: SemanticUiCracoLessPlugin,
      options: {
        modifyLessRule: (lessRule) => ({
          ...lessRule,
          test: /\.(module)\.(less)$/,
          exclude: /node_modules/,
        }),
        cssLoaderOptions: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
      },
    },
  ],
};
