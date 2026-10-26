# Clair de Lune Realism — crescent nocturne

The user requested a crescent-moon version of the supplied blue-and-silver nocturnal reference, with clouds and water moving gently rather than like a time-lapse. This new generated photographic-style interpretation uses a thin crescent, luminous cloud banks and a calm sea. It is not a historical photograph, recorded footage, or a claim about Debussy's intended landscape.

## Motion and composition

The moon, stars, clear sky and horizon remain fixed. Cloud motion stays inside the low cloud banks, at a maximum horizontal displacement speed of roughly 0.62 source pixels per second. Water-only ripples and restrained reflected glints change below the pinned horizon. There is no camera pan, zoom, moon morphing or whole-image brightness pulse.

Fixed, aspect-correct framing retains the crescent and reflection in portrait and wide views. The deterministic motion repeats over 240 seconds. The existing player clock, pause/re-entry behavior and reduced-motion static frame are unchanged. One WebP material uses the existing bounded active/recent-scene texture lifecycle.

## Scope

Only `clair-de-lune` is overridden. The shared `realism-nature-next.js` module remains loaded because it also serves three other songs; its old Clair rendering remains the established fallback. The new wrapper is inserted immediately after that module. Other Realism entries, all 74 Canvas Visual works, Impressive, recordings and playback timing are unchanged.

## Verification

The focused test is `node tests/test-realism-clair-crescent.cjs`. It covers the 74-entry catalog and 73 untouched delegates, asynchronous material loading, repeated and invalid times, pause/reduced-motion inputs, context loss/restoration, eviction/re-entry, upload failure, image failure and unavailable-GL fallback.

Independent code and actual-pixel review passed. Native software rendering covered five aspect ratios and sampled times across the complete cycle, including repeated and reordered inputs. The moon and horizon remained pixel-stable, loop endpoints matched, and all sampled texture coordinates stayed in bounds. Existing timing and full-catalog lifecycle diagnostics were also checked. The historical generic lifecycle test retains its pre-existing two-total-texture assumption and fails on both baseline and candidate; the two-retained-scene limit is unchanged.

Native software-renderer checks are not real-device GPU/FPS or audible-playback certification. Live deployment and ordinary browser behavior are verified separately.
