# Natural renderer resource sharing

The new natural-motion studies share one lazily allocated WebGL canvas/context. The legacy Realism renderer remains separate and unchanged. Each natural module owns a shader program and buffer and explicitly binds them before drawing. Shader source and scene formulas are unchanged by this resource patch.

Context-loss guards postpone creation of an unused program until restoration. A single permanent host loss listener permits restoration even while paused; one-shot module restoration listeners invalidate programs without accumulating handlers. Unavailable contexts retain the existing Original fallback.

Validation: 800 scene switches use one natural context; two independent programs switch correctly; four loss/restoration cycles; first use of an uninitialized module during loss recovers afterward; a second loss without an intervening draw is handled. Native EGL renders 42 alternating frames through two programs on one context with pixel-identical results to separate-renderer references. Transport, navigation and fullscreen input tests pass. These checks are not a claim of browser audio or all-device GPU validation.
