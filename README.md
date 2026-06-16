# RePlay

A calm, **search-only** YouTube viewer. No algorithmic "maybe you like it" feed, no comments, no likes, no rabbit holes — just the videos you actually searched for, the channels you actually follow, with a **search that obeys you** and **watch budgets** so you don't lose your afternoon.

It's a single static page (a PWA) — open it in any browser, install it to your home screen, done. No server, no real login.

## What it does

### Search & feed
- **Search-only feed** — search a topic, see those videos. Nothing is pushed at you.
- **Loose, ranked search** — type a few words and you get matches even if they're not exact. A video is a hit if it contains **any** of your words (across title, description and channel), and results are ordered by how many words matched, newest first. Punctuation, accents and apostrophes don't get in the way (`pokemon` finds `Pokémon`, `dont` finds `Don't`).
- **Big local pool** — up to **5,000** videos are cached on-device, so your feed and searches are instant and free (no API call). The feed paints in batches with a **Show more** button so it stays smooth.
- **Find more on YouTube** — when your local pool runs dry, one tap fetches fresh results and adds them to the pool.

### Tabs
- **Search** — your local feed / search results.
- **History · Watch Later · Favorites** — auto-saved lists. Later and Fav on every card.
- **Channels** — see the channels you follow, or search for channels. Your own followed/auto-tracked channels always show **first**; YouTube results come after. **Fetch new channels** at the bottom pages through more results. Tap a channel to open it and browse its uploads.
- **Music** — everything you've tagged as music (see below), in its own place.

### Per-video buttons (on every card)
- **Later / Fav** — add to Watch Later / Favorites.
- **Horizontal / Vertical** — fix a video's orientation by hand. The button is a phone: **upright = vertical**, **rotated = horizontal**. Tapping starts a **3·2·1 countdown** before it moves the video to the matching sub-tab — tap again during the countdown to cancel (so a mis-tap costs nothing). Your choice overrides the duration guess everywhere and **syncs across devices**.
- **Music** — tag/untag a video as music; it appears in the **Music** tab. (A video can be Music *and* a Favorite, etc.)
- **Not interested / Remove** — hide a video, or remove it from a list.

### Sub-tabs (Horizontal / Vertical / Channels)
- **Horizontal** and **Vertical** split your feed by orientation. The cutoff is duration-based (configurable in Settings) but you can override any video with the phone button above.
- **Channels** sub-tab (on Search) lets you search channels right from the feed.

### Blackout mode (small screens)
- A **blackout** button (a moon icon) appears inside the player. Start a video, tap it, and the screen goes **fully black** while audio keeps playing.
- On Android it goes **fullscreen/immersive** (hides the notification bar and browser chrome) and requests a **wake lock** so the phone won't auto-lock and pause — a "screen off" feel without a real lock. Perfect for pocketing it.
- Dim **previous / play-pause / next** controls in the center let you move through videos without leaving the dark; a small **close (x)** button in the corner closes it.
- *Honest limit:* no web page can fully lock a phone — the OS still lets you swipe the notification shade or use hardware buttons. iOS keeps the black overlay but can't hide its notification bar (it only allows true fullscreen for video).

### Player
- **Vertical (Shorts) player** — full-screen, swipe up/down to move between videos, with YouTube's native **controls/timebar** available.
- **Horizontal player** — standard controls, autoplay-next through the current list, and **Play all**.

### Filters, budgets, sync
- **Like topics** to auto-fill your Home & feed; **Dislike any word, topic or name** to hide every video that mentions it (title, description, tags or channel) — accent/punctuation-insensitive.
- **Watch budgets** — "watch X, then wait Y". Separate budgets for Vertical and regular videos; resets after Y of not watching.
- **Follow / Hide channels** while watching. The LED dot lights up when a followed channel has new uploads (cheap: ~1 quota unit per channel). Import your YouTube subscriptions from a Takeout CSV.
- **Sync across devices** via a private GitHub Gist (optional). Lists, pool, followed channels, orientation overrides and Music all merge across devices (with tombstones, so deletions stick).
- **Export / Import** a backup file (offline, no account).

## Setup (one time)
1. **YouTube API key** (free, *not* a login):
   - Go to [Google Cloud → Credentials](https://console.cloud.google.com/apis/credentials), create an API key.
   - Enable **"YouTube Data API v3"** for the project.
   - Open RePlay → Settings → paste the key → Save.
2. **(Optional) Cross-device sync:**
   - Create a GitHub token with the **`gist`** scope only at [github.com/settings/tokens](https://github.com/settings/tokens).
   - Settings → paste the token → **Connect** (leave Gist ID empty to auto-create one).
   - On your other devices, paste the **same token + Gist ID** → Connect.

## Run it
- **Locally:** just open `index.html` in your browser. (For the service worker / install prompt to work, serve it: `python3 -m http.server` then visit `http://localhost:8000`.)
- **Hosted (recommended):** GitHub Pages — Settings → Pages → deploy from `master` / root. Then open `https://sebamuhr.github.io/RePlay/` and "Add to Home Screen".

### Updates not showing? (stuck service worker)
RePlay is a PWA, so an old service worker can keep serving cached files. The app now force-revalidates and re-checks for new versions automatically, but to unstick a device once:
- Open `https://sebamuhr.github.io/RePlay/?fresh=1` once, then go back to the normal URL, **or**
- Hard-reload (`Ctrl+Shift+R`), **or** (installed app) fully close and reopen it.

## Notes & honest caveats
- The YouTube API has **no "is this a Short / orientation" flag**, so RePlay uses **duration** as a proxy (configurable cutoff, default **< 60s = Vertical**). A genuinely short normal clip may land on the Vertical side — fix it with the phone button.
- To keep 5,000 videos light, stored descriptions are trimmed (~500 chars) and tags capped — enough for search, far smaller on disk. Everything lives in your browser's localStorage and (optionally) your Gist.
- Ads on the embedded player are controlled by YouTube. A content blocker (e.g. uBlock Origin / Ghostery) in your browser handles them as usual.
- Free API quota is 10,000 units/day. Each search ≈ 101 units, so ~99 searches/day — plenty for personal use. Browsing the local pool, following channels and checking for new uploads are cheap or free.
- Your API key and GitHub token live **only in your browser** (localStorage), never in the synced Gist.
