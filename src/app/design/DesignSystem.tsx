'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Check, Copy } from 'lucide-react';
import { tokens, colorTokens, colorGroups, type ColorToken } from '@/design/tokens';

/**
 * /design. A living reference: every swatch, scale step, and component state
 * below is rendered FROM src/design/tokens.json. There is not one hardcoded
 * hex on this page, which is why it cannot drift the way the previous version
 * did (it still labelled the fonts "fraunces" and "inter" long after the site
 * had moved to Space Grotesk and Lato).
 *
 * The machine name is printed next to every sample, because the point of the
 * page is that a human and an agent can both read it.
 */

const GROUP_BLURB: Record<string, string> = {
  surface: 'backgrounds and edges. what things sit on.',
  content: 'text. three weights of emphasis, all AA on every surface.',
  brand: 'the one blue. links, CTAs, focus rings.',
  section: 'one hue per bento section. fills and dots, never body text.',
};

export default function DesignSystem() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={11} />
        <span>back home</span>
      </Link>

      <header className="mt-6 mb-12">
        <div className="mb-2 inline-flex items-center gap-2 text-caption uppercase tracking-[0.22em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>design system v{tokens.meta.version}</span>
        </div>
        <h1 className="font-display text-4xl leading-[0.95] tracking-tightest text-fg sm:text-5xl">
          design<span className="text-accent">.</span>
        </h1>
        <p className="mt-3 max-w-xl text-fg/75">{tokens.meta.description}</p>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Every sample here is rendered from{' '}
          <Mono>{tokens.meta.source}</Mono>. No hardcoded values, so it cannot
          go stale.
        </p>
        <TokenLinks />
      </header>

      <Section n="01" title="color">
        {colorGroups.map((g) => (
          <div key={g} className="mb-8">
            <GroupLabel>{g}</GroupLabel>
            <p className="mb-3 text-sm text-muted">{GROUP_BLURB[g]}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {colorTokens
                .filter((t) => t.group === g)
                .map((t) => (
                  <Swatch key={t.name} token={t} />
                ))}
            </div>
          </div>
        ))}

        <GroupLabel>accent ramp</GroupLabel>
        <p className="mb-3 text-sm text-muted">
          fixed tints of the primary. components use <Mono>sunrise-600</Mono>{' '}
          for hover fills.
        </p>
        <div className="flex overflow-hidden rounded-lg border border-line">
          {Object.entries(tokens.ramp.accent).map(([step, hex]) => (
            <div key={step} className="flex-1" title={`sunrise-${step} ${hex}`}>
              <div className="h-12" style={{ background: hex }} aria-hidden />
              <div className="bg-card px-1 py-1.5 text-center font-mono text-caption text-muted">
                {step}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="02" title="type">
        <GroupLabel>families</GroupLabel>
        <div className="mb-8 space-y-4 rounded-lg border border-line bg-card p-5 sm:p-6">
          {Object.entries(tokens.type.family).map(([name, f]) => (
            <div key={name}>
              <MachineName>--font-{name}</MachineName>
              <p
                className="mt-1 text-2xl text-fg sm:text-3xl"
                style={{ fontFamily: f.value }}
              >
                Adam Pang . 2026
              </p>
              <p className="mt-1 text-xs text-muted">{f.role}</p>
            </div>
          ))}
        </div>

        <GroupLabel>scale</GroupLabel>
        <div className="rounded-lg border border-line bg-card p-5 sm:p-6">
          {Object.entries(tokens.type.scale).map(([name, s], i, arr) => (
            <div key={name}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-2">
                <div className="w-full sm:w-40 sm:shrink-0">
                  <MachineName>--text-{name}</MachineName>
                  <div className="font-mono text-caption text-faint">
                    {s.size} / {s.leading}
                  </div>
                </div>
                <p
                  className="min-w-0 flex-1 truncate text-fg"
                  style={{ fontSize: s.size, lineHeight: s.leading }}
                >
                  {s.role}
                </p>
              </div>
              {i < arr.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        <GroupLabel className="mt-8">tracking</GroupLabel>
        <ScalarRows
          rows={Object.entries(tokens.type.tracking).map(([k, v]) => ({
            name: `--tracking-${k}`,
            value: v.value,
            role: v.role,
          }))}
        />
      </Section>

      <Section n="03" title="space">
        <p className="mb-3 text-sm text-muted">
          a 4px base step. mobile gutters and card padding use{' '}
          <Mono>--space-5</Mono>, opening to <Mono>--space-6</Mono> at sm+.
        </p>
        <div className="space-y-2 overflow-x-auto rounded-lg border border-line bg-card p-5 sm:p-6">
          {Object.entries(tokens.space).map(([k, v]) => (
            <div key={k} className="flex items-center gap-4">
              <div className="w-24 shrink-0">
                <MachineName>--space-{k}</MachineName>
              </div>
              <div className="w-14 shrink-0 font-mono text-caption text-faint">
                {v.value}
              </div>
              <div
                className="h-3 shrink-0 rounded-sm bg-accent"
                style={{ width: v.value }}
                aria-hidden
              />
              <span className="truncate text-xs text-muted">{v.role}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section n="04" title="radius + shadow">
        <GroupLabel>radius</GroupLabel>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Object.entries(tokens.radius).map(([k, v]) => (
            <div key={k} className="text-center">
              <div
                className="mb-2 h-20 w-full border border-line bg-card"
                style={{ borderRadius: v.value }}
                aria-hidden
              />
              <MachineName>--radius-{k}</MachineName>
              <div className="font-mono text-caption text-faint">{v.value}</div>
              <div className="mt-0.5 text-caption text-muted">{v.role}</div>
            </div>
          ))}
        </div>

        <GroupLabel>shadow</GroupLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Object.entries(tokens.shadow).map(([k, v]) => (
            <div key={k} className="text-center">
              <div
                className="mb-3 h-20 w-full rounded-lg bg-card"
                style={{ boxShadow: v.value }}
                aria-hidden
              />
              <MachineName>--shadow-{k}</MachineName>
              <div className="mt-0.5 text-caption text-muted">{v.role}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n="05" title="components">
        <p className="mb-4 text-sm text-muted">
          hover and press the real controls, and tab through them to see{' '}
          <Mono>:focus-visible</Mono>, a 2px accent outline at 3px offset set
          globally. States marked <em>simulated</em> are frozen copies so the
          styling is visible without a pointer.
        </p>

        <StateTable
          title="button"
          note="rounded-full, accent fill. the primary CTA."
          states={[
            { label: 'default', node: <Button>prompt me</Button> },
            { label: 'hover', node: <Button className="-translate-y-0.5 bg-sunrise-600 shadow-lg">prompt me</Button>, synthetic: true },
            { label: 'active', node: <Button className="translate-y-0 bg-sunrise-700">prompt me</Button>, synthetic: true },
            { label: 'focus-visible', node: <Button className="outline outline-2 outline-offset-[3px] outline-accent">prompt me</Button>, synthetic: true },
            { label: 'disabled', node: <Button disabled>prompt me</Button> },
          ]}
        />

        <StateTable
          title="button . secondary"
          note="card surface, hairline border. the alternative action."
          states={[
            { label: 'default', node: <Button variant="secondary">read pangaea</Button> },
            { label: 'hover', node: <Button variant="secondary" className="-translate-y-0.5 border-accent text-accent">read pangaea</Button>, synthetic: true },
            { label: 'active', node: <Button variant="secondary" className="translate-y-0 border-accent bg-sunken text-accent">read pangaea</Button>, synthetic: true },
            { label: 'focus-visible', node: <Button variant="secondary" className="outline outline-2 outline-offset-[3px] outline-accent">read pangaea</Button>, synthetic: true },
            { label: 'disabled', node: <Button variant="secondary" disabled>read pangaea</Button> },
          ]}
        />

        <StateTable
          title="link"
          note="1px underline, hairline decoration until hover."
          states={[
            { label: 'default', node: <DemoLink /> },
            { label: 'hover', node: <DemoLink className="text-accent decoration-accent" />, synthetic: true },
            { label: 'visited', node: <DemoLink className="text-accent-ink" />, synthetic: true },
            { label: 'focus-visible', node: <DemoLink className="rounded-sm outline outline-2 outline-offset-[3px] outline-accent" />, synthetic: true },
          ]}
        />

        <InputStates />

        <StateTable
          title="badge"
          note="status pill. section hues as fills, never as text."
          states={[
            { label: 'default', node: <Badge>default</Badge> },
            { label: 'live', node: <Badge variant="leaf">live</Badge> },
            { label: 'shipping', node: <Badge variant="sunrise">shipping</Badge> },
            { label: 'building', node: <Badge variant="sun">building</Badge> },
          ]}
        />

        <div className="mt-6">
          <GroupLabel>card</GroupLabel>
          <p className="mb-3 text-sm text-muted">
            <Mono>--color-card</Mono> on <Mono>--color-line</Mono> at{' '}
            <Mono>--radius-lg</Mono>. the standard container.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>resting</CardTitle>
                <CardDescription>shadow-card, no transform</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="leaf">live</Badge>
              </CardContent>
            </Card>
            <Card className="-translate-y-0.5 border-accent shadow-card-lg">
              <CardHeader>
                <CardTitle>hover</CardTitle>
                <CardDescription>lift 2px, accent border, shadow-card-lg</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="leaf">live</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Section n="06" title="motion">
        <p className="mb-3 text-sm text-muted">
          one easing curve everywhere. all of it collapses to 0ms under{' '}
          <Mono>prefers-reduced-motion: reduce</Mono>, enforced globally rather
          than per component.
        </p>
        <ScalarRows
          rows={Object.entries(tokens.motion).map(([k, v]) => ({
            name: `--motion-${k}`,
            value: v.value,
            role: v.role,
          }))}
        />
      </Section>

      <ForAgents />

      <footer className="mt-14 border-t border-line pt-6">
        <p className="text-xs text-faint">
          generated from {tokens.meta.source} . v{tokens.meta.version}
        </p>
      </footer>
    </div>
  );
}

/* ---------- exports ---------- */

function TokenLinks() {
  const links = [
    { href: '/design/tokens.json', label: 'tokens.json', type: 'application/json' },
    { href: '/design/tokens.css', label: 'tokens.css', type: 'text/css' },
    { href: '/api/profile.json', label: 'profile.json', type: 'application/json' },
    { href: '/llms.txt', label: 'llms.txt', type: 'text/markdown' },
  ];
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="inline-flex items-baseline gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs transition-colors hover:border-accent"
        >
          <span className="font-mono text-fg">{l.label}</span>
          <span className="font-mono text-caption text-faint">{l.type}</span>
        </a>
      ))}
    </div>
  );
}

/* ---------- swatch ---------- */

function Swatch({ token }: { token: ColorToken }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${token.cssVar})`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-card">
      {/* Both modes at once. The right half is the literal dark value. */}
      <div className="flex h-16" aria-hidden>
        <div className="flex-1" style={{ background: token.light }} />
        <div className="flex-1" style={{ background: token.dark }} />
      </div>
      <div className="p-3">
        <button
          onClick={copy}
          className="group flex w-full items-center justify-between gap-2 text-left"
          aria-label={`Copy var(${token.cssVar})`}
        >
          <code className="font-mono text-xs text-fg">{token.cssVar}</code>
          {copied ? (
            <Check size={12} className="shrink-0 text-curiosity" />
          ) : (
            <Copy
              size={12}
              className="shrink-0 text-faint transition-colors group-hover:text-accent"
            />
          )}
        </button>
        <div className="mt-1 flex gap-3 font-mono text-caption text-faint">
          <span>{token.light}</span>
          <span>{token.dark}</span>
        </div>
        <p className="mt-1.5 text-caption leading-snug text-muted">{token.role}</p>
      </div>
    </div>
  );
}

/* ---------- component states ---------- */

type State = { label: string; node: React.ReactNode; synthetic?: boolean };

function StateTable({ title, note, states }: { title: string; note: string; states: State[] }) {
  return (
    <div className="mb-6">
      <GroupLabel>{title}</GroupLabel>
      <p className="mb-3 text-sm text-muted">{note}</p>
      {/* Scrolls inside itself so the page body never scrolls sideways. */}
      <div className="overflow-x-auto rounded-lg border border-line bg-card">
        <div className="flex min-w-max divide-x divide-line">
          {states.map((s) => (
            <div key={s.label} className="flex min-w-[9rem] flex-col items-center gap-3 p-4">
              <div className="flex min-h-[2.5rem] items-center">{s.node}</div>
              <div className="text-center">
                <div className="font-mono text-caption text-fg">{s.label}</div>
                {s.synthetic && <div className="mt-0.5 text-caption text-faint">simulated</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Real inputs, so the focus ring can actually be tabbed to. */
function InputStates() {
  const fields = [
    { label: 'default', props: { placeholder: 'your email' } },
    { label: 'filled', props: { defaultValue: 'adam@adampang.com' } },
    { label: 'disabled', props: { placeholder: 'unavailable', disabled: true } },
    { label: 'invalid', props: { defaultValue: 'not-an-email', 'aria-invalid': true } },
  ];
  return (
    <div className="mb-6">
      <GroupLabel>input</GroupLabel>
      <p className="mb-3 text-sm text-muted">these are real inputs. click and tab through them.</p>
      <div className="grid grid-cols-1 gap-3 rounded-lg border border-line bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((f) => (
          <label key={f.label} className="block">
            <span className="mb-1.5 block font-mono text-caption text-muted">{f.label}</span>
            <input
              type="text"
              {...f.props}
              className="w-full rounded border border-line bg-card px-3 py-2 text-sm text-fg placeholder:text-faint focus-visible:border-accent disabled:cursor-not-allowed disabled:bg-sunken disabled:text-faint aria-[invalid=true]:border-alert-ink"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function DemoLink({ className = '' }: { className?: string }) {
  return (
    <a
      href="#sample"
      onClick={(e) => e.preventDefault()}
      className={`text-fg underline decoration-line decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent ${className}`}
    >
      pangaea.blog
    </a>
  );
}

/* ---------- for agents ---------- */

function ForAgents() {
  return (
    <section className="mt-12 rounded-lg border border-accent/30 bg-card p-6 sm:p-7">
      <div className="mb-2 inline-flex items-center gap-2 text-caption uppercase tracking-[0.22em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span>for agents</span>
      </div>
      <h2 className="font-display text-2xl tracking-tight text-fg">
        building something on-brand?
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg/75">
        Fetch the tokens rather than reading hexes off this page. Both files are
        generated from the same source in the same build, are CORS-open, and
        carry every value shown above.
      </p>

      <pre className="mt-4 overflow-x-auto rounded border border-line bg-sunken p-4 font-mono text-xs leading-relaxed text-fg">
        <code>{`curl https://adampang.com/design/tokens.json
curl https://adampang.com/design/tokens.css`}</code>
      </pre>

      <h3 className="mt-6 font-display text-base tracking-tight text-fg">
        three rules that keep work on-brand
      </h3>
      <ol className="mt-2 space-y-2.5 text-sm text-fg/80">
        <li className="flex gap-3">
          <span className="shrink-0 font-mono text-xs text-accent">01</span>
          <span>
            <strong className="font-medium text-fg">
              Reference the variable, never the hex.
            </strong>{' '}
            Write <Mono>var(--color-fg)</Mono>, not <Mono>#1a1a1a</Mono>. Every
            token is mode-aware, so one reference is correct in both themes. A
            literal hex is right in one mode and wrong in the other.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 font-mono text-xs text-accent">02</span>
          <span>
            <strong className="font-medium text-fg">
              One accent, one hue per section.
            </strong>{' '}
            <Mono>--color-accent</Mono> owns links, CTAs, and focus. Section hues
            are decorative fills and dots. Never set body text in one: at ~2:1 on
            white they fail AA, which is why <Mono>--color-alert-ink</Mono>{' '}
            exists separately from <Mono>--color-alert</Mono>.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="shrink-0 font-mono text-xs text-accent">03</span>
          <span>
            <strong className="font-medium text-fg">
              Three text weights, no opacity.
            </strong>{' '}
            <Mono>--color-fg</Mono>, <Mono>--color-muted</Mono>,{' '}
            <Mono>--color-faint</Mono>. Do not dim text with opacity to invent a
            fourth. That is exactly what failed AA here:{' '}
            <Mono>text-ink/55</Mono> measured 3.90:1 against a 4.5:1
            requirement.
          </span>
        </li>
      </ol>

      <p className="mt-5 text-xs text-muted">
        Identity data lives at{' '}
        <a
          href="/api/profile.json"
          className="text-accent underline decoration-1 underline-offset-2"
        >
          /api/profile.json
        </a>{' '}
        and{' '}
        <a href="/llms.txt" className="text-accent underline decoration-1 underline-offset-2">
          /llms.txt
        </a>
        .
      </p>
    </section>
  );
}

/* ---------- primitives ---------- */

function Section({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-caption uppercase tracking-[0.2em] text-faint">{n}</span>
        <h2 className="font-display text-2xl tracking-tight text-fg md:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function GroupLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`mb-1.5 text-caption font-medium uppercase tracking-[0.2em] text-muted ${className}`}
    >
      {children}
    </h3>
  );
}

function MachineName({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-caption text-fg">{children}</code>;
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-sunken px-1 py-0.5 font-mono text-[0.85em] text-fg">
      {children}
    </code>
  );
}

function ScalarRows({ rows }: { rows: { name: string; value: string; role: string }[] }) {
  return (
    <div className="rounded-lg border border-line bg-card p-5 sm:p-6">
      {rows.map((r, i) => (
        <div key={r.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
            <MachineName>{r.name}</MachineName>
            <span className="font-mono text-xs text-muted">{r.value}</span>
            <span className="w-full text-caption text-faint sm:w-auto">{r.role}</span>
          </div>
          {i < rows.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
