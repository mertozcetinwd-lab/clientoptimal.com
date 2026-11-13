import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import { Band } from "./components/blocks"
import SiteFooter from "./components/SiteFooter"
import SiteHeader from "./components/SiteHeader"
import { GridPlus } from "./components/primitives"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Home from "./pages/Home"
import { Privacy, Terms } from "./pages/Legal"
import HowItWorks from "./pages/HowItWorks"
import WhoWeServe from "./pages/WhoWeServe"
import Work from "./pages/Work"

const TITLES: Record<string, string> = {
  "/": "Client Optimal | Introduction brokerage",
  "/how-it-works": "How it works | Client Optimal",
  "/work": "Case studies | Client Optimal",
  "/who-we-serve": "Who we serve | Client Optimal",
  "/about": "About | Client Optimal",
  "/contact": "Contact | Client Optimal",
  "/privacy": "Privacy Policy | Client Optimal",
  "/terms": "Terms of Service | Client Optimal",
}

/** New page starts at the top; a #hash scrolls to its section. */
function ScrollAndTitle() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = TITLES[pathname] ?? TITLES["/"]
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const home = pathname === "/"
  return (
    <>
      <ScrollAndTitle />
      <main className="font-sans">
        {/* The home hero carries its own header inside its frame; other pages get one here. */}
        {!home && (
          <Band fade={false}>
            <GridPlus edge="left" className="left-0 top-0" />
            <GridPlus edge="right" className="left-full top-0" />
            <SiteHeader />
          </Band>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/work" element={<Work />} />
          <Route path="/who-we-serve" element={<WhoWeServe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  )
}
