// English content - CEFR A1 to C2
window.DATA_EN = (function () {

  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "en:vocab:" + deck + ":" + it[0],
      lang: "en",
      level,
      deck,
      type: "vocab",
      jp: it[0],
      kana: it[1] || "",
      romaji: it[1] || "",
      en: it[2],
      de: DE_VOCAB[it[0]] || "",
      front: it[0], back: it[2], hint: it[1] || "",
      speakText: it[0]
    }));
  }
  const DE_VOCAB = {
    "hello":"hallo","hi":"hi","good morning":"guten Morgen","good evening":"guten Abend",
    "good night":"gute Nacht","goodbye":"auf Wiedersehen","thank you":"danke",
    "sorry":"Entschuldigung","please":"bitte","yes":"ja","no":"nein",
    "I":"ich","you":"du / Sie","he":"er","she":"sie","it":"es","we":"wir","they":"sie (Pl.)",
    "one":"eins","two":"zwei","three":"drei","four":"vier","five":"fünf",
    "six":"sechs","seven":"sieben","eight":"acht","nine":"neun","ten":"zehn",
    "mother":"Mutter","father":"Vater","sister":"Schwester","brother":"Bruder",
    "son":"Sohn","daughter":"Tochter","family":"Familie","friend":"Freund/in",
    "water":"Wasser","bread":"Brot","rice":"Reis","apple":"Apfel","egg":"Ei",
    "milk":"Milch","coffee":"Kaffee","tea":"Tee","fish":"Fisch",
    "to be":"sein","to have":"haben","to eat":"essen","to drink":"trinken",
    "to go":"gehen","to come":"kommen","to see":"sehen","to like":"mögen",
    "big":"groß","small":"klein","good":"gut","bad":"schlecht","happy":"glücklich",
    "sad":"traurig","hot":"heiß","cold":"kalt",
    // A2 routines & shopping
    "wake up":"aufwachen","get dressed":"sich anziehen","have breakfast":"frühstücken",
    "go to work":"zur Arbeit gehen","come home":"nach Hause kommen",
    "take a shower":"duschen","go to bed":"ins Bett gehen",
    "shop":"Geschäft","buy":"kaufen","sell":"verkaufen","price":"Preis",
    "cheap":"billig","expensive":"teuer","receipt":"Quittung","cash":"Bargeld","card":"Karte",
    // B1 travel & opinions
    "flight":"Flug","luggage":"Gepäck","passport":"Reisepass","delay":"Verspätung",
    "reservation":"Reservierung","destination":"Ziel","souvenir":"Souvenir",
    "agree":"zustimmen","disagree":"widersprechen","maybe":"vielleicht",
    "probably":"wahrscheinlich","definitely":"definitiv","I think":"ich denke","actually":"eigentlich",
    // B2 abstract & phrasals
    "challenge":"Herausforderung","opportunity":"Gelegenheit","assumption":"Annahme",
    "consequence":"Konsequenz","controversy":"Kontroverse","sustainable":"nachhaltig",
    "look up":"nachschlagen","give up":"aufgeben","put off":"verschieben",
    "come across":"zufällig finden","bring about":"verursachen",
    // C1 nuance & idioms
    "nuance":"Nuance","mitigate":"abmildern","scrutinize":"genau prüfen",
    "pragmatic":"pragmatisch","ambiguous":"mehrdeutig",
    "a piece of cake":"ein Kinderspiel","break the ice":"das Eis brechen",
    "hit the books":"büffeln","under the weather":"unpässlich","spill the beans":"das Geheimnis verraten",
    // C2 mastery
    "ubiquitous":"allgegenwärtig","serendipity":"glücklicher Zufall",
    "ephemeral":"vergänglich","recalcitrant":"widerspenstig","epitomize":"verkörpern"
  };

  const VOCAB = {
    // ── A1 ──
    greetings: vocabCards("en-greetings", "A1", [
      ["hello","həˈloʊ","a friendly greeting"],
      ["hi","haɪ","casual hello"],
      ["good morning","ɡʊd ˈmɔːrnɪŋ","greeting in the morning"],
      ["good evening","ɡʊd ˈiːvnɪŋ","greeting in the evening"],
      ["good night","ɡʊd naɪt","said before going to sleep"],
      ["goodbye","ɡʊdˈbaɪ","what you say when leaving"],
      ["thank you","θæŋk juː","expression of gratitude"],
      ["sorry","ˈsɒri","an apology"],
      ["please","pliːz","polite request word"],
      ["yes","jɛs","affirmative"],
      ["no","noʊ","negative"]
    ]),
    pronouns: vocabCards("en-pronouns", "A1", [
      ["I","aɪ","first person singular"],
      ["you","juː","second person"],
      ["he","hiː","third person male"],
      ["she","ʃiː","third person female"],
      ["it","ɪt","third person object"],
      ["we","wiː","first person plural"],
      ["they","ðeɪ","third person plural"]
    ]),
    numbers: vocabCards("en-numbers", "A1", [
      ["one","wʌn","1"],
      ["two","tuː","2"],
      ["three","θriː","3"],
      ["four","fɔːr","4"],
      ["five","faɪv","5"],
      ["six","sɪks","6"],
      ["seven","ˈsɛvən","7"],
      ["eight","eɪt","8"],
      ["nine","naɪn","9"],
      ["ten","tɛn","10"]
    ]),
    family: vocabCards("en-family", "A1", [
      ["mother","ˈmʌðər","female parent"],
      ["father","ˈfɑːðər","male parent"],
      ["sister","ˈsɪstər","female sibling"],
      ["brother","ˈbrʌðər","male sibling"],
      ["son","sʌn","male child"],
      ["daughter","ˈdɔːtər","female child"],
      ["family","ˈfæmɪli","group of relatives"],
      ["friend","frɛnd","someone you like"]
    ]),
    foodA1: vocabCards("en-food-a1", "A1", [
      ["water","ˈwɔːtər","clear drink"],
      ["bread","brɛd","baked food from flour"],
      ["rice","raɪs","staple grain"],
      ["apple","ˈæpəl","red/green fruit"],
      ["egg","ɛɡ","oval food from a bird"],
      ["milk","mɪlk","white drink from cows"],
      ["coffee","ˈkɒfi","hot caffeinated drink"],
      ["tea","tiː","hot drink from leaves"],
      ["fish","fɪʃ","aquatic animal as food"]
    ]),
    verbsA1: vocabCards("en-verbs-a1", "A1", [
      ["to be","tuː biː","exist / equals"],
      ["to have","tuː hæv","to possess"],
      ["to eat","tuː iːt","consume food"],
      ["to drink","tuː drɪŋk","consume liquid"],
      ["to go","tuː ɡoʊ","move to a place"],
      ["to come","tuː kʌm","move toward speaker"],
      ["to see","tuː siː","perceive with eyes"],
      ["to like","tuː laɪk","find pleasant"]
    ]),
    adjA1: vocabCards("en-adj-a1", "A1", [
      ["big","bɪɡ","large in size"],
      ["small","smɔːl","little in size"],
      ["good","ɡʊd","positive quality"],
      ["bad","bæd","negative quality"],
      ["happy","ˈhæpi","feeling joy"],
      ["sad","sæd","feeling sorrow"],
      ["hot","hɒt","high temperature"],
      ["cold","koʊld","low temperature"]
    ]),

    // ── A2 ──
    routinesA2: vocabCards("en-routines-a2", "A2", [
      ["wake up","weɪk ʌp","stop sleeping"],
      ["get dressed","ɡɛt drɛst","put on clothes"],
      ["have breakfast","hæv ˈbrɛkfəst","morning meal"],
      ["go to work","ɡoʊ tuː wɜːrk","head to job"],
      ["come home","kʌm hoʊm","return to your house"],
      ["take a shower","teɪk ə ˈʃaʊər","wash your body"],
      ["go to bed","ɡoʊ tuː bɛd","go to sleep"]
    ]),
    shoppingA2: vocabCards("en-shop-a2", "A2", [
      ["shop","ʃɒp","place to buy things"],
      ["buy","baɪ","obtain by paying"],
      ["sell","sɛl","exchange for money"],
      ["price","praɪs","cost of an item"],
      ["cheap","tʃiːp","low priced"],
      ["expensive","ɪkˈspɛnsɪv","high priced"],
      ["receipt","rɪˈsiːt","proof of payment"],
      ["cash","kæʃ","physical money"],
      ["card","kɑːrd","payment card"]
    ]),

    // ── B1 ──
    travelB1: vocabCards("en-travel-b1", "B1", [
      ["flight","flaɪt","airplane journey"],
      ["luggage","ˈlʌɡɪdʒ","bags and suitcases"],
      ["passport","ˈpɑːspɔːrt","travel document"],
      ["delay","dɪˈleɪ","late arrival"],
      ["reservation","ˌrɛzərˈveɪʃən","booking"],
      ["destination","ˌdɛstəˈneɪʃən","where you're going"],
      ["souvenir","ˌsuːvəˈnɪər","memento bought while traveling"]
    ]),
    opinionsB1: vocabCards("en-opinion-b1", "B1", [
      ["agree","əˈɡriː","share an opinion"],
      ["disagree","ˌdɪsəˈɡriː","not share an opinion"],
      ["maybe","ˈmeɪbi","perhaps"],
      ["probably","ˈprɒbəbli","most likely"],
      ["definitely","ˈdɛfɪnətli","without doubt"],
      ["I think","aɪ θɪŋk","in my opinion"],
      ["actually","ˈæktʃuəli","in fact"]
    ]),

    // ── B2 ──
    abstractB2: vocabCards("en-abs-b2", "B2", [
      ["challenge","ˈtʃælɪndʒ","difficult task"],
      ["opportunity","ˌɒpərˈtjuːnɪti","favorable chance"],
      ["assumption","əˈsʌmpʃən","thing believed without proof"],
      ["consequence","ˈkɒnsɪkwəns","result of an action"],
      ["controversy","ˈkɒntrəvɜːrsi","public disagreement"],
      ["sustainable","səˈsteɪnəbəl","able to continue long-term"]
    ]),
    phrasalB2: vocabCards("en-phrasal-b2", "B2", [
      ["look up","lʊk ʌp","search for information"],
      ["give up","ɡɪv ʌp","stop trying"],
      ["put off","pʊt ɒf","postpone"],
      ["come across","kʌm əˈkrɒs","find unexpectedly"],
      ["bring about","brɪŋ əˈbaʊt","cause to happen"]
    ]),

    // ── C1 ──
    nuanceC1: vocabCards("en-nuance-c1", "C1", [
      ["nuance","ˈnjuːɑːns","subtle difference"],
      ["mitigate","ˈmɪtɪɡeɪt","make less severe"],
      ["scrutinize","ˈskruːtəˌnaɪz","examine closely"],
      ["pragmatic","præɡˈmætɪk","practical, results-oriented"],
      ["ambiguous","æmˈbɪɡjuəs","open to interpretation"]
    ]),
    idiomsC1: vocabCards("en-idioms-c1", "C1", [
      ["a piece of cake","ə piːs ʌv keɪk","very easy"],
      ["break the ice","breɪk ði aɪs","start a conversation"],
      ["hit the books","hɪt ðə bʊks","study hard"],
      ["under the weather","ˈʌndər ðə ˈwɛðər","feeling ill"],
      ["spill the beans","spɪl ðə biːnz","reveal a secret"]
    ]),

    // ── C2 ──
    masteryC2: vocabCards("en-mast-c2", "C2", [
      ["ubiquitous","juːˈbɪkwɪtəs","present everywhere"],
      ["serendipity","ˌsɛrənˈdɪpəti","fortunate happenstance"],
      ["ephemeral","ɪˈfɛmərəl","lasting a very short time"],
      ["recalcitrant","rɪˈkælsɪtrənt","stubbornly uncooperative"],
      ["epitomize","ɪˈpɪtəˌmaɪz","be a perfect example of"]
    ])
  };

  const GRAMMAR = [
    {
      id: "en-g-be", level: "A1",
      title: "Verb \"to be\" — am / is / are",
      intro: "Use <b>am</b> with I, <b>is</b> with he/she/it, <b>are</b> with you/we/they. \"To be\" describes who or what someone is.",
      examples: [
        { jp: "I am a student.", en: "(present)", breakdown: "I + am + noun" },
        { jp: "She is happy.", en: "", breakdown: "She + is + adjective" },
        { jp: "We are friends.", en: "", breakdown: "We + are + plural noun" }
      ],
      quiz: [
        { type: "mc", q: "She ___ a teacher.", choices: ["am","is","are","be"], answer: "is" },
        { type: "mc", q: "We ___ tired.", choices: ["am","is","are","be"], answer: "are" }
      ]
    },
    {
      id: "en-g-articles", level: "A1",
      title: "Articles: a, an, the",
      intro: "Use <b>a</b> before consonant sounds, <b>an</b> before vowel sounds. Use <b>the</b> for specific things.",
      examples: [
        { jp: "I have a dog.", en: "" , breakdown: "a + consonant" },
        { jp: "She is an artist.", en: "", breakdown: "an + vowel" },
        { jp: "The book is on the table.", en: "", breakdown: "the + specific" }
      ],
      quiz: [
        { type: "mc", q: "I ate ___ apple.", choices: ["a","an","the","-"], answer: "an" },
        { type: "mc", q: "I bought ___ car.", choices: ["a","an","the","-"], answer: "a" }
      ]
    },
    {
      id: "en-g-present", level: "A1",
      title: "Present simple",
      intro: "Use the base form. Add <b>-s</b> for he/she/it. Used for habits, facts, routines.",
      examples: [
        { jp: "I drink coffee every day.", en: "", breakdown: "habit" },
        { jp: "She likes cats.", en: "", breakdown: "she + verb-s" }
      ],
      quiz: [
        { type: "mc", q: "He ___ to school.", choices: ["go","goes","going","went"], answer: "goes" }
      ]
    },
    {
      id: "en-g-past", level: "A2",
      title: "Past simple",
      intro: "Use <b>-ed</b> for regular verbs. Many verbs are irregular (go→went, eat→ate, see→saw).",
      examples: [
        { jp: "I worked yesterday.", en: "", breakdown: "regular -ed" },
        { jp: "She went to Tokyo last week.", en: "", breakdown: "irregular" }
      ],
      quiz: [
        { type: "mc", q: "Past of \"eat\"?", choices: ["eated","ate","eaten","eats"], answer: "ate" }
      ]
    },
    {
      id: "en-g-perfect", level: "B1",
      title: "Present perfect",
      intro: "Use <b>have/has + past participle</b> for actions connecting past and present (with \"ever\", \"never\", \"already\", \"yet\").",
      examples: [
        { jp: "I have visited Paris.", en: "", breakdown: "experience" },
        { jp: "She has just arrived.", en: "", breakdown: "recent past" }
      ],
      quiz: [
        { type: "mc", q: "I ___ already eaten.", choices: ["have","has","had","has been"], answer: "have" }
      ]
    },
    {
      id: "en-g-cond", level: "B1",
      title: "First conditional",
      intro: "<b>If + present, will + base verb</b>. Real future possibilities.",
      examples: [
        { jp: "If it rains, I will stay home.", en: "", breakdown: "If + present + will" }
      ],
      quiz: [
        { type: "mc", q: "If you study, you ___ pass.", choices: ["will","would","are","have"], answer: "will" }
      ]
    },
    {
      id: "en-g-modals", level: "B2",
      title: "Modal verbs",
      intro: "Modals (can, could, must, should, may, might) express ability, possibility, obligation, advice.",
      examples: [
        { jp: "You should rest.", en: "", breakdown: "advice" },
        { jp: "She might come.", en: "", breakdown: "possibility" },
        { jp: "I must go.", en: "", breakdown: "obligation" }
      ],
      quiz: [
        { type: "mc", q: "Best for advice?", choices: ["should","must","can","may"], answer: "should" }
      ]
    },
    {
      id: "en-g-passive", level: "B2",
      title: "Passive voice",
      intro: "<b>be + past participle</b>. Focus on the receiver of the action.",
      examples: [
        { jp: "The book was written by her.", en: "", breakdown: "be + V-ed + by ..." }
      ],
      quiz: [
        { type: "mc", q: "Passive of \"They built it.\"?", choices: ["It was built","It is built","It were built","It built"], answer: "It was built" }
      ]
    },
    {
      id: "en-g-subjunctive", level: "C1",
      title: "Subjunctive (\"if I were\")",
      intro: "Use <b>were</b> (not was) for hypotheticals, even with I/he/she.",
      examples: [
        { jp: "If I were you, I would call.", en: "", breakdown: "If + were, would + base" }
      ],
      quiz: [
        { type: "mc", q: "If I ___ rich, I would travel.", choices: ["was","were","am","be"], answer: "were" }
      ]
    },
    {
      id: "en-g-inversion", level: "C2",
      title: "Inversion for emphasis",
      intro: "Place adverbials (Never, Hardly, Not only…) at the start, then invert subject and auxiliary.",
      examples: [
        { jp: "Never have I seen such a thing.", en: "", breakdown: "Never + aux + subject + V" }
      ],
      quiz: [
        { type: "mc", q: "Choose correct inversion:", choices: ["Never I have seen…","Never have I seen…","Never seen I have…","Never seen have I…"], answer: "Never have I seen…" }
      ]
    }
  ];

  function lesson(id, title, type, payload) { return { id, title, type, ...payload }; }
  const UNITS = [
    { id: "en-u-greet1", level: "A1", title: "Greetings", icon: "👋", color: "#bae6fd", lessons: [
      lesson("en-l-greet-v","Hello & basics", "flashcards", { cards: VOCAB.greetings.slice(0, 6) }),
      lesson("en-l-greet-v2","Polite phrases","flashcards", { cards: VOCAB.greetings.slice(6) }),
      lesson("en-l-greet-q","Greetings quiz","quiz", { cards: VOCAB.greetings })
    ]},
    { id: "en-u-pron1", level: "A1", title: "Pronouns & \"to be\"", icon: "🧑", color: "#fbcfe8", lessons: [
      lesson("en-l-pron-v","Pronouns", "flashcards", { cards: VOCAB.pronouns }),
      lesson("en-l-pron-g","\"to be\"",  "grammar",   { grammarId: "en-g-be" })
    ]},
    { id: "en-u-num1", level: "A1", title: "Numbers", icon: "🔢", color: "#fde68a", lessons: [
      lesson("en-l-num-v","1 to 10",   "flashcards", { cards: VOCAB.numbers }),
      lesson("en-l-num-q","Numbers quiz","quiz",     { cards: VOCAB.numbers })
    ]},
    { id: "en-u-fam1", level: "A1", title: "Family", icon: "👨‍👩‍👧", color: "#fbb6ce", lessons: [
      lesson("en-l-fam-v","Family", "flashcards", { cards: VOCAB.family }),
      lesson("en-l-fam-q","Quiz",   "quiz",       { cards: VOCAB.family })
    ]},
    { id: "en-u-food1", level: "A1", title: "Food & drink", icon: "🍞", color: "#fed7aa", lessons: [
      lesson("en-l-food-v","Common food",  "flashcards", { cards: VOCAB.foodA1 }),
      lesson("en-l-food-g","Articles",     "grammar",    { grammarId: "en-g-articles" }),
      lesson("en-l-food-q","Quiz",         "quiz",       { cards: VOCAB.foodA1 })
    ]},
    { id: "en-u-verb1", level: "A1", title: "Basic verbs", icon: "🏃", color: "#a7f3d0", lessons: [
      lesson("en-l-verb-v","Common verbs", "flashcards", { cards: VOCAB.verbsA1 }),
      lesson("en-l-verb-g","Present simple","grammar",   { grammarId: "en-g-present" })
    ]},
    { id: "en-u-adj1", level: "A1", title: "Adjectives", icon: "🌈", color: "#bbf7d0", lessons: [
      lesson("en-l-adj-v","Common adjectives", "flashcards", { cards: VOCAB.adjA1 })
    ]},

    // A2
    { id: "en-u-rout2", level: "A2", title: "Daily routines", icon: "☕", color: "#fde68a", lessons: [
      lesson("en-l-rout-v","Routines vocab", "flashcards", { cards: VOCAB.routinesA2 }),
      lesson("en-l-past-g","Past simple",    "grammar",    { grammarId: "en-g-past" })
    ]},
    { id: "en-u-shop2", level: "A2", title: "Shopping", icon: "🛍️", color: "#bae6fd", lessons: [
      lesson("en-l-shop-v","Shopping vocab", "flashcards", { cards: VOCAB.shoppingA2 }),
      lesson("en-l-shop-q","Quiz",            "quiz",      { cards: VOCAB.shoppingA2 })
    ]},

    // B1
    { id: "en-u-travel-b1", level: "B1", title: "Travel", icon: "✈️", color: "#fbcfe8", lessons: [
      lesson("en-l-travel-v","Travel vocab",    "flashcards", { cards: VOCAB.travelB1 }),
      lesson("en-l-perfect-g","Present perfect","grammar",     { grammarId: "en-g-perfect" }),
      lesson("en-l-cond-g","First conditional","grammar",      { grammarId: "en-g-cond" })
    ]},
    { id: "en-u-opin-b1", level: "B1", title: "Opinions", icon: "💭", color: "#c7d2fe", lessons: [
      lesson("en-l-opin-v","Opinion words", "flashcards", { cards: VOCAB.opinionsB1 })
    ]},

    // B2
    { id: "en-u-abs-b2", level: "B2", title: "Abstract topics", icon: "🧠", color: "#ddd6fe", lessons: [
      lesson("en-l-abs-v","Abstract vocab","flashcards", { cards: VOCAB.abstractB2 }),
      lesson("en-l-modal-g","Modal verbs", "grammar",    { grammarId: "en-g-modals" }),
      lesson("en-l-pass-g","Passive voice","grammar",    { grammarId: "en-g-passive" })
    ]},
    { id: "en-u-phrasal-b2", level: "B2", title: "Phrasal verbs", icon: "🔁", color: "#bae6fd", lessons: [
      lesson("en-l-phr-v","Phrasal verbs", "flashcards", { cards: VOCAB.phrasalB2 })
    ]},

    // C1
    { id: "en-u-nuance-c1", level: "C1", title: "Nuance & precision", icon: "🎯", color: "#fbcfe8", lessons: [
      lesson("en-l-nuance-v","Nuanced vocab","flashcards", { cards: VOCAB.nuanceC1 }),
      lesson("en-l-subj-g","Subjunctive",    "grammar",    { grammarId: "en-g-subjunctive" })
    ]},
    { id: "en-u-idiom-c1", level: "C1", title: "Idioms", icon: "🍰", color: "#fed7aa", lessons: [
      lesson("en-l-idi-v","Common idioms","flashcards", { cards: VOCAB.idiomsC1 })
    ]},

    // C2
    { id: "en-u-mast-c2", level: "C2", title: "Mastery vocab", icon: "🏆", color: "#f9a8d4", lessons: [
      lesson("en-l-mast-v","Sophisticated words", "flashcards", { cards: VOCAB.masteryC2 }),
      lesson("en-l-inv-g","Inversion for emphasis","grammar",    { grammarId: "en-g-inversion" })
    ]}
  ];

  // Curated example sentence pool with required-words tagging.
  // Each: { text, tr, req: [cardIds], introduces?: cardId }
  // Use cardIds for words appearing in the sentence (excluding the introduced word).
  const EXAMPLES = [
    { text: "Hello, my friend!", tr: "Greeting + friend",
      req: ["en:vocab:en-family:friend"],
      introduces: "en:vocab:en-greetings:hello" },
    { text: "Thank you, mother.", tr: "Polite gratitude",
      req: ["en:vocab:en-family:mother"],
      introduces: "en:vocab:en-greetings:thank you" },
    { text: "I have one apple.", tr: "Ownership of one item",
      req: ["en:vocab:en-numbers:one","en:vocab:en-food-a1:apple"],
      introduces: "en:vocab:en-pronouns:I" },
    { text: "He is happy.", tr: "Mood",
      req: ["en:vocab:en-pronouns:he","en:vocab:en-adj-a1:happy"],
      introduces: "en:vocab:en-verbs-a1:to be" },
    { text: "We eat bread.", tr: "Plural action",
      req: ["en:vocab:en-pronouns:we","en:vocab:en-food-a1:bread"],
      introduces: "en:vocab:en-verbs-a1:to eat" },
    { text: "I drink water.", tr: "Hydration!",
      req: ["en:vocab:en-pronouns:I","en:vocab:en-food-a1:water"],
      introduces: "en:vocab:en-verbs-a1:to drink" },
    { text: "She is my sister.", tr: "Family identification",
      req: ["en:vocab:en-pronouns:she","en:vocab:en-verbs-a1:to be","en:vocab:en-family:sister"],
      introduces: "en:vocab:en-pronouns:she" },
    { text: "I like coffee.", tr: "Preference",
      req: ["en:vocab:en-pronouns:I","en:vocab:en-food-a1:coffee"],
      introduces: "en:vocab:en-verbs-a1:to like" },
    { text: "Good morning, mother.", tr: "Morning greeting",
      req: ["en:vocab:en-family:mother"],
      introduces: "en:vocab:en-greetings:good morning" }
  ];

  const ALL_CARDS = [];
  Object.values(VOCAB).forEach((arr) => arr.forEach((c) => ALL_CARDS.push(c)));

  return {
    VOCAB, GRAMMAR, UNITS, EXAMPLES, ALL_CARDS,
    grammarById: (id) => GRAMMAR.find((g) => g.id === id),
    cardById: (id) => ALL_CARDS.find((c) => c.id === id)
  };
})();
