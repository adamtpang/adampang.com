import Link from 'next/link';

export const metadata = { title: 'page not found' };

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <h1 className="text-2xl">page not found.</h1>
      <p className="mt-6">
        <Link href="/">home</Link>
      </p>
    </main>
  );
}
