# ISTRIVA – Familien-Urlaubsplaner für Istrien

Interaktiver, bilingualer Web-Prototyp (DE/EN) für familiengerechte Tagespläne in elf Istrien-Regionen – inkl. editierbarem Planer, Suche, Karte, Share-Links und PWA.

## Lokal starten

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000` öffnen.

## Tests

```bash
# JavaScript (i18n, Share, Planner, POI, TripAdvisor)
node tests/test_istriva.js

# Python (Wetter-Push-Workflow)
python3 -m unittest discover -s tests -v
```

## Deployment (GitHub Pages)

Workflow: `.github/workflows/deploy-pages.yml` – veröffentlicht `main` automatisch.

Einmalig im Repository: **Settings → Pages → Source → GitHub Actions**.

## Architektur (v2)

Statische Multi-File-App ohne Bundler:

| Pfad | Zweck |
|------|--------|
| `app.js` | Legacy-Daten (Regionen, Pula-Katalog), Wetter, Favoriten, OneSignal |
| `guide-data.js` / `tripadvisor-data.js` | Kuratierte POI-Listen & Review-Links |
| `js/i18n/` | Übersetzungen DE/EN + `i18n.t()` |
| `js/core/` | Storage-Migration, Share-Encoding, Analytics (No-op), Feature Flags |
| `js/data/poi-registry.js` | Zentrales POI-Modell mit IDs & Validierung |
| `js/planner/` | Deterministische Planerzeugung & Zeitplan |
| `js/ui/` | Navigation, Profil, Onboarding, Suche, Leaflet-Karte |
| `js/bootstrap.js` | App-Orchestrierung & neues UX-Layout |
| `sw.js` | Offline App-Shell + JS-Module |

## Übersetzungen

- Sprachumschalter im Header (DE \| EN)
- URL-Parameter: `?lang=en`
- Local Storage: `istriva-lang-v1`
- Fehlende Keys: `ISTRIVA.i18n.validateTranslations()` (automatisiert getestet)

## Planerzeugung

- Kuratierte Pula-Routen bleiben erhalten (mehrere echte Varianten)
- Andere Regionen: POI-basierte Generierung nach Alter, Interessen, Wetter, Tempo, Budget
- Stopps: sperren, ersetzen, entfernen, umsortieren
- Zeiten werden aus Start-/Endzeit neu berechnet (Schätzung, transparent gekennzeichnet)
- „Alternative anzeigen“ nur bei mindestens zwei unterschiedlichen Varianten

## Share-Links

Versioniertes Payload in `?plan=…` (Base64-URL-safe) inkl. Sprache, Region, Profil, Stopps, gesperrte Stopps.

Geteilte Pläne öffnen schreibgeschützt; „Als eigenen Plan übernehmen“ möglich.

## Offline & PWA

Service Worker `bura-v41` cached App-Shell, Module, POI-Quellen und Legal-Seiten. Wetter mit Cache-Fallback und Zeitstempel.

## Analytics

`js/core/analytics.js` – Event-Hooks (`plan_generated`, `share_started`, …). Ohne konfigurierten Provider: No-op.

## Feature Flags

`js/core/feature-flags.js` – Premium/Partner-Funktionen vorbereitet, standardmäßig deaktiviert.

## Rechtliches

- `privacy.html`, `legal.html`, `sources.html` – technische Platzhalter
- **`LEGAL_TODO.md`** – Pflichtangaben vor Release (Release-Blocker)

## Bekannte Abhängigkeiten

- [Open-Meteo](https://open-meteo.com/) – Wetter
- [Leaflet](https://leafletjs.com/) + OpenStreetMap – Karte (lazy)
- Google Maps – externe Links
- TripAdvisor – Suchlinks (keine erfundenen Ratings)
- OneSignal – Push (optional)

## iOS

Native SwiftUI-App unter `ios/` – parallel, unabhängig von der Web-App.
