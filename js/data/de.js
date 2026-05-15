// German content — CEFR A1 to C2 (for English/Japanese speakers learning German)
window.DATA_DE = (function () {
  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "de:vocab:" + deck + ":" + it[0],
      lang: "de",
      level,
      deck,
      type: "vocab",
      jp: it[0], kana: it[1] || "", romaji: it[1] || "", en: it[2],
      de: "",
      front: it[0], back: it[2], hint: it[1] || "",
      speakText: it[0]
    }));
  }

  const VOCAB = {
    // ── A1 ──
    greetings: vocabCards("de-greetings", "A1", [
      ["hallo","ˈhalo","hello"],
      ["guten Morgen","ˈɡuːtn̩ ˈmɔʁɡn̩","good morning"],
      ["guten Tag","ˈɡuːtn̩ taːk","good day / hello"],
      ["guten Abend","ˈɡuːtn̩ ˈaːbn̩t","good evening"],
      ["gute Nacht","ˈɡuːtə naxt","good night"],
      ["tschüss","tʃʏs","bye"],
      ["auf Wiedersehen","aʊf ˈviːdɐzeːən","goodbye"],
      ["danke","ˈdaŋkə","thank you"],
      ["bitte","ˈbɪtə","please / you're welcome"],
      ["Entschuldigung","ɛntˈʃʊldɪɡʊŋ","excuse me / sorry"],
      ["ja","jaː","yes"],
      ["nein","naɪn","no"],
      ["vielleicht","fiˈlaɪçt","maybe"]
    ]),
    pronouns: vocabCards("de-pronouns", "A1", [
      ["ich","ɪç","I"],
      ["du","duː","you (informal)"],
      ["Sie","ziː","you (formal)"],
      ["er","eːɐ̯","he"],
      ["sie","ziː","she / they"],
      ["es","ɛs","it"],
      ["wir","viːɐ̯","we"],
      ["ihr","iːɐ̯","you all"]
    ]),
    numbers: vocabCards("de-numbers", "A1", [
      ["eins","aɪns","one"],
      ["zwei","tsvaɪ","two"],
      ["drei","draɪ","three"],
      ["vier","fiːɐ̯","four"],
      ["fünf","fʏnf","five"],
      ["sechs","zɛks","six"],
      ["sieben","ˈziːbn̩","seven"],
      ["acht","axt","eight"],
      ["neun","nɔʏn","nine"],
      ["zehn","tseːn","ten"],
      ["hundert","ˈhʊndɐt","hundred"],
      ["tausend","ˈtaʊzn̩t","thousand"]
    ]),
    family: vocabCards("de-family", "A1", [
      ["die Familie","faˈmiːliə","family"],
      ["der Vater","ˈfaːtɐ","father"],
      ["die Mutter","ˈmʊtɐ","mother"],
      ["der Bruder","ˈbruːdɐ","brother"],
      ["die Schwester","ˈʃvɛstɐ","sister"],
      ["der Sohn","zoːn","son"],
      ["die Tochter","ˈtɔxtɐ","daughter"],
      ["das Kind","kɪnt","child"],
      ["der Freund","frɔʏnt","friend (m.)"],
      ["die Freundin","ˈfrɔʏndɪn","friend (f.)"],
      ["der Hund","hʊnt","dog"],
      ["die Katze","ˈkatsə","cat"]
    ]),
    foodA1: vocabCards("de-food-a1", "A1", [
      ["das Wasser","ˈvasɐ","water"],
      ["das Brot","broːt","bread"],
      ["die Milch","mɪlç","milk"],
      ["der Kaffee","ˈkafeː","coffee"],
      ["der Tee","teː","tea"],
      ["der Reis","raɪs","rice"],
      ["der Apfel","ˈapfl̩","apple"],
      ["das Ei","aɪ","egg"],
      ["der Fisch","fɪʃ","fish"],
      ["der Käse","ˈkɛːzə","cheese"],
      ["das Fleisch","flaɪʃ","meat"],
      ["das Gemüse","ɡəˈmyːzə","vegetable"]
    ]),
    verbsA1: vocabCards("de-verbs-a1", "A1", [
      ["sein","zaɪn","to be"],
      ["haben","ˈhaːbn̩","to have"],
      ["essen","ˈɛsn̩","to eat"],
      ["trinken","ˈtrɪŋkn̩","to drink"],
      ["gehen","ˈɡeːən","to go"],
      ["kommen","ˈkɔmən","to come"],
      ["sehen","ˈzeːən","to see"],
      ["sprechen","ˈʃpʁɛçn̩","to speak"],
      ["lesen","ˈleːzn̩","to read"],
      ["schreiben","ˈʃraɪbn̩","to write"],
      ["machen","ˈmaxn̩","to do / make"],
      ["mögen","ˈmøːɡn̩","to like"]
    ]),
    adjA1: vocabCards("de-adj-a1", "A1", [
      ["groß","ɡroːs","big / tall"],
      ["klein","klaɪn","small"],
      ["gut","ɡuːt","good"],
      ["schlecht","ʃlɛçt","bad"],
      ["schön","ʃøːn","beautiful"],
      ["hässlich","ˈhɛslɪç","ugly"],
      ["heiß","haɪs","hot"],
      ["kalt","kalt","cold"],
      ["glücklich","ˈɡlʏklɪç","happy"],
      ["traurig","ˈtraʊrɪç","sad"],
      ["neu","nɔʏ","new"],
      ["alt","alt","old"]
    ]),

    // ── A2 ──
    routinesA2: vocabCards("de-rout-a2", "A2", [
      ["aufstehen","ˈaʊfʃteːən","to get up"],
      ["frühstücken","ˈfryːʃtʏkn̩","to have breakfast"],
      ["arbeiten","ˈarbaɪtn̩","to work"],
      ["lernen","ˈlɛrnən","to learn / study"],
      ["schlafen","ˈʃlaːfn̩","to sleep"],
      ["duschen","ˈduːʃn̩","to shower"],
      ["kochen","ˈkɔxn̩","to cook"],
      ["einkaufen","ˈaɪnkaʊfn̩","to go shopping"]
    ]),
    placesA2: vocabCards("de-places-a2", "A2", [
      ["das Haus","haʊs","house"],
      ["die Wohnung","ˈvoːnʊŋ","apartment"],
      ["die Schule","ˈʃuːlə","school"],
      ["die Arbeit","ˈarbaɪt","work"],
      ["das Restaurant","rɛstoˈrɑ̃ː","restaurant"],
      ["das Krankenhaus","ˈkraŋkn̩haʊs","hospital"],
      ["der Bahnhof","ˈbaːnhoːf","train station"],
      ["der Supermarkt","ˈzuːpɐmarkt","supermarket"]
    ]),

    // ── B1 ──
    travelB1: vocabCards("de-travel-b1", "B1", [
      ["die Reise","ˈraɪzə","trip"],
      ["der Flughafen","ˈfluːkhaːfn̩","airport"],
      ["der Koffer","ˈkɔfɐ","suitcase"],
      ["das Hotel","hoˈtɛl","hotel"],
      ["die Fahrkarte","ˈfaːɐ̯kartə","ticket"],
      ["die Reservierung","rezɛrˈviːrʊŋ","reservation"],
      ["die Ankunft","ˈankʊnft","arrival"],
      ["die Abfahrt","ˈapfaːɐ̯t","departure"]
    ]),
    opinionsB1: vocabCards("de-opin-b1", "B1", [
      ["glauben","ˈɡlaʊbn̩","to believe"],
      ["denken","ˈdɛŋkn̩","to think"],
      ["meinen","ˈmaɪnən","to mean / think"],
      ["zustimmen","ˈtsuːʃtɪmən","to agree"],
      ["ablehnen","ˈapleːnən","to reject"],
      ["die Meinung","ˈmaɪnʊŋ","opinion"],
      ["wahrscheinlich","varˈʃaɪnlɪç","probably"]
    ]),

    // ── B2 ──
    abstractB2: vocabCards("de-abs-b2", "B2", [
      ["die Herausforderung","hɛˈraʊsfɔrdərʊŋ","challenge"],
      ["die Gelegenheit","ɡəˈleːɡn̩haɪt","opportunity"],
      ["die Folge","ˈfɔlɡə","consequence"],
      ["nachhaltig","ˈnaːxhaltɪç","sustainable"],
      ["die Auseinandersetzung","aʊsʔaɪˈnandɐzɛtsʊŋ","debate / conflict"],
      ["der Zusammenhang","tsuˈzamənhaŋ","context / connection"]
    ]),
    phrasalB2: vocabCards("de-sep-b2", "B2", [
      ["nachschlagen","ˈnaːxʃlaːɡn̩","to look up"],
      ["aufgeben","ˈaʊfɡeːbn̩","to give up"],
      ["verschieben","fɛɐ̯ˈʃiːbn̩","to postpone"],
      ["herausfinden","hɛˈraʊsfɪndn̩","to find out"],
      ["teilnehmen","ˈtaɪlneːmən","to take part"]
    ]),

    // ── C1 ──
    nuanceC1: vocabCards("de-nu-c1", "C1", [
      ["die Nuance","ˈnyãːsə","nuance"],
      ["abmildern","ˈapmɪldɐn","to mitigate"],
      ["pragmatisch","praɡˈmaːtɪʃ","pragmatic"],
      ["mehrdeutig","ˈmeːɐ̯dɔʏtɪç","ambiguous"],
      ["differenziert","dɪfərɛnˈtsiːɐt","nuanced / differentiated"]
    ]),
    idiomsC1: vocabCards("de-idi-c1", "C1", [
      ["Tomaten auf den Augen haben","","to be oblivious (lit. tomatoes on the eyes)"],
      ["die Daumen drücken","","to keep fingers crossed"],
      ["ins Gras beißen","","to kick the bucket"],
      ["jemandem auf den Keks gehen","","to get on someone's nerves"],
      ["die Katze im Sack kaufen","","to buy a pig in a poke"]
    ]),

    // ── C2 ──
    masteryC2: vocabCards("de-mast-c2", "C2", [
      ["allgegenwärtig","ˈalɡeːɡn̩vɛrtɪç","ubiquitous"],
      ["vergänglich","fɛɐ̯ˈɡɛŋlɪç","ephemeral"],
      ["widerspenstig","ˈviːdɐʃpɛnstɪç","recalcitrant"],
      ["verkörpern","fɛɐ̯ˈkœrpɐn","to epitomize"],
      ["unabdingbar","ʊnʔapˈdɪŋbaːɐ̯","indispensable"]
    ])
  };

  const GRAMMAR = [
    {
      id: "de-g-sein", level: "A1",
      title: "sein / haben — to be / to have",
      intro: "<b>sein</b> conjugates ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie sind.<br><b>haben</b>: ich habe, du hast, er hat, wir haben, ihr habt, sie haben.",
      examples: [
        { jp: "Ich bin Student.", en: "I am a student.", de: "" },
        { jp: "Sie ist müde.", en: "She is tired.", de: "" },
        { jp: "Wir haben Zeit.", en: "We have time.", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Du ___ nett.", choices: ["bin","bist","ist","sind"], answer: "bist" },
        { type: "mc", q: "Ich ___ einen Hund.", choices: ["habe","hast","hat","haben"], answer: "habe" }
      ]
    },
    {
      id: "de-g-articles", level: "A1",
      title: "der / die / das — gendered articles",
      intro: "Every German noun has a gender: <b>der</b> (m), <b>die</b> (f), <b>das</b> (n). Plurals always use <b>die</b>.",
      examples: [
        { jp: "der Mann", en: "the man (m)", de: "" },
        { jp: "die Frau", en: "the woman (f)", de: "" },
        { jp: "das Kind", en: "the child (n)", de: "" }
      ],
      quiz: [
        { type: "mc", q: "___ Apfel (m)", choices: ["der","die","das","den"], answer: "der" },
        { type: "mc", q: "___ Katze (f)", choices: ["der","die","das","dem"], answer: "die" }
      ]
    },
    {
      id: "de-g-present", level: "A1",
      title: "Present tense (regular verbs)",
      intro: "Drop -en, add: <b>-e, -st, -t, -en, -t, -en</b>. machen → ich mache, du machst, er macht …",
      examples: [
        { jp: "Ich spiele Fußball.", en: "I play football.", de: "" },
        { jp: "Du lernst Deutsch.", en: "You learn German.", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Er ___ (kommen).", choices: ["komme","kommst","kommt","kommen"], answer: "kommt" }
      ]
    },
    {
      id: "de-g-akkusativ", level: "A2",
      title: "Accusative case",
      intro: "The direct object takes the accusative. Masculine <b>der → den</b>; die/das/plural stay the same.",
      examples: [
        { jp: "Ich sehe den Mann.", en: "I see the man.", de: "" },
        { jp: "Sie kauft einen Apfel.", en: "She buys an apple.", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Ich habe ___ Hund (m).", choices: ["einen","ein","eine","einem"], answer: "einen" }
      ]
    },
    {
      id: "de-g-perfekt", level: "B1",
      title: "Perfekt (past tense)",
      intro: "Spoken past = <b>haben/sein + Partizip II</b>. gemacht, gegangen, gesehen … Motion/change verbs use <b>sein</b>.",
      examples: [
        { jp: "Ich habe gegessen.", en: "I have eaten / I ate.", de: "" },
        { jp: "Er ist gegangen.", en: "He has gone / he went.", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Wir ___ nach Berlin gefahren.", choices: ["sind","haben","ist","hat"], answer: "sind" }
      ]
    },
    {
      id: "de-g-dativ", level: "B1",
      title: "Dative case",
      intro: "Indirect object / after certain prepositions (mit, nach, aus, bei, von, zu). der→dem, die→der, das→dem, plural→den (+n).",
      examples: [
        { jp: "Ich gebe dem Kind das Buch.", en: "I give the child the book.", de: "" },
        { jp: "Sie fährt mit dem Bus.", en: "She goes by bus.", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Ich helfe ___ Frau (f).", choices: ["der","die","dem","den"], answer: "der" }
      ]
    },
    {
      id: "de-g-modal", level: "B2",
      title: "Modal verbs",
      intro: "können, müssen, wollen, sollen, dürfen, mögen. Modal conjugated, main verb infinitive at the end.",
      examples: [
        { jp: "Ich kann schwimmen.", en: "I can swim.", de: "" },
        { jp: "Du musst lernen.", en: "You have to study.", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Wir ___ heute arbeiten.", choices: ["müssen","muss","musst","müsst"], answer: "müssen" }
      ]
    },
    {
      id: "de-g-konjunktiv", level: "C1",
      title: "Konjunktiv II (would / hypothetical)",
      intro: "Polite / unreal: <b>würde + Infinitiv</b>, or hätte/wäre/könnte. „Ich würde gern…“",
      examples: [
        { jp: "Ich würde gern kommen.", en: "I would like to come.", de: "" },
        { jp: "Wenn ich Zeit hätte, …", en: "If I had time, …", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Ich ___ gern einen Kaffee.", choices: ["würde","wurde","werde","worden"], answer: "würde" }
      ]
    }
  ];

  function lesson(id, title, type, payload) { return { id, title, type, ...payload }; }
  const UNITS = [
    { id: "de-u-greet1", level: "A1", title: "Greetings", icon: "👋", color: "#fde68a", lessons: [
      lesson("de-l-greet-v","Hello & basics", "flashcards", { cards: VOCAB.greetings.slice(0, 7) }),
      lesson("de-l-greet-v2","Polite phrases","flashcards", { cards: VOCAB.greetings.slice(7) }),
      lesson("de-l-greet-q","Greetings quiz","quiz", { cards: VOCAB.greetings })
    ]},
    { id: "de-u-pron1", level: "A1", title: "Pronouns & sein/haben", icon: "🧑", color: "#fbcfe8", lessons: [
      lesson("de-l-pron-v","Pronouns",  "flashcards", { cards: VOCAB.pronouns }),
      lesson("de-l-be-g","sein / haben","grammar",    { grammarId: "de-g-sein" }),
      lesson("de-l-art-g","der/die/das","grammar",    { grammarId: "de-g-articles" })
    ]},
    { id: "de-u-num1", level: "A1", title: "Numbers", icon: "🔢", color: "#bae6fd", lessons: [
      lesson("de-l-num-v","1 to 1000","flashcards", { cards: VOCAB.numbers }),
      lesson("de-l-num-q","Quiz",     "quiz",       { cards: VOCAB.numbers })
    ]},
    { id: "de-u-fam1", level: "A1", title: "Family", icon: "👨‍👩‍👧", color: "#fbb6ce", lessons: [
      lesson("de-l-fam-v","Family", "flashcards", { cards: VOCAB.family }),
      lesson("de-l-fam-q","Quiz",   "quiz",       { cards: VOCAB.family })
    ]},
    { id: "de-u-food1", level: "A1", title: "Food & drink", icon: "🥨", color: "#fed7aa", lessons: [
      lesson("de-l-food-v","Food vocab", "flashcards", { cards: VOCAB.foodA1 }),
      lesson("de-l-food-q","Quiz",       "quiz",       { cards: VOCAB.foodA1 })
    ]},
    { id: "de-u-verb1", level: "A1", title: "Basic verbs", icon: "🏃", color: "#a7f3d0", lessons: [
      lesson("de-l-verb-v","Verbs",   "flashcards", { cards: VOCAB.verbsA1 }),
      lesson("de-l-pres-g","Present tense","grammar",  { grammarId: "de-g-present" })
    ]},
    { id: "de-u-adj1", level: "A1", title: "Adjectives", icon: "🌈", color: "#bbf7d0", lessons: [
      lesson("de-l-adj-v","Adjectives","flashcards", { cards: VOCAB.adjA1 })
    ]},
    // A2
    { id: "de-u-rout2", level: "A2", title: "Daily routines", icon: "☕", color: "#fde68a", lessons: [
      lesson("de-l-rout-v","Routines","flashcards", { cards: VOCAB.routinesA2 }),
      lesson("de-l-akk-g","Accusative case","grammar", { grammarId: "de-g-akkusativ" })
    ]},
    { id: "de-u-place2", level: "A2", title: "Places", icon: "🏠", color: "#bae6fd", lessons: [
      lesson("de-l-place-v","Places","flashcards", { cards: VOCAB.placesA2 })
    ]},
    // B1
    { id: "de-u-travel-b1", level: "B1", title: "Travel", icon: "✈️", color: "#fbcfe8", lessons: [
      lesson("de-l-travel-v","Travel vocab","flashcards", { cards: VOCAB.travelB1 }),
      lesson("de-l-perf-g","Perfekt",      "grammar",    { grammarId: "de-g-perfekt" }),
      lesson("de-l-dat-g","Dative case",   "grammar",    { grammarId: "de-g-dativ" })
    ]},
    { id: "de-u-opin-b1", level: "B1", title: "Opinions", icon: "💭", color: "#c7d2fe", lessons: [
      lesson("de-l-opin-v","Opinion verbs","flashcards", { cards: VOCAB.opinionsB1 })
    ]},
    // B2
    { id: "de-u-abs-b2", level: "B2", title: "Abstract topics", icon: "🧠", color: "#ddd6fe", lessons: [
      lesson("de-l-abs-v","Abstract vocab","flashcards", { cards: VOCAB.abstractB2 }),
      lesson("de-l-modal-g","Modal verbs", "grammar",    { grammarId: "de-g-modal" })
    ]},
    { id: "de-u-sep-b2", level: "B2", title: "Separable verbs", icon: "🔁", color: "#bae6fd", lessons: [
      lesson("de-l-sep-v","Separable verbs", "flashcards", { cards: VOCAB.phrasalB2 })
    ]},
    // C1
    { id: "de-u-nu-c1", level: "C1", title: "Nuance", icon: "🎯", color: "#fbcfe8", lessons: [
      lesson("de-l-nu-v","Nuanced vocab","flashcards", { cards: VOCAB.nuanceC1 }),
      lesson("de-l-konj-g","Konjunktiv II","grammar",  { grammarId: "de-g-konjunktiv" })
    ]},
    { id: "de-u-idi-c1", level: "C1", title: "Idioms", icon: "🍺", color: "#fed7aa", lessons: [
      lesson("de-l-idi-v","Idioms","flashcards", { cards: VOCAB.idiomsC1 })
    ]},
    // C2
    { id: "de-u-mast-c2", level: "C2", title: "Mastery", icon: "🏆", color: "#f9a8d4", lessons: [
      lesson("de-l-mast-v","Mastery vocab","flashcards", { cards: VOCAB.masteryC2 })
    ]}
  ];

  const ALL_CARDS = [];
  Object.values(VOCAB).forEach((arr) => arr.forEach((c) => ALL_CARDS.push(c)));

  return {
    VOCAB, GRAMMAR, UNITS, ALL_CARDS,
    grammarById: (id) => GRAMMAR.find((g) => g.id === id),
    cardById: (id) => ALL_CARDS.find((c) => c.id === id)
  };
})();
