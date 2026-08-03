# Runeith — Coming Soon Page

Statische "coming soon"-pagina voor Runeith, gehost als static site op Cloudflare via Wrangler.

## Inhoud van dit repo

- `index.html` — de volledige pagina, als één self-contained gebundeld bestand (HTML, CSS, JS, fonts en afbeeldingen zijn erin verpakt). Zie de opmerking hieronder over hoe dit bestand werkt.
- `wrangler.toml` — Cloudflare/Wrangler-configuratie: projectnaam en de map die als static assets wordt gepubliceerd (`./`, oftewel de repo-root).
- `CLOUDFLARE_SETUP.md` — stap-voor-stap uitleg om dit project te koppelen aan Cloudflare Pages via GitHub.
- `LICENSE` — MIT-licentie.

## Over `index.html`

`index.html` is geen gewoon handgeschreven HTML-bestand. Het is de output van een bundler-tool die de hele pagina — template, stijlen, scripts, fonts, afbeeldingen — inpakt in één bestand:

- De zichtbare `<body>` bevat alleen een laadscherm en een klein "unpacker"-script.
- De eigenlijke pagina-inhoud staat gecodeerd (base64, deels gzip-gecomprimeerd) in een paar `<script type="__bundler/...">`-tags verderop in het bestand.
- Bij het laden van de pagina pakt het unpacker-script deze data uit, zet de resources om in blob-URLs, en herbouwt de volledige pagina in de browser.

Wil je de inhoud (tekst, vormgeving) aanpassen, doe dat dan bij voorkeur in de brontool die dit bundelbestand heeft gegenereerd en exporteer opnieuw, in plaats van rechtstreeks in `index.html` te knippen en plakken — de leesbare tekst staat niet direct in de HTML, maar zit verpakt in de databestanden.

## Deployen

Dit project wordt gedeployed via Cloudflare Pages, gekoppeld aan GitHub:

1. Elke push naar `main` triggert automatisch een deploy (`npx wrangler deploy`) in Cloudflare.
2. Pushes naar andere branches krijgen een eigen preview-deploy (`npx wrangler versions upload`).
3. Er is geen lokale build-stap of CI-configuratie nodig — Wrangler publiceert direct de map uit `wrangler.toml` (`./`).

Volledige setup-instructies (project aanmaken in Cloudflare, build-instellingen, troubleshooting) staan in [`CLOUDFLARE_SETUP.md`](./CLOUDFLARE_SETUP.md).

## Lokaal bekijken

Omdat er geen build-stap is, volstaat het om `index.html` lokaal te openen in een browser, of te serveren met een simpele static file server, bijvoorbeeld:

```bash
npx wrangler dev
```

## Licentie

MIT — zie [`LICENSE`](./LICENSE).
