# First song: date, weekday, time and a fixed-city temperature guide

This only replaces the generic entry's former index-0 choice. An explicit
`#/song/id`, article play link, manually selected song, or filtered playback
queue wins. No new audio autoplay is added: YouTube is cued on readiness;
`loadVideoById` remains inside the user's START gesture.

## Selection

All calendar calculations use **Asia/Tokyo (JST)**, not visitor location or the
browser's local timezone. Morning 05:00–10:59, daytime 11:00–16:59, evening
17:00–20:59, night 21:00–04:59. Weekdays mildly favor calm pieces and weekends
bright pieces. The existing mood tags supply the candidate weights; the entry
pool stays mellow (`穏やか` or `眠り`), without restricting manual selection.
A deterministic date + weekday + time-band + temperature-band hash chooses from
those weights. Same date/band/cache means the same first track, with no stored
visitor identity or play history. Once selected in an open page it does not
change under the listener.

Temperature boundaries are below 10°C / 10–19.99°C / 20–27.99°C / 28°C and above.
These are editorial mood weights, not medical, meteorological or comfort claims.
Zero is a real valid temperature; missing values are never substituted with zero.

## Weather definition and privacy

`data/entry-weather.json` contains a version, JST dates, fetched timestamps,
coordinates, eight equal weights (1/8), each city's daily mean, derived mean,
source and licence. The fixed public city centers are Sapporo, Sendai, Tokyo,
Niigata, Nagoya, Osaka, Fukuoka and Naha. Open-Meteo's `daily=temperature_2m_mean`,
`timezone=Asia/Tokyo` supplies **daily forecast means**, not the mean of daily
high/low temperatures, a live observation, or an official Japanese national
average. All eight valid values are required; partial responses fail closed.

The page only fetches this same-origin JSON, with a 1.2-second deadline. Missing,
malformed, wrong-date, or more than 48-hour-ahead fetched data is ignored and the
selection uses date/weekday/time alone. Weather outages never block music. There
is no visitor geolocation, IP lookup, weather-provider browser request, login,
new tracking, or new browser storage.

## Refresh and deployment

`entry-weather.yml` runs at 23:17 JST (14:17 UTC), on relevant main changes, and
manual workflow dispatch. GitHub schedule execution can be delayed; the page has
an explicit weather-free fallback. It requests today and tomorrow in one API
request. Once a date has a valid published forecast, it is frozen, so forecast
model revisions or repeated builds cannot reshuffle that date. Past dates are
removed and tomorrow is prepared before midnight. Initial bootstrap can provide
that day's forecast when no previous cache exists.

The job commits **only `data/entry-weather.json`**, rebases over unrelated main
changes, and uses the documented `POST /repos/{owner}/{repo}/pages/builds` endpoint
to publish through the existing branch-based GitHub Pages build. This explicit
build is needed because a built-in GITHUB_TOKEN commit alone does not trigger
Pages. It does not regenerate any artwork or change Pages settings. No PAT,
account, paid plan or new repository security setting is introduced. Checks run
read-only on PRs; only the main/scheduled refresh job requests contents:write and
pages:write via the existing short-lived GITHUB_TOKEN. If repository policy denies
the push/build, the run fails rather than escalating permissions.

The repository is public and uses GitHub-hosted standard Linux runners; no paid
compute or service commitment is created. Open-Meteo free access is limited to
non-commercial use. This integration assumes the existing personal, free music
reference site remains without advertising/subscriptions or commercial promotion.
If the site becomes commercial, stop the free refresh or choose an appropriately
licensed provider; do not silently subscribe. Open-Meteo data is CC BY 4.0; visible
player/About attribution links identify the derived eight-city mean.

Official references checked 2026-10-28:
- https://open-meteo.com/en/docs
- https://open-meteo.com/en/terms
- https://open-meteo.com/en/pricing
- https://docs.github.com/en/rest/pages/pages#request-a-github-pages-build
- https://docs.github.com/en/billing/concepts/product-billing/github-actions

## Checks

- `node --test tests/entry-selection.test.cjs`
- `node --check entry-selection.js`
- `node --check scripts/update-entry-weather.cjs`
- Existing `test-visual-timing.cjs` and `test-visual-timing-lifecycle.cjs` pass.
- Existing `test-material-lifecycle.cjs` fails `texture <= 2` on unchanged main
  as well as this branch. No art source changes are included in this feature.
- The existing Impressive browser check could not launch Chromium in this
  execution sandbox (`socket() failed: Operation not permitted`); it is not
  reported as a browser pass.
