# Read-only photo UV coverage regression

Run from any directory:

    python tests/audit_photo_uv.py /path/to/suburbia-classica --out /tmp/classica-uv-audit

Dependencies: Python 3, Pillow, numpy, Node.js (loads the local Realism catalog in a VM), native EGL + OpenGL ES libraries. No browser, DevTools, emulation, server, network, image generation or production edits are used. The native helper requests ES2; the actual driver/renderer is recorded in each run.log. llvmpipe is not device performance evidence.

The command reads index script order, the exact active 74-entry catalog, embedded GLSL, and referenced local assets. It renders 5 ratios (960x540, 390x844, 960x405, 277x600, 960x960), times0/4. A private instrumentation wrapper records the **first runtime material lookup**. Atlas backgrounds are tested against their intended half-tile domain, not merely the full atlas. Red/green diagnostic pixels mark horizontal/vertical out-of-domain coordinates; blue means no material lookup at that pixel. Only diagnostic failures get PNGs, all counts/bounding boxes are in audit.json. Outputs belong outside the repo and should not be committed.

This is base-coverage testing, not an audit of every auxiliary/refraction/blur/alpha lookup, visual naturalness, subject framing, full temporal range or browser support. Masked-off auxiliary samples can legitimately leave a texture. Known alpha composites (seed, grass, web, leaf) and the isolated flame's dark field feather are explicitly documented and locked to exact audited fragment hashes. If their shader changes, a prior exception does not silently apply. Snow's procedural background legitimately has no first sample; its sampled crystal pixels are checked. No-image legacy entries are N/A, not failures. Explicit source UV clamping requires visual review; this test only sees final sampler coordinates.

`--coordinate-only` explicitly uses a 1x1 white placeholder when archived asset files are unavailable. First lookup coordinates cannot depend on a previous lookup, so this is a coordinate diagnostic, **not decoded-asset or appearance validation**. Prefer the default real-asset run in a complete checkout. `--jobs N` controls native subprocess concurrency.

Nonzero exit means an unclassified out-of-domain first sample or a runtime error. Existing known bugs should fail before fixes and pass after. A passing result is not a claim of scientific motion accuracy, medical safety, actual mobile/browser/GPU performance or audio playback.

Scene 24 (foam / shoreline passage) uses a two-stage 2048×1024 atlas: the original landscape is the left half and a clear shallow-water film is the right half. Its first lookup reads the left half; the `foam` entry is therefore classified in `LEFT_ATLAS`. This does not exempt any coordinate failures. The later clear-film/foam lookups and half-texel separation need independent source and visual checks, because this diagnostic records only the first lookup.
