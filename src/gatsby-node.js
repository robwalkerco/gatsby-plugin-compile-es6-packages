const path = require("path");
const regexEscape = require("regex-escape");

exports.onCreateWebpackConfig = (
  { actions, loaders },
  { modules = [], test = /\.js$/ }
) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test,
          exclude: modulePath =>
            /node_modules/.test(modulePath) &&
            // whitelist specific es6 module
            !new RegExp(
              `node_modules[\\\\/](${modules
                .map(module => module.replace(/\//, path.sep))
                .map(regexEscape)
                .join("|")})[\\\\/]`
            ).test(modulePath),
          use: loaders.js()
        }
      ]
    }
  });
};
