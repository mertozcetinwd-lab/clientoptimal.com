// One-shot scroll reveals. A trimmed version of mertozcetin.com's motion.js,
// which also carried a character-scramble, a parallax loop, a bloom effect and
// a clock. None of those belong on a business site, so this is just the
// observer.
//
// Reveals add a class that triggers an ANIMATION, never a transition. See the
// long comment in tokens.css: Astro's scoped selectors land at the same
// specificity as `.reveal.in`, so a component setting `transition:` on a
// revealed element silently wipes the whole list. That bug shipped four times
// on the sibling site before anyone worked out why fades were missing.
export function initReveals() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // No IntersectionObserver means no fade, but the content must still be
  // visible. tokens.css only hides .reveal under html.js, so removing the
  // class here is enough.
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target); // one-shot: re-firing on scroll-back is noise
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  els.forEach((el) => io.observe(el));
}
