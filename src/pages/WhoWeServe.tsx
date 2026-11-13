import { Band, CtaBand, H2, Label, Lead, PAD, PageHeader, Row } from "../components/blocks"
import { CheckSquare, GeistMono, LINE, Reveal } from "../components/primitives"
import { cn } from "../lib/utils"

const SIDES = [
  {
    n: "01.1",
    label: "For suppliers",
    title: "You sell it. We look for who needs it.",
    lead: "You sell a service or a product and want qualified buyers, not a list of names.",
    points: [
      "We look for companies with a live need that matches what you do.",
      "We work to confirm the need and who decides before we mention you.",
      "You pay a fixed fee per introduction, agreed in writing before work starts.",
    ],
    need: ["What you sell, and who it suits.", "Where you work and your capacity.", "Past work we can reference."],
  },
  {
    n: "01.2",
    label: "For buyers",
    title: "You need it. We look for who can do it.",
    lead: "You need a supplier and would rather meet a suitable one than run a search.",
    points: [
      "Tell us what you are buying, where, and by when.",
      "We check a supplier's capacity, past work and fit before proposing anyone.",
      "The fee is fixed per introduction and agreed in writing before work starts.",
    ],
    need: ["What you are buying and the timeline.", "Where it is needed.", "Who decides."],
  },
]

const INDUSTRIES = [
  { name: "Industrial", text: "Plants, materials, automation and the buyers who feed them." },
  { name: "Logistics", text: "Freight, warehousing and the carriers and shippers who need each other." },
  { name: "Healthcare", text: "Health technology and digital tools meeting the people who buy them." },
  { name: "Construction", text: "Contractors, materials and the projects waiting on them." },
]

export default function WhoWeServe() {
  return (
    <>
      <PageHeader
        n="03"
        label="Who we serve"
        title="Sell it or buy it. Meet the"
        accent="relevant people."
        lead="Two sides, one introduction. One fixed fee, agreed in writing."
      />

      <Band>
        <Row split>
          {SIDES.map((s, i) => (
            <div key={s.n} className={cn(PAD, "lg:py-16", i === 0 && "border-b lg:border-b-0 lg:border-r")} style={{ borderColor: LINE }}>
              <Reveal delayMs={i * 100}>
                <Label n={s.n}>{s.label}</Label>
                <h2 className="mt-4 max-w-[16ch] text-[1.6rem] font-medium uppercase leading-[1.04] tracking-[-0.035em] sm:text-[2rem]">{s.title}</h2>
                <Lead>{s.lead}</Lead>
                <ul className="mt-7 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[13.5px] leading-[1.6] text-[#505050]">
                      <CheckSquare className="mt-[0.35em] size-3 shrink-0 text-[#0000FF]" />
                      <span className="co-li">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border p-4" style={{ borderColor: LINE }}>
                  <p className={cn(GeistMono.className, "text-[9.5px] uppercase tracking-[0.14em] text-[#6E6E6E]")}>What we need from you</p>
                  <ul className="mt-3 space-y-2">
                    {s.need.map((n) => (
                      <li key={n} className="flex gap-3 text-[13px] leading-[1.55] text-[#303030]">
                        <span className="mt-[0.65em] size-1 shrink-0 bg-[#0000FF]" aria-hidden />
                        <span className="co-li">{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </Row>
      </Band>

      <Band>
        <Row split>
          <div className={cn(PAD, "lg:border-r")} style={{ borderColor: LINE }}>
            <Reveal>
              <Label n="02">Industries</Label>
              <H2>Where we work.</H2>
              <Lead>We focus on industries where a supplier's capacity and a buyer's need can be checked before an introduction is made.</Lead>
            </Reveal>
          </div>
          <div className="hidden lg:block co-hatch" aria-hidden />
        </Row>
        <Row>
          <div className="grid grid-cols-1 gap-px bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <div key={ind.name} className="co-lift bg-white p-5 sm:p-6 lg:p-8">
                <Reveal delayMs={i * 80}>
                  <p className={cn(GeistMono.className, "text-[10px] tracking-[0.12em] text-[#0000FF]")}>{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-[1.15rem] font-medium uppercase tracking-[-0.02em]">{ind.name}</h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-[#6E6E6E]">{ind.text}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </Row>
        <Row>
          <p className="px-4 py-5 text-[13px] text-[#6E6E6E] sm:px-6 lg:px-10">
            Not on the list? Write to us anyway. We will tell you plainly whether we can help.
          </p>
        </Row>
      </Band>

      <CtaBand title="Tell us your side." accent="We do the rest." lead="One email is enough to start. We reply with what is possible and what it would cost." />
    </>
  )
}
