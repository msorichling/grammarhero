/* ==========================================================================
   GrammarHero 10 - Main Application Entry Point (ESM)
   ========================================================================== */

import { loadStats } from "./modules/storage.js";
import {
    initTrainer,
    initTrainerRound,
    handleSentenceAction,
    showSentenceHint
} from "./modules/trainer-engine.js";
import { initVerbsWidget, checkWidgetVerbs, setVerbGradeFilter } from "./modules/verbs-widget.js";
import { initGrammarView, scrollToTense } from "./modules/grammar-view.js";

/**
 * Wechselt zwischen den drei Haupt-Tabs ('trainer', 'verbs', 'grammar').
 * @param {'trainer'|'verbs'|'grammar'} tabName
 */
export function switchTab(tabName) {
    document.querySelectorAll(".nav-btn").forEach((btn) => btn.classList.remove("active"));
    const targetBtn = document.getElementById(`btn-tab-${tabName}`);
    if (targetBtn) targetBtn.classList.add("active");

    document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.classList.add("active");
}

/**
 * Lädt alle statischen JSON-Datenbanken parallel per Fetch.
 */
async function fetchAppData() {
    const [verbsRes, sentencesRes, grammarRes] = await Promise.all([
        fetch("./data/verbs.json"),
        fetch("./data/sentences.json"),
        fetch("./data/grammar-rules.json")
    ]);

    if (!verbsRes.ok || !sentencesRes.ok || !grammarRes.ok) {
        throw new Error("Fehler beim Laden der JSON-Datenbanken aus /data.");
    }

    const [verbsData, sentencesData, grammarData] = await Promise.all([
        verbsRes.json(),
        sentencesRes.json(),
        grammarRes.json()
    ]);

    return { verbsData, sentencesData, grammarData };
}

/**
 * Initialisiert die gesamte Applikation nach dem Laden des DOMs.
 */
async function bootstrapApp() {
    // 1. Gespeicherte Punkte & Streaks aus LocalStorage laden
    loadStats();

    // 2. Tab-Navigation binden ('trainer', 'verbs', 'grammar')
    const btnTabTrainer = document.getElementById("btn-tab-trainer");
    const btnTabVerbs = document.getElementById("btn-tab-verbs");
    const btnTabGrammar = document.getElementById("btn-tab-grammar");

    if (btnTabTrainer) {
        btnTabTrainer.addEventListener("click", () => switchTab("trainer"));
    }
    if (btnTabVerbs) {
        btnTabVerbs.addEventListener("click", () => switchTab("verbs"));
    }
    if (btnTabGrammar) {
        btnTabGrammar.addEventListener("click", () => switchTab("grammar"));
    }

    // 3. Globale Enter-Tasten-Steuerung für Satz-Trainer & Verben-Tab
    document.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;

        const activeTab = document.querySelector(".tab-content.active");
        if (!activeTab) return;

        // Im Verben-Tab: Falls Eingabefelder nach dem Prüfen deaktiviert sind, lädt Enter das nächste Verb
        if (activeTab.id === "tab-verbs") {
            const infInput = document.getElementById("widget-inf");
            if (infInput && infInput.disabled) {
                e.preventDefault();
                checkWidgetVerbs();
            }
            return;
        }

        if (activeTab.id !== "tab-trainer") return;

        // Falls Runden-Auswertung aktiv ist: Enter startet direkt die nächste Runde
        const btnNextRound = document.getElementById("btn-next-round");
        if (btnNextRound) {
            e.preventDefault();
            initTrainerRound();
            return;
        }

        const btnAction = document.getElementById("btn-action");
        if (btnAction && !btnAction.disabled) {
            e.preventDefault();
            handleSentenceAction();
        }
    });

    // 4. Daten asynchron abrufen und Module starten
    try {
        const { verbsData, sentencesData, grammarData } = await fetchAppData();

        initTrainer(sentencesData);
        initVerbsWidget(verbsData);
        initGrammarView(grammarData, switchTab);
    } catch (error) {
        console.error("Initialisierungsfehler:", error);
        const sentenceArea = document.getElementById("sentence-area");
        if (sentenceArea) {
            sentenceArea.innerHTML = `
                <div style="text-align: center; color: var(--rose); padding: 16px;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 2em; margin-bottom: 8px;"></i>
                    <p>Daten konnten nicht geladen werden. Bitte über einen lokalen Webserver oder GitHub Pages öffnen.</p>
                </div>
            `;
        }
    }
}

// Globale Referenzen für maximale Rückwärtskompatibilität bereitstellen
window.switchTab = switchTab;
window.scrollToTense = scrollToTense;
window.showSentenceHint = showSentenceHint;
window.handleSentenceAction = handleSentenceAction;
window.checkWidgetVerbs = checkWidgetVerbs;
window.setVerbGradeFilter = setVerbGradeFilter;
window.initTrainerRound = initTrainerRound;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrapApp);
} else {
    bootstrapApp();
}
