# Convergence Point

Static pages with notes on physical systems and the simulations behind them.
They are published with [GitHub Pages](https://pages.github.com/), served from this repository's root.

| Path | Contents |
|---|---|
| `index.html` | Front page: a teaser card for each write-up |
| `wave-simulation/index.html` | "Why my wave simulation kept blowing up", with equations rendered by MathJax (loaded from a CDN, so it needs an internet connection) |
| `wave-simulation/wave_notes.html` | Derivations, measurements and lessons learnt, rendered from `docs/NOTES.md` in [scalar-field-backreaction-ads4](https://github.com/Convergence-Point/scalar-field-backreaction-ads4) (equations in MathML) |
| `wave-simulation/img/` | `wave.gif` (the animation, plays once) and `convergence.png` (figure used in the notes) |

| `static-ads/index.html` | Article on static stars in AdS and their radial stability, with `img/` for its figures |
| `static-ads/derivation.html` | Derivation of the profile and stability equations (copied from `einstein_derivation.html` in the Static_AdS project, with theme support added) |
| `post.css`, `post.js` | Shared styles and scripts for the article pages (sections, hero mesh, reveal-on-scroll, scroll-spy nav) |
| `theme.js`, `theme.css` | Shared light/dark theme: sets `data-theme` on `<html>` from the saved choice (`localStorage` key `theme`) or the system setting, and renders the sun/moon switch into any `[data-theme-switch]` element |

All links are relative, so the pages work when opened from disk and when served from any path.

To add a topic, create a folder with its own `index.html` and `img/`, then add a card for it to the front page.

`wave_notes.html` is generated from `NOTES.md` in the code repository. After changing the notes, regenerate it there and copy it to `wave-simulation/`.
The copy here has theme support added by hand (dark palette variables, the `theme.css`/`theme.js` includes, and the header switch), so the generator template needs the same changes or they will be lost on regeneration.

To add theming to a new page: include `theme.css` and `theme.js` in `<head>` (the script without `async`/`defer`), define your colors under `:root[data-theme="dark"]`, and drop a `<span data-theme-switch></span>` where the switch should appear.
