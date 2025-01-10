// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    {
        files: ['**/*.ts'],
        languageOptions: {
          parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname,
          },
          parser: tseslint.parser,
        },
        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
          '@stylistic/semi': 'error',
          '@typescript-eslint/no-unsafe-assignment': 'error',
          '@typescript-eslint/no-explicit-any': 'error',
          '@typescript-eslint/explicit-function-return-type': 'off',
          '@typescript-eslint/explicit-module-boundary-types': 'off',
          '@typescript-eslint/restrict-template-expressions': 'off',
          '@typescript-eslint/restrict-plus-operands': 'off',
          '@typescript-eslint/no-unused-vars': [
            'error',
            { 'argsIgnorePattern': '^_' }
          ],
          'no-case-declarations': 'off',
        },
    },
    {
        ignores: ["build/**/*", "node_modules/**/*", "frontend/**/*"],
    }
);