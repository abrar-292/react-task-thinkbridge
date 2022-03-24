module.exports = {
  $schema: 'http://json.schemastore.org/prettierrc',
  singleQuote: true,
  printWidth: 80,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  plugins: [require('prettier-plugin-tailwindcss')],
};
