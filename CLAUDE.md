# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

This repo hosts a single "coming soon" landing page for a site called Runeith, deployed as a static site on Cloudflare Pages/Workers via Wrangler. There is no build system, package.json, or source tooling — the repo root is deployed as-is.

## Critical: `index.html` is a generated bundle, not hand-authored source

`index.html` (~10 MB, ~390 lines but with several extremely long lines) is **not** normal markup. It is the output of an export/bundler tool that packs an entire page — HTML template, CSS, JS, fonts, images — into one self-contained file:

- The visible `<body>` only contains a loading spinner/thumbnail and an unpacker `<script>`.
- The real page content lives inside `<script type="__bundler/manifest">`, `<script type="__bundler/ext_resources">`, `<script type="__bundler/page_order">`, and `<script type="__bundler/template">` tags near the end of the file. These hold JSON — a resource manifest (base64, optionally gzip-compressed, keyed by UUID), external resource references, and the actual HTML template with UUID placeholders.
- On `DOMContentLoaded`, the unpacker script decodes/decompresses the manifest entries into blob URLs, substitutes them into the template in place of the UUID markers, parses the result via `DOMParser`, and replaces `document.documentElement` with the reconstructed page — recreating `<script>` tags manually since innerHTML-inserted scripts don't execute.
- There is also support for multi-page bundles: an iframe can reference another page's content via an `about:blank#<uuid>` marker, resolved via `postMessage` between frames (`pendingFrames`/`pendingRelays`/`ownFrameWindows` in the unpacker script).

**Practical implications:**
- Do not attempt to hand-edit visible copy, styles, or layout by editing `index.html` text directly — the actual content is inside the compressed/encoded manifest blobs, not in readable HTML.
- Standard file tools may fail or truncate on this file: it exceeds typical read size limits (use `Grep` with narrow patterns, or `Read` with small `offset`/`limit` windows, instead of reading the whole file — several individual lines are multi-megabyte base64 blobs that will exceed a normal read).
- If asked to change page content/design, the correct approach is almost always to regenerate `index.html` from whatever upstream tool/source produced this bundle (not visible in this repo), rather than patching the bundled file in place. If no upstream source exists in this repo, flag that to the user before attempting surgical edits inside the bundle.
- The unpacker JS itself (lines ~1–370, before the data script tags) is regular, readable code and can be reviewed/edited normally if the bundler's runtime behavior itself needs fixing.

## Deployment (Cloudflare Pages via Wrangler)

- `wrangler.toml` defines the Cloudflare Workers/Pages project: `name = 'runeithlandingsoon'`, static assets served from `directory = "./"` (repo root).
- Deployment is Git-connected: every push to the tracked branch (`main`) triggers `npx wrangler deploy` in Cloudflare automatically; other branches get preview deploys via `npx wrangler versions upload`. There is no local build step or CI config in this repo — see `CLOUDFLARE_SETUP.md` for the full dashboard setup and troubleshooting notes (e.g. blank page/404 after deploy usually means `directory` in `wrangler.toml` doesn't point at the folder containing `index.html`).
- `compatibility_date` in `wrangler.toml` should stay a valid (not-future-relative) date understood by Wrangler.

## No test/lint/build commands

There is no package.json, test runner, linter, or build tool in this repo. The only meaningful "verification" is deploying (or previewing) the static site and checking it renders/loads correctly in a browser — there is no automated test suite to run.
