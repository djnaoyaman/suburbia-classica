# Habanera Realism — Carmen at the factory forecourt

This replaces the unrelated octopus assigned in the natural-material batch. The new generated photographic-style interpretation shows Carmen in the stone forecourt of the Seville tobacco factory, with workers and bystanders in the background. It is not a photograph of an actual production, historical reconstruction, actor, or recording.

## Musical / dramatic basis

- Minnesota Opera's *Carmen* guide, synopsis Act I (printed p.39; PDF page 41), places Carmen's entrance and Habanera outside the Seville tobacco factory: https://mnopera.org/wp-content/uploads/transfer/Carmen-Guide.pdf
- Columbia's opera course reproduces the Habanera text and describes the factory girls/soldiers responding to Carmen: https://www.columbia.edu/itc/music/opera/carmen/amour.html
- The text's untamable bird is an explicit love metaphor. There is no comparable octopus basis in the inspected libretto/context; the scene uses the actual dramatic setting instead of inventing an animal association. No flower species, bullfight, or prelude curtain is asserted here.

## Image and motion

The material is a new generated 2:1 image (1774×887), encoded to WebP without retouching. A fixed centered crop preserves Carmen in both portrait and wide layouts. Only a small interior patch of her burgundy shawl is displaced, by at most a few source pixels. The face, lips, hands, body silhouette, people, buildings and floor are rigid. No fake lip-sync, camera pan, animated zoom or global relighting. Time is normalized to a 48-second cycle; the localized cloth motion repeats every 8 seconds. This restrained motion is an editorial interpretation; it does not claim choreography or recording synchronization. Existing reduced-motion host behavior (static time 12) is unchanged.

The index replaces the octopus wrapper instead of stacking a new wrapper above it. Pending/failed material and unsupported GL use the retained base Habanera rose/stage mapping or the host's existing unsupported-Realism Impressive fallback; they do not invoke the rejected octopus wrapper. Old octopus source/assets remain archived but are no longer loaded by this page.

## Validation and limits

- New one-texture lifecycle test: catalog 74 IDs / other 73 exact delegates; async ready, active/recent bounded cache, eviction/re-entry, repeated and invalid times, nonpositive sizes, context lost/restored, upload-fail-once fallback and absent GL.
- Native Mesa llvmpipe GLES shader compile/render: 5 aspect ratios ×13 time calls, including loop 0=48=-48, repeated time 12 and reordered inputs; fully opaque output, nonempty cloth changes, exact static pixels outside the bounded shawl patch. Actual wide and phone phase images inspected.
- Existing Carmen curtain, Toreador arena, Toccata lightning, 2155 timing checks, timing lifecycle and Habanera Canvas Visual (42 frames /4 lifecycle sweeps) passed unchanged.
- Complete actual index-chain comparison: only Habanera changes among 74 entries; 73 catalog descriptions/mappings remain exact. The historical generic lifecycle test still fails on both baseline and candidate at its obsolete <=2 total-texture assertion (two retained scenes may include multi-texture scenes). A private diagnostic with only that cap raised to 4 passes all four 74-scene sweeps, races, eviction and restoration; observed peak is 3. No shared test or lifecycle code is changed.
- Source scope comparison: only one existing index script line is changed; all 74 Canvas Visuals, other 73 Realism modules/assets, Impressive, audio, metadata, timing and scaling are byte-preserved.
- Native software-renderer evidence is not real-device GPU/FPS or browser playback certification. Browser publication checks are recorded separately after deployment.
