/**
 * Custom cursors, generated from the accent token.
 *
 * A cursor image is an SVG inside url(), and SVG in a data URI cannot read
 * CSS custom properties. So the accent hex is baked in here, once per mode,
 * from tokens.json, and exposed as --cursor-dot / --cursor-link. globals.css
 * only consumes the variables, so a token change or dark mode now reaches
 * the cursor.
 *
 * adampang.com only. This file is deliberately not part of the shared
 * tokens.ts that pangpod.com syncs, so PangPod's cursor is unchanged.
 */

import raw from './tokens.json';

type Mode = 'light' | 'dark';

const accent = (mode: Mode) => raw.color.brand.accent[mode];
const enc = (hex: string) => hex.replace('#', '%23');

function dot(mode: Mode): string {
  const fill = enc(accent(mode));
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='3.5' fill='${fill}'/></svg>") 12 12`;
}

function link(mode: Mode): string {
  const fill = enc(accent(mode));
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><circle cx='16' cy='16' r='13' fill='${fill}' fill-opacity='0.16'/><circle cx='16' cy='16' r='5' fill='${fill}'/></svg>") 16 16`;
}

/** :root and .dark cursor variables, injected in <head> beside the tokens. */
export function cursorVarBlock(): string {
  return `:root{--cursor-dot:${dot('light')};--cursor-link:${link('light')}}\n.dark{--cursor-dot:${dot('dark')};--cursor-link:${link('dark')}}`;
}
