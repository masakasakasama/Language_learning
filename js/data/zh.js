// Chinese content — HSK 1 to HSK 6 (for English speakers). Beginner-heavy.
window.DATA_ZH = (function () {
  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "zh:vocab:" + deck + ":" + it[0],
      lang: "zh",
      level,
      deck,
      type: "vocab",
      jp: it[0], kana: it[1] || "", romaji: it[1] || "", en: it[2],
      ja: "",
      de: "",
      front: it[0], back: it[2], hint: it[1] || "",
      speakText: it[0]
    }));
  }

  const VOCAB = {
    // ───────────────── HSK1 (beginner) ─────────────────
    greetings: vocabCards("zh-greetings", "HSK1", [
      ["你好","nǐ hǎo","hello"],
      ["您好","nín hǎo","hello (polite)"],
      ["你好吗","nǐ hǎo ma","how are you?"],
      ["很好","hěn hǎo","very good / I'm fine"],
      ["谢谢","xièxie","thank you"],
      ["不客气","bú kèqi","you're welcome"],
      ["对不起","duìbuqǐ","sorry"],
      ["没关系","méi guānxi","it's okay"],
      ["再见","zàijiàn","goodbye"],
      ["早上好","zǎoshang hǎo","good morning"],
      ["晚安","wǎn'ān","good night"],
      ["请","qǐng","please"],
      ["是","shì","to be / yes"],
      ["不是","bú shì","is not / no"],
      ["对","duì","correct / right"]
    ]),
    pronouns: vocabCards("zh-pronouns", "HSK1", [
      ["我","wǒ","I / me"],
      ["你","nǐ","you"],
      ["您","nín","you (polite)"],
      ["他","tā","he / him"],
      ["她","tā","she / her"],
      ["它","tā","it"],
      ["我们","wǒmen","we / us"],
      ["你们","nǐmen","you (plural)"],
      ["他们","tāmen","they / them"],
      ["这","zhè","this"],
      ["那","nà","that"],
      ["谁","shéi","who"]
    ]),
    numbers: vocabCards("zh-numbers", "HSK1", [
      ["一","yī","one"],
      ["二","èr","two"],
      ["三","sān","three"],
      ["四","sì","four"],
      ["五","wǔ","five"],
      ["六","liù","six"],
      ["七","qī","seven"],
      ["八","bā","eight"],
      ["九","jiǔ","nine"],
      ["十","shí","ten"],
      ["零","líng","zero"],
      ["百","bǎi","hundred"],
      ["千","qiān","thousand"],
      ["万","wàn","ten thousand"]
    ]),
    family: vocabCards("zh-family", "HSK1", [
      ["家","jiā","family / home"],
      ["爸爸","bàba","father / dad"],
      ["妈妈","māma","mother / mom"],
      ["哥哥","gēge","older brother"],
      ["弟弟","dìdi","younger brother"],
      ["姐姐","jiějie","older sister"],
      ["妹妹","mèimei","younger sister"],
      ["儿子","érzi","son"],
      ["女儿","nǚ'ér","daughter"],
      ["孩子","háizi","child"],
      ["朋友","péngyou","friend"],
      ["老师","lǎoshī","teacher"],
      ["学生","xuésheng","student"],
      ["医生","yīshēng","doctor"]
    ]),
    foodDrink: vocabCards("zh-food", "HSK1", [
      ["水","shuǐ","water"],
      ["茶","chá","tea"],
      ["咖啡","kāfēi","coffee"],
      ["米饭","mǐfàn","rice (cooked)"],
      ["面条","miàntiáo","noodles"],
      ["菜","cài","dish / vegetable"],
      ["肉","ròu","meat"],
      ["鱼","yú","fish"],
      ["鸡蛋","jīdàn","egg"],
      ["水果","shuǐguǒ","fruit"],
      ["苹果","píngguǒ","apple"],
      ["面包","miànbāo","bread"],
      ["牛奶","niúnǎi","milk"],
      ["吃","chī","to eat"],
      ["喝","hē","to drink"]
    ]),
    verbs1: vocabCards("zh-verbs1", "HSK1", [
      ["是","shì","to be"],
      ["有","yǒu","to have"],
      ["要","yào","to want"],
      ["去","qù","to go"],
      ["来","lái","to come"],
      ["看","kàn","to look / watch"],
      ["听","tīng","to listen"],
      ["说","shuō","to speak"],
      ["读","dú","to read"],
      ["写","xiě","to write"],
      ["做","zuò","to do / make"],
      ["买","mǎi","to buy"],
      ["爱","ài","to love"],
      ["喜欢","xǐhuan","to like"],
      ["想","xiǎng","to want / think"]
    ]),
    adjectives1: vocabCards("zh-adj1", "HSK1", [
      ["大","dà","big"],
      ["小","xiǎo","small"],
      ["多","duō","many / much"],
      ["少","shǎo","few / little"],
      ["好","hǎo","good"],
      ["坏","huài","bad"],
      ["新","xīn","new"],
      ["旧","jiù","old (things)"],
      ["热","rè","hot"],
      ["冷","lěng","cold"],
      ["高","gāo","tall / high"],
      ["矮","ǎi","short (height)"],
      ["快","kuài","fast"],
      ["慢","màn","slow"],
      ["漂亮","piàoliang","beautiful"]
    ]),
    colors: vocabCards("zh-colors", "HSK1", [
      ["颜色","yánsè","color"],
      ["红色","hóngsè","red"],
      ["蓝色","lánsè","blue"],
      ["绿色","lǜsè","green"],
      ["黄色","huángsè","yellow"],
      ["黑色","hēisè","black"],
      ["白色","báisè","white"],
      ["橙色","chéngsè","orange"],
      ["粉色","fěnsè","pink"],
      ["紫色","zǐsè","purple"],
      ["棕色","zōngsè","brown"],
      ["灰色","huīsè","grey"]
    ]),
    timeDays: vocabCards("zh-time", "HSK1", [
      ["今天","jīntiān","today"],
      ["明天","míngtiān","tomorrow"],
      ["昨天","zuótiān","yesterday"],
      ["现在","xiànzài","now"],
      ["年","nián","year"],
      ["月","yuè","month"],
      ["日","rì","day / date"],
      ["星期","xīngqī","week"],
      ["星期一","xīngqīyī","Monday"],
      ["星期天","xīngqītiān","Sunday"],
      ["小时","xiǎoshí","hour"],
      ["分钟","fēnzhōng","minute"],
      ["上午","shàngwǔ","morning"],
      ["下午","xiàwǔ","afternoon"],
      ["晚上","wǎnshang","evening"]
    ]),
    questions: vocabCards("zh-quest", "HSK1", [
      ["什么","shénme","what"],
      ["谁","shéi","who"],
      ["哪儿","nǎr","where"],
      ["哪里","nǎlǐ","where"],
      ["什么时候","shénme shíhou","when"],
      ["为什么","wèishénme","why"],
      ["怎么","zěnme","how"],
      ["怎么样","zěnmeyàng","how about / how is it"],
      ["多少","duōshao","how many / how much"],
      ["几","jǐ","how many (small number)"],
      ["哪","nǎ","which"],
      ["吗","ma","(question particle)"]
    ]),
    phrases: vocabCards("zh-phrases", "HSK1", [
      ["我叫……","wǒ jiào","my name is ..."],
      ["你叫什么名字","nǐ jiào shénme míngzi","what's your name?"],
      ["很高兴认识你","hěn gāoxìng rènshi nǐ","nice to meet you"],
      ["我是中国人","wǒ shì Zhōngguó rén","I am Chinese"],
      ["你是哪国人","nǐ shì nǎ guó rén","what country are you from?"],
      ["我不懂","wǒ bù dǒng","I don't understand"],
      ["请再说一遍","qǐng zài shuō yí biàn","please say it again"],
      ["你会说英语吗","nǐ huì shuō Yīngyǔ ma","do you speak English?"],
      ["多少钱","duōshao qián","how much (money)?"],
      ["没问题","méi wèntí","no problem"],
      ["我爱你","wǒ ài nǐ","I love you"],
      ["祝你好运","zhù nǐ hǎoyùn","good luck"]
    ]),
    classroom: vocabCards("zh-classroom", "HSK1", [
      ["书","shū","book"],
      ["笔","bǐ","pen"],
      ["纸","zhǐ","paper"],
      ["桌子","zhuōzi","table / desk"],
      ["椅子","yǐzi","chair"],
      ["电脑","diànnǎo","computer"],
      ["手机","shǒujī","mobile phone"],
      ["门","mén","door"],
      ["窗户","chuānghu","window"],
      ["学校","xuéxiào","school"],
      ["教室","jiàoshì","classroom"],
      ["名字","míngzi","name"],
      ["字","zì","character / word"],
      ["东西","dōngxi","thing"]
    ]),

    // ───────────────── HSK2 (high beginner) ─────────────────
    body: vocabCards("zh-body", "HSK2", [
      ["头","tóu","head"],
      ["眼睛","yǎnjing","eye"],
      ["鼻子","bízi","nose"],
      ["嘴","zuǐ","mouth"],
      ["耳朵","ěrduo","ear"],
      ["手","shǒu","hand"],
      ["脚","jiǎo","foot"],
      ["身体","shēntǐ","body"],
      ["头发","tóufa","hair"],
      ["脸","liǎn","face"]
    ]),
    weather: vocabCards("zh-weather", "HSK2", [
      ["天气","tiānqì","weather"],
      ["太阳","tàiyáng","sun"],
      ["雨","yǔ","rain"],
      ["雪","xuě","snow"],
      ["风","fēng","wind"],
      ["云","yún","cloud"],
      ["晴天","qíngtiān","sunny day"],
      ["阴天","yīntiān","cloudy day"],
      ["下雨","xiàyǔ","to rain"],
      ["暖和","nuǎnhuo","warm"]
    ]),
    places: vocabCards("zh-places", "HSK2", [
      ["家","jiā","home"],
      ["公司","gōngsī","company"],
      ["医院","yīyuàn","hospital"],
      ["商店","shāngdiàn","shop"],
      ["饭店","fàndiàn","restaurant / hotel"],
      ["银行","yínháng","bank"],
      ["火车站","huǒchēzhàn","train station"],
      ["机场","jīchǎng","airport"],
      ["厕所","cèsuǒ","toilet"],
      ["公园","gōngyuán","park"],
      ["市场","shìchǎng","market"],
      ["图书馆","túshūguǎn","library"]
    ]),
    routines: vocabCards("zh-routines", "HSK2", [
      ["起床","qǐchuáng","to get up"],
      ["睡觉","shuìjiào","to sleep"],
      ["吃饭","chīfàn","to eat (a meal)"],
      ["工作","gōngzuò","to work"],
      ["学习","xuéxí","to study"],
      ["休息","xiūxi","to rest"],
      ["运动","yùndòng","to exercise"],
      ["洗澡","xǐzǎo","to take a bath"],
      ["上班","shàngbān","to go to work"],
      ["下班","xiàbān","to finish work"]
    ]),
    travel: vocabCards("zh-travel", "HSK2", [
      ["飞机","fēijī","airplane"],
      ["火车","huǒchē","train"],
      ["公共汽车","gōnggòng qìchē","bus"],
      ["出租车","chūzūchē","taxi"],
      ["地铁","dìtiě","subway"],
      ["票","piào","ticket"],
      ["护照","hùzhào","passport"],
      ["行李","xíngli","luggage"],
      ["地图","dìtú","map"],
      ["旅游","lǚyóu","to travel"]
    ]),
    money: vocabCards("zh-money", "HSK2", [
      ["钱","qián","money"],
      ["块","kuài","yuan (colloquial)"],
      ["元","yuán","yuan"],
      ["贵","guì","expensive"],
      ["便宜","piányi","cheap"],
      ["卖","mài","to sell"],
      ["付钱","fùqián","to pay"],
      ["找钱","zhǎoqián","to give change"],
      ["银行卡","yínhángkǎ","bank card"],
      ["发票","fāpiào","receipt / invoice"]
    ]),
    verbs2: vocabCards("zh-verbs2", "HSK2", [
      ["知道","zhīdào","to know"],
      ["认识","rènshi","to know (someone)"],
      ["觉得","juéde","to think / feel"],
      ["希望","xīwàng","to hope"],
      ["帮助","bāngzhù","to help"],
      ["开始","kāishǐ","to start"],
      ["结束","jiéshù","to end"],
      ["介绍","jièshào","to introduce"],
      ["回答","huídá","to answer"],
      ["问","wèn","to ask"],
      ["给","gěi","to give"],
      ["找","zhǎo","to look for"],
      ["等","děng","to wait"],
      ["用","yòng","to use"]
    ]),
    adjectives2: vocabCards("zh-adj2", "HSK2", [
      ["忙","máng","busy"],
      ["累","lèi","tired"],
      ["饿","è","hungry"],
      ["渴","kě","thirsty"],
      ["高兴","gāoxìng","happy"],
      ["难过","nánguò","sad"],
      ["容易","róngyì","easy"],
      ["难","nán","difficult"],
      ["重要","zhòngyào","important"],
      ["有意思","yǒu yìsi","interesting"],
      ["对","duì","right / correct"],
      ["错","cuò","wrong"]
    ]),
    measure: vocabCards("zh-measure", "HSK2", [
      ["个","gè","(general measure word)"],
      ["本","běn","(for books)"],
      ["杯","bēi","(for cups/glasses)"],
      ["只","zhī","(for animals)"],
      ["条","tiáo","(for long things)"],
      ["张","zhāng","(for flat things)"],
      ["件","jiàn","(for clothes/matters)"],
      ["岁","suì","years (of age)"],
      ["点","diǎn","o'clock"],
      ["些","xiē","some / a few"]
    ]),

    // ───────────────── HSK3 (intermediate) ─────────────────
    hsk3: vocabCards("zh-hsk3", "HSK3", [
      ["环境","huánjìng","environment"],
      ["机会","jīhuì","opportunity"],
      ["习惯","xíguàn","habit"],
      ["兴趣","xìngqù","interest"],
      ["影响","yǐngxiǎng","influence"],
      ["经验","jīngyàn","experience"],
      ["计划","jìhuà","plan"],
      ["决定","juédìng","decision / to decide"],
      ["相信","xiāngxìn","to believe"],
      ["选择","xuǎnzé","to choose"],
      ["改变","gǎibiàn","to change"],
      ["努力","nǔlì","to work hard"],
      ["健康","jiànkāng","healthy / health"],
      ["满意","mǎnyì","satisfied"]
    ]),

    // ───────────────── HSK4–5 (upper) ─────────────────
    hsk4: vocabCards("zh-hsk4", "HSK4", [
      ["挑战","tiǎozhàn","challenge"],
      ["责任","zérèn","responsibility"],
      ["压力","yālì","pressure / stress"],
      ["机会","jīhuì","opportunity"],
      ["效率","xiàolǜ","efficiency"],
      ["发展","fāzhǎn","to develop"],
      ["解决","jiějué","to solve"],
      ["建议","jiànyì","suggestion"],
      ["态度","tàidu","attitude"],
      ["成功","chénggōng","success"]
    ]),
    hsk5: vocabCards("zh-hsk5", "HSK5", [
      ["可持续","kě chíxù","sustainable"],
      ["争议","zhēngyì","controversy"],
      ["假设","jiǎshè","assumption"],
      ["后果","hòuguǒ","consequence"],
      ["概念","gàiniàn","concept"],
      ["策略","cèlüè","strategy"],
      ["趋势","qūshì","trend"],
      ["资源","zīyuán","resource"]
    ]),

    // ───────────────── HSK6 (mastery) ─────────────────
    hsk6: vocabCards("zh-hsk6", "HSK6", [
      ["无处不在","wú chù bú zài","ubiquitous"],
      ["短暂","duǎnzàn","ephemeral / brief"],
      ["不可或缺","bùkě huòquē","indispensable"],
      ["体现","tǐxiàn","to embody"],
      ["微妙","wēimiào","subtle / delicate"],
      ["模糊","móhu","ambiguous / blurry"],
      ["务实","wùshí","pragmatic"],
      ["缓解","huǎnjiě","to mitigate"]
    ])
  };

  const GRAMMAR = [
    { id: "zh-g-shi", level: "HSK1", title: "是 — “to be” (A 是 B)",
      points: [
        "Use 是 to link two nouns: 我是学生 — I am a student.",
        "Negate with 不: 我不是老师 — I am not a teacher.",
        "Don't use 是 before adjectives — use 很 instead: 她很高 (she is tall)."
      ] },
    { id: "zh-g-you", level: "HSK1", title: "有 — “to have / there is”",
      points: [
        "我有一本书 — I have a book.",
        "Negate with 没 (not 不): 我没有钱 — I don't have money.",
        "Existence: 桌子上有一杯茶 — There is a cup of tea on the table."
      ] },
    { id: "zh-g-measure", level: "HSK1", title: "Measure words (Number + MW + Noun)",
      points: [
        "Chinese needs a measure word: 一个人 (one person), 三本书 (three books).",
        "个 is the general one if unsure; 本 for books, 杯 for cups.",
        "Pattern: 这 / 那 + (number) + measure word + noun: 这个苹果 (this apple)."
      ] },
    { id: "zh-g-ma", level: "HSK1", title: "Yes/No questions with 吗",
      points: [
        "Add 吗 to the end of a statement: 你好吗？ — Are you well?",
        "你是学生吗？ — Are you a student?",
        "Answer by repeating the verb: 是 / 不是, 有 / 没有."
      ] },
    { id: "zh-g-le", level: "HSK2", title: "了 — completed action",
      points: [
        "了 after the verb marks a completed/changed action: 我吃了饭 — I ate.",
        "我买了一本书 — I bought a book.",
        "End-of-sentence 了 signals a new situation: 下雨了 — It's raining (now)."
      ] }
  ];

  function lesson(id, title, type, payload) { return { id, title, type, ...payload }; }
  const UNITS = [
    // HSK1
    { id: "zh-u-greet", level: "HSK1", title: "Greetings", icon: "👋", color: "#fde68a", lessons: [
      lesson("zh-l-greet-v","Hello & basics","flashcards", { cards: VOCAB.greetings.slice(0, 8) }),
      lesson("zh-l-greet-v2","More greetings","flashcards", { cards: VOCAB.greetings.slice(8) }),
      lesson("zh-l-greet-q","Greetings quiz","quiz", { cards: VOCAB.greetings }),
      lesson("zh-l-ma-g","Questions with 吗","grammar", { grammarId: "zh-g-ma" })
    ]},
    { id: "zh-u-pron", level: "HSK1", title: "Pronouns & 是", icon: "🧑", color: "#fbcfe8", lessons: [
      lesson("zh-l-pron-v","Pronouns","flashcards", { cards: VOCAB.pronouns }),
      lesson("zh-l-shi-g","是 — to be","grammar", { grammarId: "zh-g-shi" }),
      lesson("zh-l-pron-q","Quiz","quiz", { cards: VOCAB.pronouns })
    ]},
    { id: "zh-u-num", level: "HSK1", title: "Numbers", icon: "🔢", color: "#bae6fd", lessons: [
      lesson("zh-l-num-v","0 to 10000","flashcards", { cards: VOCAB.numbers }),
      lesson("zh-l-num-q","Quiz","quiz", { cards: VOCAB.numbers }),
      lesson("zh-l-mw-g","Measure words","grammar", { grammarId: "zh-g-measure" })
    ]},
    { id: "zh-u-fam", level: "HSK1", title: "Family & people", icon: "👨‍👩‍👧", color: "#fbb6ce", lessons: [
      lesson("zh-l-fam-v","Family","flashcards", { cards: VOCAB.family }),
      lesson("zh-l-fam-q","Quiz","quiz", { cards: VOCAB.family })
    ]},
    { id: "zh-u-food", level: "HSK1", title: "Food & drink", icon: "🍜", color: "#fed7aa", lessons: [
      lesson("zh-l-food-v","Food & drink","flashcards", { cards: VOCAB.foodDrink }),
      lesson("zh-l-food-q","Quiz","quiz", { cards: VOCAB.foodDrink })
    ]},
    { id: "zh-u-verb1", level: "HSK1", title: "Basic verbs", icon: "🏃", color: "#a7f3d0", lessons: [
      lesson("zh-l-verb1-v","Verbs","flashcards", { cards: VOCAB.verbs1 }),
      lesson("zh-l-verb1-q","Quiz","quiz", { cards: VOCAB.verbs1 })
    ]},
    { id: "zh-u-adj1", level: "HSK1", title: "Adjectives", icon: "🌈", color: "#bbf7d0", lessons: [
      lesson("zh-l-adj1-v","Adjectives","flashcards", { cards: VOCAB.adjectives1 }),
      lesson("zh-l-adj1-q","Quiz","quiz", { cards: VOCAB.adjectives1 })
    ]},
    { id: "zh-u-col", level: "HSK1", title: "Colors", icon: "🎨", color: "#fda4af", lessons: [
      lesson("zh-l-col-v","Colors","flashcards", { cards: VOCAB.colors }),
      lesson("zh-l-col-q","Quiz","quiz", { cards: VOCAB.colors })
    ]},
    { id: "zh-u-time", level: "HSK1", title: "Time & days", icon: "📅", color: "#c7d2fe", lessons: [
      lesson("zh-l-time-v","Time words","flashcards", { cards: VOCAB.timeDays }),
      lesson("zh-l-time-q","Quiz","quiz", { cards: VOCAB.timeDays })
    ]},
    { id: "zh-u-quest", level: "HSK1", title: "Question words", icon: "❓", color: "#fef08a", lessons: [
      lesson("zh-l-quest-v","什么, 谁, 哪儿...","flashcards", { cards: VOCAB.questions }),
      lesson("zh-l-quest-q","Quiz","quiz", { cards: VOCAB.questions })
    ]},
    { id: "zh-u-phrases", level: "HSK1", title: "Useful phrases", icon: "💬", color: "#fbcfe8", lessons: [
      lesson("zh-l-phr-v","Everyday phrases","flashcards", { cards: VOCAB.phrases }),
      lesson("zh-l-phr-q","Quiz","quiz", { cards: VOCAB.phrases })
    ]},
    { id: "zh-u-class", level: "HSK1", title: "Things & school", icon: "📚", color: "#bae6fd", lessons: [
      lesson("zh-l-class-v","Objects & school","flashcards", { cards: VOCAB.classroom }),
      lesson("zh-l-class-q","Quiz","quiz", { cards: VOCAB.classroom })
    ]},
    // HSK2
    { id: "zh-u-body", level: "HSK2", title: "Body", icon: "🧍", color: "#fbb6ce", lessons: [
      lesson("zh-l-body-v","Body parts","flashcards", { cards: VOCAB.body }),
      lesson("zh-l-body-q","Quiz","quiz", { cards: VOCAB.body })
    ]},
    { id: "zh-u-weather", level: "HSK2", title: "Weather", icon: "☀️", color: "#bfdbfe", lessons: [
      lesson("zh-l-wea-v","Weather","flashcards", { cards: VOCAB.weather }),
      lesson("zh-l-wea-q","Quiz","quiz", { cards: VOCAB.weather })
    ]},
    { id: "zh-u-places", level: "HSK2", title: "Places", icon: "🏠", color: "#fde68a", lessons: [
      lesson("zh-l-plc-v","Places","flashcards", { cards: VOCAB.places }),
      lesson("zh-l-plc-q","Quiz","quiz", { cards: VOCAB.places })
    ]},
    { id: "zh-u-rout", level: "HSK2", title: "Daily routines", icon: "☕", color: "#a7f3d0", lessons: [
      lesson("zh-l-rout-v","Routines","flashcards", { cards: VOCAB.routines }),
      lesson("zh-l-le-g","了 — completed action","grammar", { grammarId: "zh-g-le" }),
      lesson("zh-l-rout-q","Quiz","quiz", { cards: VOCAB.routines })
    ]},
    { id: "zh-u-travel", level: "HSK2", title: "Travel", icon: "✈️", color: "#fbcfe8", lessons: [
      lesson("zh-l-trv-v","Travel","flashcards", { cards: VOCAB.travel }),
      lesson("zh-l-trv-q","Quiz","quiz", { cards: VOCAB.travel })
    ]},
    { id: "zh-u-money", level: "HSK2", title: "Money & shopping", icon: "💰", color: "#bbf7d0", lessons: [
      lesson("zh-l-mon-v","Money","flashcards", { cards: VOCAB.money }),
      lesson("zh-l-mon-q","Quiz","quiz", { cards: VOCAB.money })
    ]},
    { id: "zh-u-verb2", level: "HSK2", title: "More verbs", icon: "⚡", color: "#fed7aa", lessons: [
      lesson("zh-l-vb2-v","Verbs","flashcards", { cards: VOCAB.verbs2 }),
      lesson("zh-l-vb2-q","Quiz","quiz", { cards: VOCAB.verbs2 })
    ]},
    { id: "zh-u-adj2", level: "HSK2", title: "Feelings & adjectives", icon: "😊", color: "#c7d2fe", lessons: [
      lesson("zh-l-adj2-v","Adjectives","flashcards", { cards: VOCAB.adjectives2 }),
      lesson("zh-l-adj2-q","Quiz","quiz", { cards: VOCAB.adjectives2 })
    ]},
    { id: "zh-u-mw", level: "HSK2", title: "Measure words", icon: "🔢", color: "#fde68a", lessons: [
      lesson("zh-l-mw-v","Common measure words","flashcards", { cards: VOCAB.measure }),
      lesson("zh-l-mw-q","Quiz","quiz", { cards: VOCAB.measure })
    ]},
    // HSK3+
    { id: "zh-u-hsk3", level: "HSK3", title: "Intermediate words", icon: "🧠", color: "#ddd6fe", lessons: [
      lesson("zh-l-h3-v","HSK3 vocab","flashcards", { cards: VOCAB.hsk3 }),
      lesson("zh-l-h3-q","Quiz","quiz", { cards: VOCAB.hsk3 })
    ]},
    { id: "zh-u-hsk4", level: "HSK4", title: "Upper-int. words", icon: "📈", color: "#bae6fd", lessons: [
      lesson("zh-l-h4-v","HSK4 vocab","flashcards", { cards: VOCAB.hsk4 })
    ]},
    { id: "zh-u-hsk5", level: "HSK5", title: "Advanced words", icon: "🎯", color: "#fbcfe8", lessons: [
      lesson("zh-l-h5-v","HSK5 vocab","flashcards", { cards: VOCAB.hsk5 })
    ]},
    { id: "zh-u-hsk6", level: "HSK6", title: "Mastery", icon: "🏆", color: "#f9a8d4", lessons: [
      lesson("zh-l-h6-v","HSK6 vocab","flashcards", { cards: VOCAB.hsk6 })
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
