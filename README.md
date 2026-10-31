# SUBURBIA CLASSICA

## Visible site update date

The footer's **サイト最終更新** is the actual published-source revision date in Japan Standard Time, not a visitor clock, weather observation, article fact-check or author-profile review date. It is visible without JavaScript. Content-specific dates remain separate.

For each site release, run `python3 scripts/site-update-date.py --date YYYY-MM-DD` using the actual release date in JST. Commit `site-update.json` and its listed HTML pages with the change; use `--check-content` before committing. CI also checks Git history and rejects a date differing from the latest published-source change. Tests/docs/CI-only edits and SUBURBIA's independently dated weather cache do not advance this date. This is an explicit release step, not an automatic runtime date. A release crossing midnight JST must refresh its date and checks before publication.

The read-only **Site update date** workflow verifies synchronization and captures visible footers at 390/1280px, including repeat loads and JavaScript-disabled checks, with external browser requests blocked. It adds no runtime request, tracking or deployment permission.
