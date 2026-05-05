'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const COLORS = [
  { name: 'sunrise', hex: '#FF5C39', role: 'primary CTAs, active states, sigil 1' },
  { name: 'sky', hex: '#2563EB', role: 'currently sigil, info, calm' },
  { name: 'leaf', hex: '#10B981', role: 'now sigil, live status, growth' },
  { name: 'ember', hex: '#EF4444', role: 'leverage sigil, alerts, heat' },
  { name: 'sun', hex: '#F59E0B', role: 'footer sigil, highlights' },
  { name: 'plum', hex: '#8B5CF6', role: 'sounds sigil, music, soul' },
];

const NEUTRALS = [
  { name: 'paper', hex: '#FFFFFF', role: 'page background' },
  { name: 'zinc-200', hex: '#E4E4E7', role: 'borders' },
  { name: 'ink', hex: '#0E0E0C', role: 'primary text' },
  { name: 'ink/65', hex: 'rgba(14,14,12,.65)', role: 'secondary text' },
  { name: 'ink/40', hex: 'rgba(14,14,12,.40)', role: 'tertiary, captions' },
];

export default function DesignSystem() {
  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-ink/55 hover:text-sunrise transition-colors"
      >
        <span>←</span>
        <span>back home</span>
      </Link>

      {/* Header */}
      <header className="mt-6 mb-10">
        <div className="mb-2 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-ink/55">
          <span className="h-1.5 w-1.5 rounded-full bg-sunrise" />
          <span>design system v1</span>
        </div>
        <h1
          className="font-display text-5xl leading-[0.92] tracking-tightest text-ink sm:text-6xl"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          adam pang . <span className="italic text-sunrise">design</span>
        </h1>
        <p className="mt-3 max-w-xl text-ink/65">
          living reference. every token, type, and component on the site lives
          here. white canvas, rainbow accents, sunrise as the spark.
        </p>
      </header>

      {/* === COLOR === */}
      <section className="mb-12">
        <SectionTitle index="01" title="color" sigil="bg-sunrise" />
        <h3 className="mb-3 mt-6 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink/40">
          accent palette
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {COLORS.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-xl border border-zinc-200"
            >
              <div
                className="h-20"
                style={{ backgroundColor: c.hex }}
                aria-hidden
              />
              <div className="bg-white p-3">
                <div className="font-display text-base">{c.name}</div>
                <div className="nums mt-0.5 text-[0.65rem] uppercase tracking-[0.16em] text-ink/45">
                  {c.hex}
                </div>
                <div className="mt-1.5 text-xs text-ink/55">{c.role}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mb-3 mt-8 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink/40">
          neutrals
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {NEUTRALS.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-xl border border-zinc-200"
            >
              <div
                className="h-14 border-b border-zinc-200"
                style={{ backgroundColor: c.hex }}
                aria-hidden
              />
              <div className="bg-white p-3">
                <div className="font-display text-sm">{c.name}</div>
                <div className="nums mt-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-ink/45">
                  {c.hex}
                </div>
                <div className="mt-1 text-[0.7rem] text-ink/55">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === TYPE === */}
      <section className="mb-12">
        <SectionTitle index="02" title="typography" sigil="bg-sky" />
        <div className="mt-6 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <div>
            <Eyebrow>display . fraunces</Eyebrow>
            <p
              className="font-display text-5xl leading-[0.95] tracking-tightest text-ink sm:text-7xl"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              Adam <span className="italic">Pang</span>
            </p>
          </div>
          <Separator />
          <div>
            <Eyebrow>section title . fraunces 3xl</Eyebrow>
            <p className="font-display text-3xl tracking-tight text-ink">currently</p>
          </div>
          <Separator />
          <div>
            <Eyebrow>body . inter base</Eyebrow>
            <p className="text-base text-ink/80">
              building, writing, making music. living at network school.
              shipping small bets that compound.
            </p>
          </div>
          <Separator />
          <div>
            <Eyebrow>caption . inter xs</Eyebrow>
            <p className="text-xs text-ink/55">on audible . langkawi, malaysia</p>
          </div>
          <Separator />
          <div>
            <Eyebrow>numerals . jetbrains mono</Eyebrow>
            <p className="nums text-2xl text-ink">23 . 32% . 2025</p>
          </div>
        </div>
      </section>

      {/* === COMPONENTS === */}
      <section className="mb-12">
        <SectionTitle index="03" title="components" sigil="bg-leaf" />

        <div className="mt-6 space-y-6">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>button</CardTitle>
              <CardDescription>
                primary uses sunrise. rainbow variants for category buttons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="default">
                <TabsList>
                  <TabsTrigger value="default">default</TabsTrigger>
                  <TabsTrigger value="rainbow">rainbow</TabsTrigger>
                  <TabsTrigger value="size">size</TabsTrigger>
                </TabsList>
                <TabsContent value="default">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button>prompt me</Button>
                    <Button variant="secondary">read pangaea</Button>
                    <Button variant="ghost">come to ns</Button>
                    <Button variant="outline">outline</Button>
                    <Button variant="link">view post</Button>
                  </div>
                </TabsContent>
                <TabsContent value="rainbow">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="sky">sky</Button>
                    <Button variant="leaf">leaf</Button>
                    <Button variant="plum">plum</Button>
                    <Button variant="sun">sun</Button>
                    <Button variant="ember">ember</Button>
                  </div>
                </TabsContent>
                <TabsContent value="size">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">small</Button>
                    <Button>default</Button>
                    <Button size="lg">large</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>badge</CardTitle>
              <CardDescription>tiny pill for status, tag, count.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>default</Badge>
                <Badge variant="sunrise">shipping</Badge>
                <Badge variant="leaf">live</Badge>
                <Badge variant="sun">building</Badge>
                <Badge variant="ember">heat</Badge>
                <Badge variant="sky">info</Badge>
                <Badge variant="plum">music</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Card */}
          <Card>
            <CardHeader>
              <CardTitle>card</CardTitle>
              <CardDescription>
                white surface, zinc-200 border. the standard container.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>sellsniper.com</CardTitle>
                  <CardDescription>
                    find the humans who would love your work
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="leaf">live</Badge>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* === MOTION === */}
      <section className="mb-12">
        <SectionTitle index="04" title="motion" sigil="bg-plum" />
        <Card className="mt-6">
          <CardContent className="space-y-3 pt-6">
            <Row label="ease curve" value="cubic-bezier(0.16, 1, 0.3, 1)" />
            <Separator />
            <Row label="micro hover" value="200 ms" />
            <Separator />
            <Row label="state change" value="400 ms" />
            <Separator />
            <Row label="reveal on scroll" value="700 ms, stagger 40-80 ms" />
            <Separator />
            <Row label="hover lift" value="-translate-y-0.5" />
            <Separator />
            <Row label="snappy spring" value="stiffness 220, damping 18, mass 0.4" />
          </CardContent>
        </Card>
      </section>

      {/* === VOICE === */}
      <section className="mb-12">
        <SectionTitle index="05" title="voice" sigil="bg-ember" />
        <Card className="mt-6">
          <CardContent className="pt-6">
            <p className="font-display italic text-2xl text-ink">
              lowercase. specific. honest. warm. no em dashes ever.
            </p>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Eyebrow>yes</Eyebrow>
                <ul className="mt-2 space-y-1 text-sm text-ink/80">
                  <li>building, writing, making music.</li>
                  <li>prompt me</li>
                  <li>one playlist per year.</li>
                </ul>
              </div>
              <div>
                <Eyebrow>no</Eyebrow>
                <ul className="mt-2 space-y-1 text-sm text-ink/80">
                  <li>Building software at NS!</li>
                  <li>Subscribe to Pangaea — newsletter</li>
                  <li>Click here to learn more</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* === SPACING === */}
      <section className="mb-12">
        <SectionTitle index="06" title="spacing" sigil="bg-sun" />
        <Card className="mt-6">
          <CardContent className="space-y-3 pt-6">
            <Row label="section vertical" value="py-6 sm:py-7 md:py-8" />
            <Separator />
            <Row label="section horizontal" value="px-5 sm:px-7 md:px-9" />
            <Separator />
            <Row label="card radius" value="rounded-2xl . 16 px" />
            <Separator />
            <Row label="button radius" value="rounded-full" />
            <Separator />
            <Row label="container max" value="max-w-3xl . 768 px" />
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-200 pt-6">
        <p className="text-xs text-ink/45">
          live reference. every change to the site updates this page.
        </p>
      </footer>
    </main>
  );
}

/* ---------- helpers ---------- */

function SectionTitle({
  index,
  title,
  sigil,
}: {
  index: string;
  title: string;
  sigil: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="nums text-[0.65rem] uppercase tracking-[0.2em] text-ink/35">
        {index}
      </span>
      <span className={`relative top-0.5 inline-block h-2 w-2 rounded-full ${sigil}`} />
      <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-1.5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-ink/40">
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-ink/65">{label}</span>
      <span className="nums text-xs text-ink/85">{value}</span>
    </div>
  );
}
