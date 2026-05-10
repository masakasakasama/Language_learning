// Spanish content - CEFR A1 to C2
window.DATA_ES = (function () {
  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "es:vocab:" + deck + ":" + it[0],
      lang: "es",
      level,
      deck,
      type: "vocab",
      jp: it[0], kana: it[1] || "", romaji: it[1] || "", en: it[2],
      front: it[0], back: it[2], hint: it[1] || "",
      speakText: it[0]
    }));
  }

  const VOCAB = {
    // ── A1 ──
    greetings: vocabCards("es-greetings", "A1", [
      ["hola","ˈo.la","hello"],
      ["buenos días","ˈbwe.nos ˈdi.as","good morning"],
      ["buenas tardes","ˈbwe.nas ˈtaɾ.ðes","good afternoon"],
      ["buenas noches","ˈbwe.nas ˈno.tʃes","good evening / good night"],
      ["adiós","aˈðjos","goodbye"],
      ["hasta luego","ˈas.ta ˈlwe.ɣo","see you later"],
      ["gracias","ˈɡɾa.sjas","thank you"],
      ["por favor","poɾ faˈβoɾ","please"],
      ["perdón","peɾˈðon","sorry / excuse me"],
      ["sí","si","yes"],
      ["no","no","no"]
    ]),
    pronouns: vocabCards("es-pronouns", "A1", [
      ["yo","jo","I"],
      ["tú","tu","you (informal)"],
      ["usted","usˈteð","you (formal)"],
      ["él","el","he"],
      ["ella","ˈe.ʝa","she"],
      ["nosotros","noˈso.tɾos","we"],
      ["vosotros","βoˈso.tɾos","you all (Spain)"],
      ["ellos","ˈe.ʝos","they"]
    ]),
    numbers: vocabCards("es-numbers", "A1", [
      ["uno","ˈu.no","one"],
      ["dos","dos","two"],
      ["tres","tɾes","three"],
      ["cuatro","ˈkwa.tɾo","four"],
      ["cinco","ˈsiŋ.ko","five"],
      ["seis","seis","six"],
      ["siete","ˈsje.te","seven"],
      ["ocho","ˈo.tʃo","eight"],
      ["nueve","ˈnwe.βe","nine"],
      ["diez","djes","ten"]
    ]),
    family: vocabCards("es-family", "A1", [
      ["familia","faˈmi.lja","family"],
      ["padre","ˈpa.ðɾe","father"],
      ["madre","ˈma.ðɾe","mother"],
      ["hermano","eɾˈma.no","brother"],
      ["hermana","eɾˈma.na","sister"],
      ["hijo","ˈi.xo","son"],
      ["hija","ˈi.xa","daughter"],
      ["amigo","aˈmi.ɣo","friend (m.)"],
      ["amiga","aˈmi.ɣa","friend (f.)"],
      ["perro","ˈpe.ro","dog"],
      ["gato","ˈɡa.to","cat"]
    ]),
    foodA1: vocabCards("es-food-a1", "A1", [
      ["agua","ˈa.ɣwa","water"],
      ["pan","pan","bread"],
      ["leche","ˈle.tʃe","milk"],
      ["café","kaˈfe","coffee"],
      ["té","te","tea"],
      ["arroz","aˈros","rice"],
      ["manzana","manˈsa.na","apple"],
      ["huevo","ˈwe.βo","egg"],
      ["pescado","pesˈka.ðo","fish"],
      ["queso","ˈke.so","cheese"]
    ]),
    verbsA1: vocabCards("es-verbs-a1", "A1", [
      ["ser","seɾ","to be (essential)"],
      ["estar","esˈtaɾ","to be (state)"],
      ["tener","teˈneɾ","to have"],
      ["comer","koˈmeɾ","to eat"],
      ["beber","beˈβeɾ","to drink"],
      ["ir","iɾ","to go"],
      ["venir","beˈniɾ","to come"],
      ["ver","beɾ","to see"],
      ["hablar","aˈβlaɾ","to speak"],
      ["leer","leˈeɾ","to read"]
    ]),
    adjA1: vocabCards("es-adj-a1", "A1", [
      ["grande","ˈɡɾan.de","big"],
      ["pequeño","peˈke.ɲo","small"],
      ["bueno","ˈbwe.no","good"],
      ["malo","ˈma.lo","bad"],
      ["bonito","boˈni.to","pretty"],
      ["feo","ˈfe.o","ugly"],
      ["caliente","kaˈljen.te","hot"],
      ["frío","ˈfɾi.o","cold"],
      ["feliz","feˈlis","happy"],
      ["triste","ˈtɾis.te","sad"]
    ]),

    // ── A2 ──
    routinesA2: vocabCards("es-rout-a2", "A2", [
      ["levantarse","le.βanˈtaɾ.se","to get up"],
      ["desayunar","de.sa.juˈnaɾ","to have breakfast"],
      ["trabajar","tɾa.βaˈxaɾ","to work"],
      ["estudiar","es.tuˈðjaɾ","to study"],
      ["dormir","doɾˈmiɾ","to sleep"],
      ["ducharse","duˈtʃaɾ.se","to shower"]
    ]),
    placesA2: vocabCards("es-places-a2", "A2", [
      ["casa","ˈka.sa","house / home"],
      ["escuela","esˈkwe.la","school"],
      ["trabajo","tɾaˈβa.xo","work"],
      ["restaurante","res.tau̯ˈɾan.te","restaurant"],
      ["hospital","os.piˈtal","hospital"],
      ["tienda","ˈtjen.da","shop"],
      ["parque","ˈpaɾ.ke","park"]
    ]),

    // ── B1 ──
    travelB1: vocabCards("es-travel-b1", "B1", [
      ["viaje","ˈbja.xe","trip"],
      ["aeropuerto","a.e.ɾoˈpweɾ.to","airport"],
      ["maleta","maˈle.ta","suitcase"],
      ["hotel","oˈtel","hotel"],
      ["billete","biˈʝe.te","ticket"],
      ["reserva","reˈseɾ.βa","reservation"],
      ["llegada","ʝeˈɣa.ða","arrival"]
    ]),
    opinionsB1: vocabCards("es-opin-b1", "B1", [
      ["creer","kɾeˈeɾ","to believe"],
      ["pensar","penˈsaɾ","to think"],
      ["estar de acuerdo","esˈtaɾ ðe aˈkweɾ.ðo","to agree"],
      ["quizás","kiˈsas","maybe"],
      ["seguramente","se.ɣuˈɾa.men.te","surely"]
    ]),

    // ── B2 ──
    abstractB2: vocabCards("es-abs-b2", "B2", [
      ["desafío","de.saˈfi.o","challenge"],
      ["oportunidad","o.poɾ.tu.niˈðað","opportunity"],
      ["consecuencia","kon.seˈkwen.sja","consequence"],
      ["sostenible","sos.teˈni.βle","sustainable"],
      ["controversia","kon.tɾoˈβeɾ.sja","controversy"]
    ]),

    // ── C1 ──
    nuanceC1: vocabCards("es-nu-c1", "C1", [
      ["matiz","maˈtis","nuance"],
      ["mitigar","mi.tiˈɣaɾ","to mitigate"],
      ["pragmático","pɾaɣˈma.ti.ko","pragmatic"],
      ["ambigüo","amˈbi.ɣwo","ambiguous"]
    ]),
    idiomsC1: vocabCards("es-idi-c1", "C1", [
      ["estar en las nubes","esˈtaɾ en las ˈnu.βes","to be daydreaming"],
      ["dar en el clavo","daɾ en el ˈkla.βo","to hit the nail on the head"],
      ["echar una mano","eˈtʃaɾ una ˈma.no","to give a hand"],
      ["tomar el pelo","toˈmaɾ el ˈpe.lo","to pull someone's leg"]
    ]),

    // ── C2 ──
    masteryC2: vocabCards("es-mast-c2", "C2", [
      ["ubicuo","uˈβi.kwo","ubiquitous"],
      ["efímero","eˈfi.me.ɾo","ephemeral"],
      ["recalcitrante","re.kal.siˈtɾan.te","recalcitrant"],
      ["epitomar","e.pi.toˈmaɾ","to epitomize"]
    ])
  };

  const GRAMMAR = [
    {
      id: "es-g-ser-estar", level: "A1",
      title: "ser vs. estar — \"to be\"",
      intro: "<b>ser</b> for permanent traits (identity, origin, profession). <b>estar</b> for temporary states (location, mood).",
      examples: [
        { jp: "Yo soy estudiante.", en: "I am a student. (identity)", breakdown: "yo + soy (ser) + estudiante" },
        { jp: "Estoy feliz.", en: "I am happy. (mood)", breakdown: "estoy (estar) + feliz" }
      ],
      quiz: [
        { type: "mc", q: "Ella ___ doctora. (profession)", choices: ["es","está","son","están"], answer: "es" },
        { type: "mc", q: "Yo ___ cansado. (state)", choices: ["soy","estoy","es","está"], answer: "estoy" }
      ]
    },
    {
      id: "es-g-gender", level: "A1",
      title: "Gender of nouns",
      intro: "Most nouns ending in <b>-o</b> are masculine, <b>-a</b> are feminine. Articles match: <b>el/los</b> (m), <b>la/las</b> (f).",
      examples: [
        { jp: "el perro", en: "the dog", breakdown: "masculine" },
        { jp: "la casa", en: "the house", breakdown: "feminine" }
      ],
      quiz: [
        { type: "mc", q: "Article for \"libro\"?", choices: ["el","la","los","las"], answer: "el" }
      ]
    },
    {
      id: "es-g-present", level: "A1",
      title: "Present tense (regular -ar)",
      intro: "For -ar verbs, drop -ar and add: <b>-o, -as, -a, -amos, -áis, -an</b>.",
      examples: [
        { jp: "Yo hablo español.", en: "I speak Spanish.", breakdown: "habl- + -o" },
        { jp: "Nosotros trabajamos.", en: "We work.", breakdown: "trabaj- + -amos" }
      ],
      quiz: [
        { type: "mc", q: "Ellos ___ (hablar).", choices: ["habla","hablan","hablamos","hablás"], answer: "hablan" }
      ]
    },
    {
      id: "es-g-preterite", level: "A2",
      title: "Preterite (past)",
      intro: "Completed past actions. Regular -ar: <b>-é, -aste, -ó, -amos, -asteis, -aron</b>.",
      examples: [
        { jp: "Ayer hablé con María.", en: "Yesterday I spoke with María.", breakdown: "habl- + -é" }
      ],
      quiz: [
        { type: "mc", q: "Yo ___ (comer).", choices: ["comí","comió","comimos","come"], answer: "comí" }
      ]
    },
    {
      id: "es-g-subjunctive", level: "B2",
      title: "Subjunctive — basics",
      intro: "Used after expressions of doubt, desire, emotion, or with conjunctions like <b>aunque, para que</b>.",
      examples: [
        { jp: "Quiero que vengas.", en: "I want you to come.", breakdown: "querer que + subjunctive" },
        { jp: "Es importante que estudies.", en: "It's important that you study." }
      ],
      quiz: [
        { type: "mc", q: "Quiero que tú ___ (hablar).", choices: ["hablas","hables","hablar","hablaste"], answer: "hables" }
      ]
    },
    {
      id: "es-g-conditional", level: "B1",
      title: "Conditional (-ría)",
      intro: "Adds <b>-ía</b> endings to the infinitive. Used for hypothetical situations and politeness.",
      examples: [
        { jp: "Me gustaría un café.", en: "I would like a coffee.", breakdown: "gustar + -ía" }
      ],
      quiz: [
        { type: "mc", q: "Yo ___ (poder) ayudar.", choices: ["puedo","podría","podía","pude"], answer: "podría" }
      ]
    },
    {
      id: "es-g-pluperf", level: "B2",
      title: "Pluperfect — había + past participle",
      intro: "Action that happened before another past action.",
      examples: [
        { jp: "Cuando llegué, ella ya había salido.", en: "When I arrived, she had already left." }
      ],
      quiz: [
        { type: "mc", q: "Yo ___ (hablar) ya cuando llegó.", choices: ["he hablado","había hablado","hablé","hablo"], answer: "había hablado" }
      ]
    },
    {
      id: "es-g-c1-conjunc", level: "C1",
      title: "Advanced connectors",
      intro: "<b>a pesar de que</b> (despite), <b>siempre y cuando</b> (provided that), <b>con tal de que</b> (as long as).",
      examples: [
        { jp: "Iré, siempre y cuando tú vengas.", en: "I'll go, provided you come." }
      ],
      quiz: [
        { type: "mc", q: "Best translation of \"a pesar de que\"?", choices: ["because","despite","if","while"], answer: "despite" }
      ]
    }
  ];

  function lesson(id, title, type, payload) { return { id, title, type, ...payload }; }
  const UNITS = [
    { id: "es-u-greet1", level: "A1", title: "Greetings", icon: "👋", color: "#fde68a", lessons: [
      lesson("es-l-greet-v","Hello & basics", "flashcards", { cards: VOCAB.greetings.slice(0, 6) }),
      lesson("es-l-greet-v2","Polite phrases","flashcards", { cards: VOCAB.greetings.slice(6) }),
      lesson("es-l-greet-q","Greetings quiz","quiz", { cards: VOCAB.greetings })
    ]},
    { id: "es-u-pron1", level: "A1", title: "Pronouns & ser/estar", icon: "🧑", color: "#fbcfe8", lessons: [
      lesson("es-l-pron-v","Pronouns",  "flashcards", { cards: VOCAB.pronouns }),
      lesson("es-l-be-g","ser vs estar","grammar",    { grammarId: "es-g-ser-estar" }),
      lesson("es-l-gen-g","Noun gender","grammar",    { grammarId: "es-g-gender" })
    ]},
    { id: "es-u-num1", level: "A1", title: "Numbers", icon: "🔢", color: "#bae6fd", lessons: [
      lesson("es-l-num-v","1 to 10","flashcards", { cards: VOCAB.numbers }),
      lesson("es-l-num-q","Quiz",    "quiz",       { cards: VOCAB.numbers })
    ]},
    { id: "es-u-fam1", level: "A1", title: "Family", icon: "👨‍👩‍👧", color: "#fbb6ce", lessons: [
      lesson("es-l-fam-v","Family", "flashcards", { cards: VOCAB.family }),
      lesson("es-l-fam-q","Quiz",   "quiz",       { cards: VOCAB.family })
    ]},
    { id: "es-u-food1", level: "A1", title: "Food & drink", icon: "🥖", color: "#fed7aa", lessons: [
      lesson("es-l-food-v","Food vocab", "flashcards", { cards: VOCAB.foodA1 }),
      lesson("es-l-food-q","Quiz",       "quiz",       { cards: VOCAB.foodA1 })
    ]},
    { id: "es-u-verb1", level: "A1", title: "Basic verbs", icon: "🏃", color: "#a7f3d0", lessons: [
      lesson("es-l-verb-v","Verbs",   "flashcards", { cards: VOCAB.verbsA1 }),
      lesson("es-l-pres-g","Present (-ar)","grammar",  { grammarId: "es-g-present" })
    ]},
    { id: "es-u-adj1", level: "A1", title: "Adjectives", icon: "🌈", color: "#bbf7d0", lessons: [
      lesson("es-l-adj-v","Adjectives","flashcards", { cards: VOCAB.adjA1 })
    ]},
    // A2
    { id: "es-u-rout2", level: "A2", title: "Daily routines", icon: "☕", color: "#fde68a", lessons: [
      lesson("es-l-rout-v","Routines","flashcards", { cards: VOCAB.routinesA2 }),
      lesson("es-l-pret-g","Preterite","grammar",    { grammarId: "es-g-preterite" })
    ]},
    { id: "es-u-place2", level: "A2", title: "Places", icon: "🏠", color: "#bae6fd", lessons: [
      lesson("es-l-place-v","Places","flashcards", { cards: VOCAB.placesA2 })
    ]},
    // B1
    { id: "es-u-travel-b1", level: "B1", title: "Travel", icon: "✈️", color: "#fbcfe8", lessons: [
      lesson("es-l-travel-v","Travel vocab","flashcards", { cards: VOCAB.travelB1 }),
      lesson("es-l-cond-g","Conditional",   "grammar",    { grammarId: "es-g-conditional" })
    ]},
    { id: "es-u-opin-b1", level: "B1", title: "Opinions", icon: "💭", color: "#c7d2fe", lessons: [
      lesson("es-l-opin-v","Opinion verbs","flashcards", { cards: VOCAB.opinionsB1 })
    ]},
    // B2
    { id: "es-u-abs-b2", level: "B2", title: "Abstract topics", icon: "🧠", color: "#ddd6fe", lessons: [
      lesson("es-l-abs-v","Abstract vocab","flashcards", { cards: VOCAB.abstractB2 }),
      lesson("es-l-subj-g","Subjunctive",  "grammar",    { grammarId: "es-g-subjunctive" }),
      lesson("es-l-pluperf-g","Pluperfect","grammar",    { grammarId: "es-g-pluperf" })
    ]},
    // C1
    { id: "es-u-nuance-c1", level: "C1", title: "Nuance", icon: "🎯", color: "#fbcfe8", lessons: [
      lesson("es-l-nu-v","Nuanced vocab","flashcards", { cards: VOCAB.nuanceC1 }),
      lesson("es-l-conj-g","Advanced connectors","grammar", { grammarId: "es-g-c1-conjunc" })
    ]},
    { id: "es-u-idi-c1", level: "C1", title: "Idioms", icon: "🍰", color: "#fed7aa", lessons: [
      lesson("es-l-idi-v","Idioms","flashcards", { cards: VOCAB.idiomsC1 })
    ]},
    // C2
    { id: "es-u-mast-c2", level: "C2", title: "Mastery", icon: "🏆", color: "#f9a8d4", lessons: [
      lesson("es-l-mast-v","Mastery vocab","flashcards", { cards: VOCAB.masteryC2 })
    ]}
  ];

  const EXAMPLES = [
    { text: "Hola, amigo.", tr: "Hello, friend.",
      req: ["es:vocab:es-family:amigo"],
      introduces: "es:vocab:es-greetings:hola" },
    { text: "Yo soy feliz.", tr: "I am happy.",
      req: ["es:vocab:es-pronouns:yo","es:vocab:es-adj-a1:feliz","es:vocab:es-verbs-a1:ser"],
      introduces: "es:vocab:es-verbs-a1:ser" },
    { text: "Ella come pan.", tr: "She eats bread.",
      req: ["es:vocab:es-pronouns:ella","es:vocab:es-food-a1:pan"],
      introduces: "es:vocab:es-verbs-a1:comer" },
    { text: "Tengo un gato.", tr: "I have a cat.",
      req: ["es:vocab:es-numbers:uno","es:vocab:es-family:gato"],
      introduces: "es:vocab:es-verbs-a1:tener" },
    { text: "Mi madre es buena.", tr: "My mother is good.",
      req: ["es:vocab:es-family:madre","es:vocab:es-verbs-a1:ser","es:vocab:es-adj-a1:bueno"],
      introduces: "es:vocab:es-family:madre" },
    { text: "Bebo agua.", tr: "I drink water.",
      req: ["es:vocab:es-food-a1:agua"],
      introduces: "es:vocab:es-verbs-a1:beber" }
  ];

  const ALL_CARDS = [];
  Object.values(VOCAB).forEach((arr) => arr.forEach((c) => ALL_CARDS.push(c)));

  return {
    VOCAB, GRAMMAR, UNITS, EXAMPLES, ALL_CARDS,
    grammarById: (id) => GRAMMAR.find((g) => g.id === id),
    cardById: (id) => ALL_CARDS.find((c) => c.id === id)
  };
})();
