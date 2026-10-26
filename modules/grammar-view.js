/* ==========================================================================
   GrammarHero 10 - Grammar Library & Timeline Navigation Module
   ========================================================================== */

let grammarLibrary = {};
let switchTabCallback = null;

/**
 * Formatiert einfaches Markdown (**fett**, *kursiv*) in HTML.
 */
export function formatMarkdown(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

/**
 * Initialisiert die Grammatik-Bibliothek und Zeitstrahl-Navigation.
 * @param {Object} grammarData - Grammatik-Regeln aus /data/grammar-rules.json
 * @param {Function} onSwitchTab - Callback zum Tab-Wechsel
 */
export function initGrammarView(grammarData, onSwitchTab) {
    grammarLibrary = grammarData || {};
    switchTabCallback = onSwitchTab;

    renderGrammarCards();

    // Event-Listener für Zeitstrahl-Knoten binden
    document.querySelectorAll(".timeline-node").forEach((node) => {
        const tenseId = node.dataset.tense;
        if (tenseId) {
            node.addEventListener("click", () => scrollToTense(tenseId));
        }
    });
}

/**
 * Rendert alle Grammatik-Karten dynamisch in den Container.
 */
export function renderGrammarCards() {
    const container = document.getElementById("grammar-cards-container");
    if (!container) return;
    container.innerHTML = "";

    for (const key in grammarLibrary) {
        const tense = grammarLibrary[key];

        const card = document.createElement("div");
        card.className = "card glass-card grammar-card";
        card.id = `grammar-${key}`;

        const chipsHtml = tense.signals
            .map((s) => `<span class="signal-chip">${s}</span>`)
            .join("");

        const examplesHtml = tense.examples
            .map(
                (ex) => `
            <li>
                <strong>${ex.en}</strong>
                <span class="example-translation">${ex.de}</span>
            </li>
        `
            )
            .join("");

        card.innerHTML = `
            <div class="grammar-card-header">
                <h3>${tense.title}</h3>
                <span class="subtitle-tag">${tense.title}</span>
            </div>
            
            <div class="grammar-formula">
                <strong>Bildung:</strong> ${tense.formula}
            </div>

            <div class="grammar-section">
                <h4><i class="fa-solid fa-circle-info"></i> Verwendung</h4>
                <p>${formatMarkdown(tense.use)}</p>
            </div>

            <div class="grammar-section">
                <h4><i class="fa-solid fa-key"></i> Signalwörter</h4>
                <div class="signal-word-chips">
                    ${chipsHtml}
                </div>
            </div>

            <div class="grammar-section">
                <h4><i class="fa-solid fa-quote-left"></i> Beispielsätze</h4>
                <ul class="example-list">
                    ${examplesHtml}
                </ul>
            </div>
        `;

        container.appendChild(card);
    }
}

/**
 * Wechselt bei Bedarf in den Grammatik-Tab und scrollt sanft zur gewählten Zeitform.
 * @param {string} tenseId - Schlüssel der Zeitform (z. B. 'past-perfect')
 */
export function scrollToTense(tenseId) {
    if (typeof switchTabCallback === "function") {
        switchTabCallback("grammar");
    }

    document.querySelectorAll(".timeline-node").forEach((node) => {
        node.classList.remove("active");
        const nodeTense = node.dataset.tense || node.getAttribute("onclick") || "";
        if (nodeTense.includes(tenseId)) {
            node.classList.add("active");
        }
    });

    const element = document.getElementById(`grammar-${tenseId}`);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }
}
