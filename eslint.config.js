const unusedImports = require("eslint-plugin-unused-imports");
const ESLint = require("@typescript-eslint/eslint-plugin");
const angularEslintPlugin = require("@angular-eslint/eslint-plugin");
const prettierConfig = require("eslint-plugin-prettier");
const typescriptEslintParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: "tsconfig.json",
        createDefaultProgram: true,
      },
      globals: {
        jasmine: "readonly",
        browser: "readonly",
        node: "readonly",
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      "@typescript-eslint": ESLint,
      "@angular-eslint": angularEslintPlugin,
      prettier: prettierConfig,
    },
    rules: {
      // Add rules from `eslint:recommended`
      "no-console": "warn",
      "no-debugger": "warn",

      // Add rules from `@angular-eslint/recommended`
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          style: "kebab-case",
        },
      ],
      "@angular-eslint/no-empty-lifecycle-method": 0,

      // Add rules from `@typescript-eslint/recommended`
      "@typescript-eslint/no-empty-function": 0,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Add rules from `plugin:prettier/recommended`
      "prettier/prettier": "error",

      // Add custom rules
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["*.html"],
    rules: {
      "@angular-eslint/template/process-inline-templates": "error",
      "@angular-eslint/template/no-negated-async": "error",
    },
  },
  {
    ignores: ["package.json", "package-lock.json", "dist", "node_modules"],
  },
];
