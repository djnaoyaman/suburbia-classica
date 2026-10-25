# Realism material lifecycle

The shared host retains **at most two scene bundles, protecting the active material scene and retaining one recent material scene**, not two arbitrary asset URLs. A scene's materials are retained or released atomically. All 66 photographic-material scenes currently use one Image and one texture each; future multi-material scenes may use more textures within the same two-bundle bound. Procedural scenes and Original remain unchanged.

A shared scheduler permits at most two running image-load/decode jobs. Selecting a scene prioritizes its queued jobs. Eviction cancels network-stage work and releases its slot once. An already-running `decode()` promise cannot be aborted: its slot remains occupied until settlement, while epoch and record-identity checks discard obsolete results without a ready notification. Paused scenes retain their materials; closing or selecting Original clears active identity but leaves the two recent bundles available for reopening.

Eviction releases image references and GPU textures together, clears upload-failure latches, and preserves compiled programs/buffers. Context restoration invalidates renderers as before; revisiting lazily uploads only the material needed. Rendering shaders, assets, texture flags and caller-controlled animation clocks are unchanged.

These are application-reference and job-count bounds, **not a guarantee of total physical RAM, mobile safety or frame rate**. In-flight decode, browser/network caches, framebuffer storage and driver allocations are separate.

Run the portable Node VM/mock-GL regression test from the repository:

```sh
node tests/test-material-lifecycle.cjs
# Or specify a repository root explicitly:
node tests/test-material-lifecycle.cjs /path/to/suburbia-classica
```

The test writes only to stdout. It checks 74-scene forward/reverse/repeated visits, two-bundle retention, two in-flight slots, out-of-order completions and failures, cancellation, revisits, upload-failure reset, context restoration, inactive probes, mixed-cache fallback, and multi-asset atomic bundles. It does not compile native shaders or measure a physical device; independent native pixel parity is recorded in the private verification artifact.
