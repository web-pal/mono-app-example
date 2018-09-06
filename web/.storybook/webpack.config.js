/* eslint-disable no-param-reassign */
const path = require('path');
const webpackBaseConfig = require('../webpack.config.base');

module.exports = (storybookBaseConfig, configType) => {
  const projectConfig = webpackBaseConfig({
    NODE_ENV: configType,
  });
  const localPresets = projectConfig.module.rules[0].use.options.presets;
  const localPlugins = projectConfig.module.rules[0].use.options.plugins;
  // babel7 support
  storybookBaseConfig.module.rules[0].include = [
    ...storybookBaseConfig.module.rules[0].include,
    path.resolve(__dirname, '../../core'),
  ];
  storybookBaseConfig.module.rules[0].use[0].options.presets = localPresets;
  storybookBaseConfig.module.rules[0].use[0].options.plugins = localPlugins;
  storybookBaseConfig.module.rules.push({
    test: /\.(less)$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  });
  // aliases
  storybookBaseConfig.resolve.alias = {
    ...storybookBaseConfig.resolve.alias,
    ...projectConfig.resolve.alias,
  };
  return storybookBaseConfig;
};
