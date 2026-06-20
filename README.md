# RePlay

A calm YouTube feed manager. No algorithmic "maybe you like it" junk — just the channels you follow, the topics you like, and a **smart local pool** that refreshes itself so fresh videos are always ready when you open it.

It's a single static page (a PWA) — open it in any browser, install it to your home screen, done. No server, no real login.

## What it does

### Feed & auto-refresh
- **Personal feed** — your followed channels + liked topics are the source; nothing is pushed at you by an algorithm.
- **Big local pool** — up to **5,000** videos are cached on-device, so your feed and searches are instant and free (no API call). The feed paints in batches with a **Show more** button.
- **Auto-refresh on open** — when you open the app, RePlay checks whether the newest pooled video is older than 2 hours. If so, it fetches fresh content automatically (and only once per 2 hours, not on every open). No background polling.
- **Search inside the pool** — type a few words and get ranked matches across title, description and channel. `pokemon` finds `Pokémon`, `dont` finds `Don't`. When the pool runs dry a **Find more on YouTube** button fetches live results and adds them.
- **Clear & re-fetch** — Settings has a 🔄 button to wipe the pool and fetch everything fresh from scratch.

### Tabs
- **Home (RePlay logo)** — your feed / search. Tap the **RePlay** header logo to return here from anywhere and clear active filters.
- **History · Watch Later · Favorites** — auto-saved lists. Later and Fav are on every card.
- **Channels** — channels you follow, with search. Your followed/auto-tracked channels show first; YouTube results come after. Tap a channel to browse its uploads.
- **Music** — everything you've tagged as music, in its own place.

### Sub-tabs (Horizontal / Vertical / Channels)
On Home and the library tabs, the content is split into three sub-tabs:

- **Horizontal** — standard/landscape videos.
- **Vertical** — Shorts and portrait clips.
- **Channels** — on Home with no search active, shows **suggested channels you don't yet follow** (built from your pool and auto-tracked list). Tap 👍 Follow to add them to your feed. A **🔄 Discover more channels** button fetches additional suggestions from YouTube based on your liked topics.

### Orientation detection
RePlay uses the **YouTube player embed ratio** to determine whether a video is horizontal or vertical — this is accurate for any video, not just Shorts. Old cached videos fall back to duration (configurable cutoff in Settings). You can always override any video manually with the phone button.

### Per-video buttons (on every card)
- **Later / Fav** — add to Watch Later / Favorites.
- **Orientation toggle** — a phone+rotate icon. Tap to move a video between Horizontal and Vertical sub-tabs. Tapping starts a **3·2·1 countdown** before moving it — tap again to cancel. Your choice overrides the API detection everywhere.
- **Music** — tag/untag a video as music; it appears in the **Music** tab.
- **Not interested** — hide a video from the feed.

### Player

- **Vertical (Shorts) player** — full-screen, swipe up/down to move between videos.
- **Horizontal player** — standard controls, with the video frame **pinned at the top** while title, description, and related videos scroll beneath it.
- **Player action row** — Later, Fav, Orientation toggle, Music, Not interested, Hide channel, Follow channel, Close. All the same actions as the cards, right there in the player.

### 🎬 Autoplay queue

Tap **🎬 Autoplay** (above the grid on any sub-tab) to switch the current list into a reorderable queue:

- **Drag** rows or use the **▲ / ▼** buttons to set your preferred order.
- Press **▶ Play** to start playing from the top (or from where you left off if you've already started).
- Videos auto-advance: when one ends, the next plays automatically.
- **Shorts auto-advance** too — when a short ends during an autoplay run, RePlay scrolls to and plays the next one in the queue.
- **Resume** — closing the player leaves your position intact. Press ▶ again and it picks up from where you stopped.
- Tap **🎬 Autoplay** again to exit the queue and return to the normal grid.

### Blackout mode (small screens)
- A **moon icon** appears inside the player. Start a video, tap it, and the screen goes **fully black** while audio keeps playing.
- On Android it goes **fullscreen/immersive** and requests a **wake lock** — a "screen off" feel without a real lock.
- Dim play-pause / prev / next controls in the center; a small close button in the corner exits it.
- *Honest limit:* no web page can fully lock a phone. iOS keeps the overlay but can't hide its notification bar.

### Preferences & filters
- **Languages** — choose which languages to include in your feed (multi-select in Settings).
- **Like topics** to auto-fill your feed; **Dislike any word, topic or name** to hide every video that mentions it (title, description, tags or channel).
- **Watch budgets** — "watch X videos, then wait Y". Separate budgets for Vertical and regular videos.
- **Follow / Hide channels** — from any card or from the player while watching. Import your YouTube subscriptions from a Takeout CSV.
- **Vertical cutoff** — configurable duration threshold for the duration-based orientation fallback.
- **Sync across devices** via a private GitHub Gist (optional). Lists, pool, followed channels, orientation overrides and Music all merge across devices (with tombstones so deletions stick).
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
- **Locally:** serve it (YouTube blocks `file://`): `python3 -m http.server` then open `http://localhost:8000`.
- **Hosted (recommended):** GitHub Pages — Settings → Pages → deploy from `master` / root. Then open `https://sebamuhr.github.io/RePlay/` and "Add to Home Screen".

### Updates not showing? (stuck service worker)
RePlay is a PWA; an old service worker can serve cached files. To unstick a device:
- Open `https://sebamuhr.github.io/RePlay/?fresh=1` once, then go back to the normal URL, **or**
- Hard-reload (`Ctrl+Shift+R`), **or** (installed app) fully close and reopen it.

## Notes & honest caveats
- To keep 5,000 videos light, stored descriptions are trimmed (~500 chars) and tags are capped — enough for search, far smaller on disk. Everything lives in your browser's localStorage and (optionally) your Gist.
- Ads on the embedded player are controlled by YouTube. A content blocker (e.g. uBlock Origin / Ghostery) handles them as usual.
- Free API quota is 10,000 units/day. Each search ≈ 101 units, so ~99 searches/day — plenty for personal use. Browsing the local pool is free.
- Your API key and GitHub token live **only in your browser** (localStorage), never in the synced Gist.
