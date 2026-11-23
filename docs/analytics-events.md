# SUBURBIA CLASSICA の行動計測

測定先は既存の `G-FM0LBF65WC`。2026-11-23に既設を確認し、十分な主要行動があるため重複する追加イベントは設置していません。実行コードとGoogleタグ/configは変更していません。

| 既存イベント | 既存の発火条件 |
| --- | --- |
| music_play / music_pause / music_complete | YouTubeが返した状態と公開item_id。連続する同じ曲/状態の通知は抑制 |
| music_filter | 利用者がファセットを選択。固定filter_groupのみ |
| share | clipboard Promise成功後。失敗時は送らない |
| art_display_open | 利用者がアート表示を開いた時。自動表示では送らない |

これらはindex.htmlの共有ヘルパーにあり、静的楽曲ページのコピー成功はarticle-events.jsが扱います。既設のmusic_article_view/creator_site_visitはそのままです。新たな閲覧・外部クリック・スクロール等の同義イベントは加えていません。

計測の設定済みとGAサーバーでの受信確認を区別します。今回、GA管理画面のキーイベント設定や拡張計測設定は変更していません。
