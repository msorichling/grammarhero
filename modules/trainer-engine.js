/* ==========================================================================
   GrammarHero 10 - Trainer Engine Module
   Rundenmanagement, Satz-Zufallspool, Signalwort-Tokens & Lücken-Validierung
   ========================================================================== */

import { updateGlobalStats } from "./storage.js";
import { formatMarkdown } from "./grammar-view.js";

let sentenceBank = [];
let masterSentencePool = [];    // Hält alle verbleibenden Sätze der Datenbank
let currentRoundSentences = []; // Die 10 aktuellen Sätze der aktiven Runde
let currentSentenceIndex = 0;
let sentenceScore = 0;
let totalRoundsPlayed = 0;      // Zähler für die absolvierten Runden

let selectedWords = [];         // Aktuell angeklickte Tokens
let activeSentence = null;
let sentenceChecked = false;

/**
 * Prüft, ob aktuell das mobile Viewport-Layout (max-width: 768px) aktiv ist.
 */
function isMobileViewport() {
    return window.matchMedia("(max-width: 768px)").matches;
}

/**
 * Initialisiert den Satz-Trainer mit den geladenen Sätzen und bindet Event-Listener.
 * @param {Array} sentences - Array der Satz-Objekte aus /data/sentences.json
 */
export function initTrainer(sentences) {
    sentenceBank = Array.isArray(sentences) ? sentences : [];

    const btnHint = document.getElementById("btn-hint");
    if (btnHint) {
        btnHint.addEventListener("click", showSentenceHint);
    }

    const btnAction = document.getElementById("btn-action");
    if (btnAction) {
        btnAction.addEventListener("click", handleSentenceAction);
    }

    // Mobile Eingabeleiste Event-Listener
    const mobileInput = document.getElementById("mobile-gap-input");
    const btnMobileCheck = document.getElementById("btn-mobile-check");

    if (mobileInput) {
        mobileInput.addEventListener("input", () => {
            syncGapInputs(mobileInput.value, "mobile");
        });
    }

    if (btnMobileCheck) {
        btnMobileCheck.addEventListener("click", () => {
            if (!sentenceChecked) {
                handleSentenceAction();
            }
        });
    }

    resetMasterSentencePool();
    initTrainerRound();
}

/**
 * Synchronisiert den Eingabewert zwischen Desktop-Input, Mobile-Input und Mobile-Satz-Badge.
 * @param {string} value - Aktueller Textwert
 * @param {'desktop'|'mobile'} source - Quelle der Eingabe
 */
function syncGapInputs(value, source) {
    const desktopInput = document.getElementById("sentence-gap");
    const mobileInput = document.getElementById("mobile-gap-input");
    const badgeEl = document.getElementById("sentence-gap-badge");
    const badgeTextEl = document.getElementById("sentence-gap-badge-text");

    if (source !== "desktop" && desktopInput) {
        desktopInput.value = value;
    }
    if (source !== "mobile" && mobileInput) {
        mobileInput.value = value;
    }

    if (badgeTextEl && badgeEl) {
        const trimmed = value.trim();
        if (trimmed.length > 0) {
            badgeTextEl.innerText = trimmed;
            badgeEl.classList.add("has-value");
        } else {
            badgeTextEl.innerText = "_____";
            badgeEl.classList.remove("has-value");
        }
    }
}

/**
 * Steuert die Sichtbarkeit und den Status der mobilen Sticky/Fixed-Eingabeleiste.
 * @param {boolean} active - Ob Schritt 2 aktiv ist
 * @param {string} [hintText] - Anzeige des Infinitivs in der mobilen Leiste
 */
function setMobileInputBarState(active, hintText = "") {
    const mobileBar = document.getElementById("mobile-input-bar");
    const mobileInput = document.getElementById("mobile-gap-input");
    const btnMobileCheck = document.getElementById("btn-mobile-check");
    const mobileVerbHint = document.getElementById("mobile-verb-hint");

    if (!mobileBar) return;

    if (hintText && mobileVerbHint) {
        mobileVerbHint.innerText = hintText;
    }

    if (active) {
        mobileBar.classList.add("active");
        mobileBar.setAttribute("aria-hidden", "false");
        document.body.classList.add("mobile-bar-open");
        if (mobileInput) mobileInput.disabled = false;
        if (btnMobileCheck) btnMobileCheck.disabled = false;
    } else {
        mobileBar.classList.remove("active");
        mobileBar.setAttribute("aria-hidden", "true");
        document.body.classList.remove("mobile-bar-open");
        if (mobileInput) {
            mobileInput.disabled = true;
            mobileInput.blur();
        }
        if (btnMobileCheck) btnMobileCheck.disabled = true;
    }
}

/**
 * Fokussiert das passende Eingabefeld je nach Viewport (Mobile vs. Desktop).
 */
function focusActiveGapInput() {
    const desktopInput = document.getElementById("sentence-gap");
    const mobileInput = document.getElementById("mobile-gap-input");

    if (isMobileViewport() && mobileInput) {
        mobileInput.focus();
    } else if (desktopInput) {
        desktopInput.focus();
    }
}

/**
 * Setzt den globalen Satz-Pool zurück und mischt ihn per Fisher-Yates-Shuffle durch.
 */
export function resetMasterSentencePool() {
    masterSentencePool = [...sentenceBank];
    for (let i = masterSentencePool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [masterSentencePool[i], masterSentencePool[j]] = [masterSentencePool[j], masterSentencePool[i]];
    }
    totalRoundsPlayed = 0;
}

/**
 * Startet eine neue 10er-Runde aus dem Master-Pool.
 */
export function initTrainerRound() {
    if (!sentenceBank.length) return;

    if (masterSentencePool.length < 10) {
        resetMasterSentencePool();
    }

    currentRoundSentences = masterSentencePool.splice(0, 10);
    currentSentenceIndex = 0;
    sentenceScore = 0;
    totalRoundsPlayed++;

    loadSentence();
}

/**
 * Lädt den aktuellen Satz der Runde in die Oberfläche.
 */
export function loadSentence() {
    activeSentence = currentRoundSentences[currentSentenceIndex];
    if (!activeSentence) return;

    selectedWords = [];
    sentenceChecked = false;

    const progressEl = document.getElementById("sentence-progress");
    const progressBarEl = document.getElementById("sentence-progress-bar");
    const tenseBadgeEl = document.getElementById("current-tense-badge");

    if (progressEl) {
        progressEl.innerText = `Satz ${currentSentenceIndex + 1} von 10 (Runde ${totalRoundsPlayed})`;
    }
    if (progressBarEl) {
        progressBarEl.style.width = `${(currentSentenceIndex + 1) * 10}%`;
    }
    if (tenseBadgeEl) {
        tenseBadgeEl.innerText = activeSentence.tense;
    }

    const btnAction = document.getElementById("btn-action");
    const btnHint = document.getElementById("btn-hint");
    const drawer = document.getElementById("feedback-drawer");

    if (drawer) {
        drawer.style.display = "none";
        drawer.className = "feedback-drawer";
    }
    if (btnHint) {
        btnHint.disabled = false;
    }

    // Mobilen Input zurücksetzen
    const mobileInput = document.getElementById("mobile-gap-input");
    if (mobileInput) mobileInput.value = "";

    // Satz und Tokens rendern
    const verbHintLabel = renderSentenceWithTokens();

    // Intelligente Weiche: Wenn der Satz kein Signalwort hat, direkt Schritt 2 aktivieren
    if (!activeSentence.signalWords || activeSentence.signalWords.length === 0) {
        const gapContainer = document.getElementById("gap-container");
        const gapInput = document.getElementById("sentence-gap");

        if (gapContainer) {
            gapContainer.classList.add("unlocked");
            const lockOverlay = gapContainer.querySelector(".lock-overlay");
            if (lockOverlay) {
                lockOverlay.innerHTML = `<i class="fa-solid fa-lock-open text-purple"></i>`;
            }
        }
        if (gapInput) gapInput.disabled = false;

        const instructionBox = document.getElementById("instruction-box");
        const stepSignal = document.getElementById("step-signal");
        const stepGapEl = document.getElementById("step-gap");

        if (instructionBox) instructionBox.style.background = "rgba(139, 92, 246, 0.05)";
        if (stepSignal) stepSignal.classList.remove("active");
        if (stepGapEl) {
            stepGapEl.classList.add("active");
            stepGapEl.innerHTML = `<i class="fa-solid fa-keyboard instruction-icon text-purple"></i>
                <span><strong>Schritt 2:</strong> Setze das Verb in der richtigen Zeitform ein! (Kein Signalwort nötig)</span>`;
        }

        if (btnAction) {
            btnAction.disabled = false;
            btnAction.innerHTML = `<i class="fa-solid fa-square-check"></i> Antwort prüfen`;
            btnAction.className = "btn btn-accent";
        }

        setMobileInputBarState(true, verbHintLabel);
        focusActiveGapInput();
    } else {
        // Normaler zweistufiger Ablauf mit Signalwort-Suche
        const instructionBox = document.getElementById("instruction-box");
        const stepSignal = document.getElementById("step-signal");
        const stepGapEl = document.getElementById("step-gap");

        if (instructionBox) instructionBox.style.background = "rgba(255, 255, 255, 0.02)";
        if (stepSignal) stepSignal.classList.add("active");
        if (stepGapEl) {
            stepGapEl.classList.remove("active");
            stepGapEl.innerHTML = `<i class="fa-solid fa-keyboard instruction-icon text-purple"></i>
                <span><strong>Schritt 2:</strong> Hervorragend! Fülle nun die Lücke mit der korrekten Verbform aus.</span>`;
        }

        if (btnAction) {
            btnAction.disabled = true;
            btnAction.innerHTML = `<i class="fa-solid fa-lock"></i> Bitte Signalwort wählen`;
            btnAction.className = "btn btn-primary";
        }

        setMobileInputBarState(false, verbHintLabel);
        updateDynamicInstructionCount(activeSentence.signalWords.map((w) => normalizeWord(w)));
    }
}

/**
 * Rendert den aktuellen Satz mit anklickbaren Wort-Tokens, Desktop-Input und Mobile-Badge.
 * @returns {string} Formatierter Infinitiv-Hinweistext
 */
export function renderSentenceWithTokens() {
    const container = document.getElementById("sentence-area");
    if (!container || !activeSentence) return "";
    container.innerHTML = "";

    const parts = activeSentence.text.split("_____");

    let displayInfinitive = activeSentence.infinitive;
    let extraTokenWord = "";

    if (activeSentence.infinitive.includes("/")) {
        const infParts = activeSentence.infinitive.split("/");
        displayInfinitive = infParts[infParts.length - 1].trim();
        extraTokenWord = infParts[0].trim();
    }

    const verbHintLabel = extraTokenWord
        ? `to ${displayInfinitive} (+ ${extraTokenWord})`
        : `to ${displayInfinitive}`;

    // 1. Text VOR der Lücke rendern
    const wordsBefore = parts[0].trim().split(" ");
    wordsBefore.forEach((word) => {
        if (word.length > 0) container.appendChild(createTokenElement(word));
    });

    // 2. Das Lücken-Element (Desktop-Input + Mobile-Badge)
    const gapWrapper = document.createElement("div");
    gapWrapper.className = "gap-input-container";
    gapWrapper.id = "gap-container";

    const infTag = document.createElement("span");
    infTag.className = "verb-infinitive-tag";
    infTag.innerText = verbHintLabel;
    gapWrapper.appendChild(infTag);

    const lockOverlay = document.createElement("span");
    lockOverlay.className = "lock-overlay";
    lockOverlay.innerHTML = `<i class="fa-solid fa-lock"></i>`;
    gapWrapper.appendChild(lockOverlay);

    // Desktop Inline-Input
    const gapInput = document.createElement("input");
    gapInput.type = "text";
    gapInput.className = "gap-input";
    gapInput.id = "sentence-gap";
    gapInput.placeholder = "Verb eingeben...";
    gapInput.autocomplete = "off";
    gapInput.disabled = true;
    gapInput.addEventListener("input", () => {
        syncGapInputs(gapInput.value, "desktop");
    });
    gapWrapper.appendChild(gapInput);

    // Mobile Lücken-Badge (ruhige Darstellung im Lesebereich auf Smartphones)
    const gapBadge = document.createElement("span");
    gapBadge.className = "gap-badge-mobile";
    gapBadge.id = "sentence-gap-badge";
    gapBadge.setAttribute("role", "button");
    gapBadge.setAttribute("tabindex", "0");
    gapBadge.innerHTML = `<span class="gap-badge-text" id="sentence-gap-badge-text">_____</span>`;
    gapBadge.addEventListener("click", () => {
        if (!sentenceChecked && gapWrapper.classList.contains("unlocked")) {
            focusActiveGapInput();
        }
    });
    gapWrapper.appendChild(gapBadge);

    container.appendChild(gapWrapper);

    // 3. Text NACH der Lücke rendern
    if (parts[1]) {
        const wordsAfter = parts[1].trim().split(" ");
        wordsAfter.forEach((word) => {
            if (word.length > 0) container.appendChild(createTokenElement(word));
        });
    }

    return verbHintLabel;
}

/**
 * Erstellt ein einzelnes anklickbares Wort-Token.
 */
function createTokenElement(wordText) {
    const token = document.createElement("span");
    token.innerText = wordText;

    const norm = normalizeWord(wordText);

    if (norm === "") {
        token.className = "word-token punctuation";
    } else {
        token.className = "word-token";
        token.dataset.normalized = norm;
        token.addEventListener("click", () => selectWordToken(token));
    }

    return token;
}

/**
 * Normalisiert ein Wort für den Signalwort-Vergleich (Kleinbuchstaben, ohne Satzzeichen).
 */
export function normalizeWord(word) {
    return word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
}

/**
 * Verarbeitet das Anklicken eines Wort-Tokens in Schritt 1.
 */
export function selectWordToken(element) {
    if (sentenceChecked || !activeSentence) return;

    const norm = element.dataset.normalized;
    const correctSignals = activeSentence.signalWords.map((w) => normalizeWord(w));

    if (correctSignals.includes(norm)) {
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
            selectedWords = selectedWords.filter((w) => w !== norm);
        } else {
            element.classList.add("selected");
            selectedWords.push(norm);
        }
    } else {
        element.classList.add("incorrect-flash");
        updateGlobalStats(-1);
        showFloatingXpFeedback(element, -1);

        setTimeout(() => {
            element.classList.remove("incorrect-flash");
        }, 800);
    }

    updateDynamicInstructionCount(correctSignals);
    checkSignalWordsSelection();
}

/**
 * Aktualisiert den Hinweistext mit der Anzahl der noch zu findenden Signalwörter.
 */
function updateDynamicInstructionCount(correctSignals) {
    const remaining = correctSignals.filter((w) => !selectedWords.includes(w)).length;
    const stepSignalEl = document.getElementById("step-signal");
    if (stepSignalEl) {
        if (remaining === 1) {
            stepSignalEl.innerHTML = `<i class="fa-solid fa-magnifying-glass instruction-icon text-cyan"></i>
                <span><strong>Schritt 1:</strong> Finde und markiere das <strong>Signalwort</strong> im Satz! (1 Wort verbleibend)</span>`;
        } else {
            stepSignalEl.innerHTML = `<i class="fa-solid fa-magnifying-glass instruction-icon text-cyan"></i>
                <span><strong>Schritt 1:</strong> Finde und markiere die <strong>Signalwörter</strong> im Satz! (${remaining} Wörter verbleibend)</span>`;
        }
    }
}

/**
 * Zeigt ein aufsteigendes XP-Feedback über dem angeklickten Element.
 */
function showFloatingXpFeedback(element, amount) {
    const rect = element.getBoundingClientRect();
    const floating = document.createElement("span");
    floating.className = "floating-xp-text";
    floating.innerText = `${amount} XP`;

    floating.style.position = "fixed";
    floating.style.left = `${rect.left + rect.width / 2}px`;
    floating.style.top = `${rect.top}px`;
    floating.style.transform = "translate(-50%, -100%)";
    floating.style.zIndex = "9999";
    floating.style.fontWeight = "800";
    floating.style.color = "var(--rose)";
    floating.style.animation = "floatUpFade 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards";

    document.body.appendChild(floating);
    setTimeout(() => floating.remove(), 1200);
}

/**
 * Prüft, ob alle erforderlichen Signalwörter markiert wurden, und schaltet Schritt 2 frei.
 */
export function checkSignalWordsSelection() {
    if (!activeSentence) return;

    const correctSignals = activeSentence.signalWords.map((w) => normalizeWord(w));

    const allCorrectSelected = correctSignals.every((w) => selectedWords.includes(w));
    const noWrongSelected = selectedWords.every((w) => correctSignals.includes(w));

    const gapContainer = document.getElementById("gap-container");
    const gapInput = document.getElementById("sentence-gap");
    const btnAction = document.getElementById("btn-action");
    const infTag = gapContainer ? gapContainer.querySelector(".verb-infinitive-tag") : null;
    const verbHintLabel = infTag ? infTag.innerText : "";

    if (allCorrectSelected && noWrongSelected) {
        if (gapContainer) {
            gapContainer.classList.add("unlocked");
            const lockOverlay = gapContainer.querySelector(".lock-overlay");
            if (lockOverlay) {
                lockOverlay.innerHTML = `<i class="fa-solid fa-lock-open text-purple"></i>`;
            }
        }
        if (gapInput) gapInput.disabled = false;

        const instructionBox = document.getElementById("instruction-box");
        const stepSignal = document.getElementById("step-signal");
        const stepGap = document.getElementById("step-gap");

        if (instructionBox) instructionBox.style.background = "rgba(139, 92, 246, 0.05)";
        if (stepSignal) stepSignal.classList.remove("active");
        if (stepGap) stepGap.classList.add("active");

        if (btnAction) {
            btnAction.disabled = false;
            btnAction.innerHTML = `<i class="fa-solid fa-square-check"></i> Antwort prüfen`;
            btnAction.className = "btn btn-accent";
        }

        setMobileInputBarState(true, verbHintLabel);
        focusActiveGapInput();
    } else {
        if (gapContainer) {
            gapContainer.classList.remove("unlocked");
            const lockOverlay = gapContainer.querySelector(".lock-overlay");
            if (lockOverlay) {
                lockOverlay.innerHTML = `<i class="fa-solid fa-lock"></i>`;
            }
        }
        if (gapInput) gapInput.disabled = true;

        const instructionBox = document.getElementById("instruction-box");
        const stepSignal = document.getElementById("step-signal");
        const stepGap = document.getElementById("step-gap");

        if (instructionBox) instructionBox.style.background = "rgba(255, 255, 255, 0.02)";
        if (stepSignal) stepSignal.classList.add("active");
        if (stepGap) stepGap.classList.remove("active");

        if (btnAction) {
            btnAction.disabled = true;
            btnAction.innerHTML = `<i class="fa-solid fa-lock"></i> Bitte Signalwort wählen`;
            btnAction.className = "btn btn-primary";
        }

        setMobileInputBarState(false, verbHintLabel);
    }
}

/**
 * Steuert den Haupt-Aktionsbutton (Prüfen -> Weiter).
 */
export function handleSentenceAction() {
    if (!activeSentence) return;

    if (!sentenceChecked) {
        checkGapAnswer();
    } else {
        nextSentence();
    }
}

/**
 * Wertet die eingegebene Verbform in der Lücke aus.
 */
export function checkGapAnswer() {
    const gapInput = document.getElementById("sentence-gap");
    const mobileInput = document.getElementById("mobile-gap-input");
    const gapBadge = document.getElementById("sentence-gap-badge");
    const gapBadgeText = document.getElementById("sentence-gap-badge-text");

    if (!gapInput || !activeSentence) return;

    // Falls der Nutzer im mobilen Input getippt hat, sicherstellen, dass beide synchron sind
    const rawVal = (mobileInput && mobileInput.value.trim().length > 0)
        ? mobileInput.value
        : gapInput.value;

    const userVal = rawVal.trim().toLowerCase();
    const correctVariants = activeSentence.correctAnswers.map((v) => v.trim().toLowerCase());

    const isCorrect = correctVariants.includes(userVal);
    sentenceChecked = true;

    gapInput.value = rawVal.trim();
    gapInput.disabled = true;

    if (gapBadgeText) {
        gapBadgeText.innerText = rawVal.trim() || "—";
    }

    // Mobile Eingabeleiste nach dem Prüfen schließen, damit Feedback & Satz frei sichtbar sind
    setMobileInputBarState(false);

    document.querySelectorAll(".word-token").forEach((t) => {
        t.style.pointerEvents = "none";
    });

    const drawer = document.getElementById("feedback-drawer");
    const statusText = document.getElementById("feedback-status");
    const correctAlert = document.getElementById("feedback-correct-answer");
    const explanation = document.getElementById("feedback-explanation");
    const tenseTag = document.getElementById("feedback-tense");

    if (tenseTag) tenseTag.innerText = activeSentence.tense;

    if (isCorrect) {
        gapInput.classList.add("correct");
        if (gapBadge) gapBadge.classList.add("correct");

        if (drawer) {
            drawer.style.display = "block";
            drawer.classList.add("correct-box");
        }
        if (statusText) {
            statusText.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <span>Richtig! Großartig.</span>`;
        }
        if (correctAlert) correctAlert.innerText = activeSentence.correctAnswers[0];
        if (explanation) explanation.innerHTML = formatMarkdown(activeSentence.explanation);

        sentenceScore++;
        updateGlobalStats(10);
    } else {
        gapInput.classList.add("incorrect");
        if (gapBadge) gapBadge.classList.add("incorrect");

        if (drawer) {
            drawer.style.display = "block";
            drawer.classList.add("incorrect-box");
        }
        if (statusText) {
            statusText.innerHTML = `<i class="fa-solid fa-circle-xmark text-rose"></i> <span>Leider nicht ganz richtig!</span>`;
        }
        if (correctAlert) correctAlert.innerText = activeSentence.correctAnswers[0];
        if (explanation) explanation.innerHTML = formatMarkdown(activeSentence.explanation);

        updateGlobalStats(0, true);
    }

    const btnAction = document.getElementById("btn-action");
    if (btnAction) {
        btnAction.disabled = false;
        btnAction.innerHTML = `Weiter <i class="fa-solid fa-arrow-right"></i>`;
        btnAction.className = "btn btn-primary";
    }
}

/**
 * Hebt ein noch nicht gefundenes Signalwort kurzzeitig visuell hervor.
 */
export function showSentenceHint() {
    if (sentenceChecked || !activeSentence || !activeSentence.signalWords) return;

    const unselectedSignal =
        activeSentence.signalWords.find((w) => !selectedWords.includes(normalizeWord(w))) ||
        activeSentence.signalWords[0];

    if (!unselectedSignal) return;

    const targetNorm = normalizeWord(unselectedSignal);
    const tokens = document.querySelectorAll(".word-token");
    tokens.forEach((token) => {
        if (token.dataset.normalized === targetNorm) {
            token.style.transform = "scale(1.2)";
            token.style.borderColor = "var(--yellow)";
            token.style.boxShadow = "0 0 10px rgba(234, 179, 8, 0.4)";

            setTimeout(() => {
                token.style.transform = "";
                token.style.borderColor = "";
                token.style.boxShadow = "";
            }, 1500);
        }
    });

    updateGlobalStats(0);
}

/**
 * Schaltet zum nächsten Satz weiter oder zeigt die Rundenergebnisse nach 10 Sätzen.
 */
export function nextSentence() {
    currentSentenceIndex++;
    if (currentSentenceIndex < currentRoundSentences.length) {
        loadSentence();
    } else {
        showRoundResults();
    }
}

/**
 * Zeigt die Zusammenfassung am Ende einer 10er-Runde und ermöglicht den direkten Neustart.
 */
export function showRoundResults() {
    activeSentence = null;
    setMobileInputBarState(false);

    const drawer = document.getElementById("feedback-drawer");
    if (drawer) {
        drawer.style.display = "none";
        drawer.className = "feedback-drawer";
    }

    const container = document.getElementById("sentence-area");
    if (!container) return;

    const dynamicButtonText =
        masterSentencePool.length >= 10
            ? `<i class="fa-solid fa-arrow-right-long"></i> Nächste Runde (noch ${masterSentencePool.length} Sätze)`
            : `<i class="fa-solid fa-arrows-rotate"></i> Alle Sätze geschafft! Neu starten`;

    container.innerHTML = `
        <div class="round-summary" style="text-align: center; padding: 20px; animation: popIn 0.5s ease;">
            <i class="fa-solid fa-trophy text-yellow" style="font-size: 3em; margin-bottom: 15px;"></i>
            <h3>Runde ${totalRoundsPlayed} beendet!</h3>
            <p style="font-size: 1.2em; margin: 10px 0;">Du hast <strong>${sentenceScore} von 10 Sätzen</strong> richtig gelöst.</p>
            <p style="color: var(--text-muted); font-size: 0.9em;">Insgesamt sind noch ${masterSentencePool.length} ungespielte Sätze im Pool.</p>
            <button type="button" class="btn btn-accent" id="btn-next-round" style="margin-top: 20px;">
                ${dynamicButtonText}
            </button>
        </div>
    `;

    const btnNextRound = document.getElementById("btn-next-round");
    if (btnNextRound) {
        btnNextRound.addEventListener("click", () => {
            initTrainerRound();
        });
    }

    const btnAction = document.getElementById("btn-action");
    if (btnAction) {
        btnAction.disabled = true;
        btnAction.innerHTML = `<i class="fa-solid fa-circle-check"></i> Runde abgeschlossen`;
        btnAction.className = "btn btn-secondary";
    }

    const btnHint = document.getElementById("btn-hint");
    if (btnHint) {
        btnHint.disabled = true;
    }
}
