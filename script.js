/* ==========================================================================
   GrammarHero 10 - Komplette Logik (Reparierte Version)
   ========================================================================== */

// ... [Hier oben lässt du deine verbData, sentenceBank und grammarLibrary wie gehabt stehen] ...

let masterSentencePool = [];   
let currentRoundSentences = []; 
let currentSentenceIndex = 0;
let sentenceScore = 0;
let totalRoundsPlayed = 0;     

let globalPoints = 0;
let globalStreak = 0;
let selectedWords = []; 
let activeSentence = null;
let sentenceChecked = false;
let verbsStreak = 0;
let widgetChecked = false;

window.addEventListener("DOMContentLoaded", () => {
    loadStats();
    resetMasterSentencePool();
    initTrainerRound();
    initWidgetVerb();
    renderGrammarCards();
});

function resetMasterSentencePool() {
    masterSentencePool = [...sentenceBank].sort(() => Math.random() - 0.5);
    totalRoundsPlayed = 0;
}

function initTrainerRound() {
    if (masterSentencePool.length === 0) resetMasterSentencePool();
    currentRoundSentences = masterSentencePool.splice(0, 10);
    currentSentenceIndex = 0;
    sentenceScore = 0;
    totalRoundsPlayed++;
    loadSentence();
}

function loadSentence() {
    activeSentence = currentRoundSentences[currentSentenceIndex];
    selectedWords = [];
    sentenceChecked = false;

    document.getElementById("sentence-progress").innerText = `Satz ${currentSentenceIndex + 1} von 10`;
    document.getElementById("current-tense-badge").innerText = activeSentence.tense;
    document.getElementById("feedback-drawer").style.display = "none";
    
    renderSentenceWithTokens();
    updateDynamicInstructionCount(activeSentence.signalWords.map(w => normalizeWord(w)));
}

function renderSentenceWithTokens() {
    const container = document.getElementById("sentence-area");
    container.innerHTML = "";

    const parts = activeSentence.text.split("_____");
    const infParts = activeSentence.infinitive.split("/");
    const displayInfinitive = infParts[infParts.length - 1].trim();
    const extraTokenWord = infParts.length > 1 ? infParts[0].trim() : "";

    parts[0].trim().split(" ").forEach(w => { if(w) container.appendChild(createTokenElement(w)); });
    if (extraTokenWord && extraTokenWord !== "not") container.appendChild(createTokenElement(extraTokenWord));

    const gapWrapper = document.createElement("div");
    gapWrapper.className = "gap-input-container";
    gapWrapper.id = "gap-container";
    gapWrapper.innerHTML = `
        <span class="verb-infinitive-tag">to ${displayInfinitive}</span>
        <span class="lock-overlay"><i class="fa-solid fa-lock"></i></span>
        <input type="text" class="gap-input" id="sentence-gap" placeholder="Verb..." disabled>
    `;
    container.appendChild(gapWrapper);

    parts[1].trim().split(" ").forEach(w => { if(w) container.appendChild(createTokenElement(w)); });
}

function createTokenElement(wordText) {
    const token = document.createElement("span");
    token.innerText = wordText;
    const norm = normalizeWord(wordText);
    token.className = (norm === "") ? "word-token punctuation" : "word-token";
    token.dataset.normalized = norm;
    if (norm !== "") {
        token.onclick = function() { selectWordToken(this); };
    }
    return token;
}

function normalizeWord(word) {
    return word.toLowerCase().replace(/["'.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
}

function selectWordToken(element) {
    if (sentenceChecked) return;
    const norm = element.dataset.normalized;
    const correctSignals = activeSentence.signalWords.map(w => normalizeWord(w));

    if (correctSignals.includes(norm)) {
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
            selectedWords = selectedWords.filter(w => w !== norm);
        } else {
            element.classList.add("selected");
            selectedWords.push(norm);
        }
    } else {
        element.classList.add("incorrect-flash");
        setTimeout(() => element.classList.remove("incorrect-flash"), 800);
    }
    updateDynamicInstructionCount(correctSignals);
    checkSignalWordsSelection();
}

function updateDynamicInstructionCount(correctSignals) {
    const remaining = correctSignals.filter(w => !selectedWords.includes(w)).length;
    const el = document.getElementById("step-signal");
    if (el) {
        el.innerHTML = `<i class="fa-solid fa-magnifying-glass instruction-icon text-cyan"></i>
            <span><strong>Schritt 1:</strong> Finde die <strong>Signalwörter</strong>! (${remaining} verbleibend)</span>`;
    }
}

function checkSignalWordsSelection() {
    const correctSignals = activeSentence.signalWords.map(w => normalizeWord(w));
    const allCorrectSelected = correctSignals.every(w => selectedWords.includes(w));
    const noWrongSelected = selectedWords.every(w => correctSignals.includes(w));

    const gapContainer = document.getElementById("gap-container");
    const gapInput = document.getElementById("sentence-gap");
    const btnAction = document.getElementById("btn-action");

    if (allCorrectSelected && noWrongSelected) {
        gapContainer.classList.add("unlocked");
        gapInput.disabled = false;
        btnAction.disabled = false;
        btnAction.innerHTML = `<i class="fa-solid fa-square-check"></i> Antwort prüfen`;
        btnAction.className = "btn btn-accent";
    }
}

function handleSentenceAction() {
    if (!sentenceChecked) {
        const gapInput = document.getElementById("sentence-gap");
        const isCorrect = activeSentence.correctAnswers.map(v => v.toLowerCase()).includes(gapInput.value.trim().toLowerCase());
        sentenceChecked = true;
        gapInput.disabled = true;
        
        const drawer = document.getElementById("feedback-drawer");
        drawer.style.display = "block";
        drawer.className = isCorrect ? "feedback-drawer correct-box" : "feedback-drawer incorrect-box";
        document.getElementById("feedback-status").innerHTML = isCorrect ? "Richtig!" : "Leider falsch!";
        document.getElementById("feedback-correct-answer").innerText = activeSentence.correctAnswers[0];
        document.getElementById("feedback-explanation").innerHTML = formatMarkdown(activeSentence.explanation);
        
        if (isCorrect) { sentenceScore++; updateGlobalStats(10); }
        document.getElementById("btn-action").innerHTML = `Weiter <i class="fa-solid fa-arrow-right"></i>`;
    } else {
        currentSentenceIndex++;
        if (currentSentenceIndex < 10) loadSentence(); else showRoundResults();
    }
}

// ... [Hier fügst du einfach deine restlichen Funktionen für updateGlobalStats, loadStats, initWidgetVerb, checkWidgetVerbs, renderGrammarCards und formatMarkdown ein] ...
