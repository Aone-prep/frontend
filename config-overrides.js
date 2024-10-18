const { override, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@redux": path.resolve(__dirname, "src/redux"),
    "@routes": path.resolve(__dirname, "src/routes"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@services": path.resolve(__dirname, "src/services"),
    "@hooks": path.resolve(__dirname, "src/hooks"),
  })
);
