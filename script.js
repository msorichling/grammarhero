/* ==========================================================================
   GrammarHero 10 - Application Logic & Database
   ========================================================================== */

const verbData = [
    { de: "sein", inf: "be", sp: "was/were", pp: "been" },
    { de: "ertragen, aushalten", inf: "bear", sp: "bore", pp: "borne" },
    { de: "schlagen, besiegen", inf: "beat", sp: "beat", pp: "beaten" },
    { de: "werden", inf: "become", sp: "became", pp: "become" },
    { de: "anfangen, beginnen", inf: "begin", sp: "began", pp: "begun" },
    { de: "beugen; bücken", inf: "bend", sp: "bent", pp: "bent" },
    { de: "wetten", inf: "bet", sp: "bet", pp: "bet" },
    { de: "beißen; stechen", inf: "bite", sp: "bit", pp: "bitten" },
    { de: "bluten", inf: "bleed", sp: "bled", pp: "bled" },
    { de: "pusten, blasen; wehen", inf: "blow", sp: "blew", pp: "blown" },
    { de: "brechen", inf: "break", sp: "broke", pp: "broken" },
    { de: "brüten; züchten", inf: "breed", sp: "bred", pp: "bred" },
    { de: "bringen", inf: "bring", sp: "brought", pp: "brought" },
    { de: "bauen", inf: "build", sp: "built", pp: "built" },
    { de: "brennen, verbrennen", inf: "burn", sp: "burnt", pp: "burnt" },
    { de: "bersten, platzen", inf: "burst", sp: "burst", pp: "burst" },
    { de: "kaufen", inf: "buy", sp: "bought", pp: "bought" },
    { de: "fangen; erwischen", inf: "catch", sp: "caught", pp: "caught" },
    { de: "wählen, auswählen", inf: "choose", sp: "chose", pp: "chosen" },
    { de: "kommen", inf: "come", sp: "came", pp: "come" },
    { de: "kosten", inf: "cost", sp: "cost", pp: "cost" },
    { de: "schneiden; mähen", inf: "cut", sp: "cut", pp: "cut" },
    { de: "sich kümmern um", inf: "deal", sp: "dealt", pp: "dealt" },
    { de: "tun, machen", inf: "do", sp: "did", pp: "done" },
    { de: "graben", inf: "dig", sp: "dug", pp: "dug" },
    { de: "zeichnen", inf: "draw", sp: "drew", pp: "drawn" },
    { de: "trinken", inf: "drink", sp: "drank", pp: "drunk" },
    { de: "fahren (Auto)", inf: "drive", sp: "drove", pp: "driven" },
    { de: "essen", inf: "eat", sp: "ate", pp: "eaten" },
    { de: "fallen", inf: "fall", sp: "fell", pp: "fallen" },
    { de: "füttern", inf: "feed", sp: "fed", pp: "fed" },
    { de: "fühlen", inf: "feel", sp: "felt", pp: "felt" },
    { de: "kämpfen, bekämpfen", inf: "fight", sp: "fought", pp: "fought" },
    { de: "finden", inf: "find", sp: "found", pp: "found" },
    { de: "fliegen", inf: "fly", sp: "flew", pp: "flown" },
    { de: "vergessen", inf: "forget", sp: "forgot", pp: "forgotten" },
    { de: "gefrieren; erstarren", inf: "freeze", sp: "froze", pp: "frozen" },
    { de: "bekommen; holen", inf: "get", sp: "got", pp: "got" },
    { de: "geben", inf: "give", sp: "gave", pp: "given" },
    { de: "gehen, fahren", inf: "go", sp: "went", pp: "gone" },
    { de: "anbauen; wachsen", inf: "grow", sp: "grew", pp: "grown" },
    { de: "hängen", inf: "hang", sp: "hung", pp: "hung" },
    { de: "haben", inf: "have", sp: "had", pp: "had" },
    { de: "hören", inf: "hear", sp: "heard", pp: "heard" },
    { de: "verstecken", inf: "hide", sp: "hid", pp: "hidden" },
    { de: "treffen, schlagen", inf: "hit", sp: "hit", pp: "hit" },
    { de: "halten", inf: "hold", sp: "held", pp: "held" },
    { de: "verletzen; wehtun", inf: "hurt", sp: "hurt", pp: "hurt" },
    { de: "behalten", inf: "keep", sp: "kept", pp: "kept" },
    { de: "knien", inf: "kneel", sp: "knelt", pp: "knelt" },
    { de: "wissen; kennen", inf: "know", sp: "knew", pp: "known" },
    { de: "führen, leiten", inf: "lead", sp: "led", pp: "led" },
    { de: "lassen, verlassen", inf: "leave", sp: "left", pp: "left" },
    { de: "leihen", inf: "lend", sp: "lent", pp: "lent" },
    { de: "lassen", inf: "let", sp: "let", pp: "let" },
    { de: "anzünden", inf: "light", sp: "lit", pp: "lit" },
    { de: "verlieren", inf: "lose", sp: "lost", pp: "lost" },
    { de: "machen, herstellen", inf: "make", sp: "made", pp: "made" },
    { de: "bedeuten", inf: "mean", sp: "meant", pp: "meant" },
    { de: "treffen", inf: "meet", sp: "met", pp: "met" },
    { de: "bezahlen", inf: "pay", sp: "paid", pp: "paid" },
    { de: "legen, stellen", inf: "put", sp: "put", pp: "put" },
    { de: "aufhören; kündigen", inf: "quit", sp: "quit", pp: "quit" },
    { de: "lesen", inf: "read", sp: "read", pp: "read" },
    { de: "zurücksetzen", inf: "reset", sp: "reset", pp: "reset" },
    { de: "neu schreiben", inf: "rewrite", sp: "rewrote", pp: "rewritten" },
    { de: "reiten; (Rad) fahren", inf: "ride", sp: "rode", pp: "ridden" },
    { de: "läuten, klingeln", inf: "ring", sp: "rang", pp: "rung" },
    { de: "ansteigen; erheben", inf: "rise", sp: "rose", pp: "risen" },
    { de: "rennen, laufen", inf: "run", sp: "ran", pp: "run" },
    { de: "sagen", inf: "say", sp: "said", pp: "said" },
    { de: "sehen", inf: "see", sp: "saw", pp: "seen" },
    { de: "suchen", inf: "seek", sp: "sought", pp: "sought" },
    { de: "verkaufen", inf: "sell", sp: "sold", pp: "sold" },
    { de: "senden, schicken", inf: "send", sp: "sent", pp: "sent" },
    { de: "stellen, legen", inf: "set", sp: "set", pp: "set" },
    { de: "nähen", inf: "sew", sp: "sewed", pp: "sewn" },
    { de: "schütteln", inf: "shake", sp: "shook", pp: "shaken" },
    { de: "schießen", inf: "shoot", sp: "shot", pp: "shot" },
    { de: "zeigen", inf: "show", sp: "showed", pp: "shown" },
    { de: "schließen", inf: "shut", sp: "shut", pp: "shut" },
    { de: "singen", inf: "sing", sp: "sang", pp: "sung" },
    { de: "sinken", inf: "sink", sp: "sank", pp: "sunk" },
    { de: "sitzen", inf: "sit", sp: "sat", pp: "sat" },
    { de: "schlafen", inf: "sleep", sp: "slept", pp: "slept" },
    { de: "schieben, gleiten", inf: "slide", sp: "slid", pp: "slid" },
    { de: "sprechen", inf: "speak", sp: "spoke", pp: "spoken" },
    { de: "rasen, zu schnell fahren", inf: "speed", sp: "sped", pp: "sped" },
    { de: "ausgeben; verbringen", inf: "spend", sp: "spent", pp: "spent" },
    { de: "drehen", inf: "spin", sp: "spun", pp: "spun" },
    { de: "verbreiten", inf: "spread", sp: "spread", pp: "spread" },
    { de: "stehen", inf: "stand", sp: "stood", pp: "stood" },
    { de: "stehlen", inf: "steal", sp: "stole", pp: "stolen" },
    { de: "kleben; bleiben", inf: "stick", sp: "stuck", pp: "stuck" },
    { de: "stechen (Insekt)", inf: "sting", sp: "stung", pp: "stung" },
    { de: "fegen, kehren", inf: "sweep", sp: "swept", pp: "swept" },
    { de: "schwimmen", inf: "swim", sp: "swam", pp: "swum" },
    { de: "schwingen", inf: "swing", sp: "swung", pp: "swung" },
    { de: "nehmen; bringen", inf: "take", sp: "took", pp: "taken" },
    { de: "unterrichten", inf: "teach", sp: "taught", pp: "taught" },
    { de: "sagen; erzählen", inf: "tell", sp: "told", pp: "told" },
    { de: "denken, glauben", inf: "think", sp: "thought", pp: "thought" },
    { de: "werfen", inf: "throw", sp: "threw", pp: "thrown" },
    { de: "verstehen", inf: "understand", sp: "understood", pp: "understood" },
    { de: "aufwachen", inf: "wake up", sp: "woke up", pp: "woken up" },
    { de: "tragen (Kleidung)", inf: "wear", sp: "wore", pp: "worn" },
    { de: "gewinnen", inf: "win", sp: "won", pp: "won" },
    { de: "schreiben", inf: "write", sp: "wrote", pp: "written" }
];

const sentenceBank = [
    { text: "She always _____ tennis on Saturdays.", infinitive: "play", correctAnswers: ["plays"], signalWords: ["always", "on", "Saturdays"], tense: "Simple Present", explanation: "Das Signalwort 'always' (immer) sowie 'on Saturdays' beschreiben eine Gewohnheit. Deshalb verwenden wir das **Simple Present**. Da das Subjekt 'She' (3. Person Singular) ist, gilt: 'He, she, it - das -s muss mit!' -> **plays**." },
    { text: "I _____ a great film yesterday.", infinitive: "see", correctAnswers: ["saw"], signalWords: ["yesterday"], tense: "Simple Past", explanation: "'yesterday' (gestern) zeigt einen abgeschlossenen Zeitpunkt in der Vergangenheit an -> **Simple Past**. Das unregelmäßige Verb 'see' wird in der 2. Spalte zu **saw**." }
    // ... (restliche Sätze)
];

const grammarLibrary = {
    "simple-present": { title: "Simple Present", formula: "Infinitive / Verb + -s", use: "Gewohnheiten", signals: ["always", "usually"], examples: [] }
    // ... (restliche Library)
};

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

    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const btnAction = document.getElementById("btn-action");
            if (!btnAction.disabled) handleSentenceAction();
        }
    });
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
    // HIER IST DIE KLICK-FUNKTION WIEDER DIREKT ZUGEWIESEN:
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
        updateGlobalStats(-1);
        setTimeout(() => element.classList.remove("incorrect-flash"), 800);
    }
    checkSignalWordsSelection();
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
        gapInput.focus();
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

function updateGlobalStats(pointsDiff, resetStreak = false) {
    globalPoints = Math.max(0, globalPoints + pointsDiff);
    globalStreak = resetStreak ? 0 : (pointsDiff > 0 ? globalStreak + 1 : globalStreak);
    document.getElementById("global-points").innerText = globalPoints;
    document.getElementById("global-streak").innerText = globalStreak;
    localStorage.setItem("gh_points", globalPoints);
    localStorage.setItem("gh_streak", globalStreak);
}

function loadStats() {
    globalPoints = parseInt(localStorage.getItem("gh_points")) || 0;
    globalStreak = parseInt(localStorage.getItem("gh_streak")) || 0;
    document.getElementById("global-points").innerText = globalPoints;
    document.getElementById("global-streak").innerText = globalStreak;
}

function formatMarkdown(text) { return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>"); }
