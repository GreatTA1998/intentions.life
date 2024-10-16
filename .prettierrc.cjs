module.exports = {
  singleQuote: true,
  space: {
    beforeParentheses: {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always',
    },
  },
};


// Rules
// - HTML on top vs JS on top: JS on top (CONVERT)
// - Single quotes
// - Function space before parentheses: function
// - No semi-colons
// - { db } better than {db}
// - No trailing comma
// - Indentation 2 spaces
// Guidelines
// - Use named function params({ arg1, arg2 }) if there are multiple arguments (fine to not convert past)
// Miscellaneous:
// - Feel free to use linters


