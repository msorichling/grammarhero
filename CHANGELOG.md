# Changelog – GrammarHero 10 Refactoring & Mobile-UX-Upgrade

## [2.0.0] – 2026-10-26

### 1. Daten-Entkopplung (`/data`)
- Statische Inhalte vollständig aus der monolithischen `script.js` in reine JSON-Dateien ausgelagert:
  - [`data/verbs.json`](./data/verbs.json): 108 unregelmäßige Verben (Deutsch, Infinitive, Simple Past, Past Participle).
  - [`data/sentences.json`](./data/sentences.json): 80 balancierte Übungssätze über alle 8 Zeitformen inkl. Signalwörtern und Erklärungen.
  - [`data/grammar-rules.json`](./data/grammar-rules.json): Komplette Grammatik-Bibliothek für die 8 Lehrplan-Zeitformen der 10. Klasse.
- Paralleler, asynchroner Datenabruf beim App-Start mittels `Promise.all` und `fetch()` in [`app.js`](./app.js) (100 % kompatibel mit GitHub Pages durch relative Pfade).

### 2. JavaScript-Modularisierung (Native ES-Module unter `/modules`)
- Monolithische `script.js` abgelöst und in vier klar abgegrenzte ES-Module sowie einen Root-Einstiegspunkt aufgeteilt:
  - [`app.js`](./app.js): Haupt-Einstiegspunkt (`<script type="module" src="app.js">`), asynchrones Daten-Bootstrapping, Tab-Steuerung und globale Tastatur-Shortcuts (`Enter`-Taste).
  - [`modules/storage.js`](./modules/storage.js): Kapselung des `localStorage`-Managements für globale Punkte (`gh_points`), globalen Streak (`gh_streak`) und Verben-Streak (`gh_verbs_streak`).
  - [`modules/trainer-engine.js`](./modules/trainer-engine.js): Rundenmanagement (10 Sätze pro Runde), Fisher-Yates-Zufallspool über alle 80 Sätze, zweistufige Signalwort- und Lücken-Interaktion sowie automatische Weiche für Sätze ohne explizites Signalwort.
  - [`modules/verbs-widget.js`](./modules/verbs-widget.js): Eigenständige Steuerung und Validierung des Sidebar-Widgets für unregelmäßige Verben.
  - [`modules/grammar-view.js`](./modules/grammar-view.js): Dynamisches Rendering der Grammatik-Karten, Markdown-Formatierung und interaktive Zeitstrahl-Navigation.

### 3. Mobile-First UX-Upgrade (`max-width: 768px`)
- **Ruhiger Lesebereich & Lücken-Badge**: Auf Smartphones bleibt der Satzbereich (`#sentence-area`) oben ruhig im Sichtfeld (`position: sticky`), während die Lücke im Satz als kontrastreiches, dynamisch synchronisiertes Glassmorphism-Badge (`#sentence-gap-badge`) dargestellt wird.
- **Fixierte untere Eingabeleiste in Schritt 2**: Sobald Schritt 2 freigeschaltet wird, blendet sich am unteren Bildschirmrand eine fixierte Eingabeleiste (`#mobile-input-bar`) über der virtuellen Tastatur ein – inklusive Anzeige des geforderten Infinitivs, deaktivierter Autokorrektur/Großschreibung (`autocorrect="off"`, `autocapitalize="off"`, `font-size: 16px` gegen iOS-Auto-Zoom) und direktem „Prüfen"-Button.
- **Direkte Auswertung**: Sowohl das Drücken der `Enter`-Taste auf der virtuellen oder physischen Tastatur als auch ein Tipp auf „Prüfen" werten die Eingabe unmittelbar aus und schließen die mobile Eingabeleiste, sodass das Feedback-Panel direkt lesbar ist.

### 4. Code-Audit & Bugfixes
- Inline-Event-Attribute (`onclick`, `onsubmit`) in [`index.html`](./index.html) durch saubere DOM-Event-Listener in den jeweiligen Modulen ersetzt (bei gleichzeitiger Beibehaltung globaler `window`-Referenzen für Rückwärtskompatibilität).
- `Enter`-Tasten-Logik auf `keydown` mit `e.preventDefault()` und Formular-Fokus-Abgrenzung (`#verbs-widget-form`) aktualisiert, um Doppel-Events bei fokussierten Buttons zu verhindern und am Rundenende direkt den Start der nächsten Runde per `Enter` zu ermöglichen.
- Fehlende CSS-Utility-Klassen (`.btn-green`, `.text-rose`) in [`style.css`](./style.css) ergänzt.
