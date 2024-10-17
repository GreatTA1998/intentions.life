module.exports = {
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  singleQuote: true,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteBracketNewLine: false,
  svelteAllowShorthand: false,
  svelteIndentScriptAndStyle: false,
  semi: false, // Add this to remove semicolons
  trailingComma: 'none', // Add this to remove trailing commas
  bracketSpacing: true, // Add this for { db } instead of {db}
  tabWidth: 2, // Add this for 2-space indentation
  space: {
    beforeParentheses: {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }
  }
}


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


