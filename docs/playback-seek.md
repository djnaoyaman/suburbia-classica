# Touch and keyboard playback-position control

The normal player and fullscreen art view share native range inputs showing
elapsed time / duration. Each input has a 44px target, keyboard support, visible
focus, Japanese accessible name and current-time text. Fullscreen controls follow
the existing touch wake/hide behavior and focus trap; they do not cover the art
with a new full-screen interaction layer.

The shared `playback-seek.js` module polls the existing IFrame API at 250ms. Drag
previews locally, without API seeks or polling overwrites, and commits once on
release. Keyboard changes commit through the native change event. Pointer cancel,
Escape, blur, fullscreen dismissal, track changes and stale video IDs discard the
preview. The committed position is clamped to [0, duration - 0.1s], avoiding an
immediate ENDED event when selecting the very end; normal playing may then finish
and advance as before.

Seeking is enabled only after an explicit playback start, an acknowledged current
video ID (via the documented getVideoUrl), finite positive duration, and PLAYING or PAUSED state. Unknown duration,
unstarted, cued, buffering and ended states are disabled. This is deliberate:
YouTube documents that `seekTo()` preserves pause only when the player is paused;
from cued/unstarted states it starts playback. The module never calls playVideo,
loadVideoById, or changes the song/queue. Paused seeking remains paused; playback
continues if it was already playing. Art timing is resynchronized after the seek.

Official API source checked 2026-10-28:
https://developers.google.com/youtube/iframe_api_reference

Verification:
- `node tests/test-playback-seek.cjs`: 36 deterministic checks using a fake IFrame
  player, including no autoplay, paused seek, drag/cancel/keyboard/end handling,
  stale-track guard, duration failures, cleanup and source wiring.
- `node --test tests/entry-selection.test.cjs`: 13 checks still pass, including
  actual first-song cue/title and explicit navigation during weather loading.
- Inline JS syntax and existing Visual timing lifecycle pass.
- Realism/Impressive/Visual artwork files and all song data are unchanged.
- Live YouTube audio and mobile-browser touch behavior were not verified in this
  sandbox. Its Chromium launch is blocked by socket permissions; no bypass was
  attempted. Mock results are not presented as real-device/audio evidence.
