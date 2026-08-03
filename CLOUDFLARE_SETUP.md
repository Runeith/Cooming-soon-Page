# Cloudflare Pages setup (via GitHub) voor een statische HTML-site

Deze handleiding hoort bij de repo `Cooming-soon-Page` met daarin alleen
`index.html` (en `LICENSE`).

## Stap 1 — Voeg `wrangler.toml` toe aan je repo

Kopieer het meegeleverde `wrangler.toml` bestand naar de **root** van je
GitHub-repo, dus naast `index.html`. De inhoud is:

```toml
name = "cooming-soon-page"
compatibility_date = "2026-08-03"

[assets]
directory = "./"
```

- `name` — de projectnaam in Cloudflare (mag je aanpassen, geen spaties/hoofdletters).
- `directory = "./"` — vertelt Wrangler dat alle statische bestanden (waaronder
  `index.html`) in de root van de repo staan. Staat je HTML ergens anders,
  bijvoorbeeld in een map `public`, gebruik dan `directory = "./public"`.

Commit en push dit bestand naar GitHub:

```bash
git add wrangler.toml
git commit -m "Add wrangler.toml for Cloudflare Pages"
git push
```

## Stap 2 — Project aanmaken in Cloudflare

1. Ga naar het Cloudflare dashboard → **Workers & Pages** → **Create application**.
2. Kies **Connect to Git** (niet een lege Worker-template).
3. Autoriseer Cloudflare voor je GitHub-account of alleen deze repo.
4. Selecteer de repo `Cooming-soon-Page`.
5. Kies de branch die je wilt deployen (meestal `main`).

## Stap 3 — Build- en deploy-instellingen

Vul de velden zo in:

| Veld | Waarde |
|---|---|
| Build command | *(leeg laten)* |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Path | `/` |

Deze staan waarschijnlijk al standaard zo ingevuld — je hoeft ze niet te
wijzigen. Wrangler leest zelf de `wrangler.toml` op en publiceert de map die
daar staat aangegeven.

## Stap 4 — Deploy

Klik op **Save and Deploy**. Cloudflare:
- kloont je repo,
- voert het deploy command uit (`npx wrangler deploy`),
- publiceert `index.html` als statische asset,
- geeft je een URL zoals `cooming-soon-page.<jouw-subdomein>.workers.dev`.

## Stap 5 — Automatische updates

Vanaf nu geldt: elke `git push` naar de gekozen branch triggert automatisch
een nieuwe deploy. Pushes naar andere branches gebruiken het
"non-production" commando en krijgen een eigen preview-URL.

## Veelvoorkomende fouten

- **"No wrangler.toml found"** → het bestand staat niet in de root, of de
  "Path" in de instellingen wijst niet naar de map waar het staat.
- **Lege of 404-pagina na deploy** → check of `directory` in `wrangler.toml`
  daadwerkelijk naar de map wijst waar `index.html` staat.
- **Wijzigingen niet zichtbaar** → check het tabblad "Deployments" in
  Cloudflare; als de laatste deploy is mislukt, blijft de oude versie live.
