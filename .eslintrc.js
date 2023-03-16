module.exports = {
  root: true,
  env: { node: true, },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "comma-dangle": ["error", {
      arrays: "never",
      objects: "always",
      imports: "never",
      exports: "never",
      functions: "never",
    }],
    "no-lonely-if": "error",
    quotes: ["error", "double"],
    "no-tabs": ["off"],
    indent: ["error", 2],
    semi: ["off"],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
  },
};
  