# Natural-motion studies: stream, wet night surface, moon atmosphere, stone light

This independent wrapper overrides only Fantaisie-Impromptu, Nocturne Op.9 No.2, Clair de lune and Gymnopédie No.1. It loads after the existing natural-motion wrapper and delegates every other entry unchanged, including the first three studies and Raindrop. Original remains unchanged.

Distinct compositions: a close stream with refracted mineral bed and differing flow speeds; a close wet surface carrying a warm off-screen light reflection; a sky-only moon through layered translucent clouds; a continuous weathered stone surface with raking daylight and moving leaf shadow. These are musical interpretations, not historical reconstructions or video footage.

Tests cover 74-entry API/delegation, logical-time freeze, fallback and context restoration, native shader compilation and 48 rendered frames including the actual phone internal resolution. Every scene changes at four seconds and repeats exactly at 48 seconds. Transport/navigation/input regressions were checked separately. Cloud browser WebGL availability prevented confirmation of the actual natural rendering there; its Original fallback works. Real-device performance and actual audio are not certified by native-render tests.

This batch lazily creates one additional context (at most three with the existing renderers). A shared context/resource host is required before extending this pattern across all remaining batches.
