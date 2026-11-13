import { cn } from "../lib/utils"
import { CountUp } from "./motion"
import { GeistMono, LINE } from "./primitives"
import type { Case } from "../data/cases"
import docs from "../data/case-docs.json"

type DocBlock = { t: "p" | "li" | "h" | "h3" | "meta"; x?: string; k?: string; v?: string }
type Doc = { title: string; blocks: DocBlock[] }
const DOCS = docs as Record<string, Doc>

/** Text with {{n}} tokens turned into solid black boxes (n = width in characters). */
export function Txt({ s }: { s: string }) {
  return (
    <>
      {s.split(/(\{\{\d+\}\})/).map((part, i) => {
        const m = /^\{\{(\d+)\}\}$/.exec(part)
        return m ? (
          <span
            key={i}
            role="img"
            aria-label="name withheld"
            className="inline-block h-[0.95em] translate-y-[0.14em] bg-black"
            style={{ width: `${m[1]}ch` }}
          />
        ) : (
          part
        )
      })}
    </>
  )
}

/** "Client Background: text" shows the label in medium weight. */
function Lead({ s }: { s: string }) {
  const m = /^([A-Z0-9][^:.{}]{2,55}):\s+([\s\S]*)$/.exec(s)
  if (!m) return <Txt s={s} />
  return (
    <>
      <span className="font-medium text-black">{m[1]}:</span> <Txt s={m[2]} />
    </>
  )
}

/** The full case study: headline figure and facts on the left, the whole write-up on the right. */
export default function CaseDocument({ c }: { c: Case }) {
  const doc = DOCS[c.slug]
  if (!doc) return null
  return (
    <div>
      <div className="border-b px-5 py-8 sm:px-8 lg:px-12 lg:py-10" style={{ borderColor: LINE }}>
        <p className={cn(GeistMono.className, "text-[10px] uppercase tracking-[0.16em] text-[#6E6E6E]")}>
          <span className="text-[#0000FF]">Case study</span> / {c.tag}
        </p>
        <h2 className="mt-4 max-w-[30ch] text-[1.5rem] font-medium uppercase leading-[1.08] tracking-[-0.035em] sm:text-[2rem] lg:text-[2.4rem]">
          <Txt s={doc.title} />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="border-b px-5 py-8 sm:px-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10" style={{ borderColor: LINE }}>
          <div className="lg:sticky lg:top-16">
            <p className={cn(GeistMono.className, "text-[2.6rem] font-normal leading-none tracking-[-0.05em]")}>
              <CountUp value={c.stat} />
            </p>
            <p className={cn(GeistMono.className, "mt-2 text-[10px] uppercase leading-snug tracking-[0.12em] text-[#6E6E6E]")}>{c.statLabel}</p>
            <dl className="mt-7 border-t" style={{ borderColor: LINE }}>
              {c.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[92px_1fr] gap-3 border-b py-3 lg:grid-cols-1 lg:gap-1" style={{ borderColor: LINE }}>
                  <dt className={cn(GeistMono.className, "pt-0.5 text-[9.5px] uppercase tracking-[0.12em] text-[#6E6E6E]")}>{k}</dt>
                  <dd className="text-[13px] leading-[1.5] text-[#303030]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <article className="px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="max-w-[68ch]">
            {doc.blocks.map((b, n) => {
              switch (b.t) {
                case "meta":
                  return (
                    <p key={n} className="mb-1.5 text-[14px] leading-[1.6] text-[#303030]">
                      <span className="font-medium text-black">{b.k}:</span> <Txt s={b.v ?? ""} />
                    </p>
                  )
                case "h":
                  return (
                    <h3
                      key={n}
                      className={cn(
                        GeistMono.className,
                        "mb-5 mt-10 border-t pt-5 text-[11px] font-normal uppercase tracking-[0.16em] text-[#0000FF] first:mt-0 first:border-t-0 first:pt-0",
                      )}
                      style={{ borderColor: LINE }}
                    >
                      <Txt s={b.x ?? ""} />
                    </h3>
                  )
                case "h3":
                  return (
                    <h4 key={n} className="mb-2.5 mt-7 text-[15px] font-medium tracking-[-0.01em] text-black">
                      <Txt s={b.x ?? ""} />
                    </h4>
                  )
                case "li":
                  return (
                    <p key={n} className="relative mb-2.5 pl-5 text-[14px] leading-[1.7] text-[#303030]">
                      <span className="absolute left-0 top-[0.62em] size-1.5 bg-[#0000FF]" aria-hidden />
                      <Lead s={b.x ?? ""} />
                    </p>
                  )
                default:
                  return (
                    <p key={n} className={cn("mb-3.5 text-[14px] leading-[1.7] text-[#303030]", doc.blocks[n - 1]?.t === "li" && "mt-5")}>
                      <Lead s={b.x ?? ""} />
                    </p>
                  )
              }
            })}
            <p
              className={cn(GeistMono.className, "mt-12 border-t pt-5 text-[9.5px] uppercase leading-[1.8] tracking-[0.12em] text-[#6E6E6E]")}
              style={{ borderColor: LINE }}
            >
              NDA-signed, licensed case study. Company names are covered. Results vary and are not a promise of any
              particular outcome.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
