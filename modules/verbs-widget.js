/* ==========================================================================
   GrammarHero 10 - Irregular Verbs Module (Tab & Grade Filter + Shuffle Pool)
   ========================================================================== */

import { updateGlobalStats, updateVerbsStreak } from "./storage.js";

let verbData = [];
let filteredVerbs = [];
let verbDeck = []; // Shuffle-Pool (Ziehen ohne Zurücklegen)
let currentGradeFilter = "all";
let widgetCurrentVerb = null;
let widgetChecked = false;

/**
 * Initialisiert das Unregelmäßige-Verben-Widget inklusive Klassenstufen-Filter.
 * @param {Array} verbs - Array der Verb-Objekte aus /data/verbs.json
 */
export function initVerbsWidget(verbs) {
    verbData = Array.isArray(verbs) ? verbs : [];
    filteredVerbs = [...verbData];
    refillVerbDeck();

    const form = document.getElementById("verbs-widget-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            checkWidgetVerbs();
        });
    }

    // Event-Listener für die Klassenstufen-Pill-Buttons
    document.querySelectorAll(".verb-grade-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const grade = btn.dataset.grade || "all";
            setVerbGradeFilter(grade);
        });
    });

    updateFilterCountBadge();
    loadWidgetVerb();
}

/**
 * Mischt den aktuellen Filter-Pool per Fisher-Yates-Shuffle neu durch.
 */
function refillVerbDeck() {
    const source = filteredVerbs.length > 0 ? filteredVerbs : verbData;
    verbDeck = [...source];

    for (let i = verbDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [verbDeck[i], verbDeck[j]] = [verbDeck[j], verbDeck[i]];
    }

    // Verhindere beim Neu-Mischen, dass das erste neue Verb identisch mit dem letzten alten ist
    if (verbDeck.length > 1 && widgetCurrentVerb && verbDeck[0].inf === widgetCurrentVerb.inf) {
        [verbDeck[0], verbDeck[verbDeck.length - 1]] = [verbDeck[verbDeck.length - 1], verbDeck[0]];
    }
}

/**
 * Filtert das Verben-Array nach Klassenstufe ('all', '7', '8', '9', '10').
 * @param {string} grade
 */
export function setVerbGradeFilter(grade) {
    currentGradeFilter = String(grade);

    document.querySelectorAll(".verb-grade-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.grade === currentGradeFilter);
    });

    if (currentGradeFilter === "all") {
        filteredVerbs = [...verbData];
    } else {
        const numericGrade = parseInt(currentGradeFilter, 10);
        filteredVerbs = verbData.filter((v) => Number(v.grade) === numericGrade);
        if (filteredVerbs.length === 0) {
            filteredVerbs = [...verbData];
        }
    }

    widgetCurrentVerb = null;
    refillVerbDeck();
    updateFilterCountBadge();
    loadWidgetVerb();
}

/**
 * Aktualisiert die optionale Anzeige der Anzahl gefilterter Verben im UI.
 */
function updateFilterCountBadge() {
    const countEl = document.getElementById("verbs-pool-count");
    if (!countEl) return;

    const label =
        currentGradeFilter === "all"
            ? `Alle Klassen (${filteredVerbs.length} Verben)`
            : `Klasse ${currentGradeFilter} (${filteredVerbs.length} Verben)`;
    countEl.innerText = label;
}

/**
 * Zieht das nächste Verb aus dem gemischten Deck (ohne Wiederholungen innerhalb eines Durchlaufs).
 */
export function loadWidgetVerb() {
    if (!verbData.length) return;

    if (verbDeck.length === 0) {
        refillVerbDeck();
    }

    widgetCurrentVerb = verbDeck.shift();

    const targetEl = document.getElementById("verb-german-target");
    if (targetEl) {
        targetEl.innerText = widgetCurrentVerb.de;
    }

    const fields = ["inf", "sp", "pp"];
    fields.forEach((f) => {
        const input = document.getElementById(`widget-${f}`);
        if (input) {
            input.value = "";
            input.disabled = false;
            const wrapper = input.parentElement;
            if (wrapper) wrapper.className = "input-wrapper";
        }

        const hint = document.getElementById(`hint-widget-${f}`);
        if (hint) {
            hint.style.display = "none";
        }
    });

    const checkBtn = document.getElementById("btn-widget-check");
    if (checkBtn) {
        checkBtn.innerHTML = "Prüfen";
        checkBtn.className = "btn btn-accent btn-full";
    }

    widgetChecked = false;
}

/**
 * Erzeugt ein Array gültiger Antwortvarianten (inkl. voller "was/were"-Eingabe).
 */
function getAcceptedForms(rawForm) {
    const lower = rawForm.toLowerCase().trim();
    const parts = lower.split("/").map((v) => v.trim());
    // Erlaubt sowohl Einzelteile ("was", "were") als auch Gesamteingaben ("was/were", "was / were", "was, were")
    return [
        ...parts,
        lower,
        parts.join(" / "),
        parts.join(", ")
    ];
}

/**
 * Prüft die eingegebenen drei Stammformen oder lädt nach erfolgter Prüfung das nächste Verb.
 */
export function checkWidgetVerbs() {
    if (!widgetCurrentVerb) return;

    const checkBtn = document.getElementById("btn-widget-check");

    if (widgetChecked) {
        loadWidgetVerb();
        const firstInput = document.getElementById("widget-inf");
        if (firstInput) firstInput.focus();
        return;
    }

    const valInf = document.getElementById("widget-inf").value.trim().toLowerCase();
    const valSp = document.getElementById("widget-sp").value.trim().toLowerCase();
    const valPp = document.getElementById("widget-pp").value.trim().toLowerCase();

    const correctInf = getAcceptedForms(widgetCurrentVerb.inf);
    const correctSp = getAcceptedForms(widgetCurrentVerb.sp);
    const correctPp = getAcceptedForms(widgetCurrentVerb.pp);

    const isInfOk = correctInf.includes(valInf);
    const isSpOk = correctSp.includes(valSp);
    const isPpOk = correctPp.includes(valPp);

    const styleInput = (id, isOk, correctVal) => {
        const input = document.getElementById(id);
        const wrapper = input.parentElement;
        const hint = document.getElementById(`hint-${id}`);
        input.disabled = true;

        if (isOk) {
            wrapper.classList.add("success");
        } else {
            wrapper.classList.add("error");
            hint.innerText = `Richtig: ${correctVal}`;
            hint.style.display = "block";
        }
    };

    styleInput("widget-inf", isInfOk, widgetCurrentVerb.inf);
    styleInput("widget-sp", isSpOk, widgetCurrentVerb.sp);
    styleInput("widget-pp", isPpOk, widgetCurrentVerb.pp);

    const allCorrect = isInfOk && isSpOk && isPpOk;
    widgetChecked = true;

    if (allCorrect) {
        updateVerbsStreak(true);
        updateGlobalStats(15);

        checkBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Richtig! Weiter`;
        checkBtn.className = "btn btn-green btn-full";

        const wordEl = document.getElementById("verb-german-target");
        if (wordEl) {
            wordEl.style.transform = "scale(1.05)";
            wordEl.style.borderColor = "var(--emerald)";
            setTimeout(() => {
                wordEl.style.transform = "";
            }, 300);
        }
    } else {
        updateVerbsStreak(false);

        checkBtn.innerHTML = `Nächstes Verb <i class="fa-solid fa-arrow-right"></i>`;
        checkBtn.className = "btn btn-primary btn-full";
    }
}