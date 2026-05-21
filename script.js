/* ==========================================================================
   GrammarHero 10 - Application Logic & Database
   ========================================================================== */

// ==========================================================================
// 1. DATENBANK FÜR UNREGELMÄSSIGE VERBEN (108 Verben aus Klasse 10)
// ==========================================================================
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

// ==========================================================================
// 2. SATZ-DATENBANK (80 Sätze, perfekt balanciert über die 8 Zeiten)
// ==========================================================================
const sentenceBank = [
    // --- SIMPLE PRESENT (10 Sätze) ---
    {
        text: "She always _____ tennis on Saturdays.",
        infinitive: "play",
        correctAnswers: ["plays"],
        signalWords: ["always", "on", "Saturdays"],
        tense: "Simple Present",
        explanation: "Das Signalwort 'always' (immer) sowie 'on Saturdays' beschreiben eine Gewohnheit. Deshalb verwenden wir das **Simple Present**. Da das Subjekt 'She' (3. Person Singular) ist, gilt: 'He, she, it - das -s muss mit!' -> **plays**."
    },
    {
        text: "We often _____ our grandparents in Munich.",
        infinitive: "visit",
        correctAnswers: ["visit"],
        signalWords: ["often"],
        tense: "Simple Present",
        explanation: "Das Signalwort 'often' (oft) fordert das **Simple Present** für regelmäßige Handlungen. Bei dem Pronomen 'We' bleibt das Verb in der Grundform -> **visit**."
    },
    {
        text: "The train usually _____ at 8:00 AM.",
        infinitive: "leave",
        correctAnswers: ["leaves"],
        signalWords: ["usually"],
        tense: "Simple Present",
        explanation: "Fahrpläne und regelmäßige Abläufe ('usually') stehen im **Simple Present**. Das Subjekt 'The train' (it) erfordert das S-Suffix -> **leaves**."
    },
    {
        text: "They never _____ scary movies at night.",
        infinitive: "watch",
        correctAnswers: ["watch"],
        signalWords: ["never"],
        tense: "Simple Present",
        explanation: "'never' ist ein klassisches Signalwort des **Simple Present**. Bei 'They' verwenden wir den Infinitiv ohne Zusatz -> **watch**."
    },
    {
        text: "He sometimes _____ his homework in the kitchen.",
        infinitive: "do",
        correctAnswers: ["does"],
        signalWords: ["sometimes"],
        tense: "Simple Present",
        explanation: "'sometimes' (manchmal) deutet auf eine Gewohnheit hin (**Simple Present**). Bei 'He' hängt man '-es' an das Verb 'do' an -> **does**."
    },
    {
        text: "My mother _____ in Munich every day.",
        infinitive: "work",
        correctAnswers: ["works"],
        signalWords: ["every", "day"],
        tense: "Simple Present",
        explanation: "'every day' (jeden Tag) ist ein klares Signalwort für regelmäßige Aktionen (**Simple Present**). Für 'My mother' (she) gilt das Dritte-Person-S -> **works**."
    },
    {
        text: "We rarely _____ to the cinema on Tuesdays.",
        infinitive: "go",
        correctAnswers: ["go"],
        signalWords: ["rarely", "on", "Tuesdays"],
        tense: "Simple Present",
        explanation: "'rarely' (selten) und Wochentage im Plural ('on Tuesdays') zeigen Regelmäßigkeit (**Simple Present**). Für 'We' bleibt das Verb unverändert -> **go**."
    },
    {
        text: "The sun always _____ in the east.",
        infinitive: "rise",
        correctAnswers: ["rises"],
        signalWords: ["always"],
        tense: "Simple Present",
        explanation: "Naturgesetze und allgemeingültige Wahrheiten ('always') stehen immer im **Simple Present**. 'The sun' ist Einzahl (it) -> **rises**."
    },
    {
        text: "Zoe usually _____ cornflakes for breakfast.",
        infinitive: "have",
        correctAnswers: ["has"],
        signalWords: ["usually"],
        tense: "Simple Present",
        explanation: "'usually' (normalerweise) verlangt das **Simple Present**. Das unregelmäßige Verb 'have' wird bei 'Zoe' (she) zu **has**."
    },
    {
        text: "My friends often _____ soccer in the park.",
        infinitive: "play",
        correctAnswers: ["play"],
        signalWords: ["often"],
        tense: "Simple Present",
        explanation: "'often' (oft) signalisiert das **Simple Present**. Da 'My friends' Mehrzahl (they) ist, bleibt das Verb im Infinitiv -> **play**."
    },

    // --- SIMPLE PAST (10 Sätze) ---
    {
        text: "I _____ a great film yesterday.",
        infinitive: "see",
        correctAnswers: ["saw"],
        signalWords: ["yesterday"],
        tense: "Simple Past",
        explanation: "'yesterday' (gestern) zeigt einen abgeschlossenen Zeitpunkt in der Vergangenheit an -> **Simple Past**. Das unregelmäßige Verb 'see' wird in der 2. Spalte zu **saw**."
    },
    {
        text: "They _____ their house in 2015.",
        infinitive: "build",
        correctAnswers: ["built"],
        signalWords: ["in", "2015"],
        tense: "Simple Past",
        explanation: "Eine konkrete Jahreszahl in der Vergangenheit ('in 2015') verlangt das **Simple Past**. Die 2. Form von 'build' ist unregelmäßig -> **built**."
    },
    {
        text: "We _____ to Spain last summer.",
        infinitive: "go",
        correctAnswers: ["went"],
        signalWords: ["last", "summer"],
        tense: "Simple Past",
        explanation: "'last summer' (letzten Sommer) ist das Signalwort für das **Simple Past**. Die unregelmäßige Past-Form von 'go' lautet **went**."
    },
    {
        text: "She _____ her keys three days ago.",
        infinitive: "lose",
        correctAnswers: ["lost"],
        signalWords: ["three", "days", "ago"],
        tense: "Simple Past",
        explanation: "Das Signalwort 'ago' (vor...) verlangt zwingend das **Simple Past**. Das unregelmäßige Verb 'lose' hat als 2. Form **lost**."
    },
    {
        text: "When I was young, we _____ in a small village.",
        infinitive: "live",
        correctAnswers: ["lived"],
        signalWords: ["When", "I", "was", "young"],
        tense: "Simple Past",
        explanation: "Der Nebensatz 'When I was young' setzt den Rahmen in der Vergangenheit fest -> **Simple Past**. 'live' ist ein regelmäßiges Verb und erhält das Suffix '-d' -> **lived**."
    },
    {
        text: "Shakespeare _____ Romeo and Juliet centuries ago.",
        infinitive: "write",
        correctAnswers: ["wrote"],
        signalWords: ["ago"],
        tense: "Simple Past",
        explanation: "Das Signalwort 'ago' verweist auf das **Simple Past**. Das unregelmäßige Verb 'write' wird in der Vergangenheit zu **wrote**."
    },
    {
        text: "He _____ a new bike last month.",
        infinitive: "buy",
        correctAnswers: ["bought"],
        signalWords: ["last", "month"],
        tense: "Simple Past",
        explanation: "'last month' (letzten Monat) verlangt das **Simple Past**. Die unregelmäßige 2. Form von 'buy' lautet **bought**."
    },
    {
        text: "My sister _____ her school in 2021.",
        infinitive: "finish",
        correctAnswers: ["finished"],
        signalWords: ["in", "2021"],
        tense: "Simple Past",
        explanation: "Abgeschlossenes Ereignis ('in 2021') im **Simple Past**. 'finish' ist regelmäßig und bekommt '-ed' -> **finished**."
    },
    {
        text: "We _____ a big party last weekend.",
        infinitive: "have",
        correctAnswers: ["had"],
        signalWords: ["last", "weekend"],
        tense: "Simple Past",
        explanation: "'last weekend' verweist auf das **Simple Past**. Das Verb 'have' hat die unregelmäßige Vergangenheitsform **had**."
    },
    {
        text: "Yesterday, she _____ her English book at home.",
        infinitive: "forget",
        correctAnswers: ["forgot"],
        signalWords: ["Yesterday"],
        tense: "Simple Past",
        explanation: "'Yesterday' (gestern) erfordert das **Simple Past**. Das unregelmäßige Verb 'forget' bildet in der 2. Form **forgot**."
    },

    // --- PRESENT PROGRESSIVE (10 Sätze) ---
    {
        text: "Look! The cat _____ up that high tree.",
        infinitive: "climb",
        correctAnswers: ["is climbing"],
        signalWords: ["Look"],
        tense: "Present Progressive",
        explanation: "Das Signalwort 'Look!' (Schau!) zeigt, dass die Aktion jetzt im Moment stattfindet -> **Present Progressive** (*be + Verb-ing*). 'The cat' (it) braucht 'is' -> **is climbing**."
    },
    {
        text: "Listen! Someone _____ in the bathroom.",
        infinitive: "sing",
        correctAnswers: ["is singing"],
        signalWords: ["Listen"],
        tense: "Present Progressive",
        explanation: "Das Ausrufewort 'Listen!' (Hör mal!) signalisiert das **Present Progressive** für eine aktuelle Handlung. 'Someone' (Einzahl) verlangt 'is' -> **is singing**."
    },
    {
        text: "I _____ a letter to my pen pal at the moment.",
        infinitive: "write",
        correctAnswers: ["am writing"],
        signalWords: ["at", "the", "moment"],
        tense: "Present Progressive",
        explanation: "'at the moment' (im Moment) fordert das **Present Progressive**. Bei 'I' nutzen wir 'am'. Achtung bei der Rechtschreibung: Das stumme '-e' bei 'write' entfällt vor '-ing' -> **am writing**."
    },
    {
        text: "They _____ for their final exams now.",
        infinitive: "study",
        correctAnswers: ["are studying"],
        signalWords: ["now"],
        tense: "Present Progressive",
        explanation: "Das Signalwort 'now' (jetzt) fordert das **Present Progressive**. 'They' verlangt 'are' -> **are studying**."
    },
    {
        text: "My dad _____ the car in the garden right now.",
        infinitive: "wash",
        correctAnswers: ["is washing"],
        signalWords: ["right", "now"],
        tense: "Present Progressive",
        explanation: "'right now' (genau jetzt) verweist auf das **Present Progressive**. Für 'My dad' (he) nutzen wir 'is' -> **is washing**."
    },
    {
        text: "Look! It _____ heavily outside.",
        infinitive: "rain",
        correctAnswers: ["is raining"],
        signalWords: ["Look"],
        tense: "Present Progressive",
        explanation: "'Look!' signalisiert das **Present Progressive**. Das unpersönliche Pronomen 'It' erfordert 'is' -> **is raining**."
    },
    {
        text: "At the moment, we _____ the classroom for the party.",
        infinitive: "prepare",
        correctAnswers: ["are preparing"],
        signalWords: ["At", "the", "moment"],
        tense: "Present Progressive",
        explanation: "'At the moment' steht für das **Present Progressive**. 'We' erfordert 'are' und bei 'prepare' fällt das stumme '-e' weg -> **are preparing**."
    },
    {
        text: "She _____ a beautiful blue dress today.",
        infinitive: "wear",
        correctAnswers: ["is wearing"],
        signalWords: ["today"],
        tense: "Present Progressive",
        explanation: "'today' (heute) beschreibt hier einen vorübergehenden Zustand im Gegensatz zur Gewohnheit -> **Present Progressive**. 'She' verlangt 'is' -> **is wearing**."
    },
    {
        text: "Listen! The phone _____ in the living room.",
        infinitive: "ring",
        correctAnswers: ["is ringing"],
        signalWords: ["Listen"],
        tense: "Present Progressive",
        explanation: "'Listen!' zeigt eine laufende Aktion im Moment des Sprechens (**Present Progressive**). Das Subjekt 'The phone' (it) benötigt 'is' -> **is ringing**."
    },
    {
        text: "We _____ our favourite TV show right now.",
        infinitive: "watch",
        correctAnswers: ["are watching"],
        signalWords: ["right", "now"],
        tense: "Present Progressive",
        explanation: "'right now' ist das Signalwort des **Present Progressive**. Für das Subjekt 'We' setzen wir 'are' ein -> **are watching**."
    },

    // --- PAST PROGRESSIVE (10 Sätze) ---
    {
        text: "While I _____ a book, the lights suddenly went out.",
        infinitive: "read",
        correctAnswers: ["was reading"],
        signalWords: ["While"],
        tense: "Past Progressive",
        explanation: "Das Signalwort 'While' (während) leitet eine Hintergrundhandlung ein, die in der Vergangenheit andauerte -> **Past Progressive** (*was/were + Verb-ing*). Bei 'I' steht 'was' -> **was reading**."
    },
    {
        text: "They _____ when the alarm clock rang.",
        infinitive: "sleep",
        correctAnswers: ["were sleeping"],
        signalWords: ["when"],
        tense: "Past Progressive",
        explanation: "Der Satz beschreibt eine andauernde Handlung ('sleep'), die durch ein plötzliches Ereignis ('the alarm clock rang' im Simple Past) unterbrochen wurde -> **Past Progressive**. 'They' verlangt 'were' -> **were sleeping**."
    },
    {
        text: "While my mother _____ dinner, my father was vacuuming.",
        infinitive: "cook",
        correctAnswers: ["was cooking"],
        signalWords: ["While"],
        tense: "Past Progressive",
        explanation: "Zwei Handlungen passierten gleichzeitig in der Vergangenheit. Eingeleitet durch 'While' nutzen wir für die laufende Handlung das **Past Progressive**. 'My mother' (she) erfordert 'was' -> **was cooking**."
    },
    {
        text: "You _____ TV when I phoned you yesterday.",
        infinitive: "watch",
        correctAnswers: ["were watching"],
        signalWords: ["when"],
        tense: "Past Progressive",
        explanation: "Eine längere Handlung in der Vergangenheit wurde durch einen Anruf unterbrochen. Für die andauernde Handlung nutzen wir das **Past Progressive**. 'You' erfordert 'were' -> **were watching**."
    },
    {
        text: "While we _____ in the park, it started to rain.",
        infinitive: "walk",
        correctAnswers: ["were walking"],
        signalWords: ["While"],
        tense: "Past Progressive",
        explanation: "Die Hintergrundhandlung wird durch 'While' eingeleitet und steht im **Past Progressive**. Bei 'We' verwenden wir 'were' -> **were walking**."
    },
    {
        text: "The children _____ football when it got dark.",
        infinitive: "play",
        correctAnswers: ["were playing"],
        signalWords: ["when"],
        tense: "Past Progressive",
        explanation: "Die andauernde Handlung in der Vergangenheit wird durch das Eintreten der Dunkelheit unterbrochen -> **Past Progressive**. 'The children' (they) verlangen 'were' -> **were playing**."
    },
    {
        text: "As long as she _____ , everybody was listening.",
        infinitive: "sing",
        correctAnswers: ["was singing"],
        signalWords: ["as", "long", "as"],
        tense: "Past Progressive",
        explanation: "Das Signalwort 'as long as' (solange) zeigt, dass eine Handlung über einen Zeitraum hinweg andauerte -> **Past Progressive**. 'She' benötigt 'was' -> **was singing**."
    },
    {
        text: "While he _____ his homework, his sister was listening to music.",
        infinitive: "do",
        correctAnswers: ["was doing"],
        signalWords: ["While"],
        tense: "Past Progressive",
        explanation: "Zwei parallele Handlungen in der Vergangenheit. Eingeleitet durch 'While' steht die Lücke im **Past Progressive**. 'He' fordert 'was' -> **was doing**."
    },
    {
        text: "I _____ when a loud noise woke me up.",
        infinitive: "dream",
        correctAnswers: ["was dreaming"],
        signalWords: ["when"],
        tense: "Past Progressive",
        explanation: "Das Träumen war die andauernde Aktivität, die durch das Aufwachen unterbrochen wurde -> **Past Progressive**. Bei 'I' steht 'was' -> **was dreaming**."
    },
    {
        text: "They _____ to Munich when their car broke down.",
        infinitive: "drive",
        correctAnswers: ["were driving"],
        signalWords: ["when"],
        tense: "Past Progressive",
        explanation: "Das Autofahren war die Hintergrundaktivität im **Past Progressive**, die Autopanne die Unterbrechung. 'They' benötigt 'were', stummes '-e' entfällt -> **were driving**."
    },

    // --- PRESENT PERFECT (10 Sätze) ---
    {
        text: "I _____ my homework, so I can go out now.",
        infinitive: "already / finish",
        correctAnswers: ["have already finished"],
        signalWords: ["already"],
        tense: "Present Perfect",
        explanation: "Das Signalwort 'already' (bereits) verweist auf das **Present Perfect** (*have/has + 3. Form*). Das Ergebnis der Handlung ist wichtig für die Gegenwart. Bei 'I' nutzen wir 'have' -> **have already finished**."
    },
    {
        text: "She _____ her room yet, it's still a mess.",
        infinitive: "not / tidy",
        correctAnswers: ["has not tidied", "hasn't tidied"],
        signalWords: ["yet"],
        tense: "Present Perfect",
        explanation: "Das Signalwort 'yet' (noch) in verneinten Sätzen verlangt das **Present Perfect**. 'She' benötigt 'has'. Das regelmäßige Verb 'tidy' ändert das Endungs-'y' nach Konsonant zu 'i' -> **has not tidied** (oder **hasn't tidied**)."
    },
    {
        text: "We _____ in Munich since 2018.",
        infinitive: "live",
        correctAnswers: ["have lived"],
        signalWords: ["since"],
        tense: "Present Perfect",
        explanation: "Das Signalwort 'since' (seit einem Zeitpunkt) drückt aus, dass die Handlung 2018 begann und immer noch anhält -> **Present Perfect**. 'We' erfordert 'have' -> **have lived**."
    },
    {
        text: "You _____ to London several times.",
        infinitive: "ever / be",
        correctAnswers: ["have ever been", "have been"],
        signalWords: ["ever"],
        tense: "Present Perfect",
        explanation: "Die Frage oder Feststellung von Erfahrungen im Leben ('ever' / 'several times') steht im **Present Perfect**. Bei 'You' nutzen wir 'have' + unregelmäßige 3. Form von be (been) -> **have ever been**."
    },
    {
        text: "He _____ at this school for five years.",
        infinitive: "work",
        correctAnswers: ["has worked"],
        signalWords: ["for"],
        tense: "Present Perfect",
        explanation: "Das Signalwort 'for' (seit einem Zeitraum) zeigt an, dass er seit 5 Jahren hier arbeitet und dies immer noch tut -> **Present Perfect**. 'He' benötigt 'has' -> **has worked**."
    },
    {
        text: "They _____ at the train station just now.",
        infinitive: "just / arrive",
        correctAnswers: ["have just arrived"],
        signalWords: ["just"],
        tense: "Present Perfect",
        explanation: "Das Signalwort 'just' (gerade eben) zeigt eine unmittelbar abgeschlossene Handlung mit starkem Gegenwartsbezug -> **Present Perfect**. 'They' benötigt 'have' -> **have just arrived**."
    },
    {
        text: "I _____ such a beautiful sunset before.",
        infinitive: "never / see",
        correctAnswers: ["have never seen"],
        signalWords: ["never"],
        tense: "Present Perfect",
        explanation: "'never' in Verbindung mit Lebenserfahrung bis zur Gegenwart fordert das **Present Perfect**. 'I' verlangt 'have' + 3. Spalte von see (seen) -> **have never seen**."
    },
    {
        text: "She _____ a new smartphone recently.",
        infinitive: "recently / buy",
        correctAnswers: ["has recently bought", "has bought recently"],
        signalWords: ["recently"],
        tense: "Present Perfect",
        explanation: "Das Signalwort 'recently' (vor Kurzem) verlangt das **Present Perfect**. 'She' benötigt 'has' und die 3. Form von buy (bought) -> **has recently bought**."
    },
    {
        text: "We _____ anything since breakfast.",
        infinitive: "not / eat",
        correctAnswers: ["have not eaten", "haven't eaten"],
        signalWords: ["since"],
        tense: "Present Perfect",
        explanation: "Der Zeitraum ('since breakfast') reicht bis in die Gegenwart -> **Present Perfect**. 'We' verlangt 'have not' und das unregelmäßige Partizip 'eaten' -> **have not eaten**."
    },
    {
        text: "He _____ that exciting adventure book already.",
        infinitive: "already / read",
        correctAnswers: ["has already read"],
        signalWords: ["already"],
        tense: "Present Perfect",
        explanation: "'already' verweist auf das **Present Perfect**. 'He' benötigt 'has'. Die 3. Form von read wird 'read' geschrieben, aber wie das deutsche 'rot' ausgesprochen -> **has already read**."
    },

    // --- PAST PERFECT (10 Sätze) ---
    {
        text: "After they _____ their dinner, they went for a walk.",
        infinitive: "eat",
        correctAnswers: ["had eaten"],
        signalWords: ["After"],
        tense: "Past Perfect",
        explanation: "Das Signalwort 'After' (nachdem) zeigt an, dass eine Handlung *vor* einer anderen vergangenen Handlung ('went' im Simple Past) stattfand -> **Past Perfect** (*had + 3. Form*). Es lautet bei allen Personen 'had' + Partizip -> **had eaten**."
    },
    {
        text: "By the time the police arrived, the bank robber _____ .",
        infinitive: "escape",
        correctAnswers: ["had escaped"],
        signalWords: ["by", "the", "time"],
        tense: "Past Perfect",
        explanation: "Das Signalwort 'by the time' (bis zu dem Zeitpunkt als...) leitet die Simple-Past-Handlung ein. Die Lücke beschreibt, was *vorher* geschah -> **Past Perfect**. 'escape' ist regelmäßig -> **had escaped**."
    },
    {
        text: "She was very tired because she _____ all night.",
        infinitive: "study",
        correctAnswers: ["had studied"],
        signalWords: ["because"],
        tense: "Past Perfect",
        explanation: "Die Begründung ('because') für die Müdigkeit liegt zeitlich vor dem Müdesein ('was' im Simple Past) -> **Past Perfect**. 'study' wird regelmäßig gesteigert -> **had studied**."
    },
    {
        text: "Before he went to bed, he _____ all the doors.",
        infinitive: "lock",
        correctAnswers: ["had locked"],
        signalWords: ["Before"],
        tense: "Past Perfect",
        explanation: "Das Abschließen geschah zeitlich *vor* dem Zubettgehen ('went' im Simple Past). Das Signalwort 'Before' (bevor) strukturiert diese Vorzeitigkeit -> **Past Perfect** -> **had locked**."
    },
    {
        text: "After my dad _____ the computer, we could use it again.",
        infinitive: "repair",
        correctAnswers: ["had repaired"],
        signalWords: ["After"],
        tense: "Past Perfect",
        explanation: "Eingeleitet durch 'After' steht die Handlung, die zuerst abgeschlossen war, im **Past Perfect** (Reparatur), das Ergebnis danach im Simple Past (Nutzen) -> **had repaired**."
    },
    {
        text: "They went home after they _____ their training.",
        infinitive: "finish",
        correctAnswers: ["had finished"],
        signalWords: ["after"],
        tense: "Past Perfect",
        explanation: "Die Vorzeitigkeit einer Handlung im Nebensatz mit 'after' erfordert das **Past Perfect**. Das reguläre Verb 'finish' wird zu **had finished**."
    },
    {
        text: "By the time I woke up, my mother _____ breakfast.",
        infinitive: "already / make",
        correctAnswers: ["had already made"],
        signalWords: ["by", "the", "time"],
        tense: "Past Perfect",
        explanation: "Das Frühstückmachen geschah zeitlich *vor* dem Aufwachen. 'by the time' signalisiert die Vorzeitigkeit -> **Past Perfect** -> **had already made**."
    },
    {
        text: "She was happy because she _____ the first prize.",
        infinitive: "win",
        correctAnswers: ["had won"],
        signalWords: ["because"],
        tense: "Past Perfect",
        explanation: "Der Gewinn geschah *vor* der Freude in der Vergangenheit -> **Past Perfect**. Die 3. unregelmäßige Form von win lautet won -> **had won**."
    },
    {
        text: "After we _____ the tickets, we entered the cinema.",
        infinitive: "buy",
        correctAnswers: ["had bought"],
        signalWords: ["After"],
        tense: "Past Perfect",
        explanation: "'After' leitet die zeitlich weiter zurückliegende Handlung im **Past Perfect** ein. Die 3. Form von buy lautet bought -> **had bought**."
    },
    {
        text: "He _____ when I arrived at his house.",
        infinitive: "already / leave",
        correctAnswers: ["had already left"],
        signalWords: ["already"],
        tense: "Past Perfect",
        explanation: "Er war schon weg, *bevor* ich ankam ('arrived'). Die Vorzeitigkeit in Kombination mit 'already' erfordert das **Past Perfect** -> **had already left**."
    },

    // --- WILL FUTURE (10 Sätze) ---
    {
        text: "I think it _____ tomorrow.",
        infinitive: "rain",
        correctAnswers: ["will rain"],
        signalWords: ["I", "think", "tomorrow"],
        tense: "Will-Future",
        explanation: "Persönliche Vermutungen eingeleitet durch 'I think' (ich denke) und Zeitangaben wie 'tomorrow' (morgen) werden im Englischen mit dem **Will-Future** ausgedrückt (*will + Infinitiv*) -> **will rain**."
    },
    {
        text: "We _____ London next summer, but we haven't booked anything yet.",
        infinitive: "probably / visit",
        correctAnswers: ["will probably visit"],
        signalWords: ["probably", "next"],
        tense: "Will-Future",
        explanation: "Das Wort 'probably' (wahrscheinlich) deutet auf eine unsichere Vorhersage oder Vermutung hin -> **Will-Future** -> **will probably visit**."
    },
    {
        text: "In the future, robots _____ all the dangerous work.",
        infinitive: "do",
        correctAnswers: ["will do"],
        signalWords: ["in", "the", "future"],
        tense: "Will-Future",
        explanation: "Allgemeine Vorhersagen über die Zukunft ohne festen Plan ('in the future') verlangen das **Will-Future** -> **will do**."
    },
    {
        text: "Maybe they _____ the football match on Saturday.",
        infinitive: "win",
        correctAnswers: ["will win"],
        signalWords: ["Maybe"],
        tense: "Will-Future",
        explanation: "Das Signalwort 'Maybe' (vielleicht) zeigt eine reine Spekulation an. Solche unbeeinflussbaren Prognosen stehen im **Will-Future** -> **will win**."
    },
    {
        text: "I am sure you _____ your English exam next week.",
        infinitive: "pass",
        correctAnswers: ["will pass"],
        signalWords: ["sure", "next", "week"],
        tense: "Will-Future",
        explanation: "Versprechungen oder feste Meinungen ('I am sure' - ich bin sicher) werden mit dem **Will-Future** gebildet -> **will pass**."
    },
    {
        text: "I think people _____ on Mars one day.",
        infinitive: "live",
        correctAnswers: ["will live"],
        signalWords: ["I", "think"],
        tense: "Will-Future",
        explanation: "Eine persönliche Meinung ('I think') über ein mögliches Ereignis in ferner Zukunft verlangt das **Will-Future** -> **will live**."
    },
    {
        text: "I promise I _____ you tomorrow with your project.",
        infinitive: "help",
        correctAnswers: ["will help"],
        signalWords: ["promise", "tomorrow"],
        tense: "Will-Future",
        explanation: "Das Signalwort 'I promise' (ich verspreche) erfordert immer das **Will-Future**, da es ein Versprechen ist -> **will help**."
    },
    {
        text: "Maybe my parents _____ a new car next year.",
        infinitive: "buy",
        correctAnswers: ["will buy"],
        signalWords: ["Maybe", "next", "year"],
        tense: "Will-Future",
        explanation: "Das Wort 'Maybe' (vielleicht) steht für Spekulation und fordert das **Will-Future** -> **will buy**."
    },
    {
        text: "I hope the weather _____ fine tomorrow.",
        infinitive: "be",
        correctAnswers: ["will be"],
        signalWords: ["hope", "tomorrow"],
        tense: "Will-Future",
        explanation: "Wünsche und Hoffnungen ('I hope' - ich hoffe) über zukünftiges Wetter stehen im **Will-Future** -> **will be**."
    },
    {
        text: "They _____ to Asia next month, if they get vacation.",
        infinitive: "probably / travel",
        correctAnswers: ["will probably travel"],
        signalWords: ["probably", "next", "month"],
        tense: "Will-Future",
        explanation: "'probably' (wahrscheinlich) deutet auf eine Vermutung hin und verlangt das **Will-Future** -> **will probably travel**."
    },

    // --- GOING TO FUTURE (10 Sätze) ---
    {
        text: "Look at those black clouds! It _____ soon.",
        infinitive: "rain",
        correctAnswers: ["is going to rain"],
        signalWords: ["Look", "black", "clouds"],
        tense: "Going-to-Future",
        explanation: "Es gibt einen klaren, sichtbaren Beweis in der Gegenwart ('Look at those black clouds!'), dass etwas gleich passieren wird. Das erfordert das **Going-to-Future** (*be + going to + Infinitiv*) -> **is going to rain**."
    },
    {
        text: "We _____ to Rome next week because we have already booked the flight.",
        infinitive: "fly",
        correctAnswers: ["are going to fly"],
        signalWords: ["booked", "flight"],
        tense: "Going-to-Future",
        explanation: "Das Buchen des Fluges ('booked') beweist eine feste Absicht und Planung für die Zukunft. Bei Plänen nutzen wir das **Going-to-Future**. 'We' erfordert 'are' -> **are going to fly**."
    },
    {
        text: "She _____ medicine next year; it has always been her dream.",
        infinitive: "study",
        correctAnswers: ["is going to study"],
        signalWords: ["dream", "next", "year"],
        tense: "Going-to-Future",
        explanation: "Ein fester Lebensplan ('her dream', 'next year') wird im Englischen mit dem **Going-to-Future** ausgedrückt. Für 'She' gilt 'is' -> **is going to study**."
    },
    {
        text: "Look! The glass is very close to the edge. It _____ off the table.",
        infinitive: "fall",
        correctAnswers: ["is going to fall"],
        signalWords: ["Look", "close", "edge"],
        tense: "Going-to-Future",
        explanation: "Die Situation in der Gegenwart zeigt unmissverständlich, was passieren wird (das Glas wackelt). Dies verlangt das **Going-to-Future** -> **is going to fall**."
    },
    {
        text: "I _____ my grandparents tonight; I have already promised them.",
        infinitive: "visit",
        correctAnswers: ["am going to visit"],
        signalWords: ["tonight", "promised"],
        tense: "Going-to-Future",
        explanation: "Ein festes Vorhaben für heute Abend ('tonight'), das bereits verabredet ist ('promised'). Pläne erfordern das **Going-to-Future**. Bei 'I' steht 'am' -> **am going to visit**."
    },
    {
        text: "He _____ a new computer next week; he has saved enough money.",
        infinitive: "buy",
        correctAnswers: ["is going to buy"],
        signalWords: ["saved", "money", "next", "week"],
        tense: "Going-to-Future",
        explanation: "Da er extra gespart hat, ist der Kauf fest geplant und vorbereitet -> **Going-to-Future**. 'He' verlangt 'is' -> **is going to buy**."
    },
    {
        text: "They _____ a new house next year; the architectural plans are finished.",
        infinitive: "build",
        correctAnswers: ["are going to build"],
        signalWords: ["plans", "finished", "next", "year"],
        tense: "Going-to-Future",
        explanation: "Weil die Pläne fertig sind, handelt es sich um ein konkretes Vorhaben (**Going-to-Future**). 'They' benötigt 'are' -> **are going to build**."
    },
    {
        text: "Look! That runner is far ahead. He _____ the race.",
        infinitive: "win",
        correctAnswers: ["is going to win"],
        signalWords: ["Look", "far", "ahead"],
        tense: "Going-to-Future",
        explanation: "Der Läufer ist weit vorne – ein gegenwärtiges Anzeichen für das sichere Ergebnis. Wir verwenden das **Going-to-Future** -> **is going to win**."
    },
    {
        text: "I _____ a movie tonight with my friends; we bought the tickets.",
        infinitive: "watch",
        correctAnswers: ["am going to watch"],
        signalWords: ["tonight", "tickets"],
        tense: "Going-to-Future",
        explanation: "Ein Kinobesuch, für den bereits Tickets gekauft wurden, ist ein fester Plan -> **Going-to-Future**. Bei 'I' nutzen wir 'am' -> **am going to watch**."
    },
    {
        text: "She _____ all her friends to her birthday party next week.",
        infinitive: "invite",
        correctAnswers: ["is going to invite"],
        signalWords: ["birthday", "party", "next", "week"],
        tense: "Going-to-Future",
        explanation: "Die Vorbereitung einer Geburtstagsparty ist eine Absicht und Planung -> **Going-to-Future**. 'She' benötigt 'is' und das stumme '-e' bleibt bei 'going to' unverändert -> **is going to invite**."
    }
];

// ==========================================================================
// 3. GRAMMATIK INFORMATIONEN FÜR DIE ERKLÄRUNGEN (DYNAMISCHES RENDERN)
// ==========================================================================
const grammarLibrary = {
    "simple-present": {
        title: "Simple Present",
        formula: "Infinitive / Verb + -s (bei he/she/it)",
        use: "Regelmäßige Handlungen in der Gegenwart, Gewohnheiten, Fahrpläne und allgemeine Wahrheiten.",
        signals: ["always", "usually", "often", "sometimes", "never", "every day", "on Mondays", "rarely"],
        examples: [
            { en: "He plays tennis every Saturday.", de: "Er spielt jeden Samstag Tennis." },
            { en: "The train leaves at 8:00 AM.", de: "Der Zug fährt um 8:00 Uhr ab." }
        ]
    },
    "present-progressive": {
        title: "Present Progressive",
        formula: "am / is / are + Verb-ing",
        use: "Aktivitäten, die im Moment des Sprechens stattfinden, oder vorübergehende Zustände.",
        signals: ["now", "at the moment", "Look!", "Listen!", "right now", "today"],
        examples: [
            { en: "Look! It is raining outside.", de: "Schau! Es regnet draußen." },
            { en: "I am writing an English test now.", de: "Ich schreibe jetzt einen Englischtest." }
        ]
    },
    "simple-past": {
        title: "Simple Past",
        formula: "Verb + -ed (regelmäßig) / 2. Form (unregelmäßig)",
        use: "Einmalige oder regelmäßige Aktionen, die in der Vergangenheit abgeschlossen wurden und keinen Bezug zur Gegenwart haben.",
        signals: ["yesterday", "last week", "in 2018", "two days ago", "when I was young"],
        examples: [
            { en: "We went to Rome last summer.", de: "Wir sind letzten Sommer nach Rom gefahren." },
            { en: "She finished school in 2021.", de: "Sie hat die Schule 2021 beendet." }
        ]
    },
    "past-progressive": {
        title: "Past Progressive",
        formula: "was / were + Verb-ing",
        use: "Eine Handlung, die zu einem bestimmten Zeitpunkt in der Vergangenheit andauerte (Hintergrundhandlung), oft unterbrochen durch ein neues Ereignis (im Simple Past).",
        signals: ["while", "as long as", "when (bei Unterbrechungen)"],
        examples: [
            { en: "While I was reading, the phone rang.", de: "Während ich las, klingelte das Telefon." },
            { en: "They were sleeping when the fire alarm started.", de: "Sie schliefen, als der Feueralarm losging." }
        ]
    },
    "present-perfect": {
        title: "Present Perfect",
        formula: "have / has + Verb-ed (regelmäßig) / 3. Form (unregelmäßig)",
        use: "Eine Brücke zwischen Vergangenheit und Gegenwart: Aktionen, die in der Vergangenheit begannen und bis jetzt andauern, oder Handlungen mit wichtigen Auswirkungen auf das Jetzt.",
        signals: ["just", "already", "yet", "ever", "never", "since (Zeitpunkt)", "for (Zeitspanne)", "recently"],
        examples: [
            { en: "I have already finished my homework.", de: "Ich habe meine Hausaufgaben bereits fertig (Ergebnis zählt jetzt)." },
            { en: "We have lived here since 2018.", de: "Wir wohnen hier seit 2018 (und wohnen immer noch hier)." }
        ]
    },
    "past-perfect": {
        title: "Past Perfect",
        formula: "had + Verb-ed (regelmäßig) / 3. Form (unregelmäßig)",
        use: "Die Vor-Vergangenheit. Beschreibt eine Aktion, die zeitlich vor einer anderen vergangenen Aktion (im Simple Past) abgeschlossen war.",
        signals: ["after", "before", "by the time", "because (bei Vorzeitigkeit)"],
        examples: [
            { en: "After they had eaten, they went for a walk.", de: "Nachdem sie gegessen hatten, gingen sie spazieren." },
            { en: "By the time he arrived, the train had left.", de: "Als er ankam, war der Zug abgefahren." }
        ]
    },
    "will-future": {
        title: "Will-Future",
        formula: "will + Infinitive",
        use: "Unabwendbare Geschehnisse, Vermutungen, Hoffnungen, Versprechungen oder spontane Entschlüsse in der Zukunft.",
        signals: ["I think", "probably", "in the future", "Maybe", "I promise", "I hope", "tomorrow"],
        examples: [
            { en: "I think it will rain tomorrow.", de: "Ich glaube, es wird morgen regnen." },
            { en: "Maybe they will win the game.", de: "Vielleicht werden sie das Spiel gewinnen." }
        ]
    },
    "going-to-future": {
        title: "Going-to-Future",
        formula: "am / is / are + going to + Infinitive",
        use: "Feste Pläne, Absichten und Vorhaben für die Zukunft sowie logische Vorhersagen aufgrund von Anzeichen in der Gegenwart.",
        signals: ["sichtbare Anzeichen", "feste Absichten", "booked", "planned", "tonight", "next year"],
        examples: [
            { en: "Look at those clouds! It is going to rain.", de: "Schau dir diese Wolken an! Es wird gleich regnen." },
            { en: "We are going to study in Munich next year.", de: "Wir haben vor, nächstes Jahr in München zu studieren." }
        ]
    }
};

// ==========================================================================
// 4. ANWENDUNGSSTATUS & INITIALISIERUNG (Erweitert für Runden-Management)
// ==========================================================================
let masterSentencePool = [];   // Hält alle verbleibenden Sätze der Datenbank
let currentRoundSentences = []; // Die 10 aktuellen Sätze der aktiven Runde
let currentSentenceIndex = 0;
let sentenceScore = 0;
let totalRoundsPlayed = 0;      // Zähler für die absolvierten Runden

let globalPoints = 0;
let globalStreak = 0;

let selectedWords = []; // Aktuell angeklickte Tokens
let activeSentence = null;
let sentenceChecked = false;

// Status für das unregelmäßige Verben Widget
let widgetCurrentVerb = null;
let verbsStreak = 0;
let widgetChecked = false;

// Startup
window.addEventListener("DOMContentLoaded", () => {
    loadStats();
    
    // Initialen Gesamtpool mischen
    resetMasterSentencePool();
    
    initTrainerRound();
    initWidgetVerb();
    renderGrammarCards();

    document.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const activeTab = document.querySelector(".tab-content.active").id;
            if (activeTab === "tab-trainer") {
                const btnAction = document.getElementById("btn-action");
                if (!btnAction.disabled) {
                    handleSentenceAction();
                }
            }
        }
    });
});

// Hilfsfunktion: Setzt den globalen Pool zurück und mischt ihn durch
function resetMasterSentencePool() {
    masterSentencePool = [...sentenceBank].sort(() => Math.random() - 0.5);
    totalRoundsPlayed = 0;
}

function initTrainerRound() {
    // Falls der Pool leer ist (alle 80 Sätze gespielt), von vorne beginnen
    if (masterSentencePool.length === 0) {
        resetMasterSentencePool();
    }
    
    // Die nächsten 10 Sätze aus dem Master-Pool entnehmen
    currentRoundSentences = masterSentencePool.splice(0, 10);
    currentSentenceIndex = 0;
    sentenceScore = 0;
    totalRoundsPlayed++;
    
    loadSentence();
}

// ==========================================================================
// INTERAKTIVER SATZ-TRAINER (KORRIGIERTES RENDERING)
// ==========================================================================
function loadSentence() {
    activeSentence = currentRoundSentences[currentSentenceIndex];
    selectedWords = [];
    sentenceChecked = false;

    document.getElementById("sentence-progress").innerText = `Satz ${currentSentenceIndex + 1} von 10 (Runde ${totalRoundsPlayed})`;
    document.getElementById("sentence-progress-bar").style.width = `${(currentSentenceIndex + 1) * 10}%`;
    document.getElementById("current-tense-badge").innerText = activeSentence.tense;
    
    document.getElementById("instruction-box").style.background = "rgba(255, 255, 255, 0.02)";
    document.getElementById("step-signal").classList.add("active");
    document.getElementById("step-gap").classList.remove("active");
    
    const btnAction = document.getElementById("btn-action");
    btnAction.disabled = true;
    btnAction.innerHTML = `<i class="fa-solid fa-lock"></i> Bitte Signalwort wählen`;
    btnAction.className = "btn btn-primary";

    const drawer = document.getElementById("feedback-drawer");
    drawer.style.display = "none";
    drawer.className = "feedback-drawer";

    renderSentenceWithTokens();
    if (activeSentence && activeSentence.signalWords) {
        updateDynamicInstructionCount(activeSentence.signalWords.map(w => normalizeWord(w)));
    }
}

function renderSentenceWithTokens() {
    const container = document.getElementById("sentence-area");
    container.innerHTML = "";

    // Satz an der Lücke "_____" aufsplitten
    const parts = activeSentence.text.split("_____");
    
    // --- KORREKTUR: Saubere Extraktion des Infinitivs ---
    // Falls "already / finish" drin steht, isolieren wir das reine Verb ("finish")
    let displayInfinitive = activeSentence.infinitive;
    let extraTokenWord = "";

    if (activeSentence.infinitive.includes("/")) {
        const infParts = activeSentence.infinitive.split("/");
        // Das letzte Element ist in der Regel das Hauptverb (z.B. "finish" oder "eat")
        displayInfinitive = infParts[infParts.length - 1].trim();
        // Das erste Element ist das störende Signalwort/Zusatzwort (z.B. "already" oder "not")
        extraTokenWord = infParts[0].trim();
    }

    // 1. Text VOR der Lücke rendern
    const wordsBefore = parts[0].trim().split(" ");
    wordsBefore.forEach(word => {
        if(word.length > 0) container.appendChild(createTokenElement(word));
    });

    // --- KORREKTUR: Dynamisches Zusatz-Token einfügen, falls es im Tipp versteckt war ---
    // Wenn ein extra Wort (wie 'already') existiert und nicht 'not' lautet, erstellen wir einen klickbaren Chip direkt vor der Lücke
    if (extraTokenWord && extraTokenWord !== "not") {
        container.appendChild(createTokenElement(extraTokenWord));
    }

    // 2. Das Lücken-Eingabefeld (Gap-Input)
    const gapWrapper = document.createElement("div");
    gapWrapper.className = "gap-input-container";
    gapWrapper.id = "gap-container";

    // Reiner Infinitiv-Tipp (z.B. "to finish")
    const infTag = document.createElement("span");
    infTag.className = "verb-infinitive-tag";
    infTag.innerText = `to ${displayInfinitive}`;
    gapWrapper.appendChild(infTag);

    const lockOverlay = document.createElement("span");
    lockOverlay.className = "lock-overlay";
    lockOverlay.innerHTML = `<i class="fa-solid fa-lock"></i>`;
    gapWrapper.appendChild(lockOverlay);

    const gapInput = document.createElement("input");
    gapInput.type = "text";
    gapInput.className = "gap-input";
    gapInput.id = "sentence-gap";
    gapInput.placeholder = "Verb eingeben...";
    gapInput.autocomplete = "off";
    gapInput.disabled = true; 
    
    gapWrapper.appendChild(gapInput);
    container.appendChild(gapWrapper);

    // 3. Text NACH der Lücke rendern
    const wordsAfter = parts[1].trim().split(" ");
    wordsAfter.forEach(word => {
        if(word.length > 0) container.appendChild(createTokenElement(word));
    });
}

function showRoundResults() {
    const container = document.getElementById("sentence-area");
    const dynamicButtonText = masterSentencePool.length > 0 ? 
        `<i class="fa-solid fa-arrow-right-long"></i> Nächste Runde (noch ${masterSentencePool.length} Sätze)` : 
        `<i class="fa-solid fa-arrows-rotate"></i> Alle Sätze geschafft! Neu starten`;

    container.innerHTML = `
        <div class="round-summary" style="text-align: center; padding: 20px; animation: popIn 0.5s ease;">
            <i class="fa-solid fa-trophy text-yellow" style="font-size: 3em; margin-bottom: 15px;"></i>
            <h3>Runde ${totalRoundsPlayed} beendet!</h3>
            <p style="font-size: 1.2em; margin: 10px 0;">Du hast <strong>${sentenceScore} von 10 Sätzen</strong> richtig gelöst.</p>
            <p style="color: var(--text-muted); font-size: 0.9em;">Insgesamt sind noch ${masterSentencePool.length} ungespielte Sätze im Pool.</p>
            <button class="btn btn-accent" style="margin-top: 20px;" onclick="initTrainerRound()">
                ${dynamicButtonText}
            </button>
        </div>
    `;

    const btnAction = document.getElementById("btn-action");
    btnAction.disabled = true;
    btnAction.innerHTML = `<i class="fa-solid fa-circle-check"></i> Runde abgeschlossen`;
    btnAction.className = "btn btn-secondary";
}// ==========================================================================
// 5. TABS & STATISTIK-LOGIK
// ==========================================================================
function switchTab(tabName) {
    // Buttons toggeln
    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`btn-tab-${tabName}`).classList.add("active");
    
    // Inhalt toggeln
    document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
    document.getElementById(`tab-${tabName}`).classList.add("active");
}

function scrollToTense(tenseId) {
    // Falls in Trainer-Tab, wechsle zu Grammatik
    switchTab('grammar');
    
    // Node-Status anpassen
    document.querySelectorAll(".timeline-node").forEach(node => {
        node.classList.remove("active");
        if (node.getAttribute("onclick").includes(tenseId)) {
            node.classList.add("active");
        }
    });

    // Scrolle sanft zur gewählten Zeitkarte
    const element = document.getElementById(`grammar-${tenseId}`);
    if (element) {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function updateGlobalStats(pointsDiff, resetStreak = false) {
    globalPoints += pointsDiff;
    if (globalPoints < 0) globalPoints = 0;
    if (resetStreak) {
        globalStreak = 0;
    } else if (pointsDiff > 0) {
        globalStreak++;
    }
    
    document.getElementById("global-points").innerText = globalPoints;
    document.getElementById("global-streak").innerText = globalStreak;
    
    // Speichern
    localStorage.setItem("gh_points", globalPoints);
    localStorage.setItem("gh_streak", globalStreak);
}

function loadStats() {
    globalPoints = parseInt(localStorage.getItem("gh_points")) || 0;
    globalStreak = parseInt(localStorage.getItem("gh_streak")) || 0;
    verbsStreak = parseInt(localStorage.getItem("gh_verbs_streak")) || 0;
    
    document.getElementById("global-points").innerText = globalPoints;
    document.getElementById("global-streak").innerText = globalStreak;
    document.getElementById("verbs-streak").innerText = verbsStreak;
}

// [Duplikate entfernt, die korrekten Versionen befinden sich oben]

function createTokenElement(wordText) {
    const token = document.createElement("span");
    token.innerText = wordText;
    
    // Normalisiere das Wort für den Check (ohne Satzzeichen)
    const norm = normalizeWord(wordText);
    
    // Handelt es sich um reines Satzzeichen?
    if (norm === "") {
        token.className = "word-token punctuation";
    } else {
        token.className = "word-token";
        token.dataset.normalized = norm;
        token.onclick = () => selectWordToken(token);
    }
    
    return token;
}

function normalizeWord(word) {
    return word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
}

function selectWordToken(element) {
    if (sentenceChecked) return; // Nach der Prüfung keine Klicks mehr

    const norm = element.dataset.normalized;
    const correctSignals = activeSentence.signalWords.map(w => normalizeWord(w));

    if (correctSignals.includes(norm)) {
        // Richtiges Signalwort angeklickt!
        if (element.classList.contains("selected")) {
            element.classList.remove("selected");
            selectedWords = selectedWords.filter(w => w !== norm);
        } else {
            element.classList.add("selected");
            selectedWords.push(norm);
        }
    } else {
        // Falsches Signalwort angeklickt!
        element.classList.add("incorrect-flash");
        updateGlobalStats(-1); // -1 XP Strafe
        showFloatingXpFeedback(element, -1);
        
        setTimeout(() => {
            element.classList.remove("incorrect-flash");
        }, 800);
    }

    // Aktualisiere verbleibende Wortanzahl im Instruktionsbereich
    updateDynamicInstructionCount(correctSignals);
    checkSignalWordsSelection();
}

function updateDynamicInstructionCount(correctSignals) {
    const remaining = correctSignals.filter(w => !selectedWords.includes(w)).length;
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

function checkSignalWordsSelection() {
    // Normalisierte korrekte Signalwörter
    const correctSignals = activeSentence.signalWords.map(w => normalizeWord(w));
    
    // Prüfen, ob alle korrekten Wörter markiert sind (und KEINE falschen)
    const allCorrectSelected = correctSignals.every(w => selectedWords.includes(w));
    const noWrongSelected = selectedWords.every(w => correctSignals.includes(w));

    const gapContainer = document.getElementById("gap-container");
    const gapInput = document.getElementById("sentence-gap");
    const btnAction = document.getElementById("btn-action");

    if (allCorrectSelected && noWrongSelected) {
        // Lücke freischalten!
        gapContainer.classList.add("unlocked");
        gapInput.disabled = false;
        gapContainer.querySelector(".lock-overlay").innerHTML = `<i class="fa-solid fa-lock-open text-purple"></i>`;
        
        // Instruktionsbox anpassen
        document.getElementById("instruction-box").style.background = "rgba(139, 92, 246, 0.05)";
        document.getElementById("step-signal").classList.remove("active");
        document.getElementById("step-gap").classList.add("active");

        // Action-Button für Schritt 2 aktivieren
        btnAction.disabled = false;
        btnAction.innerHTML = `<i class="fa-solid fa-square-check"></i> Antwort prüfen`;
        btnAction.className = "btn btn-accent";
        
        // Fokus auf Input
        gapInput.focus();
    } else {
        // Wieder sperren
        gapContainer.classList.remove("unlocked");
        gapInput.disabled = true;
        gapContainer.querySelector(".lock-overlay").innerHTML = `<i class="fa-solid fa-lock"></i>`;
        
        document.getElementById("instruction-box").style.background = "rgba(255, 255, 255, 0.02)";
        document.getElementById("step-signal").classList.add("active");
        document.getElementById("step-gap").classList.remove("active");

        btnAction.disabled = true;
        btnAction.innerHTML = `<i class="fa-solid fa-lock"></i> Bitte Signalwort wählen`;
        btnAction.className = "btn btn-primary";
    }
}

function handleSentenceAction() {
    if (!sentenceChecked) {
        checkGapAnswer();
    } else {
        nextSentence();
    }
}

function formatMarkdown(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>");
}

function checkGapAnswer() {
    const gapInput = document.getElementById("sentence-gap");
    const userVal = gapInput.value.trim().toLowerCase();
    
    // Akzeptierte Schreibweisen normieren (Kleinschreibung, Leerzeichen trimmen)
    const correctVariants = activeSentence.correctAnswers.map(v => v.trim().toLowerCase());
    
    const isCorrect = correctVariants.includes(userVal);
    sentenceChecked = true;

    // Visuals für Lückenfeld anpassen
    gapInput.disabled = true;
    
    // Klickbarkeit der Tokens sperren
    document.querySelectorAll(".word-token").forEach(t => t.style.pointerEvents = "none");

    const drawer = document.getElementById("feedback-drawer");
    const statusText = document.getElementById("feedback-status");
    const correctAlert = document.getElementById("feedback-correct-answer");
    const explanation = document.getElementById("feedback-explanation");
    const tenseTag = document.getElementById("feedback-tense");

    tenseTag.innerText = activeSentence.tense;

    if (isCorrect) {
        gapInput.classList.add("correct");
        
        // Feedback Drawer auf Grün setzen
        drawer.style.display = "block";
        drawer.classList.add("correct-box");
        statusText.innerHTML = `<i class="fa-solid fa-circle-check text-green"></i> <span>Richtig! Großartig.</span>`;
        correctAlert.innerText = activeSentence.correctAnswers[0];
        explanation.innerHTML = formatMarkdown(activeSentence.explanation);

        sentenceScore++;
        updateGlobalStats(10); // +10 Punkte
    } else {
        gapInput.classList.add("incorrect");

        // Feedback Drawer auf Rot setzen
        drawer.style.display = "block";
        drawer.classList.add("incorrect-box");
        statusText.innerHTML = `<i class="fa-solid fa-circle-xmark text-rose"></i> <span>Leider nicht ganz richtig!</span>`;
        correctAlert.innerText = activeSentence.correctAnswers[0];
        explanation.innerHTML = formatMarkdown(activeSentence.explanation);

        updateGlobalStats(0, true); // Streak bricht
    }

    // Action Button auf Weiter schalten
    const btnAction = document.getElementById("btn-action");
    btnAction.innerHTML = `Weiter <i class="fa-solid fa-arrow-right"></i>`;
    btnAction.className = "btn btn-primary";
}

function showSentenceHint() {
    if (sentenceChecked) return;

    // Finde das korrekte Signalwort
    const hintWord = activeSentence.signalWords[0];
    
    // Finde das Token-Element dazu
    const tokens = document.querySelectorAll(".word-token");
    tokens.forEach(token => {
        if (token.dataset.normalized === normalizeWord(hintWord)) {
            // Lass das Signalwort kurz aufleuchten (Animation)
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

    // Kleines Punkteabzug als 'Tipp-Kosten' (optional, nur unaufdringlich)
    updateGlobalStats(0);
}

function nextSentence() {
    currentSentenceIndex++;
    if (currentSentenceIndex < 10) {
        loadSentence();
    } else {
        showRoundResults();
    }
}

// [Duplikat entfernt, die korrekte Version befindet sich oben]

// ==========================================================================
// 7. SIDEBAR WIDGET: UNREGELMÄSSIGE VERBEN (LOGIK)
// ==========================================================================
function initWidgetVerb() {
    loadWidgetVerb();
}

function loadWidgetVerb() {
    // Wähle ein zufälliges Verb aus der unregelmäßigen Verben-Datenbank
    widgetCurrentVerb = verbData[Math.floor(Math.random() * verbData.length)];
    
    // Deutsches Wort anzeigen
    document.getElementById("verb-german-target").innerText = widgetCurrentVerb.de;

    // Formular-Felder zurücksetzen
    const fields = ["inf", "sp", "pp"];
    fields.forEach(f => {
        const input = document.getElementById(`widget-${f}`);
        input.value = "";
        input.disabled = false;
        
        // Statusklassen entfernen
        const wrapper = input.parentElement;
        wrapper.className = "input-wrapper";
        
        // Tipps verbergen
        document.getElementById(`hint-widget-${f}`).style.display = "none";
    });

    // Button zurücksetzen
    const checkBtn = document.getElementById("btn-widget-check");
    checkBtn.innerHTML = "Prüfen";
    checkBtn.className = "btn btn-accent btn-full";
    widgetChecked = false;
}

function checkWidgetVerbs() {
    const checkBtn = document.getElementById("btn-widget-check");
    
    if (widgetChecked) {
        // Nächstes Verb laden
        loadWidgetVerb();
        return;
    }

    const valInf = document.getElementById("widget-inf").value.trim().toLowerCase();
    const valSp = document.getElementById("widget-sp").value.trim().toLowerCase();
    const valPp = document.getElementById("widget-pp").value.trim().toLowerCase();

    // Akzeptierte Varianten aufsplitten (z.B. was/were)
    const correctInf = widgetCurrentVerb.inf.toLowerCase().split("/").map(v => v.trim());
    const correctSp = widgetCurrentVerb.sp.toLowerCase().split("/").map(v => v.trim());
    const correctPp = widgetCurrentVerb.pp.toLowerCase().split("/").map(v => v.trim());

    // Validieren
    const isInfOk = correctInf.includes(valInf);
    const isSpOk = correctSp.includes(valSp);
    const isPpOk = correctPp.includes(valPp);

    // Visuals anpassen
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
        // Streak hochzählen
        verbsStreak++;
        updateGlobalStats(15); // +15 Punkte für unregelmäßiges Verb
        
        // Widget-Streak im UI aktualisieren
        document.getElementById("verbs-streak").innerText = verbsStreak;
        localStorage.setItem("gh_verbs_streak", verbsStreak);
        
        // Erfolgs-Button
        checkBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> Richtig! Weiter`;
        checkBtn.className = "btn btn-green btn-full";

        // Kleiner Animationseffekt auf dem deutschen Wort
        const wordEl = document.getElementById("verb-german-target");
        wordEl.style.transform = "scale(1.05)";
        wordEl.style.borderColor = "var(--emerald)";
        setTimeout(() => wordEl.style.transform = "", 300);
    } else {
        // Streak zurücksetzen
        verbsStreak = 0;
        document.getElementById("verbs-streak").innerText = verbsStreak;
        localStorage.setItem("gh_verbs_streak", verbsStreak);

        // Fehler-Button
        checkBtn.innerHTML = `Nächstes Verb <i class="fa-solid fa-arrow-right"></i>`;
        checkBtn.className = "btn btn-primary btn-full";
    }
}

// ==========================================================================
// 8. GRAMMATIK ERKLÄRUNGEN (DYNAMISCHES RENDERN)
// ==========================================================================
function renderGrammarCards() {
    const container = document.getElementById("grammar-cards-container");
    container.innerHTML = "";

    for (const key in grammarLibrary) {
        const tense = grammarLibrary[key];
        
        const card = document.createElement("div");
        card.className = "card glass-card grammar-card";
        card.id = `grammar-${key}`;

        // Signalwörter Chips generieren
        const chipsHtml = tense.signals.map(s => `<span class="signal-chip">${s}</span>`).join("");

        // Beispielsätze generieren
        const examplesHtml = tense.examples.map(ex => `
            <li>
                <strong>${ex.en}</strong>
                <span class="example-translation">${ex.de}</span>
            </li>
        `).join("");

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
