# Visual frame pacing and editorial clock

This runtime-only correction preserves all 31 Visual source bodies and pixels at any given scene time. It does not add works, lower resolution, simplify geometry, change audio IDs, or change Impressive/Realism rendering or the 74 song texts.

## Diagnosed structural causes

The former 40 ms throttle assigned `lastFrame = now`, discarding remainder. On an ideal 60 Hz RAF timeline this yielded a frame every three display ticks (20 fps), rather than the intended 25 fps. The media clock re-anchored unconditionally at each 250 ms YouTube poll, so coarse or stale readings could move scene time backward. These are reproducible code properties, not a measurement of the user's particular phone. Detailed synchronous Canvas drawing and high DPR remain possible load sources.

## Narrow correction

- Visual uses a fractional-deadline scheduler, no catch-up frame queue. The regular maximum is 30 fps (even 33.33 ms slots at ideal 60 Hz); Goldberg and Schubert90-3 retain a 20 fps ceiling. Other display refresh rates can still have frame quantization.
- Measured JavaScript draw-submission cost moves the ceiling down through 20/15/10 fps, with faster load shedding and slower recovery. A reset on a new song/state or visibility recovery clears transient penalties. This cost does not measure asynchronous GPU/compositor work; none of these ceilings is a delivered-device-FPS guarantee.
- A Visual-only media clock polls the official YouTube current-time/playback-rate APIs at up to4Hz and extrapolates between readings. Ordinary small errors slew at a bounded rate without reversing active scene time. Large API-sample discontinuities (backward over1.25seconds or forward beyond expected progress plus1.25seconds) snap as seeks; tiny updates after stale samples do not trigger a backward snap. Paused seeks are sampled exactly; playback state/rate/song and visible-return reset the anchor. Very small active seeks without a player-state event may converge rather than snap immediately. If an API clock stalls, extrapolation is bounded; missing/invalid API initially uses the existing editorial elapsed-time fallback.
- Paused Visuals redraw only if dirty or a polled seek changes their time. Reduced-motion remains a fixed time12 with no animation RAF. Hidden Visuals stop scheduling and re-anchor on return, including an unsupported-song fallback to Impressive while hidden.
- Unchanged Visual note/button attributes are not rewritten on every animation frame. Selection/readiness/state flows retain their existing updates.
- A failed timing-helper load falls back to the previous bounded clock/cadence, rather than breaking the artwork. Impressive's existing clock function remains byte-exact.

Official API reference: https://developers.google.com/youtube/iframe_api_reference . `getCurrentTime` and `getPlaybackRate` are media state, not audio samples. No waveform, FFT, MIDI or note-level synchronization is claimed.

## Verification and limits

Deterministic scheduler tests cover60/59.94/120/144Hz, cost-bucket recovery, stalls, monotonic coarse/stale samples, pause, seek, playback rates, hidden-return anchors and fallback errors. Actual production-loop and lifecycle functions are executed in a DOM/media harness, including reduced motion and hidden unsupported fallback. The prior unchanged scene native tests are retained; a focused legacy regression independently verifies exact source pixels. These simulations do not establish real mobile smoothness or memory stability. Actual deployed browser display/controls and available playback are checked separately after publication; user-device feedback remains important.
