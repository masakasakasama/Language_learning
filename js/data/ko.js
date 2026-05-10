// Korean content — Hangul, vocab, grammar, units (TOPIK levels)
window.DATA_KO = (function () {
  // ───────────── HANGUL ─────────────
  const consonants = [
    ["ㄱ","g/k"],["ㄴ","n"],["ㄷ","d/t"],["ㄹ","r/l"],["ㅁ","m"],
    ["ㅂ","b/p"],["ㅅ","s"],["ㅇ","ng (silent at start)"],["ㅈ","j"],
    ["ㅊ","ch"],["ㅋ","k"],["ㅌ","t"],["ㅍ","p"],["ㅎ","h"]
  ];
  const vowels = [
    ["ㅏ","a"],["ㅑ","ya"],["ㅓ","eo"],["ㅕ","yeo"],["ㅗ","o"],
    ["ㅛ","yo"],["ㅜ","u"],["ㅠ","yu"],["ㅡ","eu"],["ㅣ","i"]
  ];
  // Common syllable blocks for early reading practice
  const syllables = [
    ["가","ga"],["나","na"],["다","da"],["라","ra"],["마","ma"],
    ["바","ba"],["사","sa"],["아","a"],["자","ja"],["하","ha"],
    ["기","gi"],["니","ni"],["디","di"],["리","ri"],["미","mi"],
    ["고","go"],["노","no"],["도","do"],["로","ro"],["모","mo"],
    ["구","gu"],["누","nu"],["두","du"],["루","ru"],["무","mu"]
  ];

  function kanaCards(arr, prefix, deck, label, level) {
    return arr.map((r) => ({
      id: prefix + ":" + r[0],
      lang: "ko",
      level,
      deck,
      type: "hangul",
      front: r[0], back: r[1],
      hint: label,
      speakText: r[0]
    }));
  }
  const HANGUL = {
    consonants: kanaCards(consonants, "ko-cons", "hangul-consonants", "consonant", "T1"),
    vowels:     kanaCards(vowels,     "ko-vow",  "hangul-vowels",     "vowel",     "T1"),
    syllables:  kanaCards(syllables,  "ko-syl",  "hangul-syllables",  "syllable",  "T1")
  };

  // ───────────── VOCAB ─────────────
  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "ko:vocab:" + deck + ":" + it[0],
      lang: "ko",
      level,
      deck,
      type: "vocab",
      jp: it[0],            // store native word in `jp` field for UI consistency
      kana: it[1],          // romanization
      romaji: it[1],
      en: it[2],
      ex: it[3] || [],
      front: it[0], back: it[2], hint: it[1],
      speakText: it[0]
    }));
  }

  const VOCAB = {
    // ── TOPIK 1 ──
    greetings: vocabCards("ko-greetings", "T1", [
      ["안녕하세요","annyeonghaseyo","hello (polite)", [["안녕하세요!", "Hello!"]]],
      ["안녕","annyeong","hi / bye (casual)", [["안녕, 친구야.", "Hi, my friend."]]],
      ["감사합니다","gamsahamnida","thank you (polite)", [["정말 감사합니다.", "Thank you very much."]]],
      ["고마워요","gomawoyo","thanks", [["선물, 고마워요.", "Thanks for the gift."]]],
      ["죄송합니다","joesonghamnida","I'm sorry (polite)", [["늦어서 죄송합니다.", "Sorry I'm late."]]],
      ["미안해요","mianhaeyo","sorry", [["정말 미안해요.", "I'm really sorry."]]],
      ["네","ne","yes", [["네, 맞아요.", "Yes, that's right."]]],
      ["아니요","aniyo","no", [["아니요, 괜찮아요.", "No, it's okay."]]],
      ["안녕히 가세요","annyeonghi gaseyo","goodbye (to one leaving)", [["안녕히 가세요!", "Goodbye!"]]],
      ["안녕히 계세요","annyeonghi gyeseyo","goodbye (to one staying)", [["안녕히 계세요.", "Goodbye (staying)."]]],
      ["반갑습니다","bangapseumnida","nice to meet you", [["만나서 반갑습니다.", "Nice to meet you."]]]
    ]),
    selfIntro: vocabCards("ko-self", "T1", [
      ["저","jeo","I (polite)", [["저는 학생이에요.", "I'm a student."]]],
      ["나","na","I (casual)", [["나는 한국 사람이야.", "I'm Korean."]]],
      ["당신","dangsin","you", [["당신은 누구세요?", "Who are you?"]]],
      ["이름","ireum","name", [["이름이 뭐예요?", "What's your name?"]]],
      ["사람","saram","person", [["저 사람은 친구예요.", "That person is my friend."]]],
      ["친구","chingu","friend", [["친구와 같이 가요.", "I go with my friend."]]],
      ["선생님","seonsaengnim","teacher", [["선생님은 친절해요.", "The teacher is kind."]]],
      ["학생","haksaeng","student", [["저는 학생이에요.", "I am a student."]]],
      ["한국","hanguk","Korea", [["한국은 아름다워요.", "Korea is beautiful."]]],
      ["미국","miguk","America", [["미국에서 왔어요.", "I came from America."]]],
      ["일본","ilbon","Japan", [["일본에 가고 싶어요.", "I want to go to Japan."]]]
    ]),
    numbers: vocabCards("ko-numbers", "T1", [
      ["하나","hana","one (native)", [["사과 하나 주세요.", "One apple, please."]]],
      ["둘","dul","two (native)", [["친구 둘이 있어요.", "I have two friends."]]],
      ["셋","set","three (native)", [["고양이 셋이 있어요.", "There are three cats."]]],
      ["넷","net","four (native)", [["넷이 같이 가요.", "Four of us go together."]]],
      ["다섯","daseot","five (native)", [["다섯 시예요.", "It's 5 o'clock."]]],
      ["일","il","one (Sino)", [["일 번 버스예요.", "It's bus number 1."]]],
      ["이","i","two (Sino)", [["이 층에 가요.", "I'm going to floor 2."]]],
      ["삼","sam","three (Sino)", [["삼 월에 와요.", "I'll come in March."]]],
      ["사","sa","four (Sino)", [["사 시간 걸려요.", "It takes 4 hours."]]],
      ["오","o","five (Sino)", [["오 일에 만나요.", "Let's meet on the 5th."]]]
    ]),
    family: vocabCards("ko-family", "T1", [
      ["가족","gajok","family", [["우리 가족은 네 명이에요.", "My family is four people."]]],
      ["아버지","abeoji","father", [["아버지는 선생님이에요.", "Father is a teacher."]]],
      ["어머니","eomeoni","mother", [["어머니는 친절해요.", "Mother is kind."]]],
      ["형","hyeong","older brother (male's)", [["우리 형은 학생이에요.", "My older brother is a student."]]],
      ["오빠","oppa","older brother (female's)", [["오빠와 같이 가요.", "I go with my older brother."]]],
      ["누나","nuna","older sister (male's)", [["누나는 친절해요.", "My older sister is kind."]]],
      ["언니","eonni","older sister (female's)", [["언니가 한 명 있어요.", "I have one older sister."]]],
      ["동생","dongsaeng","younger sibling", [["동생이 두 명 있어요.", "I have two younger siblings."]]],
      ["아이","ai","child", [["아이가 귀여워요.", "The child is cute."]]],
      ["강아지","gangaji","puppy", [["강아지는 너무 귀여워요.", "Puppies are so cute."]]],
      ["고양이","goyangi","cat", [["저는 고양이를 좋아해요.", "I like cats."]]]
    ]),
    food: vocabCards("ko-food", "T1", [
      ["물","mul","water", [["물 주세요.", "Please give me water."]]],
      ["밥","bap","rice / meal", [["밥을 먹어요.", "I eat rice."]]],
      ["빵","ppang","bread", [["빵을 좋아해요.", "I like bread."]]],
      ["김치","gimchi","kimchi", [["김치는 맛있어요.", "Kimchi is delicious."]]],
      ["라면","ramyeon","ramen / instant noodles", [["저녁에 라면을 먹어요.", "I eat ramyeon for dinner."]]],
      ["커피","keopi","coffee", [["아침에 커피를 마셔요.", "I drink coffee in the morning."]]],
      ["차","cha","tea", [["차 한 잔 주세요.", "One cup of tea, please."]]],
      ["사과","sagwa","apple", [["사과가 빨개요.", "The apple is red."]]],
      ["고기","gogi","meat", [["고기를 안 먹어요.", "I don't eat meat."]]],
      ["맛있다","masitda","delicious", [["이 빵은 맛있어요!", "This bread is delicious!"]]]
    ]),
    daysT1: vocabCards("ko-days", "T1", [
      ["월요일","wolyoil","Monday", [["월요일에 학교에 가요.", "I go to school on Monday."]]],
      ["화요일","hwayoil","Tuesday", [["오늘은 화요일이에요.", "Today is Tuesday."]]],
      ["수요일","suyoil","Wednesday", [["수요일에 만나요.", "Let's meet on Wednesday."]]],
      ["목요일","mogyoil","Thursday", [["목요일이 좋아요.", "Thursdays are nice."]]],
      ["금요일","geumyoil","Friday", [["금요일이에요!", "It's Friday!"]]],
      ["토요일","toyoil","Saturday", [["토요일에 쉬어요.", "I rest on Saturday."]]],
      ["일요일","ilyoil","Sunday", [["일요일에 자요.", "I sleep on Sunday."]]],
      ["오늘","oneul","today", [["오늘은 추워요.", "It's cold today."]]],
      ["내일","naeil","tomorrow", [["내일 만나요.", "See you tomorrow."]]],
      ["어제","eoje","yesterday", [["어제 빵을 먹었어요.", "I ate bread yesterday."]]]
    ]),
    verbsT1: vocabCards("ko-verbs", "T1", [
      ["가다","gada","to go", [["학교에 가요.", "I go to school."]]],
      ["오다","oda","to come", [["친구가 와요.", "My friend is coming."]]],
      ["먹다","meokda","to eat", [["밥을 먹어요.", "I eat rice."]]],
      ["마시다","masida","to drink", [["물을 마셔요.", "I drink water."]]],
      ["보다","boda","to see", [["영화를 봐요.", "I watch a movie."]]],
      ["듣다","deutda","to listen", [["음악을 들어요.", "I listen to music."]]],
      ["하다","hada","to do", [["공부를 해요.", "I study."]]],
      ["사다","sada","to buy", [["빵을 사요.", "I buy bread."]]],
      ["자다","jada","to sleep", [["밤에 자요.", "I sleep at night."]]],
      ["좋아하다","joahada","to like", [["고양이를 좋아해요.", "I like cats."]]]
    ]),
    adjT1: vocabCards("ko-adj", "T1", [
      ["크다","keuda","big", [["집이 커요.", "The house is big."]]],
      ["작다","jakda","small", [["고양이가 작아요.", "The cat is small."]]],
      ["좋다","jota","good", [["오늘 날씨가 좋아요.", "The weather is good today."]]],
      ["나쁘다","nappeuda","bad", [["나쁜 사람이 아니에요.", "He's not a bad person."]]],
      ["예쁘다","yeppeuda","pretty", [["꽃이 예뻐요.", "The flower is pretty."]]],
      ["귀엽다","gwiyeopda","cute", [["강아지가 귀여워요.", "The puppy is cute."]]],
      ["맛있다","masitda","tasty", [["김치가 맛있어요.", "Kimchi is tasty."]]],
      ["덥다","deopda","hot (weather)", [["오늘은 더워요.", "It's hot today."]]],
      ["춥다","chupda","cold (weather)", [["겨울은 추워요.", "Winter is cold."]]],
      ["재미있다","jaemiitda","interesting / fun", [["한국어는 재미있어요!", "Korean is fun!"]]]
    ]),

    // ── TOPIK 2 ──
    placesT2: vocabCards("ko-places", "T2", [
      ["학교","hakgyo","school", [["학교에 가요.", "I go to school."]]],
      ["집","jip","house / home", [["집에 있어요.", "I'm at home."]]],
      ["식당","sikdang","restaurant", [["식당에서 먹어요.", "I eat at the restaurant."]]],
      ["병원","byeongwon","hospital", [["병원에 가요.", "I go to the hospital."]]],
      ["공원","gongwon","park", [["공원에서 산책해요.", "I walk in the park."]]],
      ["회사","hoesa","company", [["회사가 멀어요.", "The company is far."]]],
      ["은행","eunhaeng","bank", [["은행에 가야 해요.", "I have to go to the bank."]]],
      ["기차역","gichayeok","train station", [["기차역에서 만나요.", "Let's meet at the train station."]]]
    ]),
    travelT2: vocabCards("ko-travel", "T2", [
      ["여행","yeohaeng","travel", [["한국 여행 갔어요.", "I went on a Korea trip."]]],
      ["비행기","bihaenggi","airplane", [["비행기를 탔어요.", "I took the plane."]]],
      ["기차","gicha","train", [["기차로 갔어요.", "I went by train."]]],
      ["버스","beoseu","bus", [["버스를 기다려요.", "I'm waiting for the bus."]]],
      ["택시","taeksi","taxi", [["택시로 가요.", "I go by taxi."]]],
      ["호텔","hotel","hotel", [["호텔에서 잤어요.", "I slept at a hotel."]]],
      ["표","pyo","ticket", [["표가 어디예요?", "Where's the ticket?"]]]
    ]),

    // ── TOPIK 3 ──
    workT3: vocabCards("ko-work", "T3", [
      ["회의","hoeui","meeting", [["회의가 길었어요.", "The meeting was long."]]],
      ["보고서","bogoseo","report", [["보고서를 썼어요.", "I wrote the report."]]],
      ["계획","gyehwoek","plan", [["좋은 계획이에요.", "It's a good plan."]]],
      ["문제","munje","problem", [["문제가 있어요.", "There's a problem."]]],
      ["결과","gyeolgwa","result", [["결과를 봤어요.", "I saw the result."]]],
      ["경험","gyeongheom","experience", [["좋은 경험이었어요.", "It was a good experience."]]]
    ]),

    // ── TOPIK 4 ──
    societyT4: vocabCards("ko-society", "T4", [
      ["사회","sahoe","society", [["사회가 변하고 있어요.", "Society is changing."]]],
      ["문화","munhwa","culture", [["한국 문화는 흥미로워요.", "Korean culture is interesting."]]],
      ["경제","gyeongje","economy", [["경제가 좋아져요.", "The economy improves."]]],
      ["환경","hwangyeong","environment", [["환경을 보호해요.", "We protect the environment."]]],
      ["교육","gyoyuk","education", [["교육이 중요해요.", "Education is important."]]],
      ["기술","gisul","technology", [["새 기술을 배워요.", "I learn new technology."]]]
    ]),

    // ── TOPIK 5 ──
    advT5: vocabCards("ko-adv", "T5", [
      ["정책","jeongchaek","policy", [["새 정책을 발표했어요.", "A new policy was announced."]]],
      ["영향","yeonghyang","influence", [["큰 영향을 미쳐요.", "It has a big impact."]]],
      ["분석","bunseok","analysis", [["자세한 분석이 필요해요.", "Detailed analysis is needed."]]],
      ["증가","jeungga","increase", [["인구 증가가 빨라요.", "Population growth is fast."]]],
      ["감소","gamso","decrease", [["판매 감소가 걱정돼요.", "I'm worried about declining sales."]]]
    ]),

    // ── TOPIK 6 ──
    masteryT6: vocabCards("ko-master", "T6", [
      ["함축","hamchuk","implication / connotation", [["이 말에는 함축이 있어요.", "This word has an implication."]]],
      ["전제","jeonje","premise", [["전제가 잘못됐어요.", "The premise is wrong."]]],
      ["반증","banjeung","counterevidence", [["반증을 제시했어요.", "I presented counterevidence."]]],
      ["수용","suyong","acceptance", [["의견 수용이 빨랐어요.", "Acceptance of the opinion was quick."]]]
    ])
  };

  // ───────────── GRAMMAR ─────────────
  const GRAMMAR = [
    {
      id: "ko-g-eyo", level: "T1",
      title: "이에요 / 예요 — \"to be\" (polite)",
      intro: "Attach <b>이에요</b> after a consonant ending or <b>예요</b> after a vowel ending. Means \"is/am/are\".",
      examples: [
        { jp: "저는 학생이에요.", en: "I am a student.", breakdown: "저 (I) + 는 (topic) + 학생 (student) + 이에요 (am)" },
        { jp: "이건 사과예요.", en: "This is an apple.", breakdown: "이건 (this) + 사과 (apple) + 예요" }
      ],
      quiz: [
        { type: "mc", q: "Which form follows a vowel ending?", choices: ["이에요","예요","입니다","있어요"], answer: "예요" },
        { type: "mc", q: "Choose: \"I am a teacher.\"", choices: ["저는 선생님예요","저는 선생님이에요","저는 선생님있어요","저는 선생님를"], answer: "저는 선생님이에요" }
      ]
    },
    {
      id: "ko-g-topic", level: "T1",
      title: "은 / 는 — Topic markers",
      intro: "Mark the topic with <b>은</b> after a consonant or <b>는</b> after a vowel. \"As for X, …\"",
      examples: [
        { jp: "저는 한국 사람이에요.", en: "I am Korean.", breakdown: "저 (I) + 는 (topic) + ..." },
        { jp: "오늘은 더워요.", en: "Today is hot.", breakdown: "오늘 (today) + 은 (topic) + 더워요 (hot)" }
      ],
      quiz: [
        { type: "mc", q: "Which follows a consonant?", choices: ["은","는","이","가"], answer: "은" }
      ]
    },
    {
      id: "ko-g-object", level: "T1",
      title: "을 / 를 — Object markers",
      intro: "<b>을</b> after a consonant, <b>를</b> after a vowel. Marks the object of an action.",
      examples: [
        { jp: "밥을 먹어요.", en: "I eat rice.", breakdown: "밥 + 을 + 먹어요" },
        { jp: "사과를 사요.", en: "I buy apples.", breakdown: "사과 + 를 + 사요" }
      ],
      quiz: [
        { type: "fill", q: "물___ 마셔요. (I drink water)", choices: ["을","를","은","는"], answer: "을" }
      ]
    },
    {
      id: "ko-g-yo", level: "T2",
      title: "-아요 / -어요 — Polite present",
      intro: "Polite present tense: drop the dictionary 다 and add <b>-아요</b> (if last vowel is ㅏ/ㅗ) or <b>-어요</b> (otherwise).",
      examples: [
        { jp: "가다 → 가요", en: "to go → I go" },
        { jp: "먹다 → 먹어요", en: "to eat → I eat" },
        { jp: "마시다 → 마셔요", en: "to drink → I drink" }
      ],
      quiz: [
        { type: "mc", q: "Polite of 보다?", choices: ["봐요","보아요","봐다","보요"], answer: "봐요" }
      ]
    },
    {
      id: "ko-g-past", level: "T2",
      title: "-았어요 / -었어요 — Past tense",
      intro: "Past tense uses <b>-았어요</b> (after ㅏ/ㅗ stems) or <b>-었어요</b> (otherwise).",
      examples: [
        { jp: "먹다 → 먹었어요", en: "ate" },
        { jp: "가다 → 갔어요", en: "went" }
      ],
      quiz: [
        { type: "mc", q: "Past of 마시다?", choices: ["마셨어요","마시었어요","마실거예요","마셔요"], answer: "마셨어요" }
      ]
    },
    {
      id: "ko-g-honor", level: "T3",
      title: "-(으)시- — Honorifics",
      intro: "Add <b>-시-</b> to a verb stem (or <b>-으시-</b> after a consonant) to show respect to the subject.",
      examples: [
        { jp: "선생님께서 가세요.", en: "The teacher goes (honored).", breakdown: "가다 → 가시 + 어요" }
      ],
      quiz: [
        { type: "mc", q: "Honorific of 먹다 (used as 잡수다)?", choices: ["잡수세요","먹시어요","먹어요","드세요"], answer: "드세요" }
      ]
    },
    {
      id: "ko-g-tothough", level: "T4",
      title: "-지만 — \"but / however\"",
      intro: "Attach <b>-지만</b> to a verb/adjective stem to mean \"but\".",
      examples: [
        { jp: "비가 오지만 가요.", en: "It's raining but I go." }
      ],
      quiz: [
        { type: "mc", q: "Best meaning of -지만?", choices: ["because","but","if","while"], answer: "but" }
      ]
    },
    {
      id: "ko-g-conj-ge", level: "T5",
      title: "-게 — adverbial form",
      intro: "<b>-게</b> turns adjectives into adverbs.",
      examples: [
        { jp: "예쁘게 그렸어요.", en: "I drew it prettily." }
      ],
      quiz: [
        { type: "mc", q: "Adverb of 빠르다 (fast)?", choices: ["빠르게","빠르다","빠른","빨리"], answer: "빠르게" }
      ]
    },
    {
      id: "ko-g-passive-T6", level: "T6",
      title: "Passive verbs",
      intro: "Korean passives often use suffixes -이-, -히-, -리-, -기-. Many advanced passive forms must be memorized.",
      examples: [
        { jp: "문이 열렸어요.", en: "The door was opened." }
      ],
      quiz: [
        { type: "mc", q: "Passive of 보다 (to see)?", choices: ["보이다","보다지다","봐지다","보아지다"], answer: "보이다" }
      ]
    }
  ];

  // ───────────── UNITS ─────────────
  function lesson(id, title, type, payload) { return { id, title, type, ...payload }; }

  const UNITS = [
    // T1
    {
      id: "ko-u-han1", level: "T1", title: "Hangul: vowels", icon: "ㅏ", color: "#bae6fd",
      lessons: [
        lesson("ko-l-han-vow", "10 basic vowels", "flashcards", { cards: HANGUL.vowels }),
        lesson("ko-l-han-vq",  "Vowels quiz",    "quiz",        { cards: HANGUL.vowels })
      ]
    },
    {
      id: "ko-u-han2", level: "T1", title: "Hangul: consonants", icon: "ㄱ", color: "#fbcfe8",
      lessons: [
        lesson("ko-l-han-cons", "14 basic consonants", "flashcards", { cards: HANGUL.consonants }),
        lesson("ko-l-han-cq",   "Consonants quiz",     "quiz",       { cards: HANGUL.consonants })
      ]
    },
    {
      id: "ko-u-han3", level: "T1", title: "Reading syllables", icon: "가", color: "#fde68a",
      lessons: [
        lesson("ko-l-han-syl",  "Common syllable blocks", "flashcards", { cards: HANGUL.syllables }),
        lesson("ko-l-han-sq",   "Syllables quiz",         "quiz",       { cards: HANGUL.syllables })
      ]
    },
    {
      id: "ko-u-greet1", level: "T1", title: "Greetings", icon: "👋", color: "#bbf7d0",
      lessons: [
        lesson("ko-l-greet1", "Hello & thanks", "flashcards", { cards: VOCAB.greetings.slice(0, 6) }),
        lesson("ko-l-greet2", "More greetings", "flashcards", { cards: VOCAB.greetings.slice(6) }),
        lesson("ko-l-greet-q","Greetings quiz", "quiz",       { cards: VOCAB.greetings })
      ]
    },
    {
      id: "ko-u-self1", level: "T1", title: "Self introduction", icon: "🧑", color: "#c7d2fe",
      lessons: [
        lesson("ko-l-self-v", "People & countries", "flashcards", { cards: VOCAB.selfIntro }),
        lesson("ko-l-self-g","이에요/예요",         "grammar",    { grammarId: "ko-g-eyo" }),
        lesson("ko-l-self-g2","은/는 (topic)",      "grammar",    { grammarId: "ko-g-topic" })
      ]
    },
    {
      id: "ko-u-num1", level: "T1", title: "Numbers", icon: "🔢", color: "#fde68a",
      lessons: [
        lesson("ko-l-num-v", "1 to 10", "flashcards", { cards: VOCAB.numbers }),
        lesson("ko-l-num-q", "Numbers quiz", "quiz",  { cards: VOCAB.numbers })
      ]
    },
    {
      id: "ko-u-fam1", level: "T1", title: "Family", icon: "👨‍👩‍👧", color: "#fbb6ce",
      lessons: [
        lesson("ko-l-fam-v", "Family members", "flashcards", { cards: VOCAB.family }),
        lesson("ko-l-fam-q", "Family quiz",    "quiz",       { cards: VOCAB.family })
      ]
    },
    {
      id: "ko-u-food1", level: "T1", title: "Food & drink", icon: "🍚", color: "#fed7aa",
      lessons: [
        lesson("ko-l-food-v", "Common food",     "flashcards", { cards: VOCAB.food }),
        lesson("ko-l-food-g", "을/를 (object)",   "grammar",    { grammarId: "ko-g-object" }),
        lesson("ko-l-food-q", "Food quiz",       "quiz",       { cards: VOCAB.food })
      ]
    },
    {
      id: "ko-u-days1", level: "T1", title: "Days & time", icon: "📅", color: "#bae6fd",
      lessons: [
        lesson("ko-l-days-v", "Days of week", "flashcards", { cards: VOCAB.daysT1.slice(0, 7) }),
        lesson("ko-l-days-v2","Time words",  "flashcards", { cards: VOCAB.daysT1.slice(7) })
      ]
    },
    {
      id: "ko-u-verb1", level: "T1", title: "Basic verbs", icon: "🏃", color: "#a7f3d0",
      lessons: [
        lesson("ko-l-verb-v", "Common verbs", "flashcards", { cards: VOCAB.verbsT1 }),
        lesson("ko-l-verb-q", "Verbs quiz",   "quiz",       { cards: VOCAB.verbsT1 })
      ]
    },
    {
      id: "ko-u-adj1", level: "T1", title: "Adjectives", icon: "🌈", color: "#bbf7d0",
      lessons: [
        lesson("ko-l-adj-v", "Common adjectives", "flashcards", { cards: VOCAB.adjT1 }),
        lesson("ko-l-adj-q", "Quiz",              "quiz",       { cards: VOCAB.adjT1 })
      ]
    },

    // T2
    {
      id: "ko-u-place2", level: "T2", title: "Places", icon: "🏠", color: "#bae6fd",
      lessons: [
        lesson("ko-l-place-v", "Places vocab", "flashcards", { cards: VOCAB.placesT2 }),
        lesson("ko-l-place-q", "Quiz",         "quiz",       { cards: VOCAB.placesT2 })
      ]
    },
    {
      id: "ko-u-travel2", level: "T2", title: "Travel", icon: "✈️", color: "#fbcfe8",
      lessons: [
        lesson("ko-l-travel-v", "Travel vocab", "flashcards", { cards: VOCAB.travelT2 }),
        lesson("ko-l-travel-q", "Quiz",         "quiz",       { cards: VOCAB.travelT2 })
      ]
    },
    {
      id: "ko-u-yo2", level: "T2", title: "Polite present & past", icon: "🗣️", color: "#fde68a",
      lessons: [
        lesson("ko-l-yo-g",   "-아요/-어요", "grammar", { grammarId: "ko-g-yo" }),
        lesson("ko-l-past-g", "Past tense",  "grammar", { grammarId: "ko-g-past" })
      ]
    },

    // T3
    {
      id: "ko-u-work3", level: "T3", title: "Work life", icon: "💼", color: "#fed7aa",
      lessons: [
        lesson("ko-l-work-v", "Work vocab", "flashcards", { cards: VOCAB.workT3 }),
        lesson("ko-l-work-q", "Quiz",       "quiz",       { cards: VOCAB.workT3 })
      ]
    },
    {
      id: "ko-u-hon3", level: "T3", title: "Honorifics", icon: "🙇", color: "#c7d2fe",
      lessons: [ lesson("ko-l-hon-g", "-(으)시-", "grammar", { grammarId: "ko-g-honor" }) ]
    },

    // T4
    {
      id: "ko-u-soc4", level: "T4", title: "Society & culture", icon: "🏛️", color: "#ddd6fe",
      lessons: [
        lesson("ko-l-soc-v", "Society vocab", "flashcards", { cards: VOCAB.societyT4 }),
        lesson("ko-l-soc-q", "Quiz",          "quiz",       { cards: VOCAB.societyT4 })
      ]
    },
    {
      id: "ko-u-but4", level: "T4", title: "Connectors: -지만", icon: "🔗", color: "#fbcfe8",
      lessons: [ lesson("ko-l-but-g", "-지만", "grammar", { grammarId: "ko-g-tothough" }) ]
    },

    // T5
    {
      id: "ko-u-adv5", level: "T5", title: "Advanced vocab", icon: "📈", color: "#a7f3d0",
      lessons: [
        lesson("ko-l-adv-v", "Sophisticated words", "flashcards", { cards: VOCAB.advT5 }),
        lesson("ko-l-adv-q", "Quiz",                "quiz",       { cards: VOCAB.advT5 })
      ]
    },
    {
      id: "ko-u-ge5", level: "T5", title: "Adverbs (-게)", icon: "✨", color: "#fde68a",
      lessons: [ lesson("ko-l-ge-g", "-게", "grammar", { grammarId: "ko-g-conj-ge" }) ]
    },

    // T6
    {
      id: "ko-u-mast6", level: "T6", title: "Mastery vocab", icon: "🏆", color: "#f9a8d4",
      lessons: [
        lesson("ko-l-mast-v", "Abstract nouns", "flashcards", { cards: VOCAB.masteryT6 })
      ]
    },
    {
      id: "ko-u-pass6", level: "T6", title: "Passive verbs", icon: "🔁", color: "#bae6fd",
      lessons: [ lesson("ko-l-pass-g", "Passives", "grammar", { grammarId: "ko-g-passive-T6" }) ]
    }
  ];

  const ALL_CARDS = [];
  function pushAll(arr) { arr.forEach((c) => ALL_CARDS.push(c)); }
  pushAll(HANGUL.consonants); pushAll(HANGUL.vowels); pushAll(HANGUL.syllables);
  Object.values(VOCAB).forEach(pushAll);

  return {
    HANGUL, VOCAB, GRAMMAR, UNITS, ALL_CARDS,
    grammarById: (id) => GRAMMAR.find((g) => g.id === id),
    cardById: (id) => ALL_CARDS.find((c) => c.id === id)
  };
})();
