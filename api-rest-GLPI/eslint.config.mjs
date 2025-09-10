import eslint from "@eslint/js"; // importa regras básicas do eslint
import tseslint from "typescript-eslint"; // plugin para entender TypeScript

export default tseslint.config(
  {
    ignores: ["build/**", "coverage/**", "node_modules/**"], // pastas ignoradas
  },
  eslint.configs.recommended, // regras recomendadas do eslint
  ...tseslint.configs.recommended, // regras recomendadas do typescript-eslint
  {
    files: ["src/**/*.ts"], // aplica só em arquivos .ts da pasta src
    languageOptions: {
      parser: tseslint.parser, // parser TS
      parserOptions: {
        project: "./tsconfig.json", // aponta para seu tsconfig
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // avisa variáveis não usadas
      "@typescript-eslint/no-explicit-any": "warn", // avisa uso de "any"
    },
  }
);
