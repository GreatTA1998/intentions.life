module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1, ObjectExpression: 1 }],
    "object-curly-spacing": ["error", "never"],
    quotes: ["error", "double"],
    "object-curly-spacing": ["error", "never"],
  },
};
