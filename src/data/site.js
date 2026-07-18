// Every string on clientoptimal.com. One source, so nothing drifts.
//
// HARD CONSTRAINT — READ BEFORE EDITING:
// Client Optimal is pre-revenue with zero clients. NOTHING in this file may
// imply otherwise. No client counts, no logos, no testimonials, no review
// stars, no years-in-business, no result percentages.
//
// This is not squeamishness. The site this one replaced was a GoHighLevel
// template claiming "127+ completed projects, 112+ five-star reviews, 6 years
// in business, 154% average client growth" with lorem ipsum still sitting in
// the testimonial slots. It was live under the business name. An AI-literate
// prospect spots that instantly, and it is the single worst thing that can
// happen on the one page whose job is to be believed.
//
// What this site proves instead is CAPABILITY, not track record: what gets
// built, the principles behind how, and six public repos anyone can read.
// "Read the code" is a stronger claim than an invented number, and it is one
// Mert can actually back.
//
// Voice: references/voice.md in the parent AIOS. Casual, direct, blunt, no
// corporate polish, no hype, NO EM DASHES.

export const meta = {
  name: 'Client Optimal',
  legalName: 'Client Optimal LLC',
  tagline: 'AI automation and agentic workflows. Shipped, not demoed.',
  description:
    'Client Optimal builds AI automations and agentic workflows: the unglamorous, repetitive work, running unattended.',
  founder: 'Mert Ozcetin',
  location: 'Remote',
  hours: 'US Eastern',
  effectiveDate: 'July 18, 2026',
};

export const nav = [
  { label: 'What we build', href: '/#build' },
  { label: 'How we work', href: '/#how' },
  { label: 'The work', href: '/#proof' },
];

export const contact = {
  // Mert's personal LinkedIn is the channel he actually answers on, so it
  // leads. The company Page exists mostly as a technical requirement for the
  // developer app and gets almost no traffic.
  linkedin: 'https://www.linkedin.com/in/mert-ozcetin/',
  linkedinShow: 'linkedin.com/in/mert-ozcetin',
  company: 'https://www.linkedin.com/company/client-optimal',
  // TODO Mert: a gmail on a business site is honest but reads weak. Cloudflare
  // Email Routing on this domain is free and takes ten minutes if you want
  // hello@clientoptimal.com forwarding here instead.
  email: 'mertozcetinwd@gmail.com',
  github: 'https://github.com/mertozcetinwd-lab',
};

export const hero = {
  eyebrow: 'AI automation and agentic workflows',
  title: 'We build the automations you keep meaning to build.',
  lead: 'The repetitive work that eats your week, running unattended. Designed, built, and shipped end to end.',
  cta: { label: 'Start a conversation', href: contact.linkedin },
  secondary: { label: 'Read the code', href: '#proof' },
};

// What gets built. Adapted from the capability categories on mertozcetin.com
// (src/data/site.js) and rewritten from first-person portfolio voice into
// service voice. Every one of these describes something already built at
// least once, which is why none of them needed inventing.
export const capabilities = [
  {
    idx: '01',
    tag: 'Automate',
    title: 'Automations',
    desc: 'Inbox triage, data pipelines, the work you do the same way every week. Runs on a schedule with nobody watching it.',
    plate: 'flow',
  },
  {
    idx: '02',
    tag: 'Orchestrate',
    title: 'Agents',
    desc: 'Tool-using agents that make the call, take the action, and know when to stop. Not a chatbot bolted onto a form.',
    plate: 'graph',
  },
  {
    idx: '03',
    tag: 'Engineer',
    title: 'Systems',
    desc: 'The durable, file-based infrastructure everything else runs on. Guardrails, logging, and error paths included.',
    plate: 'contour',
  },
  {
    idx: '04',
    tag: 'Research',
    title: 'Research',
    desc: 'Multi-perspective briefings that map where the experts actually disagree, then peer-review their own conclusions.',
    plate: 'graph',
  },
  {
    idx: '05',
    tag: 'Compose',
    title: 'Documents',
    desc: 'Reports and decks that build themselves, look at the result, critique it, and fix it. Presentation-ready on demand.',
    plate: 'contour',
  },
  {
    idx: '06',
    tag: 'Connect',
    title: 'Integrations',
    desc: 'Wiring the tools you already pay for, Gmail to ClickUp to Stripe, into one flow instead of six tabs.',
    plate: 'flow',
  },
];

// The differentiator. All four are real operating principles from the way
// Mert actually builds, documented in the AIOS decisions log. Nothing here is
// aspirational, which is the only reason it earns the space.
export const principles = [
  {
    idx: '01',
    title: 'Direct APIs over heavy integrations',
    desc: 'Fewer moving parts, less to break, and no third-party platform sitting between you and your own data. When a vendor changes their pricing, nothing here stops working.',
  },
  {
    idx: '02',
    title: 'Configuration you can read',
    desc: 'The rules live in plain files, not buried in someone’s UI. Changing what counts as a qualified lead should be an edit, not a support ticket and a deploy.',
  },
  {
    idx: '03',
    title: 'Built to fail loudly',
    desc: 'Retries, error branches, and logs from day one. The failure mode that actually hurts is the silent one, where a workflow quietly stops running and nobody notices for a month.',
    },
  {
    idx: '04',
    title: 'Shipped, not demoed',
    desc: 'A demo works once, on purpose, while someone watches. Production runs on a Tuesday at 3am with nobody watching. Those are different engineering problems.',
  },
];

// Honest framing of a real weakness, turned into the strongest section on the
// page. Client Optimal is early. Rather than dressing that up, point at the
// code. Every repo below is public and really exists.
export const proof = {
  eyebrow: 'The work',
  title: 'Read the code.',
  lead: 'Client Optimal is early, and asking you to take claims on faith would be a waste of your time. Here is the work instead, public and readable. Judge it directly.',
  repos: [
    {
      name: 'ai-lead-qualifier',
      desc: 'Scores and tiers inbound leads against a written ideal-customer profile, and returns a validated verdict. The rubric is a markdown file, so changing what counts as a good lead is an edit, not a deploy.',
      stack: 'Next.js, Trigger.dev, Claude API, Supabase, Stripe',
      href: 'https://github.com/mertozcetinwd-lab/ai-lead-qualifier',
    },
    {
      name: 'phase3-automations',
      desc: 'A scheduled research agent. Crawls sources, hands what it finds to Claude to condense, appends the result to a spreadsheet. Typed env access and retry logic underneath, because it runs on a cron.',
      stack: 'Trigger.dev, Claude SDK, Firecrawl, Google Sheets',
      href: 'https://github.com/mertozcetinwd-lab/phase3-automations',
    },
    {
      name: 'phase3-automations2',
      desc: 'A small JSON payload about a company goes in. A written strategy report comes out as a real Word document, filed in Google Drive. Logs every step, survives its own errors, never stops to ask a question.',
      stack: 'Trigger.dev, Claude API, Google Drive, GitHub Actions',
      href: 'https://github.com/mertozcetinwd-lab/phase3-automations2',
    },
    {
      name: 'daily-digest',
      desc: 'Turns Claude loose on live AI news with web search, formats the result, and files it as a page in a Notion database. Runs on command rather than a cron, which was a deliberate call to stop it burning credits daily.',
      stack: 'Trigger.dev, Claude web search, Notion API',
      href: 'https://github.com/mertozcetinwd-lab/daily-digest',
    },
    {
      name: 'n8n-quote-generator',
      desc: 'Type a project brief and the hours; an n8n workflow prices it and returns an itemized quotation ready to send. A serverless proxy holds the webhook server-side so the browser never sees it.',
      stack: 'React, Vite, TypeScript, Vercel, n8n',
      href: 'https://github.com/mertozcetinwd-lab/n8n-quote-generator',
    },
    {
      name: 'mertozcetin.com',
      desc: 'Mert’s portfolio, built with Claude Code. Zero runtime dependencies, two typefaces, three colours, and a set of generative plates the site draws for itself at build time.',
      stack: 'Astro, hand-authored CSS, vanilla JS',
      href: 'https://github.com/mertozcetinwd-lab/mertozcetin.com',
    },
  ],
};

export const cta = {
  eyebrow: 'Start here',
  title: 'What are you doing by hand that you shouldn’t be?',
  lead: 'If you can describe the process, it can probably be automated. Tell me what it is and I will tell you honestly whether it is worth building.',
};

export const legalNav = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

// Derived, never typed by hand. Hand-numbering on the sibling site once
// produced two projects both numbered 06.
capabilities.forEach((c, i) => { c.idx = String(i + 1).padStart(2, '0'); });
principles.forEach((p, i) => { p.idx = String(i + 1).padStart(2, '0'); });
