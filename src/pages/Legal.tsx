import { Band, Label, PAD, Row } from "../components/blocks"
import { EMAIL, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"
import { Link } from "react-router-dom"

/**
 * Privacy Policy and Terms of Service for the introduction brokerage.
 * The business identity block at the bottom (legal name, registered address, mailing address, phone, email)
 * is kept on purpose: it matches the A2P 10DLC brand registration, and a carrier reviewer cross-checks it.
 * If the registered address or phone ever changes, change it here and in the registration.
 * These pages are plain-language drafts for a small business. Have a lawyer review them before relying on them.
 */

type Section = { h: string; p: string[] }

const EFFECTIVE = "November 13, 2026"

const PRIVACY: Section[] = [
  {
    h: "The short version",
    p: [
      "Client Optimal LLC is an introduction brokerage. We do not sell or rent personal information. This website has no advertising trackers and no first-party analytics.",
      "We collect what you send us, and we use public business information to work out which companies may need a supplier next.",
    ],
  },
  {
    h: "What this website collects",
    p: [
      "Our hosting and domain providers may record technical request information such as IP address, browser type and the page requested. We use it to keep the site running and secure.",
      "The contact form on this site does not store anything. It opens your own email app with a draft addressed to us. Nothing is sent until you send it.",
    ],
  },
  {
    h: "If you contact us",
    p: [
      "If you write to us, we receive whatever you choose to send: your name, your email address, your company and what you write. We use it to reply, to discuss a possible introduction and to keep a record of the conversation.",
      "Email conversations also sit on your email provider's systems and ours. Their privacy policies apply to them as well.",
    ],
  },
  {
    h: "Public business information",
    p: [
      "To find companies that may need a supplier, we read public sources such as company websites, public listings and public business registries. We may keep a company's name, the business contact details of a person there, and a note of why the company may be relevant.",
      "We may contact people at those businesses about a relevant introduction. If you tell us you do not want to hear from us, we stop and keep only the minimum needed to honour that request, such as your email address or number on a suppression list.",
    ],
  },
  {
    h: "Introductions",
    p: [
      "When we introduce two companies, we share the names and business contact details of the people involved with the other side, by email, as part of the introduction. We do not sell these details and we do not share them for any other purpose.",
    ],
  },
  {
    h: "Text messages",
    p: [
      "If we send you a text message, it is about a possible business introduction or about a conversation you have already had with us. Message frequency may vary. Standard message and data rates may apply. Consent to receive text messages is not a condition of any purchase.",
      "To stop receiving messages, reply STOP. That removes your number and we check the suppression list at the moment of sending. Reply HELP for help, or email us.",
      "Your mobile information will not be sold or shared with third parties or affiliates for marketing or promotional purposes. All the categories in this policy exclude text messaging originator opt-in data and consent. This information will not be shared with any third parties.",
      "Messages are delivered by our telephony provider, acting on our behalf. They may not use your number for anything other than delivering the message.",
    ],
  },
  {
    h: "Service providers",
    p: [
      "We use a small number of providers to run the business: website hosting and domain services, email, and telephony for messages. They process information only to provide their service to us, on our instructions.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "We keep conversations and introduction records for as long as we may need them for the business, to answer questions about an introduction, and to meet legal obligations. Opt-outs are kept so that they keep working. A suppression list entry holds only your email address or number, nothing else.",
      "You can ask us to delete the personal information we hold about you, other than the suppression entry that honours your opt-out.",
    ],
  },
  {
    h: "The Client Optimal LinkedIn application",
    p: [
      "Client Optimal operates a private LinkedIn application used only to publish posts to its own founder's LinkedIn account. It signs in through LinkedIn OAuth, which gives it that account's own profile identifier and permission to post as that account. It uses them for nothing else.",
      "The application does not read, collect or store data about any other LinkedIn member. It does not access your profile, your connections, your feed or your activity, and it does not scrape LinkedIn.",
    ],
  },
  {
    h: "Your choices",
    p: [
      "You can ask what we hold about you, ask us to correct or delete it, or ask us to stop contacting you. Email us and we will reply.",
    ],
  },
  {
    h: "Changes",
    p: ["We may update this policy. The current version is always the one on this page, and the effective date above shows when it last changed."],
  },
]

const TERMS: Section[] = [
  {
    h: "Agreement",
    p: ["These terms apply to your use of this website. By using it, you agree to them. If you do not, please stop using the site."],
  },
  {
    h: "What Client Optimal does",
    p: [
      "Client Optimal LLC is an introduction brokerage. We look for companies that may need a supplier, work to confirm the need, and introduce a suitable supplier. The companies then deal with each other directly.",
      "We are not a party to any agreement between the companies we introduce, and we do not guarantee that an introduction will lead to a meeting, a sale or any other outcome. Nothing on this website is legal, financial, medical or professional advice.",
    ],
  },
  {
    h: "Fees and client work",
    p: [
      "Any engagement with us is governed by a separate written agreement that sets the scope and the fee before work starts. Nothing on this website changes, overrides or forms part of that agreement.",
    ],
  },
  {
    h: "Case studies",
    p: [
      "The case studies on this website are NDA-signed, licensed case studies. They show how the introduction process performs. Company names are covered. Results vary and are not a promise of any particular outcome.",
    ],
  },
  {
    h: "Using this website",
    p: ["Use the site lawfully. Do not attempt to disrupt, attack or gain unauthorized access to it or to any system connected to it."],
  },
  {
    h: "Text messaging",
    p: [
      "If we send you text messages, they are about a possible business introduction or about a conversation you have already had with us. Message frequency may vary. Standard message and data rates may apply. Consent is not a condition of any purchase.",
      "Reply STOP to any message to opt out, which stops all further messages. Reply HELP for help. Carriers are not liable for delayed or undelivered messages.",
      "We do not sell, rent or share your mobile number or your consent with third parties for their marketing purposes. See the Privacy Policy for how your information is handled.",
    ],
  },
  {
    h: "No guarantees",
    p: [
      "We aim to describe our work accurately and to do it carefully. We do not guarantee any specific business, revenue or other outcome from reading this website or from any service. This website is provided as is, without warranties of any kind, to the extent the law allows.",
    ],
  },
  {
    h: "Intellectual property",
    p: ["The text, design, code and branding of this website belong to Client Optimal LLC unless stated otherwise. Please do not copy or redistribute them without permission."],
  },
  {
    h: "Links to other sites",
    p: ["This site links to third-party sites such as LinkedIn. We do not control them and are not responsible for their content or their practices."],
  },
  {
    h: "Limitation of liability",
    p: ["To the fullest extent permitted by law, Client Optimal LLC is not liable for indirect, incidental, special, consequential or punitive damages arising from your use of this website."],
  },
  {
    h: "Governing law",
    p: [
      "These terms are governed by the laws of the State of Florida, without regard to its conflict of law rules. Any dispute arising from them or from your use of this website will be brought in the state or federal courts located in Florida.",
    ],
  },
  {
    h: "Changes",
    p: ["These terms may be updated. The current version is always the one on this page, and the effective date above shows when it last changed."],
  },
]

function Business() {
  return (
    <div className="mt-12 border-t pt-6" style={{ borderColor: LINE }}>
      <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#0000FF]")}>Business details</p>
      <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 text-[13.5px] leading-[1.6] text-[#303030] sm:grid-cols-[170px_1fr]">
        <dt className="text-[#6E6E6E]">Legal name</dt>
        <dd>Client Optimal LLC</dd>
        <dt className="text-[#6E6E6E]">Email</dt>
        <dd>
          <a className="co-ul" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </dd>
        <dt className="text-[#6E6E6E]">Phone</dt>
        <dd>
          <a className="co-ul" href="tel:+18133171539">
            (813) 317-1539
          </a>
        </dd>
        <dt className="text-[#6E6E6E]">Registered address</dt>
        <dd>1216 SW 2nd Ave, Gainesville, FL 32601</dd>
        <dt className="text-[#6E6E6E]">Mailing address</dt>
        <dd>7901 4th St N, Ste 300, St. Petersburg, FL 33702</dd>
      </dl>
    </div>
  )
}

function LegalPage({ n, label, title, intro, sections, other }: { n: string; label: string; title: string; intro: string; sections: Section[]; other: { to: string; text: string } }) {
  return (
    <>
      <Band>
        <Row>
          <div className={cn(PAD, "lg:py-16")}>
            <Reveal>
              <Label n={n}>{label}</Label>
              <h1 className="mt-5 max-w-[16ch] text-[2rem] font-medium uppercase leading-[1.03] tracking-[-0.04em] sm:text-[2.6rem] lg:text-[clamp(2.2rem,3.4vw,3.5rem)]">
                {title}
              </h1>
              <p className="mt-4 max-w-[54ch] text-[14.5px] leading-[1.6] text-[#6E6E6E]">{intro}</p>
              <p className={cn(GeistMono.className, "mt-5 text-[10px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>Effective {EFFECTIVE}</p>
            </Reveal>
          </div>
        </Row>
      </Band>
      <Band>
        <Row>
          <div className={cn(PAD, "lg:py-14")}>
            <div className="max-w-[68ch]">
              {sections.map((s) => (
                <section key={s.h} className="mb-9">
                  <h2 className="mb-3 text-[1.05rem] font-medium tracking-[-0.01em] text-black">{s.h}</h2>
                  {s.p.map((x, i) => (
                    <p key={i} className="mb-3 text-[14px] leading-[1.75] text-[#303030]">
                      {x}
                    </p>
                  ))}
                </section>
              ))}
              <p className="text-[14px] leading-[1.75] text-[#303030]">
                Questions? Email{" "}
                <a className="co-ul text-[#0000FF]" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
                . See also our{" "}
                <Link className="co-ul text-[#0000FF]" to={other.to}>
                  {other.text}
                </Link>
                .
              </p>
              <Business />
            </div>
          </div>
        </Row>
      </Band>
    </>
  )
}

export function Privacy() {
  return (
    <LegalPage
      n="06"
      label="Privacy"
      title="Privacy policy."
      intro="What this website, our outreach and our text messages collect, and what we do with it."
      sections={PRIVACY}
      other={{ to: "/terms", text: "Terms of Service" }}
    />
  )
}

export function Terms() {
  return (
    <LegalPage
      n="07"
      label="Terms"
      title="Terms of service."
      intro="The terms that apply to this website. Client work is governed by its own written agreement."
      sections={TERMS}
      other={{ to: "/privacy", text: "Privacy Policy" }}
    />
  )
}
