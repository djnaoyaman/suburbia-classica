# Realism natural-motion batch 01

First four tracks use procedural water, clouds, sunlight and moonlight; this is not filmed or generated video footage. Load `realism-nature.js` after unchanged `realism.js`, instead of the photo wrapper. Existing photo files remain stored but inactive. The other 70 scenes, including Raindrop, delegate unchanged to the existing renderer. Original artwork is unchanged.

The full canvas is rendered for landscape and portrait layouts without image padding. Motion follows the player's logical clock: stop freezes, play resumes, reduced-motion remains still. Waves, light and cloud parameters repeat on a 48-second cycle. The module caps its internal render size at 960×600 and falls back to the prior renderer if WebGL is unavailable.

Validation: syntax and API/fallback tests; native Mesa EGL shader compilation/rendering for four scenes at desktop, phone and ultrawide ratios; 0s/4s motion difference and 0s/48s exact loop match; existing transport/navigation/input suites. Actual audio playback and all device/GPU combinations are not certified by these tests.
