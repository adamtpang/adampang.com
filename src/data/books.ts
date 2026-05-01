/**
 * Currently-reading bookshelf. Edit this file to update what's on the
 * desk (or in the headphones, in this case — all on Audible).
 */

export type Book = {
  title: string;
  author: string;
  format: 'audible' | 'kindle' | 'physical';
  url?: string;
};

export const currentlyReading: Book[] = [
  {
    title: 'Elon Musk',
    author: 'Walter Isaacson',
    format: 'audible',
  },
  {
    title: 'The 38 Letters from J.D. Rockefeller to His Son',
    author: 'John D. Rockefeller',
    format: 'audible',
  },
  {
    title: 'The Fabric of Reality',
    author: 'David Deutsch',
    format: 'audible',
  },
  {
    title: 'The Beginning of Infinity',
    author: 'David Deutsch',
    format: 'audible',
  },
];
