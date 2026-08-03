# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This repo hosts a single "coming soon" landing page for a site called Runeith (an OSRS RSPS server), deployed as a static site on Cloudflare Pages/Workers via Wrangler. There is no build system, package.json, or source tooling — the repo root is deployed as-is.

## Structure

- `index.html` — page markup only. Links `css/style.css` and loads `js/config.js` then `js/script.js`.
- `css/style.css` — `@font-face` declarations, keyframe animations (`float`, `spin`), and all visual styling. Layout for the handful of one-off decorative elements (gate frame, amulet, panel) uses classes here rather than inline styles.
- `js/config.js` — the only file meant to be hand-edited for routine content changes. Sets `window.SITE_CONFIG` with `showCountdown`, `launchDate` (ISO string the countdown targets), `discordUrl`, `itemCount` (4–20), and `speedMultiplier`.
- `js/script.js` — vanilla JS, no build step, no framework. Renders the floating rune/weapon items from `ITEM_DEFS`, runs their periodic random-reposition ("teleport") animation, drives the countdown timer, and wires up the Discord link. Reads its inputs from `window.SITE_CONFIG`.
- `assets/fonts/` — self-hosted `.woff2` files (Cinzel, Cinzel Decorative, Uncial Antiqua), referenced by relative path from `css/style.css`.
- `assets/images/` — `stone-wall-bg.jpg` (repeating background texture) and `gate-landscape.webp` (the screenshot shown inside the gate frame).
- `wrangler.toml` — Cloudflare/Wrangler config: `name = 'runeithlandingsoon'`, static assets served from `directory = "./"` (repo root).
- `CLOUDFLARE_SETUP.md` — full dashboard setup and troubleshooting notes for the Cloudflare Pages/GitHub integration.

## History note

The original commit of `index.html` was a ~10 MB self-contained export from a page-building tool: real markup/CSS/JS/fonts/images were packed into JSON blobs inside `<script type="__bundler/...">` tags and reconstructed client-side at load. That bundle also carried a proprietary, non-project "dc-runtime"/"omelette" component runtime and pulled React + ReactDOM from a CDN just to render a countdown timer and some floating decorative shapes. It has since been unpacked and rewritten as the plain HTML/CSS/JS/assets structure described above — there is no build tool that regenerates `index.html` from anything; it is now hand-maintained source like the rest of the repo.

## Deployment (Cloudflare Pages via Wrangler)

- `wrangler.toml` defines the Cloudflare Workers/Pages project; static assets are served from the repo root.
- Deployment is Git-connected: every push to the tracked branch (`main`) triggers `npx wrangler deploy` in Cloudflare automatically; other branches get preview deploys via `npx wrangler versions upload`. There is no local build step or CI config in this repo — see `CLOUDFLARE_SETUP.md` for the full dashboard setup and troubleshooting notes (e.g. blank page/404 after deploy usually means `directory` in `wrangler.toml` doesn't point at the folder containing `index.html`).
- `compatibility_date` in `wrangler.toml` should stay a valid (not-future-relative) date understood by Wrangler.

## No test/lint/build commands

There is no package.json, test runner, linter, or build tool in this repo. The only meaningful "verification" is opening `index.html` in a browser (or running `npx wrangler dev`) and checking it renders/loads correctly — there is no automated test suite to run.
