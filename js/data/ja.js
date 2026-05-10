// Japanese content — full data: kana, vocab, grammar, kanji, units (per JLPT level)
window.DATA_JA = (function () {
  // ───────────── KANA ─────────────
  const hiraBasic = [
    ["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],
    ["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],
    ["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],
    ["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],
    ["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],
    ["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],
    ["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],
    ["や","ya"],["ゆ","yu"],["よ","yo"],
    ["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],
    ["わ","wa"],["を","wo"],["ん","n"]
  ];
  const hiraDakuten = [
    ["が","ga"],["ぎ","gi"],["ぐ","gu"],["げ","ge"],["ご","go"],
    ["ざ","za"],["じ","ji"],["ず","zu"],["ぜ","ze"],["ぞ","zo"],
    ["だ","da"],["で","de"],["ど","do"],
    ["ば","ba"],["び","bi"],["ぶ","bu"],["べ","be"],["ぼ","bo"],
    ["ぱ","pa"],["ぴ","pi"],["ぷ","pu"],["ぺ","pe"],["ぽ","po"]
  ];
  const kataBasic = [
    ["ア","a"],["イ","i"],["ウ","u"],["エ","e"],["オ","o"],
    ["カ","ka"],["キ","ki"],["ク","ku"],["ケ","ke"],["コ","ko"],
    ["サ","sa"],["シ","shi"],["ス","su"],["セ","se"],["ソ","so"],
    ["タ","ta"],["チ","chi"],["ツ","tsu"],["テ","te"],["ト","to"],
    ["ナ","na"],["ニ","ni"],["ヌ","nu"],["ネ","ne"],["ノ","no"],
    ["ハ","ha"],["ヒ","hi"],["フ","fu"],["ヘ","he"],["ホ","ho"],
    ["マ","ma"],["ミ","mi"],["ム","mu"],["メ","me"],["モ","mo"],
    ["ヤ","ya"],["ユ","yu"],["ヨ","yo"],
    ["ラ","ra"],["リ","ri"],["ル","ru"],["レ","re"],["ロ","ro"],
    ["ワ","wa"],["ヲ","wo"],["ン","n"]
  ];
  const kataDakuten = [
    ["ガ","ga"],["ギ","gi"],["グ","gu"],["ゲ","ge"],["ゴ","go"],
    ["ザ","za"],["ジ","ji"],["ズ","zu"],["ゼ","ze"],["ゾ","zo"],
    ["ダ","da"],["デ","de"],["ド","do"],
    ["バ","ba"],["ビ","bi"],["ブ","bu"],["ベ","be"],["ボ","bo"],
    ["パ","pa"],["ピ","pi"],["プ","pu"],["ペ","pe"],["ポ","po"]
  ];

  function kanaCards(arr, prefix, deck, label) {
    return arr.map((r) => ({
      id: prefix + ":" + r[0],
      lang: "ja",
      level: "N5",
      deck,
      type: "kana",
      front: r[0],
      back: r[1],
      hint: label,
      speakText: r[0]
    }));
  }
  const KANA = {
    hira: kanaCards(hiraBasic, "hira", "hiragana-basic", "hiragana"),
    hiraD: kanaCards(hiraDakuten, "hiraD", "hiragana-dakuten", "hiragana (dakuten)"),
    kata: kanaCards(kataBasic, "kata", "katakana-basic", "katakana"),
    kataD: kanaCards(kataDakuten, "kataD", "katakana-dakuten", "katakana (dakuten)")
  };

  // ───────────── VOCAB ─────────────
  // Each: [jp, kana, romaji, en]
  // Optional German translations, keyed by card id (or by jp word for vocab).
  // Only present where I've manually added them; cards without a match just
  // show English. See DE_VOCAB below.
  function vocabCards(deck, level, items) {
    return items.map((it) => {
      const id = "ja:vocab:" + deck + ":" + it[0];
      return {
        id, lang: "ja", level, deck,
        type: "vocab",
        jp: it[0], kana: it[1], romaji: it[2], en: it[3],
        de: DE_VOCAB[it[0]] || "",
        ex: it[4] || [],   // [[jp, en], ...] example sentences
        front: it[0], back: it[3], hint: it[1],
        speakText: it[1] || it[0]
      };
    });
  }

  // Japanese → German for common N5/N4 vocab (key: the JP form).
  // Empty string is fine; cards without an entry show only English.
  const DE_VOCAB = {
    // greetings
    "こんにちは":"hallo", "おはよう":"guten Morgen", "おはようございます":"guten Morgen (höflich)",
    "こんばんは":"guten Abend", "おやすみ":"gute Nacht", "さようなら":"auf Wiedersehen",
    "またね":"bis später", "ありがとう":"danke", "すみません":"Entschuldigung",
    "ごめんなさい":"es tut mir leid", "はい":"ja", "いいえ":"nein", "お願いします":"bitte",
    // self
    "私":"ich", "あなた":"du / Sie", "名前":"Name", "先生":"Lehrer/in",
    "学生":"Schüler/Student", "友達":"Freund/in", "人":"Person", "国":"Land",
    "日本":"Japan", "アメリカ":"Amerika", "イギリス":"Großbritannien",
    // numbers
    "一":"eins","二":"zwei","三":"drei","四":"vier","五":"fünf","六":"sechs",
    "七":"sieben","八":"acht","九":"neun","十":"zehn","百":"hundert","千":"tausend",
    "万":"zehntausend","円":"Yen",
    // family
    "家族":"Familie","お父さん":"Vater","お母さん":"Mutter","兄":"älterer Bruder",
    "姉":"ältere Schwester","弟":"jüngerer Bruder","妹":"jüngere Schwester",
    "子供":"Kind","犬":"Hund","猫":"Katze",
    // food
    "水":"Wasser","お茶":"Tee","コーヒー":"Kaffee","ご飯":"Reis / Mahlzeit",
    "パン":"Brot","卵":"Ei","魚":"Fisch","肉":"Fleisch","野菜":"Gemüse",
    "果物":"Obst","りんご":"Apfel","寿司":"Sushi","ラーメン":"Ramen",
    "美味しい":"lecker",
    // days/time
    "月曜日":"Montag","火曜日":"Dienstag","水曜日":"Mittwoch","木曜日":"Donnerstag",
    "金曜日":"Freitag","土曜日":"Samstag","日曜日":"Sonntag","今日":"heute",
    "明日":"morgen","昨日":"gestern","朝":"Morgen","夜":"Nacht",
    // verbs N5
    "食べる":"essen","飲む":"trinken","見る":"sehen","聞く":"hören / fragen",
    "話す":"sprechen","読む":"lesen","書く":"schreiben","行く":"gehen",
    "来る":"kommen","する":"machen","買う":"kaufen","寝る":"schlafen",
    "起きる":"aufwachen / aufstehen",
    // adj N5
    "大きい":"groß","小さい":"klein","新しい":"neu","古い":"alt (Sache)",
    "高い":"hoch / teuer","安い":"billig","暑い":"heiß (Wetter)","寒い":"kalt (Wetter)",
    "楽しい":"spaßig","可愛い":"süß/niedlich","綺麗":"hübsch / sauber","元気":"munter / gesund",
    // travel N4
    "旅行":"Reise","飛行機":"Flugzeug","電車":"Zug","地下鉄":"U-Bahn",
    "タクシー":"Taxi","切符":"Fahrkarte","空港":"Flughafen","ホテル":"Hotel",
    "観光":"Sightseeing","地図":"Karte",
    // work N4
    "仕事":"Arbeit","会社":"Firma","会議":"Meeting","上司":"Vorgesetzte/r",
    // feelings N4
    "嬉しい":"glücklich","悲しい":"traurig","怒る":"sich ärgern","驚く":"überrascht sein",
    "心配":"Sorge","安心":"Erleichterung","興味":"Interesse","緊張":"Nervosität",
    // social N3
    "社会":"Gesellschaft","環境":"Umwelt","経済":"Wirtschaft","政治":"Politik",
    "文化":"Kultur","教育":"Bildung","技術":"Technologie","科学":"Wissenschaft",
    "法律":"Gesetz","影響":"Einfluss",
    // abstract N3
    "性格":"Persönlichkeit","態度":"Einstellung","意見":"Meinung","目的":"Ziel",
    "結果":"Ergebnis","原因":"Ursache","理由":"Grund","問題":"Problem","解決":"Lösung",
    // news N2
    "記事":"Artikel","新聞":"Zeitung","雑誌":"Zeitschrift","報道":"Berichterstattung",
    "事件":"Vorfall","事故":"Unfall","経験":"Erfahrung","状況":"Situation",
    "報告":"Bericht","発表":"Ankündigung",
    // business N2
    "契約":"Vertrag","取引":"Geschäft","責任":"Verantwortung","効率":"Effizienz",
    "生産":"Produktion","販売":"Vertrieb","市場":"Markt","競争":"Wettbewerb",
    // advanced N1
    "概念":"Konzept","矛盾":"Widerspruch","普及":"Verbreitung","緩和":"Lockerung",
    "顕著":"auffällig","憂慮":"Besorgnis","示唆":"Andeutung","遵守":"Einhaltung",
    "排他的":"exklusiv","顧みる":"reflektieren über",
    // idioms N1
    "猫の手も借りたい":"völlig überlastet","一石二鳥":"zwei Fliegen mit einer Klappe",
    "十人十色":"jeder ist anders","以心伝心":"stilles Einverständnis",
    "臨機応変":"situativ angepasst",
    // common N5 still missing
    "あなた":"du / Sie","これ":"dies","それ":"das","あれ":"jenes","何":"was",
    "本":"Buch","ペン":"Stift","映画":"Film","音楽":"Musik","花":"Blume","空":"Himmel"
  };

  const VOCAB = {
    // ─── N5 ───
    greetings: vocabCards("greetings", "N5", [
      ["こんにちは","こんにちは","konnichiwa","hello", [["こんにちは。", "Hello."]]],
      ["おはよう","おはよう","ohayou","good morning (casual)", [["おはよう、ねこちゃん。", "Good morning, kitty."]]],
      ["おはようございます","おはようございます","ohayou gozaimasu","good morning (polite)", [["先生、おはようございます。", "Good morning, teacher."]]],
      ["こんばんは","こんばんは","konbanwa","good evening", [["こんばんは、お元気ですか。", "Good evening, how are you?"]]],
      ["おやすみ","おやすみ","oyasumi","good night", [["おやすみなさい。", "Good night."]]],
      ["さようなら","さようなら","sayounara","goodbye", [["さようなら、また明日。", "Goodbye, see you tomorrow."]]],
      ["またね","またね","matane","see you", [["じゃあ、またね！", "Well, see you!"]]],
      ["ありがとう","ありがとう","arigatou","thank you", [["コーヒー、ありがとう。", "Thanks for the coffee."]]],
      ["すみません","すみません","sumimasen","excuse me / sorry", [["すみません、トイレはどこですか。", "Excuse me, where is the toilet?"]]],
      ["ごめんなさい","ごめんなさい","gomen nasai","I'm sorry", [["遅れて、ごめんなさい。", "Sorry I'm late."]]],
      ["はい","はい","hai","yes", [["はい、そうです。", "Yes, that's right."]]],
      ["いいえ","いいえ","iie","no", [["いいえ、ちがいます。", "No, that's wrong."]]],
      ["お願いします","おねがいします","onegai shimasu","please", [["お水、お願いします。", "Water, please."]]]
    ]),
    selfIntro: vocabCards("self-intro", "N5", [
      ["私","わたし","watashi","I / me", [["私は学生です。", "I am a student."]]],
      ["あなた","あなた","anata","you", [["あなたは先生ですか。", "Are you a teacher?"]]],
      ["名前","なまえ","namae","name", [["私の名前はミカです。", "My name is Mika."]]],
      ["先生","せんせい","sensei","teacher", [["先生はやさしいです。", "The teacher is kind."]]],
      ["学生","がくせい","gakusei","student", [["私は日本語の学生です。", "I am a Japanese (language) student."]]],
      ["友達","ともだち","tomodachi","friend", [["友達と話します。", "I talk with my friend."]]],
      ["人","ひと","hito","person", [["あの人は先生です。", "That person is a teacher."]]],
      ["国","くに","kuni","country", [["どこの国の人ですか。", "What country are you from?"]]],
      ["日本","にほん","nihon","Japan", [["日本はきれいな国です。", "Japan is a beautiful country."]]],
      ["アメリカ","アメリカ","amerika","America", [["アメリカに行きます。", "I'll go to America."]]],
      ["イギリス","イギリス","igirisu","UK", [["イギリスから来ました。", "I came from the UK."]]]
    ]),
    numbers: vocabCards("numbers", "N5", [
      ["一","いち","ichi","one", [["りんごを一つください。", "One apple, please."]]],
      ["二","に","ni","two", [["友達が二人います。", "I have two friends."]]],
      ["三","さん","san","three", [["三時です。", "It's three o'clock."]]],
      ["四","よん","yon","four", [["四月に来ます。", "I'll come in April (4th month)."]]],
      ["五","ご","go","five", [["五人の学生がいます。", "There are five students."]]],
      ["六","ろく","roku","six", [["六時に起きます。", "I get up at 6."]]],
      ["七","なな","nana","seven", [["七日です。", "It's the 7th."]]],
      ["八","はち","hachi","eight", [["八時に寝ます。", "I sleep at 8."]]],
      ["九","きゅう","kyuu","nine", [["九時から仕事です。", "Work starts at 9."]]],
      ["十","じゅう","juu","ten", [["十円ください。", "10 yen, please."]]],
      ["百","ひゃく","hyaku","hundred", [["百円のパンです。", "It's a 100-yen bread."]]],
      ["千","せん","sen","thousand", [["千円です。", "It's 1000 yen."]]],
      ["万","まん","man","ten thousand", [["一万円もらいました。", "I got 10,000 yen."]]],
      ["円","えん","en","yen", [["これは百円です。", "This is 100 yen."]]]
    ]),
    family: vocabCards("family", "N5", [
      ["家族","かぞく","kazoku","family", [["私の家族は四人です。", "My family is four people."]]],
      ["お父さん","おとうさん","otousan","father", [["お父さんは先生です。", "My father is a teacher."]]],
      ["お母さん","おかあさん","okaasan","mother", [["お母さんはやさしいです。", "My mother is kind."]]],
      ["兄","あに","ani","older brother", [["私の兄は学生です。", "My older brother is a student."]]],
      ["姉","あね","ane","older sister", [["姉はアメリカに行きました。", "My sister went to America."]]],
      ["弟","おとうと","otouto","younger brother", [["弟はパンを食べます。", "My younger brother eats bread."]]],
      ["妹","いもうと","imouto","younger sister", [["妹はかわいいです。", "My little sister is cute."]]],
      ["子供","こども","kodomo","child", [["子供が二人います。", "I have two children."]]],
      ["犬","いぬ","inu","dog", [["犬はかわいいです。", "Dogs are cute."]]],
      ["猫","ねこ","neko","cat", [["私の猫の名前はモチです。", "My cat's name is Mochi."]]]
    ]),
    food: vocabCards("food", "N5", [
      ["水","みず","mizu","water", [["水を飲みます。", "I drink water."]]],
      ["お茶","おちゃ","ocha","tea", [["お茶、お願いします。", "Tea, please."]]],
      ["コーヒー","コーヒー","koohii","coffee", [["朝、コーヒーを飲みます。", "I drink coffee in the morning."]]],
      ["ご飯","ごはん","gohan","rice / meal", [["ご飯を食べました。", "I ate rice / a meal."]]],
      ["パン","パン","pan","bread", [["パンが好きです。", "I like bread."]]],
      ["卵","たまご","tamago","egg", [["卵を二つください。", "Two eggs, please."]]],
      ["魚","さかな","sakana","fish", [["寿司は魚です。", "Sushi is fish."]]],
      ["肉","にく","niku","meat", [["肉を食べません。", "I don't eat meat."]]],
      ["野菜","やさい","yasai","vegetable", [["野菜は体にいいです。", "Vegetables are good for the body."]]],
      ["果物","くだもの","kudamono","fruit", [["果物が大好きです。", "I love fruit."]]],
      ["りんご","りんご","ringo","apple", [["りんごは赤いです。", "Apples are red."]]],
      ["寿司","すし","sushi","sushi", [["寿司を食べたいです。", "I want to eat sushi."]]],
      ["ラーメン","ラーメン","raamen","ramen", [["ラーメンは美味しいです。", "Ramen is delicious."]]],
      ["美味しい","おいしい","oishii","delicious", [["このパンは美味しい！", "This bread is delicious!"]]]
    ]),
    daysTime: vocabCards("days-time", "N5", [
      ["月曜日","げつようび","getsuyoubi","Monday", [["月曜日に学校に行きます。", "I go to school on Monday."]]],
      ["火曜日","かようび","kayoubi","Tuesday", [["火曜日は寿司を食べます。", "I eat sushi on Tuesday."]]],
      ["水曜日","すいようび","suiyoubi","Wednesday", [["水曜日に友達と会います。", "I meet a friend on Wednesday."]]],
      ["木曜日","もくようび","mokuyoubi","Thursday", [["今日は木曜日です。", "Today is Thursday."]]],
      ["金曜日","きんようび","kinyoubi","Friday", [["金曜日が好きです。", "I like Fridays."]]],
      ["土曜日","どようび","doyoubi","Saturday", [["土曜日は寝ます。", "I sleep on Saturdays."]]],
      ["日曜日","にちようび","nichiyoubi","Sunday", [["日曜日に家にいます。", "I'm at home on Sunday."]]],
      ["今日","きょう","kyou","today", [["今日は寒いです。", "It's cold today."]]],
      ["明日","あした","ashita","tomorrow", [["また明日！", "See you tomorrow!"]]],
      ["昨日","きのう","kinou","yesterday", [["昨日寿司を食べました。", "I ate sushi yesterday."]]],
      ["朝","あさ","asa","morning", [["朝、コーヒーを飲みます。", "I drink coffee in the morning."]]],
      ["夜","よる","yoru","night", [["夜、本を読みます。", "I read a book at night."]]]
    ]),
    verbsN5: vocabCards("verbs-n5", "N5", [
      ["食べる","たべる","taberu","to eat", [["パンを食べます。", "I eat bread."]]],
      ["飲む","のむ","nomu","to drink", [["水を飲みます。", "I drink water."]]],
      ["見る","みる","miru","to see / watch", [["猫を見ます。", "I look at the cat."]]],
      ["聞く","きく","kiku","to listen / ask", [["先生に聞きます。", "I ask the teacher."]]],
      ["話す","はなす","hanasu","to speak", [["友達と話します。", "I speak with my friend."]]],
      ["読む","よむ","yomu","to read", [["本を読みます。", "I read a book."]]],
      ["書く","かく","kaku","to write", [["名前を書きます。", "I write my name."]]],
      ["行く","いく","iku","to go", [["学校に行きます。", "I go to school."]]],
      ["来る","くる","kuru","to come", [["明日、友達が来ます。", "My friend will come tomorrow."]]],
      ["する","する","suru","to do", [["勉強をします。", "I study."]]],
      ["買う","かう","kau","to buy", [["パンを買います。", "I'll buy bread."]]],
      ["寝る","ねる","neru","to sleep", [["夜、寝ます。", "I sleep at night."]]],
      ["起きる","おきる","okiru","to get up", [["朝、六時に起きます。", "I get up at 6 in the morning."]]]
    ]),
    adjN5: vocabCards("adj-n5", "N5", [
      ["大きい","おおきい","ookii","big", [["大きい犬がいます。", "There's a big dog."]]],
      ["小さい","ちいさい","chiisai","small", [["小さい猫はかわいい。", "Small cats are cute."]]],
      ["新しい","あたらしい","atarashii","new", [["新しい本を買いました。", "I bought a new book."]]],
      ["古い","ふるい","furui","old (things)", [["古い家に住んでいます。", "I live in an old house."]]],
      ["高い","たかい","takai","tall / expensive", [["この寿司は高いです。", "This sushi is expensive."]]],
      ["安い","やすい","yasui","cheap", [["安いパンを買います。", "I'll buy cheap bread."]]],
      ["暑い","あつい","atsui","hot (weather)", [["今日は暑いです。", "It's hot today."]]],
      ["寒い","さむい","samui","cold (weather)", [["冬は寒いです。", "Winter is cold."]]],
      ["楽しい","たのしい","tanoshii","fun", [["日本語は楽しい！", "Japanese is fun!"]]],
      ["可愛い","かわいい","kawaii","cute", [["猫はかわいいです。", "Cats are cute."]]],
      ["綺麗","きれい","kirei","pretty", [["きれいな花です。", "It's a pretty flower."]]],
      ["元気","げんき","genki","energetic / well", [["元気ですか？", "Are you well?"]]]
    ]),

    // ─── N4 ───
    travelN4: vocabCards("travel-n4", "N4", [
      ["旅行","りょこう","ryokou","travel", [["日本に旅行に行きます。", "I'll travel to Japan."]]],
      ["飛行機","ひこうき","hikouki","airplane", [["飛行機は高いです。", "Planes are expensive."]]],
      ["電車","でんしゃ","densha","train", [["電車で学校に行きます。", "I go to school by train."]]],
      ["地下鉄","ちかてつ","chikatetsu","subway", [["地下鉄は速いです。", "The subway is fast."]]],
      ["タクシー","タクシー","takushii","taxi", [["タクシーで来ました。", "I came by taxi."]]],
      ["切符","きっぷ","kippu","ticket", [["切符を買います。", "I'll buy a ticket."]]],
      ["空港","くうこう","kuukou","airport", [["空港は遠いです。", "The airport is far."]]],
      ["ホテル","ホテル","hoteru","hotel", [["ホテルに泊まります。", "I'll stay at a hotel."]]],
      ["観光","かんこう","kankou","sightseeing", [["京都で観光します。", "I'll go sightseeing in Kyoto."]]],
      ["地図","ちず","chizu","map", [["地図を見てください。", "Please look at the map."]]]
    ]),
    workN4: vocabCards("work-n4", "N4", [
      ["仕事","しごと","shigoto","work / job", [["仕事は楽しいです。", "Work is fun."]]],
      ["会社","かいしゃ","kaisha","company", [["会社に行きます。", "I go to the company."]]],
      ["社員","しゃいん","shain","employee", [["社員は十人です。", "There are 10 employees."]]],
      ["会議","かいぎ","kaigi","meeting", [["三時から会議です。", "There's a meeting from 3."]]],
      ["お客様","おきゃくさま","okyakusama","customer", [["お客様、こんにちは。", "Hello, customer."]]],
      ["上司","じょうし","joushi","boss", [["上司はやさしいです。", "My boss is kind."]]],
      ["同僚","どうりょう","douryou","coworker", [["同僚と昼ご飯を食べます。", "I eat lunch with a coworker."]]],
      ["給料","きゅうりょう","kyuuryou","salary", [["給料は安いです。", "The salary is low."]]],
      ["残業","ざんぎょう","zangyou","overtime", [["今日は残業です。", "Today is overtime."]]]
    ]),
    feelingsN4: vocabCards("feelings-n4", "N4", [
      ["嬉しい","うれしい","ureshii","happy", [["プレゼント、嬉しい！", "I'm so happy about the present!"]]],
      ["悲しい","かなしい","kanashii","sad", [["悲しい映画でした。", "It was a sad movie."]]],
      ["怒る","おこる","okoru","to get angry", [["お父さんが怒りました。", "Dad got angry."]]],
      ["驚く","おどろく","odoroku","to be surprised", [["ニュースに驚きました。", "I was surprised at the news."]]],
      ["心配","しんぱい","shinpai","worry", [["心配しないでください。", "Please don't worry."]]],
      ["安心","あんしん","anshin","relief", [["元気で安心しました。", "I'm relieved you're okay."]]],
      ["興味","きょうみ","kyoumi","interest", [["音楽に興味があります。", "I'm interested in music."]]],
      ["緊張","きんちょう","kinchou","nervousness", [["試験で緊張します。", "I get nervous at exams."]]]
    ]),

    // ─── N3 ───
    socialN3: vocabCards("social-n3", "N3", [
      ["社会","しゃかい","shakai","society", [["日本の社会は変わっています。", "Japanese society is changing."]]],
      ["環境","かんきょう","kankyou","environment", [["環境を守ります。", "We protect the environment."]]],
      ["経済","けいざい","keizai","economy", [["経済はゆっくり良くなります。", "The economy slowly improves."]]],
      ["政治","せいじ","seiji","politics", [["政治に興味があります。", "I'm interested in politics."]]],
      ["文化","ぶんか","bunka","culture", [["日本の文化は面白いです。", "Japanese culture is interesting."]]],
      ["教育","きょういく","kyouiku","education", [["教育は大切です。", "Education is important."]]],
      ["技術","ぎじゅつ","gijutsu","technology", [["新しい技術を学びます。", "I learn new technology."]]],
      ["科学","かがく","kagaku","science", [["科学の本を読みます。", "I read science books."]]],
      ["法律","ほうりつ","houritsu","law", [["法律を守ります。", "We obey the law."]]],
      ["影響","えいきょう","eikyou","influence / impact", [["天気の影響で遅れました。", "I was late due to weather."]]]
    ]),
    abstractN3: vocabCards("abstract-n3", "N3", [
      ["性格","せいかく","seikaku","personality", [["やさしい性格の人です。", "A person with a kind personality."]]],
      ["態度","たいど","taido","attitude", [["態度を変えてください。", "Please change your attitude."]]],
      ["意見","いけん","iken","opinion", [["意見を聞きます。", "I'll listen to opinions."]]],
      ["目的","もくてき","mokuteki","purpose", [["旅行の目的は観光です。", "The trip's purpose is sightseeing."]]],
      ["結果","けっか","kekka","result", [["結果は良かったです。", "The result was good."]]],
      ["原因","げんいん","gen'in","cause", [["事故の原因は何ですか。", "What's the cause of the accident?"]]],
      ["理由","りゆう","riyuu","reason", [["遅れた理由を話します。", "I'll explain why I was late."]]],
      ["問題","もんだい","mondai","problem", [["大きい問題があります。", "There's a big problem."]]],
      ["解決","かいけつ","kaiketsu","solution", [["問題を解決しました。", "I solved the problem."]]]
    ]),

    // ─── N2 ───
    newsN2: vocabCards("news-n2", "N2", [
      ["記事","きじ","kiji","article", [["新聞の記事を読みました。", "I read a newspaper article."]]],
      ["新聞","しんぶん","shinbun","newspaper", [["毎朝、新聞を読みます。", "I read the newspaper every morning."]]],
      ["雑誌","ざっし","zasshi","magazine", [["雑誌を買いました。", "I bought a magazine."]]],
      ["報道","ほうどう","houdou","news report", [["事故の報道を見ました。", "I saw the accident report."]]],
      ["事件","じけん","jiken","incident", [["大きい事件がありました。", "There was a big incident."]]],
      ["事故","じこ","jiko","accident", [["駅で事故がありました。", "There was an accident at the station."]]],
      ["経験","けいけん","keiken","experience", [["仕事の経験があります。", "I have work experience."]]],
      ["状況","じょうきょう","joukyou","situation", [["状況を説明します。", "I'll explain the situation."]]],
      ["報告","ほうこく","houkoku","report", [["上司に報告します。", "I'll report to my boss."]]],
      ["発表","はっぴょう","happyou","announcement", [["明日、発表があります。", "There's an announcement tomorrow."]]]
    ]),
    businessN2: vocabCards("business-n2", "N2", [
      ["契約","けいやく","keiyaku","contract", [["契約にサインしました。", "I signed the contract."]]],
      ["取引","とりひき","torihiki","transaction", [["大きい取引が決まりました。", "A big deal was decided."]]],
      ["責任","せきにん","sekinin","responsibility", [["責任を持ちます。", "I'll take responsibility."]]],
      ["効率","こうりつ","kouritsu","efficiency", [["仕事の効率を上げます。", "We'll raise work efficiency."]]],
      ["生産","せいさん","seisan","production", [["生産が増えました。", "Production has increased."]]],
      ["販売","はんばい","hanbai","sales", [["新しい商品の販売を始めます。", "We start selling the new product."]]],
      ["市場","しじょう","shijou","market", [["日本の市場は大きいです。", "The Japanese market is large."]]],
      ["競争","きょうそう","kyousou","competition", [["競争が激しいです。", "Competition is fierce."]]]
    ]),

    // ─── N1 ───
    advancedN1: vocabCards("advanced-n1", "N1", [
      ["概念","がいねん","gainen","concept", [["新しい概念を学びました。", "I learned a new concept."]]],
      ["矛盾","むじゅん","mujun","contradiction", [["話に矛盾があります。", "There's a contradiction in the story."]]],
      ["普及","ふきゅう","fukyuu","diffusion / spread", [["スマホが普及しました。", "Smartphones have spread widely."]]],
      ["緩和","かんわ","kanwa","easing / mitigation", [["規則を緩和します。", "We will ease the rules."]]],
      ["顕著","けんちょ","kencho","striking / prominent", [["変化が顕著です。", "The change is striking."]]],
      ["憂慮","ゆうりょ","yuuryo","apprehension", [["事故を憂慮しています。", "We are concerned about the accident."]]],
      ["示唆","しさ","shisa","suggestion / hint", [["先生が解決を示唆しました。", "The teacher hinted at a solution."]]],
      ["遵守","じゅんしゅ","junshu","compliance", [["規則を遵守します。", "We will comply with the rules."]]],
      ["排他的","はいたてき","haitateki","exclusive", [["排他的な態度はよくない。", "An exclusive attitude is not good."]]],
      ["顧みる","かえりみる","kaerimiru","to reflect on", [["過去を顧みます。", "I reflect on the past."]]]
    ]),
    idiomsN1: vocabCards("idioms-n1", "N1", [
      ["猫の手も借りたい","ねこのてもかりたい","neko no te mo karitai","extremely busy (lit. want to borrow even a cat's paw)", [["仕事が多くて猫の手も借りたい。", "There's so much work I'd take any help."]]],
      ["一石二鳥","いっせきにちょう","isseki nichou","two birds with one stone", [["これは一石二鳥です。", "This is two birds with one stone."]]],
      ["十人十色","じゅうにんといろ","juunin toiro","to each their own", [["意見は十人十色です。", "Opinions vary from person to person."]]],
      ["以心伝心","いしんでんしん","ishin denshin","heart-to-heart understanding", [["友達と以心伝心です。", "I have a deep understanding with my friend."]]],
      ["臨機応変","りんきおうへん","rinki ouhen","adaptable to circumstances", [["臨機応変に対応します。", "I'll respond flexibly."]]]
    ])
  };

  // ───────────── KANJI ─────────────
  // Each: [kanji, kun, on, meaning]
  function kanjiCards(deck, level, items) {
    return items.map((it) => ({
      id: "ja:kanji:" + it[0],
      lang: "ja",
      level,
      deck,
      type: "kanji",
      jp: it[0],
      kun: it[1],
      on: it[2],
      en: it[3],
      front: it[0],
      back: it[3],
      hint: (it[1] ? "kun: " + it[1] : "") + (it[2] ? "  on: " + it[2] : ""),
      speakText: it[1] || it[2] || it[0]
    }));
  }

  const KANJI = {
    n5a: kanjiCards("kanji-n5-a", "N5", [
      ["日","ひ","ニチ","day / sun"],
      ["月","つき","ゲツ","moon / month"],
      ["火","ひ","カ","fire"],
      ["水","みず","スイ","water"],
      ["木","き","モク","tree / wood"],
      ["金","かね","キン","gold / money"],
      ["土","つち","ド","earth / soil"],
      ["人","ひと","ジン","person"],
      ["山","やま","サン","mountain"],
      ["川","かわ","セン","river"]
    ]),
    n5b: kanjiCards("kanji-n5-b", "N5", [
      ["田","た","デン","rice field"],
      ["上","うえ","ジョウ","up / above"],
      ["下","した","カ","down / below"],
      ["中","なか","チュウ","middle / inside"],
      ["大","おお","ダイ","big"],
      ["小","ちい","ショウ","small"],
      ["私","わたし","シ","I / private"],
      ["父","ちち","フ","father"],
      ["母","はは","ボ","mother"],
      ["子","こ","シ","child"]
    ]),
    n5c: kanjiCards("kanji-n5-c", "N5", [
      ["何","なに","カ","what"],
      ["時","とき","ジ","time / hour"],
      ["年","とし","ネン","year"],
      ["先","さき","セン","previous / ahead"],
      ["生","い","セイ","life / birth"],
      ["学","まな","ガク","study"],
      ["校","-","コウ","school"],
      ["国","くに","コク","country"],
      ["本","もと","ホン","book / origin"],
      ["行","い","コウ","to go"]
    ]),
    n4: kanjiCards("kanji-n4", "N4", [
      ["朝","あさ","チョウ","morning"],
      ["昼","ひる","チュウ","noon"],
      ["夜","よる","ヤ","night"],
      ["週","-","シュウ","week"],
      ["駅","-","エキ","station"],
      ["銀","-","ギン","silver / bank"],
      ["病","やまい","ビョウ","illness"],
      ["院","-","イン","institution"],
      ["旅","たび","リョ","travel"],
      ["地","-","チ","earth / ground"]
    ]),
    n3: kanjiCards("kanji-n3", "N3", [
      ["政","まつりごと","セイ","government"],
      ["治","おさ","ジ","govern / cure"],
      ["経","-","ケイ","passage / sutra"],
      ["済","-","サイ","finish / settle"],
      ["技","わざ","ギ","skill / art"],
      ["術","-","ジュツ","technique"],
      ["影","かげ","エイ","shadow"],
      ["響","ひび","キョウ","echo / influence"]
    ]),
    n2: kanjiCards("kanji-n2", "N2", [
      ["契","ちぎ","ケイ","pledge / contract"],
      ["約","-","ヤク","promise / approximately"],
      ["責","せ","セキ","responsibility"],
      ["任","まか","ニン","duty / entrust"],
      ["効","き","コウ","effect / efficacy"],
      ["率","-","リツ","rate / ratio"]
    ]),
    n1: kanjiCards("kanji-n1", "N1", [
      ["概","-","ガイ","outline"],
      ["念","-","ネン","thought / concern"],
      ["矛","ほこ","ム","halberd"],
      ["盾","たて","ジュン","shield"],
      ["顕","あらわ","ケン","prominent"],
      ["著","-","チョ","prominent / publish"],
      ["憂","うれ","ユウ","gloom / worry"]
    ])
  };

  // ───────────── GRAMMAR ─────────────
  // Each lesson: { id, level, title, intro, examples [{jp,en,breakdown}], quiz }
  const GRAMMAR = [
    {
      id: "ja-g-wa", level: "N5",
      title: "は — Topic marker",
      intro: "The particle <b>は</b> (pronounced <i>wa</i>) marks the <b>topic</b> — what you're talking about. Think \"as for X, …\".",
      examples: [
        { jp: "私は学生です。", en: "I am a student.", de: "Ich bin Student.", breakdown: "私 (I) + は (topic) + 学生 (student) + です (is)" },
        { jp: "これはペンです。", en: "This is a pen.", de: "Das ist ein Stift.", breakdown: "これ + は + ペン + です" },
        { jp: "猫はかわいいです。", en: "Cats are cute.", de: "Katzen sind süß.", breakdown: "猫 + は + かわいい + です" }
      ],
      quiz: [
        { type: "mc", q: "How is は pronounced as a particle?", choices: ["ha","wa","ba","ga"], answer: "wa" },
        { type: "mc", q: "Choose: \"I am a teacher.\"", choices: ["私は先生です","私を先生です","私が先生は","先生は私を"], answer: "私は先生です" },
        { type: "fill", q: "猫___かわいい (Cats are cute)", choices: ["は","を","が","の"], answer: "は" }
      ]
    },
    {
      id: "ja-g-desu", level: "N5",
      title: "です — Polite \"to be\"",
      intro: "<b>です</b> is the polite copula. It comes <b>at the end</b> after a noun or い/な-adjective: \"X です\" = \"It is X\".",
      examples: [
        { jp: "学生です。", en: "I am a student.", de: "Ich bin Student.", breakdown: "学生 + です" },
        { jp: "日本人です。", en: "I am Japanese.", de: "Ich bin Japaner/in.", breakdown: "日本 + 人 + です" },
        { jp: "美味しいです。", en: "It's delicious.", de: "Es ist lecker.", breakdown: "美味しい + です" }
      ],
      quiz: [
        { type: "mc", q: "What does です mean?", choices: ["question marker","polite \"to be\"","topic marker","\"and\""], answer: "polite \"to be\"" },
        { type: "mc", q: "Where does です go?", choices: ["start","end","middle","anywhere"], answer: "end" }
      ]
    },
    {
      id: "ja-g-ka", level: "N5",
      title: "か — Question marker",
      intro: "Add <b>か</b> at the end to make a question. No \"?\" needed in writing.",
      examples: [
        { jp: "学生ですか。", en: "Are you a student?", de: "Bist du Student?", breakdown: "学生 + です + か" },
        { jp: "これは何ですか。", en: "What is this?", de: "Was ist das?", breakdown: "これ + は + 何 + です + か" }
      ],
      quiz: [
        { type: "mc", q: "How do you make a question?", choices: ["add か at the end","add は at start","remove です","add ね"], answer: "add か at the end" },
        { type: "mc", q: "Question form of 学生です。", choices: ["学生ですか","学生はです","学生をです","学生がです"], answer: "学生ですか" }
      ]
    },
    {
      id: "ja-g-kosoado", level: "N5",
      title: "これ・それ・あれ — this / that / over there",
      intro: "Three distance levels:\n• <b>これ</b> near me\n• <b>それ</b> near you\n• <b>あれ</b> far from both\n<b>どれ</b> = which one?",
      examples: [
        { jp: "これは本です。", en: "This is a book.", breakdown: "これ + は + 本 + です" },
        { jp: "それは何ですか。", en: "What is that (near you)?", breakdown: "それ + は + 何 + です + か" },
        { jp: "あれは富士山です。", en: "That is Mt. Fuji.", breakdown: "あれ + は + 富士山 + です" }
      ],
      quiz: [
        { type: "mc", q: "Which means \"this\" (near me)?", choices: ["それ","あれ","これ","どれ"], answer: "これ" },
        { type: "mc", q: "\"That over there\" =", choices: ["あれ","それ","これ","どれ"], answer: "あれ" }
      ]
    },
    {
      id: "ja-g-no", level: "N5",
      title: "の — Possession",
      intro: "<b>A の B</b> = \"A's B\" or \"B of A\".",
      examples: [
        { jp: "私の本", en: "my book", breakdown: "私 + の + 本" },
        { jp: "日本の食べ物", en: "Japanese food", breakdown: "日本 + の + 食べ物" }
      ],
      quiz: [
        { type: "mc", q: "How do you say \"my cat\"?", choices: ["私は猫","私の猫","私が猫","私を猫"], answer: "私の猫" },
        { type: "mc", q: "What does 先生の本 mean?", choices: ["the teacher","the teacher's book","a book teacher","I am a teacher"], answer: "the teacher's book" }
      ]
    },
    {
      id: "ja-g-wo", level: "N5",
      title: "を — Object marker",
      intro: "<b>を</b> (pronounced <i>o</i>) marks the direct object of an action verb.",
      examples: [
        { jp: "ご飯を食べます。", en: "I eat rice.", breakdown: "ご飯 + を + 食べます" },
        { jp: "本を読みます。", en: "I read a book.", breakdown: "本 + を + 読みます" }
      ],
      quiz: [
        { type: "mc", q: "How is を pronounced as a particle?", choices: ["wo","o","u","yo"], answer: "o" },
        { type: "fill", q: "パン___食べます。 (I eat bread)", choices: ["を","は","の","が"], answer: "を" }
      ]
    },
    {
      id: "ja-g-masu", level: "N5",
      title: "ます-form — Polite verbs",
      intro: "Polite verbs end in <b>ます</b>:\n• 食べ<b>ます</b> — \"eat\"\n• 食べ<b>ません</b> — \"don't eat\"\n• 食べ<b>ました</b> — \"ate\"\n• 食べ<b>ませんでした</b> — \"didn't eat\"",
      examples: [
        { jp: "毎日コーヒーを飲みます。", en: "I drink coffee every day.", breakdown: "毎日 + コーヒー + を + 飲みます" },
        { jp: "肉を食べません。", en: "I don't eat meat.", breakdown: "肉 + を + 食べません" }
      ],
      quiz: [
        { type: "mc", q: "Which means \"don't eat\"?", choices: ["食べます","食べません","食べました","食べませんでした"], answer: "食べません" },
        { type: "mc", q: "Which means \"drank\"?", choices: ["飲みます","飲みません","飲みました","飲みませんでした"], answer: "飲みました" }
      ]
    },
    {
      id: "ja-g-nide", level: "N5",
      title: "に・で — Location particles",
      intro: "<b>に</b> = destination or where something <i>exists</i>.\n<b>で</b> = where an <i>action</i> happens.",
      examples: [
        { jp: "学校に行きます。", en: "I go to school.", breakdown: "学校 + に + 行きます" },
        { jp: "学校で勉強します。", en: "I study at school.", breakdown: "学校 + で + 勉強します" }
      ],
      quiz: [
        { type: "fill", q: "公園___犬がいます (There's a dog in the park)", choices: ["に","で","を","は"], answer: "に" },
        { type: "fill", q: "レストラン___食べます (I eat at the restaurant)", choices: ["で","に","を","の"], answer: "で" }
      ]
    },

    // N4
    {
      id: "ja-g-te", level: "N4",
      title: "て-form — connecting verbs",
      intro: "The <b>て-form</b> connects clauses, makes requests, and forms continuous tense.\n• 食べる → 食べ<b>て</b>\n• 飲む → 飲<b>んで</b>\n• 行く → 行<b>って</b>",
      examples: [
        { jp: "ご飯を食べて、寝ます。", en: "I eat rice and (then) sleep.", breakdown: "食べ + て (and then) + 寝ます" },
        { jp: "ちょっと待ってください。", en: "Please wait a moment.", breakdown: "待っ + て + ください (please)" },
        { jp: "本を読んでいます。", en: "I'm reading a book.", breakdown: "読ん + で + います (-ing)" }
      ],
      quiz: [
        { type: "mc", q: "te-form of 食べる?", choices: ["食べて","食べた","食べって","食べんで"], answer: "食べて" },
        { type: "mc", q: "te-form of 飲む?", choices: ["飲んで","飲って","飲みて","飲んて"], answer: "飲んで" }
      ]
    },
    {
      id: "ja-g-comparative", level: "N4",
      title: "より・の方が — Comparisons",
      intro: "<b>A より B の方が ...</b> = \"B is more ... than A\".",
      examples: [
        { jp: "犬より猫の方が好きです。", en: "I like cats more than dogs.", breakdown: "犬 + より (than) + 猫 + の方が (more) + 好き" },
        { jp: "東京より大阪の方が暑いです。", en: "Osaka is hotter than Tokyo." }
      ],
      quiz: [
        { type: "mc", q: "What does より mean?", choices: ["more","than","also","too"], answer: "than" }
      ]
    },

    // N3
    {
      id: "ja-g-conditional-tara", level: "N3",
      title: "〜たら — \"if / when\"",
      intro: "Add <b>〜たら</b> to the past form to express a conditional. \"If/when X happens, then Y.\"",
      examples: [
        { jp: "雨が降ったら、家にいます。", en: "If it rains, I'll stay home.", breakdown: "降っ + たら + 家にいます" },
        { jp: "お金があったら、旅行します。", en: "If I had money, I'd travel." }
      ],
      quiz: [
        { type: "mc", q: "〜たら attaches to which form?", choices: ["dictionary","past (た) form","te-form","ます-stem"], answer: "past (た) form" }
      ]
    },
    {
      id: "ja-g-passive", level: "N3",
      title: "Passive form (〜られる)",
      intro: "Verbs become passive with <b>〜(ら)れる</b>:\n• 見る → 見<b>られる</b>\n• 食べる → 食べ<b>られる</b>\n• 飲む → 飲<b>まれる</b>",
      examples: [
        { jp: "ケーキは弟に食べられた。", en: "The cake was eaten by my brother.", breakdown: "ケーキ + は + 弟 + に (by) + 食べられた" }
      ],
      quiz: [
        { type: "mc", q: "Passive of 飲む?", choices: ["飲まれる","飲める","飲ませる","飲んで"], answer: "飲まれる" }
      ]
    },

    // N2
    {
      id: "ja-g-keigo", level: "N2",
      title: "敬語 — Respectful & humble speech",
      intro: "Two main forms beyond plain polite:\n• <b>尊敬語</b> elevates the listener (お/ご + 〜になる, special verbs like いらっしゃる)\n• <b>謙譲語</b> humbles the speaker (お/ご + 〜する, 申す, 致す, 参る)",
      examples: [
        { jp: "社長はもう帰られました。", en: "The president has already gone home. (respectful)" },
        { jp: "明日、お電話いたします。", en: "I will call you tomorrow. (humble)" }
      ],
      quiz: [
        { type: "mc", q: "Which is humble (謙譲語)?", choices: ["いらっしゃる","召し上がる","参る","ご覧になる"], answer: "参る" }
      ]
    },

    // N1
    {
      id: "ja-g-ni-sokushite", level: "N1",
      title: "〜に即して — \"in conformity with\"",
      intro: "<b>〜に即して</b> means \"in line with / according to\" — used in formal/legal contexts.",
      examples: [
        { jp: "規則に即して処理します。", en: "We will handle it according to the rules." }
      ],
      quiz: [
        { type: "mc", q: "Best translation of に即して?", choices: ["according to","in spite of","because of","as if"], answer: "according to" }
      ]
    }
  ];

  // ───────────── UNITS / LEARNING PATH ─────────────
  // Each unit: { id, level, title, icon, color, lessons: [{id,title,type,cards,grammarId?}] }
  function lesson(id, title, type, payload) {
    return { id, title, type, ...payload };
  }

  const UNITS = [
    // ── N5 ──
    {
      id: "ja-u-hira1", level: "N5", title: "Hiragana: vowels & K", icon: "あ", color: "#fde68a",
      lessons: [
        lesson("ja-l-hira-vowels", "Vowels あいうえお", "flashcards", { cards: KANA.hira.slice(0, 5) }),
        lesson("ja-l-hira-k",      "K-row かきくけこ",  "flashcards", { cards: KANA.hira.slice(5, 10) }),
        lesson("ja-l-hira-mix1",   "Quiz: vowels + K",  "quiz",       { cards: KANA.hira.slice(0, 10) })
      ]
    },
    {
      id: "ja-u-hira2", level: "N5", title: "Hiragana: S・T・N", icon: "さ", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-hira-s", "S-row さしすせそ", "flashcards", { cards: KANA.hira.slice(10, 15) }),
        lesson("ja-l-hira-t", "T-row たちつてと", "flashcards", { cards: KANA.hira.slice(15, 20) }),
        lesson("ja-l-hira-n", "N-row なにぬねの", "flashcards", { cards: KANA.hira.slice(20, 25) }),
        lesson("ja-l-hira-q2","Quiz: S・T・N",   "quiz",       { cards: KANA.hira.slice(10, 25) })
      ]
    },
    {
      id: "ja-u-hira3", level: "N5", title: "Hiragana: H・M・YR", icon: "は", color: "#bae6fd",
      lessons: [
        lesson("ja-l-hira-h", "H-row はひふへほ", "flashcards", { cards: KANA.hira.slice(25, 30) }),
        lesson("ja-l-hira-m", "M-row まみむめも", "flashcards", { cards: KANA.hira.slice(30, 35) }),
        lesson("ja-l-hira-yr","Y・R・W・N",      "flashcards", { cards: KANA.hira.slice(35) }),
        lesson("ja-l-hira-q3","Quiz: H・M・YR",  "quiz",       { cards: KANA.hira.slice(25) })
      ]
    },
    {
      id: "ja-u-hiraD", level: "N5", title: "Hiragana with dakuten", icon: "が", color: "#ddd6fe",
      lessons: [
        lesson("ja-l-hira-d1", "が・ざ・だ rows", "flashcards", { cards: KANA.hiraD.slice(0, 13) }),
        lesson("ja-l-hira-d2", "ば・ぱ rows",     "flashcards", { cards: KANA.hiraD.slice(13) }),
        lesson("ja-l-hira-dq", "Dakuten quiz",    "quiz",       { cards: KANA.hiraD })
      ]
    },
    {
      id: "ja-u-kata1", level: "N5", title: "Katakana: vowels-T", icon: "ア", color: "#fed7aa",
      lessons: [
        lesson("ja-l-kata-v", "Vowels アイウエオ", "flashcards", { cards: KANA.kata.slice(0, 5) }),
        lesson("ja-l-kata-k", "K-row カキクケコ",  "flashcards", { cards: KANA.kata.slice(5, 10) }),
        lesson("ja-l-kata-s", "S-row サシスセソ",  "flashcards", { cards: KANA.kata.slice(10, 15) }),
        lesson("ja-l-kata-t", "T-row タチツテト",  "flashcards", { cards: KANA.kata.slice(15, 20) }),
        lesson("ja-l-kata-q1","Quiz: vowels-T",   "quiz",       { cards: KANA.kata.slice(0, 20) })
      ]
    },
    {
      id: "ja-u-kata2", level: "N5", title: "Katakana: N-end", icon: "ハ", color: "#fecaca",
      lessons: [
        lesson("ja-l-kata-n", "N-row ナニヌネノ", "flashcards", { cards: KANA.kata.slice(20, 25) }),
        lesson("ja-l-kata-h", "H-row ハヒフヘホ", "flashcards", { cards: KANA.kata.slice(25, 30) }),
        lesson("ja-l-kata-m", "M-row マミムメモ", "flashcards", { cards: KANA.kata.slice(30, 35) }),
        lesson("ja-l-kata-r", "Y・R・W・N",      "flashcards", { cards: KANA.kata.slice(35) }),
        lesson("ja-l-kata-q2","Quiz: N-end",     "quiz",       { cards: KANA.kata.slice(20) })
      ]
    },
    {
      id: "ja-u-greet", level: "N5", title: "Greetings", icon: "👋", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-greet1", "Common greetings", "flashcards", { cards: VOCAB.greetings.slice(0, 7) }),
        lesson("ja-l-greet2", "Polite phrases",   "flashcards", { cards: VOCAB.greetings.slice(7) }),
        lesson("ja-l-greet-q","Greetings quiz",   "quiz",       { cards: VOCAB.greetings })
      ]
    },
    {
      id: "ja-u-self", level: "N5", title: "Self-introduction", icon: "🧑", color: "#bbf7d0",
      lessons: [
        lesson("ja-l-self-v",  "People & countries", "flashcards", { cards: VOCAB.selfIntro }),
        lesson("ja-l-self-g1", "は (topic marker)",   "grammar",    { grammarId: "ja-g-wa" }),
        lesson("ja-l-self-g2", "です (\"to be\")",     "grammar",    { grammarId: "ja-g-desu" }),
        lesson("ja-l-self-g3", "か (questions)",       "grammar",    { grammarId: "ja-g-ka" })
      ]
    },
    {
      id: "ja-u-num", level: "N5", title: "Numbers", icon: "🔢", color: "#fde68a",
      lessons: [
        lesson("ja-l-num-1",  "1 to 10",       "flashcards", { cards: VOCAB.numbers.slice(0, 10) }),
        lesson("ja-l-num-big","Big numbers",   "flashcards", { cards: VOCAB.numbers.slice(10) }),
        lesson("ja-l-num-q",  "Numbers quiz",  "quiz",       { cards: VOCAB.numbers })
      ]
    },
    {
      id: "ja-u-fam", level: "N5", title: "Family", icon: "👨‍👩‍👧", color: "#fbb6ce",
      lessons: [
        lesson("ja-l-fam-v",  "Family members", "flashcards", { cards: VOCAB.family }),
        lesson("ja-l-fam-g",  "の (possession)", "grammar",   { grammarId: "ja-g-no" }),
        lesson("ja-l-fam-q",  "Family quiz",    "quiz",       { cards: VOCAB.family })
      ]
    },
    {
      id: "ja-u-this", level: "N5", title: "this / that", icon: "👉", color: "#c7d2fe",
      lessons: [
        lesson("ja-l-this-g", "これ・それ・あれ", "grammar", { grammarId: "ja-g-kosoado" })
      ]
    },
    {
      id: "ja-u-food", level: "N5", title: "Food & drink", icon: "🍙", color: "#fed7aa",
      lessons: [
        lesson("ja-l-food-v",  "Food vocab",    "flashcards", { cards: VOCAB.food.slice(0, 8) }),
        lesson("ja-l-food-v2", "More food",     "flashcards", { cards: VOCAB.food.slice(8) }),
        lesson("ja-l-food-g",  "を (object marker)", "grammar", { grammarId: "ja-g-wo" }),
        lesson("ja-l-food-q",  "Food quiz",     "quiz",       { cards: VOCAB.food })
      ]
    },
    {
      id: "ja-u-verbs", level: "N5", title: "Basic verbs", icon: "🏃", color: "#a7f3d0",
      lessons: [
        lesson("ja-l-verbs-v", "Common verbs", "flashcards", { cards: VOCAB.verbsN5 }),
        lesson("ja-l-verbs-g", "ます-form",     "grammar",    { grammarId: "ja-g-masu" }),
        lesson("ja-l-verbs-g2","に・で",         "grammar",    { grammarId: "ja-g-nide" }),
        lesson("ja-l-verbs-q", "Verbs quiz",   "quiz",       { cards: VOCAB.verbsN5 })
      ]
    },
    {
      id: "ja-u-adj", level: "N5", title: "Adjectives", icon: "🌈", color: "#bbf7d0",
      lessons: [
        lesson("ja-l-adj-v", "Common adjectives", "flashcards", { cards: VOCAB.adjN5 }),
        lesson("ja-l-adj-q", "Adjective quiz",    "quiz",       { cards: VOCAB.adjN5 })
      ]
    },
    {
      id: "ja-u-days", level: "N5", title: "Days & time", icon: "📅", color: "#bae6fd",
      lessons: [
        lesson("ja-l-days-v", "Days of week", "flashcards", { cards: VOCAB.daysTime.slice(0, 7) }),
        lesson("ja-l-days-v2","Time words",   "flashcards", { cards: VOCAB.daysTime.slice(7) }),
        lesson("ja-l-days-q", "Quiz",         "quiz",       { cards: VOCAB.daysTime })
      ]
    },
    {
      id: "ja-u-kanji-n5a", level: "N5", title: "Kanji: nature", icon: "日", color: "#fde68a",
      lessons: [
        lesson("ja-l-kanji-n5a", "10 nature kanji", "flashcards", { cards: KANJI.n5a }),
        lesson("ja-l-kanji-n5a-q","Kanji quiz",      "quiz",       { cards: KANJI.n5a })
      ]
    },
    {
      id: "ja-u-kanji-n5b", level: "N5", title: "Kanji: people & position", icon: "人", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-kanji-n5b", "10 kanji",      "flashcards", { cards: KANJI.n5b }),
        lesson("ja-l-kanji-n5b-q","Kanji quiz",   "quiz",       { cards: KANJI.n5b })
      ]
    },
    {
      id: "ja-u-kanji-n5c", level: "N5", title: "Kanji: time & action", icon: "学", color: "#bae6fd",
      lessons: [
        lesson("ja-l-kanji-n5c", "10 kanji",      "flashcards", { cards: KANJI.n5c }),
        lesson("ja-l-kanji-n5c-q","Kanji quiz",   "quiz",       { cards: KANJI.n5c })
      ]
    },

    // ── N4 ──
    {
      id: "ja-u-travel-n4", level: "N4", title: "Travel", icon: "✈️", color: "#bae6fd",
      lessons: [
        lesson("ja-l-travel-v","Travel vocab", "flashcards", { cards: VOCAB.travelN4 }),
        lesson("ja-l-travel-q","Travel quiz",  "quiz",       { cards: VOCAB.travelN4 })
      ]
    },
    {
      id: "ja-u-work-n4", level: "N4", title: "Work life", icon: "💼", color: "#fed7aa",
      lessons: [
        lesson("ja-l-work-v","Work vocab", "flashcards", { cards: VOCAB.workN4 }),
        lesson("ja-l-work-q","Work quiz",  "quiz",       { cards: VOCAB.workN4 })
      ]
    },
    {
      id: "ja-u-feel-n4", level: "N4", title: "Feelings", icon: "💖", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-feel-v","Feelings vocab", "flashcards", { cards: VOCAB.feelingsN4 })
      ]
    },
    {
      id: "ja-u-te-n4", level: "N4", title: "te-form & comparisons", icon: "🔗", color: "#c7d2fe",
      lessons: [
        lesson("ja-l-te-g",  "te-form",     "grammar", { grammarId: "ja-g-te" }),
        lesson("ja-l-comp-g","Comparisons", "grammar", { grammarId: "ja-g-comparative" })
      ]
    },
    {
      id: "ja-u-kanji-n4", level: "N4", title: "Kanji: time & places", icon: "朝", color: "#a7f3d0",
      lessons: [
        lesson("ja-l-kanji-n4", "10 N4 kanji", "flashcards", { cards: KANJI.n4 }),
        lesson("ja-l-kanji-n4q","Kanji quiz",  "quiz",       { cards: KANJI.n4 })
      ]
    },

    // ── N3 ──
    {
      id: "ja-u-social-n3", level: "N3", title: "Society & culture", icon: "🏛️", color: "#ddd6fe",
      lessons: [
        lesson("ja-l-soc-v", "Society vocab", "flashcards", { cards: VOCAB.socialN3 }),
        lesson("ja-l-soc-q", "Society quiz",  "quiz",       { cards: VOCAB.socialN3 })
      ]
    },
    {
      id: "ja-u-abs-n3", level: "N3", title: "Abstract ideas", icon: "💭", color: "#bae6fd",
      lessons: [
        lesson("ja-l-abs-v", "Abstract vocab", "flashcards", { cards: VOCAB.abstractN3 }),
        lesson("ja-l-abs-q", "Quiz",           "quiz",       { cards: VOCAB.abstractN3 })
      ]
    },
    {
      id: "ja-u-grammar-n3", level: "N3", title: "Conditionals & passive", icon: "🔀", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-tara",   "〜たら (if/when)", "grammar", { grammarId: "ja-g-conditional-tara" }),
        lesson("ja-l-passive","Passive form",     "grammar", { grammarId: "ja-g-passive" })
      ]
    },
    {
      id: "ja-u-kanji-n3", level: "N3", title: "Kanji: society", icon: "政", color: "#fed7aa",
      lessons: [
        lesson("ja-l-kanji-n3", "Kanji set", "flashcards", { cards: KANJI.n3 }),
        lesson("ja-l-kanji-n3q","Quiz",      "quiz",       { cards: KANJI.n3 })
      ]
    },

    // ── N2 ──
    {
      id: "ja-u-news-n2", level: "N2", title: "News & media", icon: "📰", color: "#bae6fd",
      lessons: [
        lesson("ja-l-news-v", "News vocab", "flashcards", { cards: VOCAB.newsN2 }),
        lesson("ja-l-news-q", "News quiz",  "quiz",       { cards: VOCAB.newsN2 })
      ]
    },
    {
      id: "ja-u-biz-n2", level: "N2", title: "Business", icon: "💼", color: "#fde68a",
      lessons: [
        lesson("ja-l-biz-v", "Business vocab", "flashcards", { cards: VOCAB.businessN2 }),
        lesson("ja-l-biz-q", "Business quiz",  "quiz",       { cards: VOCAB.businessN2 })
      ]
    },
    {
      id: "ja-u-keigo-n2", level: "N2", title: "Keigo (敬語)", icon: "🙇", color: "#c7d2fe",
      lessons: [
        lesson("ja-l-keigo-g","Respectful & humble", "grammar", { grammarId: "ja-g-keigo" })
      ]
    },
    {
      id: "ja-u-kanji-n2", level: "N2", title: "Kanji: business", icon: "契", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-kanji-n2", "Kanji set", "flashcards", { cards: KANJI.n2 }),
        lesson("ja-l-kanji-n2q","Quiz",      "quiz",       { cards: KANJI.n2 })
      ]
    },

    // ── N1 ──
    {
      id: "ja-u-adv-n1", level: "N1", title: "Advanced vocab", icon: "🎓", color: "#f9a8d4",
      lessons: [
        lesson("ja-l-adv-v", "Sophisticated words", "flashcards", { cards: VOCAB.advancedN1 }),
        lesson("ja-l-adv-q", "Quiz",                "quiz",       { cards: VOCAB.advancedN1 })
      ]
    },
    {
      id: "ja-u-idiom-n1", level: "N1", title: "Idioms (四字熟語)", icon: "🌸", color: "#ddd6fe",
      lessons: [
        lesson("ja-l-idiom-v", "Idiomatic expressions", "flashcards", { cards: VOCAB.idiomsN1 })
      ]
    },
    {
      id: "ja-u-grammar-n1", level: "N1", title: "Formal grammar", icon: "⚖️", color: "#bae6fd",
      lessons: [
        lesson("ja-l-sokushite", "に即して", "grammar", { grammarId: "ja-g-ni-sokushite" })
      ]
    },
    {
      id: "ja-u-kanji-n1", level: "N1", title: "Kanji: advanced", icon: "概", color: "#fbcfe8",
      lessons: [
        lesson("ja-l-kanji-n1", "Advanced kanji", "flashcards", { cards: KANJI.n1 }),
        lesson("ja-l-kanji-n1q","Quiz",           "quiz",       { cards: KANJI.n1 })
      ]
    }
  ];

  // Flatten all cards into a single map for SRS
  const ALL_CARDS = [];
  function pushAll(arr) { arr.forEach((c) => ALL_CARDS.push(c)); }
  pushAll(KANA.hira); pushAll(KANA.hiraD); pushAll(KANA.kata); pushAll(KANA.kataD);
  Object.values(VOCAB).forEach(pushAll);
  Object.values(KANJI).forEach(pushAll);

  return {
    KANA, VOCAB, KANJI, GRAMMAR, UNITS, ALL_CARDS,
    grammarById: (id) => GRAMMAR.find((g) => g.id === id),
    cardById: (id) => ALL_CARDS.find((c) => c.id === id)
  };
})();
