# AgroBusiness Malawi — Claude Code Guide

## What this project is

A **dual-channel agricultural platform** for Malawian farmers:

1. **Progressive Web App (PWA)** — browser-based SPA (`index.html` + `assets/js/app.js`)
2. **USSD App** — feature-phone menu system reachable via a shortcode on Airtel/TNM Malawi; POST callbacks handled by `api/` (server-side directory, not fully in local repo — see `config/ussd_errors.log` for evidence)

Both channels share the same MySQL database and the same `api.php` endpoints.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla JS (`app.js`, 2430 lines), CSS (`style.css`), no framework |
| Backend API | PHP 8.3, MySQLi, `api.php` — single file, action-based routing (`?action=`) |
| USSD handler | PHP (`api/` directory on server) — POST from gateway, replies `CON`/`END` |
| Database | MySQL on `promanaged-it.com` (cPanel), database `p601229_AgroBusiness_MW` |
| Hosting | cPanel — `agrobusinessmw.com` → `/home/p601229/public_html/agrobusinessmw/` |
| PWA | `manifest.json`, service worker (currently disabled in `config.js`) |
| Languages | English (`en`) and Chichewa (`ci`) — keys in `app.js` `this.texts` object |

## Credentials & environment

Credentials live in `.env` (gitignored). Never hardcode them.

```
DB_HOST=promanaged-it.com
DB_NAME=p601229_AgroBusiness_MW
DB_USER=p601229_agro_admin
DB_PASS=...
DB_PORT=3306
```

On production the server connects via `localhost` (cPanel socket). Locally it connects to `promanaged-it.com` over TCP. Both `api.php` and `config/config.php` detect this automatically via `$_SERVER['SERVER_NAME']`.

## Running locally

```bash
php -S localhost:8080
```

App → http://localhost:8080  
API test → http://localhost:8080/api.php?action=test

`config.js` routes local requests to `http://localhost:8080/api.php`.

## Key files

| File | Purpose |
|---|---|
| `index.html` | SPA shell — no visible HTML, all rendered by JS |
| `assets/js/app.js` | Main app controller — `AgroBusinessRevolution` class |
| `assets/js/config.js` | Env detection + API base URL per environment |
| `assets/css/style.css` | Full stylesheet — green theme (`#16a34a`) |
| `api.php` | All web app API endpoints (`districts`, `crop_prices`, `sellers`, `buyers`, `weather`, etc.) |
| `config/config.php` | DB connection test endpoint |
| `p601229_AgroBusiness_MW.sql` | Full DB schema (15 tables) |
| `.env` | Secrets — DB credentials (gitignored, never commit) |
| `config/ussd_errors.log` | USSD gateway POST logs |

## API endpoints (`api.php`)

All return JSON. Routing via `?action=`:

- `test` — DB connection health check
- `districts` — all 28+ Malawi districts
- `crops` — crop registry
- `crop_prices` — live market prices with min/max
- `market_insights` — intelligence for a district
- `sellers` — sellers in a district
- `buyers` — buyers in a district
- `pest_control` — pest tips (crop + district)
- `farming_tips` — best practices for a crop
- `basic_info` — essential farming info

## Database — 15 tables

`districts`, `crops`, `crop_prices`, `market_insights`, `sellers`, `seller_contact_details`, `seller_crops`, `buyers`, `buyer_contact_details`, `buyer_crops`, `farming_best_practices`, `pest_control_tips`, `basic_farming_info`, `community_qa`, `ratings`

## USSD architecture

- Gateway (Airtel/TNM) POSTs to `api/` on the server with `sessionId`, `phoneNumber`, `serviceCode`, `text`
- Handler replies `CON <menu>` to continue or `END <message>` to close session
- `config/ussd_errors.log` is the debug log for USSD sessions
- The `api/` directory is on the server; keep it in sync with any DB schema changes

## Weather

Uses **Open-Meteo** (free, no API key) — same API for both the web app and USSD. District lat/lon coordinates are embedded in `app.js` `this.districtCoords`.

## Conventions

- No PHP framework — keep it plain PHP with MySQLi
- No JS framework — keep it vanilla JS
- All DB credentials come from `.env` — never hardcode
- Bilingual strings go in `this.texts.en` and `this.texts.ci` in `app.js`
- CORS is open (`*`) — intentional for USSD gateway compatibility
- Error responses always return HTTP 200 with `{"success": false, ...}` so the frontend can read them
