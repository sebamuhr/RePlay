# RePlay 🖤▶️

A calm, **search-only** YouTube viewer. No algorithmic "maybe you like it" feed, no comments, no likes, no related-video rabbit holes — just the videos you actually searched for, with a **filter that actually obeys you** and **watch budgets** so you don't lose your afternoon.

It's a single static page (a PWA) — open it in any browser, install it to your home screen, done. No server, no real login.

## What it does
- 🔎 **Search-only feed** — you search a topic, you see those videos. That's it.
- 🚫 **Real blocked-words filter** — block `football`, and anything with it in the title, description, tags or channel name disappears. For real.
- 🩳 **Shorts control** — anything under 60s is a Short. Hide them entirely, or keep them on a leash.
- ⏳ **Watch budgets** — "watch X, then wait Y". Resets after Y of not watching. Set separate budgets for Shorts and regular videos.
- 🗂️ **History · Watch Later · Favorites · Saved searches** — auto-saved.
- ☁️ **Sync across devices** via a private GitHub Gist (optional).
- 💾 **Export / Import** a backup file (offline, no account).

## Setup (one time)
1. **YouTube API key** (free, *not* a login):
   - Go to [Google Cloud → Credentials](https://console.cloud.google.com/apis/credentials), create an API key.
   - Enable **"YouTube Data API v3"** for the project.
   - Open RePlay → ⚙ → paste the key → Save.
2. **(Optional) Cross-device sync:**
   - Create a GitHub token with the **`gist`** scope only at [github.com/settings/tokens](https://github.com/settings/tokens).
   - ⚙ → paste the token → **Connect** (leave Gist ID empty to auto-create one).
   - On your other devices, paste the **same token + Gist ID** → Connect.

## Run it
- **Locally:** just open `index.html` in your browser. (For the service worker / install prompt to work, serve it: `python3 -m http.server` then visit `http://localhost:8000`.)
- **Hosted (recommended):** GitHub Pages — Settings → Pages → deploy from `master` / root. Then open `https://sebamuhr.github.io/RePlay/` and "Add to Home Screen".

## Notes & honest caveats
- The YouTube API has **no "is this a Short" flag**, so RePlay uses duration (**< 60s = Short**). A genuinely short normal clip may be counted as a Short.
- Ads on the embedded player are controlled by YouTube. A content blocker (e.g. uBlock Origin / Ghostery) in your browser handles them as usual.
- Free API quota is 10,000 units/day. Each search ≈ 101 units, so ~99 searches/day — plenty for personal use.
- Your API key and GitHub token live **only in your browser** (localStorage), never in the synced Gist.
