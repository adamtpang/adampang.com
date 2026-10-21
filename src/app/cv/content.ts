export type TextLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const summary =
  'I build full-stack products and AI agents, and I do the customer work too. 2 to 3 years.';

export const availability = 'Austin area · US work authorized · Available to start immediately';

export const contacts: TextLink[] = [
  { label: 'adamtpang@gmail.com', href: 'mailto:adamtpang@gmail.com' },
  { label: 'cal.com/adamtpang', href: 'https://cal.com/adamtpang', external: true },
  { label: 'github.com/adamtpang', href: 'https://github.com/adamtpang', external: true },
  { label: 'adampang.com', href: 'https://adampang.com' },
];

export const projects: {
  name: string;
  href: string;
  meta: string;
  text: string;
  links: TextLink[];
}[] = [
  {
    name: 'Garage Sale',
    href: 'https://grokbothackathon.vercel.app',
    meta: 'AI agent · Oct 2026',
    text: 'Built an agent that finds underpriced Facebook Marketplace listings, prices them against what similar items sold for, and helps list and flip them. Co-won the Grok Bot Hackathon in Austin with team 9b on Oct 19, 2026. Attendees said they would pay $20 a month.',
    links: [
      { label: 'Live', href: 'https://grokbothackathon.vercel.app', external: true },
      { label: 'GitHub', href: 'https://github.com/adamtpang/grokbothackathon', external: true },
    ],
  },
  {
    name: 'skill.supply',
    href: 'https://skill.supply',
    meta: 'Full-stack agent · 2026',
    text: 'Built and deployed a Next.js 16 career agent from an empty repo in under two weeks. Structured Anthropic outputs, Zod validation, streamed state, and live roles from 4 ATS APIs plus 6 aggregators.',
    links: [
      { label: 'Live', href: 'https://skill.supply', external: true },
      { label: 'GitHub', href: 'https://github.com/adamtpang/skill.supply', external: true },
    ],
  },
  {
    name: 'summon.company',
    href: 'https://github.com/adamtpang/summon.company',
    meta: 'Agent reliability',
    text: '155 personal commits on a Paperclip-derived agent-company system. Built a register-truth reconciler you can audit, and an evaluation of the real pipeline. It classified 12/12 known scenarios across 5 statuses, with 0 false auto-closes in 2 security or payment cases.',
    links: [
      { label: 'GitHub', href: 'https://github.com/adamtpang/summon.company', external: true },
      {
        label: 'Evaluation',
        href: 'https://github.com/adamtpang/summon.company/blob/master/outbound/register-truth-eval/EVAL-REPORT.md',
        external: true,
      },
    ],
  },
];

export const experience: {
  org: string;
  role: string;
  meta: string;
  text: string;
}[] = [
  {
    org: 'Anchor Marianas',
    role: 'Founder and Software Engineer',
    meta: 'Oct 2024 to present · Remote',
    text: 'Sold and delivered software to clients, including Hilton. Took the work from the first conversation through the build and into production.',
  },
  {
    org: 'EIGN',
    role: 'Software Engineer and B2B Sales',
    meta: 'One-month trial, ended Dec 2025 · Remote',
    text: "Built Lightmark.app's website diagnostic. It shows the evidence behind the result. Also did the engineering, technical discovery, product demos, and outbound sales.",
  },
  {
    org: 'Guam Power Authority',
    role: 'Workflow Automation',
    meta: '2024 · Guam',
    text: 'Automated a legacy Excel workflow from approximately 2 hours per run to approximately 2 minutes.',
  },
];

export const skills: { label: string; text: string }[] = [
  {
    label: 'Product engineering',
    text: 'TypeScript, JavaScript, React, Next.js, Node.js, REST APIs, Zod, Python, Go',
  },
  {
    label: 'Agents and systems',
    text: 'Structured outputs, tool use, evaluations, human review, browser automation, CDP, Rust and wgpu debugging',
  },
  {
    label: 'Quality',
    text: 'Playwright, Vitest, pytest, API testing, accessibility, performance, documentation',
  },
];
