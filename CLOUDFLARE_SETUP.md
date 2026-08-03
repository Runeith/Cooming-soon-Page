# Cloudflare Pages setup (via GitHub) for a static HTML site

This guide matches the repo `Cooming-soon-Page`, which contains only
`index.html` (and `LICENSE`).

## Step 1 — Add `wrangler.toml` to your repo

Copy the included `wrangler.toml` file to the **root** of your GitHub repo,
next to `index.html`. Its contents are:

```toml
name = "cooming-soon-page"
compatibility_date = "2026-08-03"

[assets]
directory = "./"
```

- `name` — the project name in Cloudflare (you can change it, no spaces/uppercase).
- `directory = "./"` — tells Wrangler that all static files (including
  `index.html`) live in the repo root. If your HTML lives elsewhere, e.g. in
  a `public` folder, use `directory = "./public"` instead.

Commit and push this file to GitHub:

```bash
git add wrangler.toml
git commit -m "Add wrangler.toml for Cloudflare Pages"
git push
```

## Step 2 — Create the project in Cloudflare

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create application**.
2. Choose **Connect to Git** (not an empty Worker template).
3. Authorize Cloudflare for your GitHub account, or just this repo.
4. Select the `Cooming-soon-Page` repo.
5. Pick the branch to deploy (usually `main`).

## Step 3 — Build and deploy settings

Fill in the fields like this:

| Field | Value |
|---|---|
| Build command | *(leave empty)* |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Path | `/` |

These are likely already filled in by default — you don't need to change
them. Wrangler reads `wrangler.toml` itself and publishes the folder
specified there.

## Step 4 — Deploy

Click **Save and Deploy**. Cloudflare will:
- clone your repo,
- run the deploy command (`npx wrangler deploy`),
- publish `index.html` as a static asset,
- give you a URL like `cooming-soon-page.<your-subdomain>.workers.dev`.

## Step 5 — Automatic updates

From now on, every `git push` to the selected branch automatically triggers
a new deploy. Pushes to other branches use the "non-production" command and
get their own preview URL.

## Common issues

- **"No wrangler.toml found"** → the file isn't in the root, or the "Path"
  setting doesn't point to the folder where it lives.
- **Blank page or 404 after deploy** → check that `directory` in
  `wrangler.toml` actually points to the folder containing `index.html`.
- **Changes not showing up** → check the "Deployments" tab in Cloudflare; if
  the latest deploy failed, the old version stays live.
