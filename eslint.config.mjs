import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

/**
 * Flat config.
 *
 * The build used to print:
 *   ESLint: Invalid Options: - Unknown options: useEslintrc, extensions
 * because ESLint 10 no longer reads .eslintrc.json.
 *
 * The deps were also mismatched: eslint-config-next was pinned to 16 while
 * this app runs Next 15, and ESLint 10 broke the react plugin bundled with
 * it ("contextOrFilename.getFilename is not a function"). Both are now
 * aligned to the combination Next 15 is actually tested against:
 * eslint 9 + eslint-config-next 15.
 *
 * config-next 15 ships eslintrc-shaped config only, so FlatCompat bridges
 * it. The ruleset is unchanged from the old .eslintrc.json.
 */
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      '_legacy/**',
      '_site/**',
      'out/**',
      'scripts/**',
    ],
  },
  ...compat.extends('next/core-web-vitals'),
];
