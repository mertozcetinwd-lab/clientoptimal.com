# ClientOptimal.com voice-agent redesign review

**Prepared:** October 13, 2026
**State:** Pre-release review snapshot prepared October 13, 2026. Mert later authorized pushing this redesign to production and updating the live site.

## 1. Current state

At the start of this review, the public site at [clientoptimal.com](https://clientoptimal.com/) still presented a broad AI automation offer. It did not yet reflect the general AI voice-agent implementation and ongoing-support direction selected for this site. The local project already contained substantial uncommitted voice-agent work, including a Retell browser sample, a floating demo widget, an Astro/React site, and a token endpoint used for local development. The local working tree was already dirty before this redesign. Those changes were preserved. This review did not touch `.env`, call the token endpoint, start a Retell sample, or change a provider setting.

The redesigned homepage explains a proposed call-intake flow and how fit is assessed. The local sample says it is an AI sample, not a client deployment. Existing engineering case studies are explicitly identified as unrelated to voice-agent results. Mert later authorized updating the public site. The campaign draft remains separate from Explee and is not ready to import, schedule, or send.

Key gaps found and addressed in the prototype:

- The old live offer and current test offer differ. The new homepage and service page present industry-neutral voice-agent implementation and ongoing support for suitable call workflows.
- The old homepage hero depended on a client-only 3D React island. The new hero is server-rendered Astro HTML with a useful call-flow panel and visible `{{placeholders}}`.
- The Retell browser sample did not clearly explain provider processing before start. The local sample now has an unchecked audio-consent box, a privacy link, a fictional-data instruction, and a notice that a sample may create metered Retell usage billed to Client Optimal. Mert estimates the account has about $10 in free credits, but this remains unverified: the dashboard redirected to sign-in. The rate and actual balance are unknown.
- The sample's recording, transcript retention, and model-use settings have not been verified. The local privacy page says so and links to Retell's terms and privacy policy.
- `/text-me` remains available for its existing SMS form but now sends a `noindex,follow` instruction. It is excluded from the new sitemap.
- No sitemap or robots file existed in the source. Both are now present for the planned indexable routes.

## 2. Business direction

**Selected direction:** industry-neutral custom AI voice-agent implementation and ongoing support for suitable inbound call workflows. The user clarified that the offer should apply generally, not focus on plumbing or another single trade. Map the call path, agree the AI disclosure and script, configure a provider after checking the client's phone system, test fictional scenarios and failure paths, then provide handover and ongoing support under agreed terms. Support scope, covered systems, availability, response times, fees, and provider costs still need to be set for each project.

**Fit criteria:** businesses with routine inbound calls that can follow an approved script, a defined human route for exceptions, and a person or team available for follow-up. Industry-neutral does not mean every business or call path is suitable. No prospecting segment or geography has been selected; the website does not claim a service territory.

**Proof available:** a browser interaction and earlier engineering case studies. There are no verified voice-agent customers, client deployments, or voice-agent results. The browser interaction does not place a phone call or demonstrate a client phone integration.

**Evidence limit:** the October 13 AIOS offer and halal research recommended fixed-scope workflow implementation as the stronger near-term business direction and did not treat the voice offer as validated. The user has since selected a general voice-agent direction for the website. That preference guides this draft, but it does not establish voice-agent client results or deployments. See the [source ledger](../../references/halal-income-research-2026-10-13/09-source-ledger.md) and [decision report](../../references/halal-income-research-2026-10-13/08-decision-report.md) in the parent AIOS.

**Scope limits in the draft:** the assistant identifies itself as AI, follows a business-approved script, collects approved callback details, and hands unclear or out-of-scope requests to a person. No emergency response, dispatch, diagnosis, quote, booking, automatic text, guaranteed answer rate, or guaranteed result is promised. The business must provide the phone route, approved services, coverage, hours, intake fields, escalation owner, callback rule, and disable path.

**Halal screen:** the first prospecting hypothesis excludes emergency-only work and businesses dependent on insurance-claim revenue pending review. The actual services, financing, and revenue model need Mert's review or a qualified scholar's advice. This report makes no religious ruling.

## 3. Market and technical references

Checked October 13, 2026. Vendor prices and product claims below are vendor statements, not independent performance findings.

| Reference | What it informs | Source |
|---|---|---|
| Jobber AI Receptionist | A field-service product makes call forwarding, a dedicated number, logs, booking scope, and included usage concrete buyer questions. Its public help page lists a $29 monthly add-on with 30 conversations and $0.79 per extra conversation. This is Jobber's published price, not a Client Optimal price or a like-for-like comparison. | [Jobber Receptionist help](https://help.getjobber.com/en/articles/receptionistpowered-by-jobber-ai/), updated July 9, 2026 |
| Retell AI | The current sample depends on Retell. Its terms address billing, recording, and use of communications for service improvement when applicable settings permit it. The account's recording, retention, transcription, and model-use settings were not inspected. | [Retell terms](https://www.retellai.com/legal/terms-of-service), last updated October 7, 2026; [Retell privacy policy](https://www.retellai.com/legal/privacy-policy) |
| Google Search | Google says normal search foundations still matter for AI search features: useful original content, crawlability, semantic HTML, and sound JavaScript and mobile practice. There is no special ranking guarantee or `llms.txt` shortcut. | [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [AI features](https://developers.google.com/search/docs/appearance/ai-features), [structured data intro](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) |
| FTC email guidance | CAN-SPAM applies to business-to-business commercial email. Keep sender and subject truthful, include a valid postal address and a clear opt-out, and honor opt-outs within 10 business days. This is a review item, not legal advice. | [FTC CAN-SPAM guide](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business) |
| Florida recording statute | Florida's statute includes an all-parties prior-consent rule for interception of covered communications, subject to statutory exceptions. Confirm the actual recording and transcription design with counsel for call locations before real routing or recording. | [Florida Statutes §934.03](https://leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&Search_String=790.338&URL=0900-0999/0934/Sections/0934.03.html) |
| Existing 21st.dev hero component | The existing modified `experience-hero.tsx` identifies itself as adapted from a community component. The component page did not show a license. The redesigned homepage no longer imports it. Keep it out of any distributed build until its reuse terms are established. | [21st.dev component page](https://21st.dev/@hardikkashiyani123456788/components/experience-hero) |

## 4. Design resources and license shortlist

No new library, template, design asset, analytics package, or SEO service was installed. The design uses the site's existing Astro/React stack and current navy, ice-white, and electric-blue tokens. Existing typefaces remain Archivo for display, Inter for body, and IBM Plex Mono for short labels. The new hero's static waveform and numbered call path are original markup. Motion is limited to existing site motion and the consent-gated voice visualizer. The visualizer now loads only after the audio-consent checkbox is selected.

| Candidate | License and fit checked October 13, 2026 | Decision |
|---|---|---|
| Existing Astro 7 + React 19 project | Already installed and builds as a static site. | Keep. No framework migration or dependency added. |
| Ant Design, MUI, daisyUI, Tabler, Chakra UI, Radix, shadcn/ui | The cited repositories publish permissive MIT core licenses. MUI X has separately licensed paid features; Tabler's bundled third-party charts can have different terms. | Do not add a visual system to a site that already has hand-authored tokens and CSS. Radix could be revisited if a specific accessible primitive is needed. [Ant Design](https://github.com/ant-design/ant-design), [MUI](https://github.com/mui/material-ui), [daisyUI](https://github.com/saadeghi/daisyui), [Tabler](https://github.com/tabler/tabler), [Chakra](https://github.com/chakra-ui/chakra-ui), [Radix](https://github.com/radix-ui/primitives), [shadcn/ui](https://github.com/shadcn-ui/ui) |
| Vuetify, Vant | MIT, but Vue-specific. | Not compatible with the current React/Astro implementation without adding a second framework. [Vuetify](https://github.com/vuetifyjs/vuetify), [Vant](https://github.com/youzan/vant) |
| HeroUI, Onlook | HeroUI's React package is MIT; Onlook's repository is Apache-2.0 and its editor is early access, oriented around React/Next/Tailwind. | Neither solves a need the current source lacks. [HeroUI](https://github.com/heroui-inc/heroui), [Onlook](https://github.com/onlook-dev/onlook) |
| GrapesJS, Webstudio | GrapesJS core is BSD-3-Clause, while its Studio SDK is separately licensed. Webstudio Builder is AGPL and its platform is open-core. | Not selected: these are site-builder products, not small components for this static source. [GrapesJS core license](https://github.com/GrapesJS/grapesjs/blob/dev/packages/core/LICENSE), [Studio SDK terms](https://github.com/GrapesJS/studio/blob/main/LICENSE.md), [Webstudio licensing FAQ](https://github.com/webstudio-is/webstudio-community/blob/main/docs/basics/FAQ.md) |
| Magic UI | A component collection rather than a needed framework. Review a specific component and its assets before reuse. | No component copied or installed. [Magic UI](https://github.com/magicuidesign/magicui) |
| Emil Kowalski skills, Design Motion Principles, UI UX Pro Max | Public skills are MIT-licensed. | Useful implementation references, not dependencies. Motion guidance supports keeping the call diagram static and reserving animation for the voice sample. [Emil skills](https://github.com/emilkowalski/skills), [Design Motion Principles](https://github.com/kylezantos/design-motion-principles), [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| Transitions.dev, Refero Styles, Awesome DESIGN.md, scroll-craft | Reference and workflow resources. No screenshots, brand assets, or design files were copied into the site. The Awesome DESIGN.md repository is MIT; included brand systems are not permission to copy a brand identity. | Use only to study broad interaction and layout ideas. [Transitions](https://transitions.dev/pro.html), [Refero](https://styles.refero.design/), [Awesome DESIGN.md](https://github.com/VoltAgent/awesome-design-md), [scroll-craft](https://github.com/nateherkai/scroll-craft) |
| SaaS Boilerplate, Open React Template, Next landing page starter, AstroWind, HugoBlox | SaaS Boilerplate is MIT but includes a full Next app and backend. Open React Template is GPL. The Next starter and AstroWind are MIT, but the Next starter targets Next 14 and Tailwind 3, while AstroWind is a generic Astro starter. HugoBlox is MIT but changes the content/build model. | None selected. Replacing the current working Astro site adds migration risk and no needed functionality. [SaaS Boilerplate](https://github.com/ixartz/SaaS-Boilerplate), [Open React Template](https://github.com/cruip/open-react-template), [Next starter license](https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template/blob/master/LICENSE), [AstroWind](https://github.com/arthelokyo/astrowind), [HugoBlox](https://github.com/HugoBlox/kit) |
| Plausible Analytics, OpenSEO | Plausible Community Edition is AGPLv3. OpenSEO is MIT, but self-hosted data features need paid DataForSEO credentials and the app documents telemetry. | Do not add either. No analytics question needs answering yet, and basic crawl files and Search Console are a better fit. [Plausible](https://github.com/plausible/analytics), [OpenSEO](https://github.com/every-app/open-seo) |

## 5. Sitemap and page flow

| Page | Job | Main path |
|---|---|---|
| `/` | State the implementation and ongoing-support offer, show the four-step call flow, explain suitable call patterns, and point to the sample or contact. | Hear the sample or discuss a call flow. |
| `/services` | Explain implementation, ongoing support, inputs, project steps, fit, exclusions, and open commercial terms. | Contact after the visitor understands what needs scoping. |
| `/demo` | Clearly label the browser interaction and recorded example as samples, show privacy and cost notices, explain limits, and show the proposed call path. | Contact by email or phone. |
| `/work` and two case studies | Show existing engineering proof while separating it from voice-agent experience. | Return to service or contact. |
| `/about` | Identify the one-person operator without invented credentials. | Contact. |
| `/contact` | Show published contact routes and a visible response-time placeholder. | Email or phone. |
| `/privacy`, `/terms` | Explain the website sample, SMS form, provider uncertainty, and service contract boundaries. | Footer links. |
| `/text-me` | Preserve the SMS consent path. | `noindex,follow`; not in sitemap. |

## 6. Website copy and design

The live strings are in `src/data/site.js`. The core homepage copy is:

> **AI call intake, with a person in the loop.**
>
> Client Optimal implements custom AI voice agents for businesses with routine inbound calls, then provides ongoing support under agreed terms. The assistant identifies itself as AI, follows an approved script, captures callback details, and routes exceptions to a person. Phone setup, support scope, availability, response times, pricing, and provider costs are agreed before go-live.

The page uses the CTA labels **Hear the sample** and **Discuss a call flow**. The next sections explain call intake, human fallback, limits, suitable call patterns, business inputs, implementation and ongoing support, existing work, and buyer FAQs. `/services` explains map, agree, configure and test, then support under agreed terms. `/demo` says the sample does not place a real phone call, send a text, create a booking, or handle a real request. It explicitly says Retell receives browser audio and may create metered usage.

Design choices: a large Archivo headline beside an original numbered call-flow panel, generous whitespace, high-contrast navy text on a light ice-white surface, electric-blue controls and rules, and restrained IBM Plex Mono labels. At 390px, the hero stacks into one column and CTAs span the content width. The floating launcher is hidden below 480px to avoid covering copy; the Demo navigation item and hero CTA remain available. The demo page holds a non-animated CSS orb until consent, then downloads the 3D visualizer. No generic dashboard, stock team photo, robot, or 3D hero is used.

Screenshots are in `review/screenshots/`:

- [Homepage desktop, 1440px](screenshots/home-light-1440-fold.png)
- [Homepage mobile, 390px](screenshots/home-light-390-fold.png)
- [Demo desktop, 1440px](screenshots/demo-light-1440-fold.png)
- [Demo mobile, 390px](screenshots/demo-light-390-fold.png)
- Full-page desktop and mobile captures are saved beside the fold shots.

The visualizer code is a remaining performance tradeoff: the production build still reports one minified chunk above 500 KB. It is split from the initial hero and loads only after the audio-consent checkbox is selected, but its actual network transfer and device performance still need measurement before public launch.

## 7. SEO, AEO, and GEO

**Implemented locally:** server-rendered H1 and call-flow copy; per-page title/description and canonical inherited from `Base.astro`; Open Graph/Twitter metadata; existing Organization JSON-LD; `public/robots.txt`; `public/sitemap.xml`; and `noindex,follow` on `/text-me`. The sitemap lists ten intended indexable routes and excludes the SMS form. No `llms.txt`, new analytics, or new SEO application was added.

**Before publication:** replace or remove every visible placeholder; check each canonical against deployment routes; confirm the recorded YouTube sample is accurate and authorized; verify contact details and mailing address; review the privacy policy and Retell settings; review calls and recording with counsel; submit the sitemap in Search Console; inspect homepage, services, demo, and policy routes; confirm `/text-me` stays out of search; and check mobile layout, image alternatives, keyboard focus, reduced-motion behavior, 404s, redirects, and Core Web Vitals. Do not add service-area pages until service territory is real. Do not add FAQ or Service structured data unless it matches visible, verified content. Neither search rankings nor AI citations can be promised.

## 8. Explee readiness and credit record

**Website offer alignment is one prerequisite, not campaign authorization.** This review began while the public site still showed the older generalist AI automation offer. Mert later authorized the voice-agent update. The Explee campaign document supplies explicit inputs, but there is no account-side field or draft preview to confirm because no account was accessed or created. The campaign remains paused pending the lead list, sender, geography, schedule, and cost review.

The public pricing page advertises **$30 in starter credits** and **750 emails**, an advertised arithmetic equivalent of $0.04 per email. The page also markets estimates of 2 to 6 warm leads, one meeting, and $1 to $20 cost per lead. These are Explee claims, not audited outcomes or a confirmed user balance. The terms say pay-as-you-go Agent use needs a saved card, usage is charged per email, the user can be liable for off-session charges after authorizing the Agent to work, and Explee may use company name, logo, and use-case details for promotion subject to its stated opt-out process. No card, account, or campaign was created.

| Credit ledger | Result |
|---|---|
| Account balance before | Unknown. The account was not signed in or inspected. |
| Actions taken in Explee | 0. No account setup, lead search, enrichment, email generation, or send. |
| Explee cost incurred by this work | $0. |
| Account balance after | Unknown. |
| Safe usable free balance | Unknown until the account ledger and any action quote are visible. |

Sources checked October 13, 2026: [Explee pricing](https://explee.com/pricing) and [Explee terms](https://explee.com/terms-of-use), which state a July 12, 2026 update date. The public start flow requested a card. Work stopped before providing one. Explee is not a sender or lead source for this draft. Any future pilot must remain at $0 paid spend, show a zero-cost quote within confirmed free credits before each metered action, and prevent overage.

**Retell balance check:** Mert believes the Retell account is working and has about $10 in free credits. A read-only dashboard visit reached the Retell sign-in screen, so the balance could not be verified without account access. No credentials were entered, no Retell API request or sample call was made, and no usage was incurred. Treat the estimate as unverified until the billing page is visible.

## 9. Implementation and verification

Files changed or added in the nested website repository include:

- `src/data/site.js`, general implementation and ongoing-support copy, suitable call patterns, process, fit, FAQs, and metadata.
- `src/components/HomepageHero.astro`, original static hero and call-flow panel.
- `src/components/Capabilities.astro`, `ServicesGrid.astro`, `Principles.astro`, `Ticker.astro`, `FlowDiagram.astro`, and `ContactCta.astro`, updated for the draft offer.
- `src/pages/index.astro`, `demo.astro`, `privacy.astro`, `terms.astro`, `contact.astro`, and `text-me.astro`, updated copy and noindex handling.
- `src/layouts/Base.astro`, conditional `noindex` support; `src/components/ui/VoiceAgentWidget.tsx` and `VoiceOrb.tsx`, sample disclosures, audio consent gates, billing notice, and deferred visualizer; `astro.config.mjs` and `README.md`, current stack notes.
- `public/robots.txt`, `public/sitemap.xml`, both review documents, and `review/screenshots/`.
- Root `references/teardown-and-rebuild-playbook.md` received one operational note about unknown usage balance and provider cost disclosure.

`npm run build` completed after the latest copy edits and generated 11 static pages. It reports one chunk above 500 KB, noted above. Homepage and demo screenshots at 1440px and 390px were refreshed and visually inspected after the copy changes. The demo control was not clicked. No automated tests were added or run. The local preview server was stopped after capture. Mert later authorized a production update. This review records the design and campaign research, not the deployment result. No account change or external message was made.

## 10. Decisions for Mert

1. Choose a specific prospecting segment and geography before building a campaign list. The website stays general.
2. Set ongoing-support scope, covered systems, availability, response times, and fees in each project agreement.
3. Before using a public sample or real routing, verify the Retell balance and metering rate, then confirm the sample script, recording and retention settings, and caller notices with the appropriate reviewer.

The Explee draft remains paused. Before activation, a separate review still needs the exact verified lead list, sender mailbox and postal address, geography, schedule, and maximum cost.
