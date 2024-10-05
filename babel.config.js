module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", // NOTE: this has to be the LAST item in this array to work
    ],
  };
};
