const path = require('path');

module.exports = function override(config, env) {
  // Add Sass support
  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          implementation: require('node-sass'),
        },
      },
    ],
  };

  // Add the Sass loader to both the production and development configurations
  config.module.rules.push(sassLoader);

  return config;
};