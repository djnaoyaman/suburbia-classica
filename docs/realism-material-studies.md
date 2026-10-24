# Natural material studies: 9–12

The four Realism studies use generated photographic materials and time-dependent shader deformation and locally varying gas-density shading. They are not recorded footage or generated videos. Original artwork, existing Realism studies, track data, and playback controls are retained.

- Träumerei: backlit seed fibers and a delayed seed-axis response.
- Liebestraum No. 3: a locally deformed generated photographic-style flame, anchored to the wick above a fixed wax material.
- The Girl with the Flaxen Hair: one grass seedhead with rooted bending and delayed tip motion.
- Arabesque No. 1: microscopic liquid-film material carried by locally varying vortices.

These are editorial interpretations of musical keywords, not claims about the composers’ intended natural subjects or botanical/scientific identification.

Each material is loaded only when selected. GPU textures and shader programs share the existing WebGL surface. Loading, decoding, allocation and upload errors delegate to the preceding renderer. After context restoration resources are re-created lazily. Logical playback time controls motion; paused and reduced-motion views receive one refresh when material loading finishes.

Native reference checks use unmodified GLSL ES source, portrait and landscape aspect ratios, 48-second loop boundaries, and failure-state unit tests. Native rendering does not constitute real-device performance or audio playback verification.
