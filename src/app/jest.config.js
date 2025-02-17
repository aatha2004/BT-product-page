// swc.config.js
module.exports = {
  jsc: {
    parser: {
      syntax: "typescript",
      tsx: true,
    },
    target: "es2021",
    loose: true,
  },
  module: {
    type: "es6",
  },
};