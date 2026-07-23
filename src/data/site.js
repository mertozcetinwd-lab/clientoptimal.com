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
// built, and the principles behind how.
//
// NOTE (2026-07-23): it used to also point at six public repos ("Read the
// code"), which was the strongest evidence on the site. Mert removed that
// section, so the live pages now carry NO external evidence at all. The
// constraint above is therefore stricter than before, not looser: with nothing
// left to point at, any drift into implied results has nothing honest holding it
// down. The `proof` export below is kept but renders nowhere.
//
// Voice: references/voice.md in the parent AIOS. Casual, direct, blunt, no
// corporate polish, no hype, NO EM DASHES.

export const meta = {
  name: 'Client Optimal',
  legalName: 'Client Optimal LLC',
  // Tagline names the whole practice now, not one offer. It feeds the <title>, so
  // it doubles as the SEO headline: "Client Optimal · Automation that earns its keep".
  tagline: 'Automation that earns its keep',
  // The meta description and OG blurb. Generalist and honest: it names the kinds of
  // build (automations, agents, tools) and the way they are built, never a result.
  // ~155 chars, under the truncation limit.
  description:
    'AI automation studio for small businesses. Custom automations, agents, and internal tools, built end to end from the APIs up and shipped to run on their own.',
  founder: 'Mert Ozcetin',
  location: 'Remote',
  hours: 'US Eastern',
  effectiveDate: 'July 18, 2026',
};

// Down to one item on Mert's call 2026-07-23. "Approach" was dropped from the
// header by request; "The work" had to go with it, because its target (the
// #proof repo section) was removed from the homepage in the same pass and a nav
// item pointing at a section that no longer exists is a dead link.
//
// Nothing is orphaned: the approach content still lives at /services#approach,
// reachable from the services page, and the header's "Get in touch" button
// already covers contact (which is why no Contact item was added here).
export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
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
  // Mert's personal site. Separate brand, same person; the /about page sends
  // people there rather than restating a portfolio inside the business site.
  personalSite: 'https://mertozcetin.com',
  personalSiteShow: 'mertozcetin.com',
};

// NOTE: unused. The homepage hero is the React island (ui/experience-hero.tsx),
// which carries its own copy. This object is the pre-island wording, kept only as
// a reference for the voice. If you change the live hero, change it there.
export const hero = {
  eyebrow: 'AI automation studio',
  title: 'Automation that earns its keep.',
  lead: 'Client Optimal builds the automations, agents, and internal tools that do the work you keep doing by hand. Wired straight from the APIs, shipped to run on a schedule, and built to fail loudly instead of quietly. One person, remote, no template.',
  cta: { label: 'Start a conversation', href: contact.linkedin },
  secondary: { label: 'See what I build', href: '#build' },
};

// The reactivation offer, explained. NOTE: DORMANT AND DELIBERATELY UNSURFACED.
// It is on no page. It came off the homepage when the site went generalist, and
// Mert's call (2026-07-23) was to keep /services generalist too, so reactivation
// is not linked from anywhere. Kept, with its component (Reactivation.astro), in
// case it is ever wanted as a named offer again. Do not assume it renders.
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

// The problem, rig.ai-style: a bordered 2x2 grid of real failure modes that set
// up why the services exist. All four are honest, generalist pains (no metrics,
// no fear-mongering) and each maps to a principle further down the page.
export const problem = {
  eyebrow: 'The problem',
  title: 'Most automation quietly dies.',
  cards: [
    {
      idx: '01',
      tag: 'Silent failure',
      title: 'It breaks and nobody notices.',
      desc: 'A workflow stops running on a Tuesday and you find out a month later, when the numbers look wrong and the trail has gone cold.',
    },
    {
      idx: '02',
      tag: 'Vendor lock-in',
      title: 'You end up renting your own process.',
      desc: 'Built on a platform that sits between you and your data, and raises the price or changes the rules whenever it decides to.',
    },
    {
      idx: '03',
      tag: 'Demo-ware',
      title: 'It worked once, on stage.',
      desc: 'A flashy demo is a different engineering problem than something that runs unattended at 3am with nobody watching it.',
    },
    {
      idx: '04',
      tag: 'Tab sprawl',
      title: 'Six tools that do not talk.',
      desc: 'The work lives in Gmail and ClickUp and Stripe and a spreadsheet, and the integration holding it together is you.',
    },
  ],
};

// What gets built. Adapted from the capability categories on mertozcetin.com
// (src/data/site.js) and rewritten from first-person portfolio voice into
// service voice. Every one of these describes something already built at
// least once, which is why none of them needed inventing.
//
// `desc` is the one-liner the homepage grid shows. `includes` is the detail the
// /services page shows underneath it: three concrete things that get BUILT, never
// a result the client should expect. That distinction is the whole reason this
// file opens with a hard-constraint block, so keep the bullets mechanical.
//
// (The old `plate` key is gone. It named a generative SVG figure per card, and
// Plate.astro no longer exists in this repo.)
export const capabilities = [
  {
    idx: '01',
    tag: 'Automate',
    title: 'Automations',
    desc: 'Inbox triage, data pipelines, the work you do the same way every week. Runs on a schedule with nobody watching it.',
    includes: [
      'A scheduled job that runs without you starting it',
      'Retries and an error path for when a step fails',
      'A log you can read to see what it did and when',
    ],
  },
  {
    idx: '02',
    tag: 'Orchestrate',
    title: 'Agents',
    desc: 'Tool-using agents that make the call, take the action, and know when to stop. Not a chatbot bolted onto a form.',
    includes: [
      'Tool access with explicit limits on what it may touch',
      'A stopping condition, so it cannot loop forever',
      'A human approval step wherever the action is irreversible',
    ],
  },
  {
    idx: '03',
    tag: 'Engineer',
    title: 'Systems',
    desc: 'The durable, file-based infrastructure everything else runs on. Guardrails, logging, and error paths included.',
    includes: [
      'Configuration in plain files, not buried in a vendor UI',
      'Logging and error branches from the first commit',
      'Written notes on how it works and where it can break',
    ],
  },
  {
    idx: '04',
    tag: 'Research',
    title: 'Research',
    desc: 'Multi-perspective briefings that map where the experts actually disagree, then peer-review their own conclusions.',
    includes: [
      'Gathering across several sources, not one search',
      'Structured output you can hand to somebody else',
      'Citations kept attached, so you can check the claim',
    ],
  },
  {
    idx: '05',
    tag: 'Compose',
    title: 'Documents',
    desc: 'Reports and decks that build themselves, look at the result, critique it, and fix it. Presentation-ready on demand.',
    includes: [
      'Generation from your own data and template',
      'A self-critique pass before it hands anything over',
      'Export to the format you actually send, Docs, Word or Slides',
    ],
  },
  {
    idx: '06',
    tag: 'Connect',
    title: 'Integrations',
    desc: 'Wiring the tools you already pay for, Gmail to ClickUp to Stripe, into one flow instead of six tabs.',
    includes: [
      'Direct API wiring between the tools you already pay for',
      'One flow to follow instead of six tabs to check',
      'No third-party automation platform sitting in the middle',
    ],
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
// DORMANT: removed from the homepage 2026-07-23 and rendered on no page. Kept,
// with Proof.astro, in case the repo section is ever wanted back. Do not assume
// it renders.
export const proof = {
  eyebrow: 'The work',
  title: 'Read the code.',
  // Honest bridge for a young studio: no results to point at yet, so point at the
  // code instead. Same class of build the client would get, public and readable.
  // Still zero invented proof.
  lead: 'Client Optimal is early, so asking you to take results on faith would waste your time. Here is the work instead, public and readable: scheduled agents, lead scoring, research pipelines, tools wired into one flow. The same class of build I would ship for you. See how I build before you hire me.',
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

// Closing CTA, generalist and deliberately low-friction: it asks for a
// description of the task, not a commitment. The honest "I will tell you straight
// whether it is worth it" is a real trust signal that costs nothing to make.
export const cta = {
  eyebrow: 'Start here',
  title: 'Have something you keep doing by hand? Let us automate it.',
  lead: 'Tell me what the task is and how often it eats your week. I will give you a straight answer on whether it is worth automating, and roughly what it would take, before you commit to anything.',
};

// Honest FAQ, rig.ai-style accordion. Answers are generalist and true; nothing
// implies a track record. "Is my data safe" stays consistent with /privacy.
export const faq = {
  eyebrow: 'Questions',
  title: 'Before you ask.',
  items: [
    {
      q: 'What do you actually build?',
      a: 'Automations, tool-using agents, internal tools, and the systems they run on. Most projects are some mix, wired straight from the APIs rather than a no-code platform in the middle.',
    },
    {
      q: 'How do we work together?',
      a: 'You tell me the task and how often it eats your week. I scope it, build it, and hand it back running. Remote, end to end. You approve anything that goes out under your name.',
    },
    {
      q: 'What does it cost?',
      a: 'Depends on the build. I will give you a rough number before you commit, and I will tell you plainly if a thing is not worth automating instead of billing you to find out.',
    },
    {
      q: 'Do you only do reactivation?',
      a: 'No. Database reactivation is one offer, not the whole shop. If a task is repetitive and rule-based, it is a candidate, whatever corner of the business it lives in.',
    },
    {
      q: 'Is my data safe?',
      a: 'I prefer direct APIs over third-party platforms, so there are fewer places your data has to live. Nothing runs that you have not approved, and this site itself sets no cookies and runs no analytics.',
    },
  ],
};

/* ============================================================
   /services — the services and approach page
   ============================================================ */

// Head copy for the page. Base.astro takes { title, description }; the title uses
// a middle dot because em dashes are out.
export const servicesMeta = {
  title: 'Services · Client Optimal',
  description:
    'What Client Optimal builds: automations, agents, systems, research, documents and integrations. How a project runs, and who it is a good fit for.',
};

export const servicesHero = {
  eyebrow: 'Services and approach',
  title: 'What I build, and how the work actually goes.',
  lead: 'Six kinds of build, all of them shipped at least once. Below them is the honest version of how a project runs from your first message to a system running on its own, and who this is a bad fit for.',
  cta: { label: 'Start a conversation', href: contact.linkedin },
  secondary: { label: 'How a project runs', href: '#approach' },
};

// How an engagement actually runs. Deliberately NO pricing: the honest line is
// "you get a rough number before you commit", which is what the FAQ already says.
// Nothing here promises an outcome, because /terms carries a no-guarantees clause.
export const engagement = {
  eyebrow: 'Approach',
  title: 'From first message to running system.',
  lead: 'No discovery-call theatre and no retainer you cannot leave. Four steps, and you know the cost and the shape of the thing before anything gets built.',
  steps: [
    {
      idx: '01',
      title: 'Scope',
      desc: 'You tell me the task and how often it eats your week. I work out what it touches and what it would take, then give you a rough number. If it is not worth automating, I say so instead of billing you to find out.',
    },
    {
      idx: '02',
      title: 'Build',
      desc: 'I build it end to end, wired straight from the APIs rather than assembled on a no-code platform. You see it working on real cases before it goes anywhere near a customer.',
    },
    {
      idx: '03',
      title: 'Handover',
      desc: 'It ships running. The rules live in plain files you can open and change, and you get written notes on what it does, what it touches, and where it is most likely to break.',
    },
    {
      idx: '04',
      title: 'After',
      desc: 'It runs on its own on a schedule. When something changes on your side I am reachable, but nothing renews silently and nothing is locked to me. The build is yours.',
    },
  ],
};

// Honest qualification. The "not a fit" column is where the no-guarantees stance
// lives, and it is the most useful thing on the page for the wrong prospect.
export const fit = {
  eyebrow: 'Fit',
  title: 'Worth checking before you write.',
  lead: 'Automation pays off on repetition. If a job is different every single time, a person is still the right tool and I will tell you that.',
  good: {
    title: 'A good fit if',
    items: [
      'The task is repetitive and follows rules you could write down',
      'It happens weekly or daily, not once a quarter',
      'You can describe the steps you take today, even roughly',
      'The data already lives somewhere: an inbox, a sheet, a CRM',
      'You want to own the thing that gets built',
    ],
  },
  bad: {
    title: 'Probably not if',
    items: [
      'Every case is a judgement call with no pattern behind it',
      'The process changes faster than it could be built',
      'You want someone to administer a no-code subscription for you',
      'You are shopping for guaranteed revenue numbers. Automation is engineering, not a promise about your figures',
      'Nobody on your side can answer questions about how the work is done today',
    ],
  },
};

/* ============================================================
   /about — who is behind this
   ============================================================ */

export const aboutMeta = {
  title: 'About · Client Optimal',
  description:
    'Client Optimal is one person: Mert Ozcetin, remote, on US Eastern hours. What that means for how the work gets built, and where to find the rest of it.',
};

// EVERY claim here is traceable to something already true and stated elsewhere in
// this repo: one person (meta.founder), remote on US Eastern (meta.location /
// meta.hours), pre-revenue with no client list (the hard constraint at the top of
// this file), direct APIs and plain-file config and ship-not-demo (principles).
//
// Nothing about background, education, employment history or years of experience,
// because none of that is established anywhere and this file does not get to
// invent it. If Mert wants those in, he supplies the facts and they go here.
export const about = {
  eyebrow: 'About',
  title: 'Hi. I am Mert.',
  lead: 'I run Client Optimal. It is one person, remote, on US Eastern hours, which means the person who scopes your build is the person who builds it and the person you email afterwards.',
  paras: [
    'I build automations, tool-using agents, and the internal tools that sit underneath them. Wired straight from the APIs rather than assembled on a no-code platform, because fewer moving parts is most of the advantage a small operation has.',
    'Client Optimal is early. There is no client list on this site because there is not one worth showing yet, and inventing one is the quickest way to lose exactly the sort of person I want to work with. So the site argues from how I build instead of who I have billed.',
    'That way of working is boring on purpose. Configuration in plain files you can open and change, logging and error paths from the first commit, and a preference for something that runs unattended over something that demos well once. If a job is not worth automating, I would rather say so than bill you to find out.',
  ],
};

// The link out to the personal site. Kept as its own section so it reads as a
// deliberate handoff rather than a footer afterthought.
export const elsewhere = {
  eyebrow: 'Elsewhere',
  title: 'The rest of it.',
  lead: 'Client Optimal is the business. The personal site is where the building actually gets shown: projects, how they are put together, and what I am working through at the moment.',
};

export const legalNav = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

// Derived, never typed by hand. Hand-numbering on the sibling site once
// produced two projects both numbered 06.
capabilities.forEach((c, i) => { c.idx = String(i + 1).padStart(2, '0'); });
principles.forEach((p, i) => { p.idx = String(i + 1).padStart(2, '0'); });
problem.cards.forEach((c, i) => { c.idx = String(i + 1).padStart(2, '0'); });
engagement.steps.forEach((s, i) => { s.idx = String(i + 1).padStart(2, '0'); });
