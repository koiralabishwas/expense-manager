import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 👈 turns off the error
      "@typescript-eslint/no-explicit-any": "warn", // maybe just warn instead of error?
      "react-hooks/rules-of-hooks": "warn", // keep this one strict!
      "@typescript-eslint/no-wrapper-object-types" : "warn",
      "@typescript-eslint/no-explicit-any" : "warn"

    },
  }
];

export default eslintConfig;
