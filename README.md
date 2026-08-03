# Runeith — Coming Soon Page

A static "coming soon" landing page for Runeith, hosted on Cloudflare via Wrangler.

## Contents

- `index.html` — page markup.
- `css/style.css` — fonts (`@font-face`), animations, and all visual styling.
- `js/config.js` — the editable site configuration (see below).
- `js/script.js` — page behaviour: the countdown timer and the floating rune items.
- `assets/fonts/` — self-hosted webfonts (Cinzel, Cinzel Decorative, Uncial Antiqua).
- `assets/images/` — the background texture and the gate artwork.
- `wrangler.toml` — Cloudflare/Wrangler configuration: project name and the directory published as static assets.
- `CLOUDFLARE_SETUP.md` — step-by-step guide to connect this project to Cloudflare Pages via GitHub.
- `LICENSE` — MIT license.

## Configuration

Site-specific settings live in `js/config.js` as a plain object, so they can be tweaked without touching markup or logic:

```js
window.SITE_CONFIG = {
  showCountdown: true,
  launchDate: "2026-09-15T00:00:00",
  discordUrl: "https://discord.gg/runeith",
  itemCount: 20,
  speedMultiplier: 1
};
```

| Key | Effect |
|---|---|
| `showCountdown` | Show or hide the countdown block. |
| `launchDate` | ISO date/time the countdown counts down to. |
| `discordUrl` | Destination of the "Join our Discord" button. |
| `itemCount` | Number of floating rune items shown (4–20). |
| `speedMultiplier` | Speeds up (>1) or slows down (<1) the floating-item animations. |

## Deployment

This project deploys via Cloudflare Pages, connected to GitHub:

1. Every push to `main` automatically triggers a deploy (`npx wrangler deploy`) on Cloudflare.
2. Pushes to other branches get their own preview deploy (`npx wrangler versions upload`).
3. There is no local build step or CI config needed — Wrangler publishes the directory from `wrangler.toml` (`./`) directly.

Full setup instructions (creating the project in Cloudflare, build settings, troubleshooting) are in [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md).

## Viewing locally

There is no build step, so it's enough to open `index.html` directly in a browser, or serve it with a simple static file server, e.g.:

```bash
npx wrangler dev
```

## License

MIT — see [`LICENSE`](./LICENSE).
