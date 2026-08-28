# ISTRIVA – Familien-Urlaubsplaner für Istrien

Ein interaktiver Web-Prototyp, der familiengerechte Tagespläne passend zu Gruppengröße und Kinderalter zusammenstellt.

## Funktionen

- kuratierte Tagesrouten für elf Städte und Urlaubsregionen in Istrien
- Ortsauswahl von Umag bis Kamenjak sowie für zentrale Ziele im Inland
- Live-Wetter von Open-Meteo mit automatischer Regen-/Outdoorplanung
- frei wählbare Erwachsenen- und Kinderzahl mit Altersangaben je Kind
- alternative Planung per Klick
- Kartenlinks, Favoriten und Teilen-Funktion
- personalisierte Empfehlungen mit jeweils mindestens vier Stränden, Tagesausflügen sowie Genusszielen pro Region
- responsive Darstellung für Desktop und Mobilgeräte
- installierbare Progressive Web App mit Offline-Grundfunktion
- zuverlässige Web-Push-Benachrichtigungen über OneSignal mit Marken-Icon

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

Der Button „Updates“ öffnet die Benachrichtigungseinstellungen. Nutzer können Wetter-Updates und Istrien-News auswählen. Die Zustellung erfolgt über OneSignal; der bestehende Offline-Service-Worker und der OneSignal-Push-Worker verwenden getrennte Scopes.

Beim Aktivieren werden folgende OneSignal-Tags gesetzt:

- `destination`: ausgewählte Region, zum Beispiel `pula`
- `notification_topics`: `weather`, `news` oder `weather_news`

Diese zwei Tags entsprechen dem Limit des kostenlosen OneSignal-Plans. Damit lassen sich Nachrichten im OneSignal-Dashboard unter **Audience > Segments** nach Region und Thema filtern. Die App ID ist öffentlich und im Frontend hinterlegt. REST API Keys dürfen ausschließlich als Repository-Secrets gespeichert werden.

Die in der App gewählte Region wird lokal gespeichert und bei jedem Start sowie bei jedem Regionswechsel als `destination` mit OneSignal synchronisiert. Dadurch bleibt die Benachrichtigungsregion auch nach dem Schließen der Homescreen-App erhalten.

### Ersten Empfänger registrieren

1. Den aktuellen Stand auf GitHub Pages veröffentlichen.
2. Die App in einem normalen Browserfenster öffnen, nicht im privaten Modus.
3. Auf „Updates“ klicken, Themen auswählen und „Aktivieren“ bestätigen.
4. Im nativen Browserdialog Benachrichtigungen erlauben.
5. Unter **OneSignal > Audience > Subscriptions** prüfen, ob das Gerät als `Subscribed` erscheint.

Auf iOS/iPadOS 16.4 oder neuer muss die Website zuerst zum Home-Bildschirm hinzugefügt und von dort geöffnet werden. Erst dann kann der Nutzer über den „Updates“-Button die Berechtigung erteilen.

### Automatische Wetter-Updates

Der Workflow `.github/workflows/weather-notifications.yml` sendet täglich um **09:00 Uhr in der Zeitzone Europe/Zagreb** eine regionale Wetterzusammenfassung. Zwei UTC-Startzeiten decken Sommer- und Winterzeit ab; das Python-Skript beendet den jeweils falschen Lauf ohne Versand.

Für den Versand muss unter **Settings > Secrets and variables > Actions** das Repository-Secret `ONESIGNAL_API_KEY` hinterlegt sein. Das Skript:

1. ruft Open-Meteo für alle elf Regionen ab,
2. erstellt eine kurze Wetterzusammenfassung mit passendem Hinweis,
3. filtert nach `destination` und `notification_topics`,
4. verlinkt direkt zum Tagesplan der Region und
5. verhindert Doppelversand mit einem täglichen Idempotency-Key.

Der geplante Lauf verwendet automatisch `all` und verarbeitet somit jeden Standort. Pro Nutzer wird nur die Nachricht zugestellt, deren `destination` seiner zuletzt in der App ausgewählten Region entspricht.

Unter **Actions > Send daily ISTRIVA weather updates > Run workflow** kann der Ablauf manuell gestartet werden. `dry_run` ist standardmäßig aktiviert und sendet keine Push-Nachricht. Für einen echten Einzeltest eine Region wählen und `dry_run` deaktivieren.

Manuelle Läufe erhalten einen eigenen Idempotency-Key, damit mehrere Tests am selben Tag möglich sind. Wenn ein Einzeltest keine passenden Empfänger findet, schlägt der Workflow sichtbar fehl und zeigt die OneSignal-Antwort im Log; tägliche Läufe überspringen Regionen ohne Empfänger dagegen erwartungsgemäß.
