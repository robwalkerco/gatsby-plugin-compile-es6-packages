const path = require("path");
const regexEscape = require("regex-escape");

exports.onCreateWebpackConfig = ({ actions, loaders }, { modules = [] }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: modulePath =>
            /node_modules/.test(modulePath) &&
            // whitelist specific es6 module
            !new RegExp(
              `node_modules[\\\\/](${modules.map(regexEscape).join("|")})[\\\\/]`
            ).test(modulePath),
          use: loaders.js()
        }
      ]
    }
  });
};
