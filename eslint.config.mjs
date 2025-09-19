import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'],
    plugins: { 
      js,
      '@stylistic': stylistic
    },
    extends: ['js/recommended'],
    languageOptions: { 
      globals: globals.node 
    },
    rules: {
      'quotes': 'off', 
      '@stylistic/indent': ['error', 2], 
      '@stylistic/semi': ['error', 'always'], 
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/function-call-spacing': ['error', 'never'], 
      'prefer-const': 'error'
    } 
  },
]);
