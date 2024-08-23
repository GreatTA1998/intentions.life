module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "object-curly-spacing": ["error", "never"],
    quotes: ["error", "double"],
  },
};
