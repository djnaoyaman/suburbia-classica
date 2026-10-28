# Reference-section repair — 2026-10-28

Scope: all 74 works, the player article and the 74 standalone song articles. No player/audio/art changes.

## Defects reproduced from source and HTML

- 12 IMSLP links were search requests, not work records. The Pathétique request included unescaped double quotes, truncating the HTML href before the intended query ended.
- Prelude No.7 used a nonexistent IMSLP work path; Flower Duet used an unstable numeric short route.
- CM cards largely asserted Wikipedia/editorial claims, not an advertiser's credited music/version. Textbook entries mixed supplements, lesson plans and personal historical lists.
- Static articles and player independently rendered the same fields, allowing divergence.

## Repair and coverage

`reference-data.js` is now the authoritative reference set; `reference-sections.js` is the shared escaped HTTPS-only renderer. `scripts/build-reference-sections.cjs` updates only the three requested sections of every static article. Run from repository root. Runtime applies verified CM/material rows before search/facets initialize; legacy entries are retained in baseline audit only, not counted as confirmed usage.

- 74 resource blocks: 72 IMSLP work/collection records; Barber uses G. Schirmer's original full-score product; Vavilov uses the identified Zen-On piano arrangement. Catalog links are not blanket free-download or worldwide public-domain claims. Edition/arrangement conditions remain the library's responsibility and are explicitly shown to readers. See HTTP title records and correction records. HTTP success is not a claim to have opened every score edition/PDF.
- 148 listening links: explicitly labelled **work searches**, not verified identical recordings. Exact recording availability, subscriptions and territory are not guaranteed. No fabricated album/track IDs.
- 4 CM works have advertiser-authored sources. Some facts such as performer/year remain explicitly unverified; Hovis's official wording names the symphony, not its movement. The 11 legacy CM works without sufficient primary musical attribution are held, not claimed to be unused.
- 13 works have edition/grade/page or DVD-volume metadata verified in official publisher catalogs. Digital textbook materials, textbook pages, and DVD supplements are distinguished. The publisher's generic “野ばら” listing was not assigned to Schubert without a composer credit. Historical personal-site textbook assertions are removed from confirmed cards.
- Remaining works display honest absence of confirmed coverage, not empty/fake buttons. No textbook scans, protected full scores, or copyrighted audio copied.

Primary material sources:
- Education Art Publishing, 2025 digital textbook content list: https://www.kyogei.co.jp/wp-content/uploads/r7jh_digital_index.pdf
- Kyoiku Shuppan, 2025 middle-school appreciation DVD contents: https://www.kyoiku-shuppan.co.jp/book/book/cate0/cate2/cate206/kanshou-r7jh.html
- Nippon Columbia 2024 elementary teaching materials catalog, printed pp.12–13 / PDF p.7: https://columbia.jp/education/pdf/catalogue2024j.pdf
- Score publisher product metadata: https://www.halleonard.com/product/50341440/adagio-for-strings-op-11 and https://shop.zen-on.co.jp/item/detail/911525/

CM evidence and held leads: `cm-primary-20261028.json`. Baseline: `baseline-20261028.json`. HTTP audit includes initial defects as well as replacement evidence; initial success for a search redirect is **not** treated as a verified work record.

## Validation

- `node tests/test-reference-sections.cjs`: 74 data rows, 222 static/shared sections, 245 HTTPS anchors, escaping, explicit search labels, correct facets.
- `node scripts/build-reference-sections.cjs && git diff --exit-code -- songs`: reproducible generated output.
- `node tests/test-reference-browser.cjs`: hosted Chromium at 390 and 1280 pixels; all player/static entries, link properties, responsive overflow and CM filter. External calls mocked/blocked; does not claim live Spotify/Apple playback.
- Existing seeking and entry-selection unit suites retained.

Local Chromium cannot launch under this executor's sandbox; hosted CI browser result must be checked before publication. Public deployment verification is recorded after merge, separately from source/data verification.
