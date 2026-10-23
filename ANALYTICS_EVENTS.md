# Interaction events

GA4 stream: G-FM0LBF65WC. Existing page views remain unchanged.

- music_play / music_pause / music_complete: distinct YouTube playback states; public item_id
- music_filter: facet selected; filter_group only
- share: clipboard promise succeeds; method=copy
- art_display_open: manual art display opened
- creator_site_visit: portfolio link activated; target_site

Events use gtag event commands, transport_type=beacon, and explicit send_to. Added payloads omit answers, correctness, scores, health/treatment selections, search strings, query parameters, fragments and personal identifiers. Parameters are allowlisted. Measurement failures never block the interaction. Only the public GitHub Pages hostname sends these events.

Verify event receipt with GA4 Realtime/DebugView. Browser tests check forwarding and payloads; they cannot prove GA ingestion. These changes do not mark key events or alter GA property settings.

Static song pages additionally send music_article_view (public item_id) and share only after the clipboard promise resolves. Failed copies do not show a success label or send share. Player playback/filter/art events are left unchanged.
