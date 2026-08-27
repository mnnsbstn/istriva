# Bura – Familien-Urlaubsplaner für Istrien

Ein interaktiver Web-Prototyp, der einen familiengerechten Tagesplan für zwei Erwachsene und zwei Kinder zusammenstellt.

## Funktionen

- kuratierte Tagesrouten für elf Städte und Urlaubsregionen in Istrien
- Ortsauswahl von Umag bis Kamenjak sowie für zentrale Ziele im Inland
- Live-Wetter von Open-Meteo mit automatischer Regen-/Outdoorplanung
- alternative Planung per Klick
- Kartenlinks, Favoriten und Teilen-Funktion
- responsive Darstellung für Desktop und Mobilgeräte
- installierbare Progressive Web App mit Offline-Grundfunktion
- Browser-Benachrichtigungen und Web-Push-Unterstützung mit Marken-Icon

Wetterdaten werden bei jedem Öffnen und anschließend alle 15 Minuten aktualisiert. Bei fehlender Verbindung nutzt die App den zuletzt erfolgreichen Wetterabruf. Öffnungszeiten, Eintrittspreise und kurzfristige Ausfälle müssen weiterhin beim jeweiligen Anbieter geprüft werden.

## Lokal starten

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Auf dem Smartphone installieren

- Android/Chrome: In der App auf „App installieren“ tippen.
- iPhone/Safari: „Teilen“ und anschließend „Zum Home-Bildschirm“ wählen.

Nach dem ersten vollständigen Laden bleiben Oberfläche und gespeicherte Planungsdaten auch ohne Verbindung verfügbar. Externe Kartenlinks benötigen weiterhin Internet.

## Dauerhaft veröffentlichen

Der Workflow `.github/workflows/deploy-pages.yml` veröffentlicht jeden neuen Stand von `main` automatisch über GitHub Pages. Im Repository muss einmalig unter **Settings → Pages → Source** die Option **GitHub Actions** aktiviert werden.

## Benachrichtigungen

Der Button „Wetter-Updates“ aktiviert eine Testbenachrichtigung und registriert auf unterstützten Chromium-PWAs einen browsergesteuerten täglichen Hintergrundabruf. Garantierte tägliche Zustellung auf Android und iOS benötigt zusätzlich einen Push-Dienst wie OneSignal oder Firebase; der Service Worker kann entsprechende Web-Push-Nachrichten bereits empfangen.
