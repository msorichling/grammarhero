/* ==========================================================================
   GrammarHero 10 - Storage Module (LocalStorage & Stats)
   ========================================================================== */

let globalPoints = 0;
let globalStreak = 0;
let verbsStreak = 0;

/**
 * Lädt gespeicherte Statistiken aus dem LocalStorage und aktualisiert das DOM.
 */
export function loadStats() {
    globalPoints = parseInt(localStorage.getItem("gh_points"), 10) || 0;
    globalStreak = parseInt(localStorage.getItem("gh_streak"), 10) || 0;
    verbsStreak = parseInt(localStorage.getItem("gh_verbs_streak"), 10) || 0;

    const pointsEl = document.getElementById("global-points");
    const streakEl = document.getElementById("global-streak");
    const verbsStreakEl = document.getElementById("verbs-streak");

    if (pointsEl) pointsEl.innerText = globalPoints;
    if (streakEl) streakEl.innerText = globalStreak;
    if (verbsStreakEl) verbsStreakEl.innerText = verbsStreak;

    return { globalPoints, globalStreak, verbsStreak };
}

/**
 * Aktualisiert die globalen Punkte und den Streak im State, DOM und LocalStorage.
 * @param {number} pointsDiff - Punktedifferenz (positiv oder negativ)
 * @param {boolean} resetStreak - Ob der globale Streak auf 0 gesetzt werden soll
 */
export function updateGlobalStats(pointsDiff, resetStreak = false) {
    globalPoints += pointsDiff;
    if (globalPoints < 0) globalPoints = 0;

    if (resetStreak) {
        globalStreak = 0;
    } else if (pointsDiff > 0) {
        globalStreak++;
    }

    const pointsEl = document.getElementById("global-points");
    const streakEl = document.getElementById("global-streak");

    if (pointsEl) pointsEl.innerText = globalPoints;
    if (streakEl) streakEl.innerText = globalStreak;

    localStorage.setItem("gh_points", globalPoints);
    localStorage.setItem("gh_streak", globalStreak);
}

/**
 * Aktualisiert den Streak für das Unregelmäßige-Verben-Widget.
 * @param {boolean} isCorrect - true erhöht den Streak, false setzt ihn auf 0 zurück
 */
export function updateVerbsStreak(isCorrect) {
    if (isCorrect) {
        verbsStreak++;
    } else {
        verbsStreak = 0;
    }

    const verbsStreakEl = document.getElementById("verbs-streak");
    if (verbsStreakEl) verbsStreakEl.innerText = verbsStreak;

    localStorage.setItem("gh_verbs_streak", verbsStreak);
    return verbsStreak;
}

export function getStats() {
    return { globalPoints, globalStreak, verbsStreak };
}
