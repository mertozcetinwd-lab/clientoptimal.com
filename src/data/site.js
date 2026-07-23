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
  // Tagline now names the hero offer instead of the whole practice. It feeds the
  // <title>, so it doubles as the SEO headline: "Client Optimal · Win back...".
  tagline: 'Win back the customers you already have',
  // The meta description and OG blurb. Keyword-forward (database reactivation,
  // dormant customers, win back) and honest: it describes the mechanism, never a
  // result. ~150 chars, under the truncation limit.
  description:
    'AI database reactivation for small businesses. Personalized email and SMS that win back your dormant past customers, from the list you already own. No ad spend.',
  founder: 'Mert Ozcetin',
  location: 'Remote',
  hours: 'US Eastern',
  effectiveDate: 'July 18, 2026',
};

// Nav leads with the hero offer now. "How we work" (the principles band) drops
// out of the nav to keep it to three; the section still lives on the page.
export const nav = [
  { label: 'Reactivation', href: '/#how-it-works' },
  { label: 'What we build', href: '/#build' },
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

// The hero now names the offer in the first two lines. The old hero ("the
// automations you keep meaning to build") was generic AI-automation positioning
// and never mentioned reactivation at all, so a visitor could not tell what this
// company actually sells. Outcome first, mechanism in the lead, no invented
// numbers anywhere.
export const hero = {
  eyebrow: 'AI database reactivation',
  title: 'Win back the customers you already have.',
  lead: 'Most of your past customers stopped buying for no real reason. Client Optimal goes back through your list and reaches each one with a personalized email or text, written by AI in your voice and reviewed before it sends. No ad spend, no new data. You already own the asset.',
  cta: { label: 'See if your list is worth it', href: contact.linkedin },
  secondary: { label: 'See how it works', href: '#how-it-works' },
};

// The offer, explained. This is the section that makes reactivation
// unmistakable: the economic logic, then the three concrete steps. Every line
// describes what happens, not what it returns. The risk-reversal ("I will tell
// you if it is not worth it") is a real, honest trust signal that costs nothing
// to make because it is true, and it is the same promise the closing CTA makes.
export const reactivation = {
  eyebrow: 'How it works',
  title: 'The cheapest customer to win is one you already have.',
  lead: 'They bought from you once. They know your name and they had a reason. Reaching them again costs nothing like finding a stranger, and most businesses never do it. That is the whole opportunity, and it is sitting in a spreadsheet you already own.',
  steps: [
    {
      idx: '01',
      title: 'Start from your list',
      desc: 'Your past customers, exported from whatever you already use. No new data to buy, no ads to run. If the list is too small or too cold to be worth it, I tell you that up front instead of billing you to find out.',
    },
    {
      idx: '02',
      title: 'AI writes to the person, not the segment',
      desc: 'Each message is drafted for the individual from what you already know about them, in your voice, not a blast with a name pasted in. Email, and SMS only where you have permission to text them. I am not in the business of getting you fined.',
    },
    {
      idx: '03',
      title: 'You approve, it sends, replies come to you',
      desc: 'You see the messages before they go out and stay in control of the tone. Replies land in your own inbox, and the whole thing runs on a schedule instead of a to-do list you never get to.',
    },
  ],
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
  // Bridges the honest gap: the hero offer is reactivation, but none of these
  // repos is a reactivation system yet. Rather than hide that, name it and turn
  // it into the point: same class of build, public and readable, judge it
  // before you hand over a list. Still zero invented proof.
  lead: 'Client Optimal is early, so asking you to take results on faith would waste your time. Here is the work instead, public and readable. None of it is the reactivation system itself yet, but it is the same class of build: scheduled agents, lead scoring, tools wired into one flow. See how I build before you hand me your list.',
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

// Closing CTA, anchored to the offer and deliberately low-friction: it asks for
// a description, not a data export. Nobody sends a stranger their customer list
// on the first message, so the ask is a conversation, and the honest "I will
// tell you if it is not worth it" carries straight through from the offer.
export const cta = {
  eyebrow: 'Start here',
  title: 'Not sure your list is worth reactivating? Ask me.',
  lead: 'Tell me roughly how many past customers you have and what you sell. I will give you a straight answer on whether reactivation is worth doing, before you send a single row of data.',
};

export const legalNav = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

// Derived, never typed by hand. Hand-numbering on the sibling site once
// produced two projects both numbered 06.
capabilities.forEach((c, i) => { c.idx = String(i + 1).padStart(2, '0'); });
principles.forEach((p, i) => { p.idx = String(i + 1).padStart(2, '0'); });
