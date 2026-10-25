# Visual: first four full-field works

Added alongside the current Impressive and Realism modes. Neither existing mode,
its paintings, its material cache nor its content is replaced. There is no Mesh
mode restoration in this release: the live site at the approved integration base
cf13414e exposes Impressive / Realism.

Visual is available for moonlight, clair-de-lune, gymnopedie-1 and pavane only.
The button is disabled for other works. Moving from Visual to another song
returns to Impressive and announces that change; it never silently calls a
painting Visual. Future works require their own reviewed artwork.

The four approved render functions are byte-for-byte embedded from the private
review archives. Each has its own 24-second editorial composition and palette.
A wrapper preserves the 277-pixel logical short edge and line widths, adapting
aspect ratio and device pixel ratio without changing the time equations. It
allocates no images, textures, extra canvases or event listeners. Visual rendering
is limited to 25 fps; paused frames only redraw when dirty. Reduced-motion users
receive a still frame. Existing play/pause, YouTube seek sampling, resize, close,
metadata and frame-clearing behavior are retained.

Playback-position synchronization is NOT audio analysis, FFT, beat detection,
MIDI or note synchronization. The patterns are editorial interpretations, not
claims about composers' intentions or physical simulations. Dense fine-line
motion can shimmer, especially Moonlight and Clair de lune; no medical safety,
no-alias, actual-device memory or frame-rate guarantee is made.

## Preservation and verification

- Source hashes, native pixel parity, deterministic seek, pause, reduced motion,
  25 fps bound, mode availability, unsupported fallback and late-image guards:
  `node tests/test-visual4.cjs` (optional native pixels need @napi-rs/canvas).
- No edits to Impressive assets/catalog/renderer, Realism modules, song data,
  recording links, collab art/credits, icons or OGP.
- Native deterministic rendering and DOM/media mocks are distinct from actual
  browser/device/audio checks. Deployment verification is recorded separately.
