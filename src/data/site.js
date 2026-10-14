// Every string on clientoptimal.com. One source, so nothing drifts.
//
// HARD CONSTRAINT: READ BEFORE EDITING:
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
//
// REPOSITIONED 2026-10-13: the site presents general AI voice-agent
// implementation and ongoing support for suitable inbound call workflows.
// There are no voice-agent client results or validated deployments, and every
// unknown stays visible for review.

export const meta = {
  name: 'Client Optimal',
  legalName: 'Client Optimal LLC',
  // REPOSITIONED 2026-09-19: the AI voice agent is the headline product, so the
  // tagline and meta description name it directly. Feeds <title> and OG tags.
  tagline: 'AI voice agent implementation',
  // Honest: what the agent does, who it is for, no results claimed.
  description:
    'Custom AI voice agent implementation and ongoing support for suitable inbound call workflows, with approved scripts and human follow-up.',
  founder: 'Mert Ozcetin',
  location: 'Remote',
  hours: 'US Eastern',
  effectiveDate: 'October 13, 2026',
};

// "Work" came back 2026-07-31, pointing at a REAL page this time. It was dropped
// on 2026-07-23 because its only target was the #proof repo strip, which came off
// the homepage in the same pass, and a nav item aimed at a section that no longer
// exists is a dead link. /work is now a route with a written case study on it, so
// the original objection is gone.
//
// "Approach" stays dropped, by request. That content still lives at
// /services#approach, and the header's "Get in touch" button covers contact,
// which is why there is no Contact item here.
//
// Four items is the ceiling (Demo added 2026-08-24). Header.astro scrolls the nav sideways below 560px
// rather than hiding or wrapping it; a fourth would start to crowd that.
//
// 2026-09-19: "Services" reads as "Voice agent" now. Same route, same anchor
// structure, no redirects needed.
export const nav = [
  // Demo leads: it is the one page cold outreach points at, and the funnel runs
  // watch it -> see it built before -> what that costs -> who I am.
  { label: 'Demo', href: '/demo' },
  { label: 'Voice agent', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];

export const contact = {
  // Mert's personal LinkedIn is the channel he actually answers on, so it
  // leads. The company Page exists mostly as a technical requirement for the
  // developer app and gets almost no traffic.
  linkedin: 'https://www.linkedin.com/in/mert-ozcetin/',
  linkedinShow: 'linkedin.com/in/mert-ozcetin',
  company: 'https://www.linkedin.com/company/client-optimal',
  // Moved off gmail 2026-08-19. A registered 10DLC brand with an EIN listing a personal
  // gmail is the most obvious mismatch a carrier reviewer sees on the page. Domain is on
  // Microsoft 365 (MX -> clientoptimal-com.mail.protection.outlook.com, verified live).
  email: 'mert@clientoptimal.com',
  // Phone and postal address are A2P 10DLC REQUIREMENTS, not decoration. The campaign
  // checklist asks for a clickable business phone and a real street address (no PO boxes),
  // and a reviewer cross-checks the address here against the 10DLC brand registration --
  // a mismatch is a named rejection cause. If either changes, change it in BOTH places.
  phone: '+18133171539',
  phoneShow: '(813) 317-1539',
  // TWO ADDRESSES, ON PURPOSE.
  //
  // `addressRegistered` MUST match the address on the 10DLC brand registration
  // (B3S433C), which in turn had to match the IRS record for the EIN -- TCR validates
  // legal name, EIN and legal address against IRS/DUNS, and inconsistent business info
  // is cited as roughly 80% of TCR rejections. The brand came back VERIFIED, which is
  // the proof this address is the one the IRS holds. DO NOT change it to match the
  // mailing address; change the mailing address instead.
  //
  // `addressMailing` is Doola's registered agent and is where post should go.
  //
  // Showing both removes the mismatch a reviewer would otherwise see between the
  // brand record and this website.
  addressRegistered: '1216 SW 2nd Ave, Gainesville, FL 32601',
  addressMailing: '7901 4th St N, Ste 300, St. Petersburg, FL 33702',
  github: 'https://github.com/mertozcetinwd-lab',
  // Mert's personal site. Separate brand, same person; the /about page sends
  // people there rather than restating a portfolio inside the business site.
  personalSite: 'https://mertozcetin.com',
  personalSiteShow: 'mertozcetin.com',
};

// The homepage hero uses this copy in a server-rendered Astro component so its
// offer and call-flow text are visible in the initial HTML.
export const hero = {
  eyebrow: 'AI voice agent implementation',
  title: 'AI call intake, with a person in the loop.',
  lead: 'Client Optimal implements custom AI voice agents for businesses with routine inbound calls, then provides ongoing support under agreed terms. The assistant identifies itself as AI, follows an approved script, captures callback details, and routes exceptions to a person. Phone setup, support scope, availability, response times, pricing, and provider costs are agreed before go-live.',
  cta: { label: 'Hear the sample', href: '/demo' },
  secondary: { label: 'Discuss a call flow', href: '/contact' },
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
//
// 2026-09-19: recast as the missed-call problem in trade terms. Still honest:
// no metrics, no fear-mongering, nothing a caller could not say themselves.
export const problem = {
  eyebrow: 'The use case',
  title: 'A missed call needs a clear next step.',
  cards: [
    {
      idx: '01',
      tag: 'Call intake',
      title: 'Capture the reason for the call.',
      desc: 'An approved script can collect a caller name, callback number, service request, and location before the owner returns the call.',
    },
    {
      idx: '02',
      tag: 'Human fallback',
      title: 'Put exceptions in a person’s hands.',
      desc: 'Urgent, unclear, or out-of-scope calls need a named human route and a response rule agreed before launch.',
    },
    {
      idx: '03',
      tag: 'Clear limits',
      title: 'Keep promises inside the script.',
      desc: 'The assistant does not diagnose, quote, book, dispatch, or promise a callback time unless that action is explicitly configured and verified.',
    },
    {
      idx: '04',
      tag: 'Business inputs',
      title: 'The owner sets the rules.',
      desc: 'Hours, service area, approved services, intake questions, and callback ownership come from the business before configuration.',
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
//
// 2026-09-19: the voice agent is 01 and the rest of the grid exists to support
// it. Every card still describes something already built; none needed inventing.
export const capabilities = [
  {
    idx: '01',
    tag: 'Call flow',
    title: 'Scope the intake',
    desc: 'Map the opening disclosure, approved questions, information to capture, and the point where a person takes over.',
    includes: [
      'Identify the assistant as AI at the start',
      'Collect only fields the business approves',
      'Write a clear path for urgent or unclear requests',
    ],
  },
  {
    idx: '02',
    tag: 'Implementation',
    title: 'Configure the voice agent',
    desc: 'Select a provider and call route after checking the current phone system, required features, data settings, and operating cost.',
    includes: [
      'Confirm phone provider and forwarding behavior',
      'Agree a business-approved destination for intake summaries',
      'Document provider fees and required account settings',
    ],
  },
  {
    idx: '03',
    tag: 'Verification',
    title: 'Test and hand over',
    desc: 'Walk through sample calls, confirm failure paths, and give the business a written operating guide before launch.',
    includes: [
      'Test with fictional caller details',
      'Check escalation and endpoint failure behavior',
      'Document launch, support, and retention terms before go-live',
    ],
  },
];

// The differentiator. All four are real operating principles from the way
// Mert actually builds, documented in the AIOS decisions log. Nothing here is
// aspirational, which is the only reason it earns the space.
export const principles = [
  {
    idx: '01',
    title: 'Disclose before asking',
    desc: 'The opening says the caller is speaking with AI before the assistant collects details.',
  },
  {
    idx: '02',
    title: 'Keep answers in scope',
    desc: 'The script uses business-approved information and routes unclear or out-of-scope requests to a person.',
  },
  {
    idx: '03',
    title: 'Give failures an owner',
    desc: 'The design names who handles a transfer failure, provider outage, or unanswered callback before any number is routed.',
  },
  {
    idx: '04',
    title: 'Test before live routing',
    desc: 'Use fictional scenarios to check the script, transfer path, error behavior, and provider settings before a real call is routed.',
  },
];

// ---------------------------------------------------------------------------
// The work. Added 2026-07-31.
//
// The site argued entirely from method before this: the problem, how a build
// runs, the services, the principles. All of it a claim about HOW Mert works and
// none of it a thing he has built. /work/lead-engine had been written and was
// linked from nowhere, so it may as well not have existed.
//
// Entries are added when one is genuinely written, never to make the page look
// busier, and every figure on every card traces to something real. Nothing here
// is invented.
// ---------------------------------------------------------------------------
export const workMeta = {
  title: 'The work · Client Optimal',
  description:
    'Builds documented in full: a prospecting engine on free public data, and a resume screener that has to cite the line justifying every verdict.',
};

// Copy for /work. Deliberately COUNT-FREE. It read "One build, documented
// properly" while one existed and went wrong the moment a second was written --
// the same trap the sibling site solved by deriving its number. There is no
// number to derive here, so the wording just does not depend on one, and the
// honest "no wall of logos" argument holds at one entry or ten.
export const work = {
  eyebrow: 'The work',
  title: 'Each build, written up in full.',
  lead: 'Client Optimal is early, so there is no wall of logos here. Each job is written up properly instead: where the data came from, what the system decided, and the unflattering number it prints on purpose. More get added as they ship.',
};

// Copy for the homepage band. Deliberately different from the /work heading: on
// the homepage this section's job is to cash the cheque the four principles just
// wrote, so it names the method first and the build second.
export const workBand = {
  eyebrow: 'The work',
  title: 'See the work that exists.',
  lead: 'The published case studies document earlier engineering projects. They are not voice-agent client results. The browser demo is a sample interaction, not a customer deployment.',
  cta: { label: 'See the rest of the work', href: '/work' },
};

// Rendered by CaseStudyCard.astro on both /work and the homepage. `figures` is
// the same 412 / 43 / 11 funnel printed on the case study itself; if one changes,
// change both, because a homepage that disagrees with its own case study is worse
// than a homepage with no figures on it.
export const caseStudies = [
  {
    href: '/work/lead-engine',
    kicker: 'Nonprofit prospecting',
    title: 'A lead engine that says less than it knows.',
    summary:
      'Two free public datasets in, a ranked prospect list out. It grades the confidence of every contact name it finds, and returns “unclear” rather than invent one.',
    figures: [
      { num: '412', label: 'organisations examined' },
      { num: '43', label: 'inside the target size band' },
      { num: '11', label: 'showing measurable financial distress' },
    ],
    stack: 'Python · IPEDS · ProPublica Form 990 API',
  },
  {
    href: '/work/resume-screener',
    kicker: 'Hiring',
    title: 'A screener that has to show its work.',
    summary:
      'Reads a job post, assesses each resume against it, and cites the line justifying every verdict. A claim it cannot ground in the document is thrown away before it reaches you.',
    // "0 of 8" is the odd one out and it is deliberate: it is the number the tool
    // was willing to return rather than find something, and it is the same
    // argument the lead engine makes with "3 of 11". Verified by hand -- an IT
    // technician against an engineering role.
    figures: [
      { num: '8', label: 'requirements read from the job post' },
      { num: '3', label: 'rules enforced in code, not asked for in a prompt' },
      { num: '0 of 8', label: 'the score it was willing to return' },
    ],
    stack: 'Python · Claude API · pypdf · python-docx',
  },
];

// Every repo below is public and really exists.
//
// Was dormant from 2026-07-23 to 2026-07-31, when it came off the homepage. It is
// back, but LOWER and SMALLER: it renders at the foot of /work, underneath the
// case study, and on no other page. That distinction is the whole reason it is
// defensible again. The 2026-07-23 objection was that a raw list of repo links was
// the only proof on the HOMEPAGE, which asks a buyer to go read source code to
// find out whether to hire someone. Sitting under a written case study on a
// dedicated page, the same list is corroboration for a reader who wants it, and
// costs nothing to a reader who does not.
//
// The lead lost the "no results, so read the code instead" argument it used to
// carry. The case study makes that case better, and repeating it here would make
// the page apologise twice.
export const proof = {
  eyebrow: 'Source',
  title: 'Or read the code.',
  lead: 'Every repo below is public. Scheduled agents, lead scoring, research pipelines, tools wired into one flow. The same class of build you would get, open to read before you decide anything.',
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
//
// 2026-09-19: the ask is now "try the agent", which the site can actually
// deliver on: the floating widget opens the live demo from any page.
export const cta = {
  eyebrow: 'Start here',
  title: 'Start with the call flow.',
  lead: 'Share your phone provider, the calls you want handled, and who should follow up. Client Optimal will scope a custom implementation and confirm the terms before anything goes live.',
};

// Honest FAQ, rig.ai-style accordion. Answers are generalist and true; nothing
// implies a track record. "Is my data safe" stays consistent with /privacy.
//
// 2026-09-19: rewritten around the voice agent. Every answer stays true to the
// hard constraint at the top of this file: no results, no track record.
export const faq = {
  eyebrow: 'Questions',
  title: 'Before we scope it.',
  items: [
    {
      q: 'What exactly does the voice agent do?',
      a: 'The proposed first version identifies itself as AI, follows an approved intake script, and collects a name, callback number, service request, and location. A person handles urgent, unclear, or out-of-scope requests. Booking, quoting, dispatch, and automatic text alerts are not included in this draft.',
    },
    {
      q: 'Will my customers know they are talking to an AI?',
      a: 'The opening script must clearly say that the caller is speaking with an AI assistant. The exact disclosure and call flow are reviewed before a real phone route is enabled.',
    },
    {
      q: 'What happens to my current phone setup?',
      a: 'That depends on your carrier, phone system, and desired call flow. Those details, the fallback route, and a way to disable forwarding must be confirmed before implementation. No phone changes are assumed in this draft.',
    },
    {
      q: 'Which businesses are a fit?',
      a: 'Different types of businesses may fit when routine inbound calls can follow an approved script and a person is available for exceptions or callbacks. Fit depends on the actual call types, phone system, privacy needs, and business model.',
    },
    {
      q: 'What does it cost?',
      a: 'The implementation price, ongoing support fee, covered systems, availability, response times, and any provider or phone-system charges are agreed in writing before work starts.',
    },
    {
      q: 'What ongoing support is available?',
      a: 'Client Optimal provides ongoing support under agreed terms. The covered systems, support hours, response path, response times, and fees are set out in writing for each project before go-live.',
    },
    {
      q: 'How are audio and call records handled?',
      a: 'The browser sample sends microphone audio to Retell AI to run the conversation. Retention, recording, transcription, and model-use settings have not been verified for this account. Do not share real personal or sensitive details in the sample. A client deployment needs confirmed provider settings and suitable caller notices and consent.',
    },
  ],
};

/* ============================================================
   /services: the services and approach page
   ============================================================ */

// Head copy for the page. Base.astro takes { title, description }; the title uses
// a middle dot because em dashes are out.
export const servicesMeta = {
  title: 'Voice agent services · Client Optimal',
  description:
    'Custom AI voice agent implementation for inbound call intake, with an approved script, human escalation path, testing, and handover.',
};

export const servicesHero = {
  eyebrow: 'Custom implementation',
  title: 'A scoped call flow, built around your phone system.',
  lead: 'Client Optimal implements inbound AI voice agents and provides ongoing support under agreed terms. Each project includes clear AI disclosure, approved intake questions, and a defined human handoff. Phone provider, integrations, support scope, availability, response times, pricing, and privacy settings are confirmed for that project.',
  cta: { label: 'Discuss your call flow', href: '/contact' },
  secondary: { label: 'How a project runs', href: '#approach' },
};

// How an engagement actually runs. Deliberately NO pricing: the honest line is
// "you get a rough number before you commit", which is what the FAQ already says.
// Nothing here promises an outcome, because /terms carries a no-guarantees clause.
export const engagement = {
  eyebrow: 'Approach',
  title: 'Map it. Configure it. Test it. Support it.',
  lead: 'The phone provider, human escalation route, recording settings, price, timeline, and ongoing support terms are confirmed before any live number is changed.',
  steps: [
    {
      idx: '01',
      title: 'Map the calls',
      desc: 'You provide the phone provider, current routing, service area, hours, approved services, intake fields, emergency wording, and the person who handles callbacks.',
    },
    {
      idx: '02',
      title: 'Agree the script',
      desc: 'We agree the AI disclosure, approved answers, questions, fallback wording, privacy notices, and any integration in writing. Unknowns stay open until verified.',
    },
    {
      idx: '03',
      title: 'Configure and test',
      desc: 'Build the agreed call flow, test it with fictional scenarios, and verify what happens when the provider, integration, or human handoff is unavailable.',
    },
    {
      idx: '04',
      title: 'Handover and ongoing support',
      desc: 'You receive a written setup guide, known limitations, disable/fallback steps, provider costs, and ongoing support under the agreed terms. Covered systems, availability, response times, fees, and launch timing are confirmed in writing.',
    },
  ],
};

// Honest qualification. The "not a fit" column is where the no-guarantees stance
// lives, and it is the most useful thing on the page for the wrong prospect.
export const fit = {
  eyebrow: 'Fit',
  title: 'A fit depends on the actual call path.',
  lead: 'Different business types can be a fit. We check the business model, call types, phone setup, privacy needs, and human availability before proposing an implementation.',
  good: {
    title: 'A good fit if',
    items: [
      'Routine inbound calls can be handled with a short approved script',
      'A named person can return calls or handle exceptions',
      'You can provide accurate hours, services, coverage, and routing rules',
      'You want clear AI disclosure and a documented fallback',
      'You are comfortable with confirmed provider costs and data terms',
    ],
  },
  bad: {
    title: 'Probably not if',
    items: [
      'Callers need emergency dispatch or safety-critical advice',
      'The business needs the agent to diagnose, quote, or promise a result',
      'No person is available to receive escalations or callbacks',
      'The provider cannot meet the required privacy, recording, or routing needs',
      'The workflow or business model needs additional review before it can be scoped safely',
    ],
  },
};

// The offer is industry-neutral. A business still needs a suitable call path.
export const industries = {
  eyebrow: 'Suitable call patterns',
  title: 'Start with the calls, not the industry.',
  lead: 'Businesses in different industries may be a fit when routine calls can follow an approved script and a person can handle exceptions. Each call path is assessed on its own.',
  patterns: [
    { name: 'Routine enquiries', desc: 'Questions, service requests, or callback requests with intake fields and answers the business has approved.' },
    { name: 'Clear human follow-up', desc: 'A named person or team can take urgent, unusual, or out-of-scope calls.' },
    { name: 'Defined boundaries', desc: 'The agent is not asked to diagnose, promise a price or availability, or make decisions that need a person’s judgment.' },
  ],
  note: 'Industry-neutral does not mean every call flow is suitable. Fit depends on the actual business, phone system, and follow-up route.',
};

/* ============================================================
   /about: who is behind this
   ============================================================ */

export const aboutMeta = {
  title: 'About · Client Optimal',
  description:
    'Client Optimal is a one-person AI voice agent implementation studio run by Mert Ozcetin. Review the sample, service scope, and existing engineering work.',
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
  lead: 'I run Client Optimal, a one-person implementation studio working remotely on US Eastern hours. I am the contact for scoping, building, and handover.',
  paras: [
    'The current focus is custom AI voice-agent implementation and ongoing support: map the phone route, agree what the assistant may ask, choose a human fallback, and test the flow before launch. Provider, integration, support scope, response terms, and price depend on the project.',
    'The browser interaction on this site is a sample, not a customer deployment. The case studies on the Work page cover earlier engineering projects; they are not voice-agent client results.',
    'A project starts with the business model and call path. If the service, revenue model, or caller needs are a poor fit, I will say so before proposing a build.',
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
  { href: '/contact', label: 'Contact' },
];

// Derived, never typed by hand. Hand-numbering on the sibling site once
// produced two projects both numbered 06.
capabilities.forEach((c, i) => { c.idx = String(i + 1).padStart(2, '0'); });
principles.forEach((p, i) => { p.idx = String(i + 1).padStart(2, '0'); });
problem.cards.forEach((c, i) => { c.idx = String(i + 1).padStart(2, '0'); });
engagement.steps.forEach((s, i) => { s.idx = String(i + 1).padStart(2, '0'); });
