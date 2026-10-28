# Convergence Point

Static pages with notes on physical systems and the simulations behind them.
They are published with [GitHub Pages](https://pages.github.com/), served from this repository's root.

| Path | Contents |
|---|---|
| `index.html` | Front page: a teaser card for each write-up |
| `wave-simulation/index.html` | "Why my wave simulation kept blowing up", with equations rendered by MathJax (loaded from a CDN, so it needs an internet connection) |
| `wave-simulation/wave_notes.html` | Derivations, measurements and lessons learnt, rendered from `docs/NOTES.md` in [scalar-field-backreaction-ads4](https://github.com/Convergence-Point/scalar-field-backreaction-ads4) (equations in MathML) |
| `wave-simulation/img/` | `wave.gif` (the animation, plays once) and `convergence.png` (figure used in the notes) |

All links are relative, so the pages work when opened from disk and when served from any path.

To add a topic, create a folder with its own `index.html` and `img/`, then add a card for it to the front page.

`wave_notes.html` is generated from `NOTES.md` in the code repository. After changing the notes, regenerate it there and copy it to `wave-simulation/`.
