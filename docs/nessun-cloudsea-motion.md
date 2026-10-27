# Nessun Dorma — full cloud-sea motion

Scope: Realism for `nessun-dorma` only. The source photograph-style generated
material, framing, audio, Impressive and Visual are unchanged.

The previous small central elliptical mask left the distant shelves and near
valley static. An explicitly traced grayscale permission map now separates the
cloud field from sky, snow, ridge islands and foreground rock. It is nonvisual
mask data, not a replacement picture. Both destination and advected source are
masked, with inward feathering around rock silhouettes.

Overlapping, cosine-weighted advection phases transport cloud detail with a
common drift and depth-dependent speed; near-valley curls are small relative to
that transport. Neither the camera nor mountains move. Two phases hide reset
boundaries; the 16-second cycle divides the existing 48-second clock. This is
shader animation of a generated still, not recorded footage or generated video.

The existing shared active-scene material cache retains both URLs under the same
scene ID. Missing mask/image or failed GL upload uses the existing fallback;
eviction/context restoration releases both textures. No timing scheduler changes.

## Verification

- `node tests/test-realism-cloudsea.cjs`: 32 assertions, two-material upload,
  same-scene caching, missing-mask/upload failure fallback, eviction/restoration,
  unchanged other-scene delegation, supplied pause/seek time and portrait sizing.
- Existing visual timing: 2,155 assertions; existing visual lifecycle/visibility,
  pause, seek, reduced-motion and unsupported-scene fallback pass unchanged.
- Actual production GLSL + original source + mask rendered in native Mesa
  llvmpipe at 960×540, 390×844, 960×405, 277×600 and 960×960. Independent cloud
  ROIs across far shelves, central billows and near valley change; fixed sky,
  rock and snow ROI pixels do not. Repeated times and ±48-second wraps match.
- 8/16-second phase seams sampled at ±0.01 seconds: no jump (maximum channel
  difference 3/255 in the final verified candidate).
- Native renders do not establish physical-GPU frame rate or browser/device
  performance. Cloud-browser WebGL availability is separately limited.

Rebuild the mask with `python tests/build-nessun-cloud-mask.py` (Pillow). Keep
`tests/nessun-cloud-mask.json` as the editable, source-coordinate trace.
