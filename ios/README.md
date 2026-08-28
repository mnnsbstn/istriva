# ISTRIVA für iOS

Native SwiftUI-App für iPhone und iPad. Die Web-App im Repository bleibt eigenständig und wird von diesem Projekt nicht verändert oder eingebettet.

## Enthalten

- native SwiftUI-Oberfläche mit Tagesplan, Entdecken-Karte, Favoriten und Einstellungen
- elf Regionen und alle kuratierten Pläne aus dem bestehenden ISTRIVA-Katalog
- frei wählbare Erwachsenen- und Kinderzahlen
- Live-Wetter über Open-Meteo mit lokalem Offline-Zwischenspeicher
- Google-Maps-Routen für jeden Stopp
- native Teilen-Funktion
- OneSignal iOS SDK mit denselben Tags wie die Web-App:
  - `destination`
  - `notification_topics`
- Notification Service Extension für Rich Push
- finales ISTRIVA-App-Icon und schwarzer Startbildschirm
- testbares Swift-Kernpaket unter `ISTRIVACore`

## Projekt erzeugen

Voraussetzungen auf einem Mac:

1. Xcode 16 oder neuer installieren.
2. [XcodeGen](https://github.com/yonaskolb/XcodeGen) installieren:

   ```bash
   brew install xcodegen
   ```

3. Projekt erzeugen und öffnen:

   ```bash
   cd ios
   xcodegen generate
   open ISTRIVA.xcodeproj
   ```

Die Projektdatei wird aus `project.yml` generiert. Dadurch bleiben Targets, Abhängigkeiten und Build-Einstellungen reproduzierbar.

## Apple Signing einrichten

In Xcode für beide Targets das eigene Apple-Developer-Team auswählen:

- `ISTRIVA`
- `OneSignalNotificationServiceExtension`

Vorgesehene Kennungen:

```text
App:       de.mnnsbstn.istriva
Extension: de.mnnsbstn.istriva.OneSignalNotificationServiceExtension
App Group: group.de.mnnsbstn.istriva.onesignal
```

Falls eine andere Bundle ID verwendet werden soll, muss sie **vor** dem Anlegen in Apples Developer-Portal in `project.yml`, beiden Entitlement-Dateien und der Extension-`Info.plist` geändert werden.

Für den Haupttarget müssen diese Capabilities aktiv sein:

- Push Notifications
- Background Modes → Remote notifications
- App Groups → `group.de.mnnsbstn.istriva.onesignal`

Für die Notification Service Extension:

- App Groups → exakt dieselbe App Group

## OneSignal mit APNs verbinden

Die native App verwendet dieselbe OneSignal App ID wie die Web-App:

```text
cd00c6cc-ad14-4246-9cde-4de743ce8238
```

Im OneSignal-Dashboard:

1. **Settings → Push & In-App → Apple iOS (APNs)** öffnen.
2. **.p8 Auth Key** auswählen.
3. In Apples Developer-Portal unter **Certificates, Identifiers & Profiles → Keys** einen APNs-Key erzeugen.
4. `.p8`-Datei, Key ID, Team ID und Bundle ID `de.mnnsbstn.istriva` bei OneSignal hinterlegen.
5. Speichern und danach auf einem echten iPhone testen.

Der `.p8`-Schlüssel darf niemals in dieses Repository eingecheckt werden.

## Tests

Kernlogik auf macOS:

```bash
cd ios/ISTRIVACore
swift test
```

Komplette App ohne Signierung für den Simulator:

```bash
cd ios
xcodegen generate
xcodebuild \
  -project ISTRIVA.xcodeproj \
  -scheme ISTRIVA \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 16 Pro' \
  CODE_SIGNING_ALLOWED=NO \
  build
```

## TestFlight und App Store

Vor dem ersten Upload werden zusätzlich benötigt:

- aktive Apple-Developer-Mitgliedschaft
- App-Eintrag in App Store Connect
- Datenschutz- und Support-URL
- App-Datenschutzangaben
- Screenshots für die unterstützten Displaygrößen
- Altersfreigabe und Export-Compliance-Angaben

Anschließend in Xcode **Product → Archive → Distribute App → App Store Connect** verwenden und zuerst über TestFlight auf echten Geräten prüfen.
