# Why my wave simulation kept blowing up

Static pages for the post "Why my wave simulation kept blowing up",
plus the longer technical notes behind it. The code is in
[scalar-field-backreaction-ads4](https://github.com/Convergence-Point/scalar-field-backreaction-ads4).

| File | Contents |
|---|---|
| `index.html` | The post, with the equations rendered by MathJax (loaded from a CDN, so it needs an internet connection) |
| `wave_notes.html` | Derivations, measurements and lessons learnt, rendered from `docs/NOTES.md` in the code repository (equations in MathML) |
| `img/wave.gif` | The animation used in the post (plays once) |
| `img/convergence.png` | Figure used in the notes |

All links between files are relative, so the pages work when opened from disk and when served from any path.
They are published with [GitHub Pages](https://pages.github.com/), served from this repository's root.

`wave_notes.html` is generated from `NOTES.md` in the code repository. After changing the notes, regenerate it there and copy it here.
