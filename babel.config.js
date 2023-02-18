/* eslint-disable quotes */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["transform-inline-environment-variables", {
      "include": [
        "APP_URL"
      ]
    }],
    ["module:react-native-dotenv", {
      "envName": "APP_ENV",
      "moduleName": "@env",
      "path": ".env",
      "safe": false,
      "allowUndefined": true,
      "verbose": false,
    }],
  ]
};
