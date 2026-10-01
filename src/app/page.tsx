import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang' },
  description: 'Adam Pang.',
  alternates: { canonical: '/' },
};

/**
 * The whole site. Rules (Adam, 2026-10-01): no identity lines, no work or
 * client material, no unfinished projects, least possible. The belief lines
 * are his own posts, word for word. Add a line only for something real.
 */
const beliefs = [
  'trying is cool.',
  'death gives courage and clarity.',
  "people confuse life as pvp but it's actually pve against problems.",
  'honesty is refreshing in a world full of bullshit.',
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-10 sm:px-12 sm:py-14">
      <header className="flex items-center gap-4">
        <Image
          src="/profile.png"
          alt="Adam Pang"
          width={56}
          height={56}
          priority
          className="h-14 w-14 rounded-xl object-cover"
        />
        <h1 className="font-display text-xl font-bold">adam pang</h1>
      </header>

      <div className="flex flex-col gap-3 font-display text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
        {beliefs.map((line, i) => (
          <p key={line} className={i % 2 ? 'text-muted' : undefined}>
            {line}
          </p>
        ))}
        <p>
          history is an <span className="text-accent">s tier</span> subject.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-sm text-muted">curious about</p>
            <p>how money works</p>
            <p>how to live a good life</p>
          </div>
          <p>
            text or whatsapp <a href="sms:+15122540011">+1 (512) 254-0011</a>
            <br />
            email <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>
          </p>
        </div>

        <div>
          <iframe
            src="https://open.spotify.com/embed/playlist/35KMxrfO2OqwaJ1PIoYiCa?theme=0"
            title="ult, a playlist"
            height={352}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block w-full rounded-xl border-0"
          />
          <p className="mt-2 text-sm text-muted">
            <a href="https://strummer.fun/vibe/card/make">make your own</a>
          </p>
        </div>
      </div>
    </main>
  );
}
