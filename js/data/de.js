// German content — CEFR A1 to C2 (for English/Japanese speakers learning German)
window.DATA_DE = (function () {
  // Japanese gloss keyed by the English meaning — shown to the 俺 profile.
  const JA = {
    "hello":"こんにちは","good morning":"おはよう","good day / hello":"こんにちは","good evening":"こんばんは",
    "good night":"おやすみ","bye":"じゃあね","goodbye":"さようなら","thank you":"ありがとう",
    "please / you're welcome":"どうぞ／どういたしまして","excuse me / sorry":"すみません","yes":"はい","no":"いいえ","maybe":"たぶん",
    "I":"私","you (informal)":"きみ（くだけた）","you (formal)":"あなた（丁寧）","he":"彼","she / they":"彼女／彼ら",
    "it":"それ","we":"私たち","you all":"きみたち","one":"1","two":"2","three":"3","four":"4","five":"5",
    "six":"6","seven":"7","eight":"8","nine":"9","ten":"10","hundred":"百","thousand":"千",
    "family":"家族","father":"父","mother":"母","brother":"兄弟","sister":"姉妹","son":"息子","daughter":"娘",
    "child":"子ども","friend (m.)":"友だち（男性）","friend (f.)":"友だち（女性）","dog":"犬","cat":"猫",
    "water":"水","bread":"パン","milk":"牛乳","coffee":"コーヒー","tea":"お茶","rice":"米／ごはん","apple":"りんご",
    "egg":"卵","fish":"魚","cheese":"チーズ","meat":"肉","vegetable":"野菜",
    "to be":"〜である","to have":"持っている","to eat":"食べる","to drink":"飲む","to go":"行く","to come":"来る",
    "to see":"見る","to speak":"話す","to read":"読む","to write":"書く","to do / make":"する／作る","to like":"好む",
    "big / tall":"大きい／背が高い","small":"小さい","good":"良い","bad":"悪い","beautiful":"美しい","ugly":"醜い",
    "hot":"暑い／熱い","cold":"寒い／冷たい","happy":"幸せ","sad":"悲しい","new":"新しい","old":"古い",
    "red":"赤","blue":"青","green":"緑","yellow":"黄","black":"黒","white":"白","orange":"オレンジ",
    "pink":"ピンク","purple":"紫","brown":"茶色","grey":"灰色","color":"色",
    "Monday":"月曜日","Tuesday":"火曜日","Wednesday":"水曜日","Thursday":"木曜日","Friday":"金曜日",
    "Saturday":"土曜日","Sunday":"日曜日","day":"日","week":"週","month":"月（つき）","year":"年",
    "today":"今日","tomorrow":"明日","yesterday":"昨日","now":"今","later":"あとで","early":"早い","late":"遅い",
    "always":"いつも","never":"決して〜ない","often":"よく","sometimes":"ときどき","clock / o'clock":"時計／〜時",
    "weather":"天気","sun":"太陽","rain":"雨","snow":"雪","wind":"風","cloud":"雲","warm":"暖かい","cool":"涼しい",
    "sunny":"晴れ","rainy":"雨の","head":"頭","eye":"目","nose":"鼻","mouth":"口","ear":"耳","hand":"手",
    "arm":"腕","leg":"脚","foot":"足","belly":"おなか","hair":"髪","tooth":"歯",
    "clothes":"服","shirt":"シャツ","trousers":"ズボン","skirt":"スカート","dress":"ワンピース","shoes":"靴",
    "jacket":"上着","coat":"コート","cap / hat":"帽子","socks":"靴下",
    "animal":"動物","bird":"鳥","horse":"馬","cow":"牛","pig":"豚","sheep":"羊","bear":"熊","lion":"ライオン",
    "mouse":"ネズミ","rabbit":"うさぎ","elephant":"象",
    "who":"だれ","what":"なに","where":"どこ","when":"いつ","how":"どうやって","why":"なぜ","which":"どれ",
    "how much":"いくら","where from":"どこから","where to":"どこへ",
    "How are you?":"元気ですか？","I'm fine.":"元気です。","What's your name?":"名前は何ですか？",
    "My name is ...":"私の名前は…です","Where are you from?":"どこ出身ですか？","I'm from ...":"…出身です",
    "I don't understand.":"わかりません。","Do you speak English?":"英語を話せますか？","Pardon?":"もう一度お願いします？",
    "I'm sorry.":"ごめんなさい。","No problem.":"問題ありません。","See you soon!":"また近いうちに！",
    "to live (reside)":"住む","to be called":"〜という名前である","to work":"働く","to learn":"学ぶ","to play":"遊ぶ",
    "to buy":"買う","to drive / go":"運転する／行く","to run / walk":"走る／歩く","to give":"あげる","to take":"取る",
    "to find":"見つける","to need":"必要とする",
    "and":"そして","or":"または","but":"しかし","not":"〜ない","also":"〜も","very":"とても","here":"ここ",
    "there":"そこ","with":"〜と一緒に","without":"〜なしで","for":"〜のために","because":"なぜなら",
    "to get up":"起きる","to have breakfast":"朝食をとる","to learn / study":"学ぶ／勉強する","to sleep":"眠る",
    "to shower":"シャワーを浴びる","to cook":"料理する","to go shopping":"買い物に行く",
    "house":"家","apartment":"アパート","school":"学校","work":"仕事","restaurant":"レストラン","hospital":"病院",
    "train station":"駅","supermarket":"スーパー","trip":"旅行","airport":"空港","suitcase":"スーツケース",
    "hotel":"ホテル","ticket":"切符","reservation":"予約","arrival":"到着","departure":"出発",
    "to believe":"信じる","to think":"考える","to mean / think":"意味する／思う","to agree":"同意する",
    "to reject":"拒否する","opinion":"意見","probably":"おそらく",
    "challenge":"課題","opportunity":"機会","consequence":"結果","sustainable":"持続可能な",
    "debate / conflict":"議論／対立","context / connection":"文脈／つながり",
    "to look up":"調べる","to give up":"あきらめる","to postpone":"延期する","to find out":"突き止める",
    "to take part":"参加する","nuance":"ニュアンス","to mitigate":"和らげる","pragmatic":"実用的な",
    "ambiguous":"あいまいな","nuanced / differentiated":"細やかな／差別化された",
    "to be oblivious (lit. tomatoes on the eyes)":"気づいていない（直訳：目にトマト）",
    "to keep fingers crossed":"幸運を祈る","to kick the bucket":"くたばる",
    "to get on someone's nerves":"人の神経に障る","to buy a pig in a poke":"中身を確かめず買う",
    "ubiquitous":"どこにでもある","ephemeral":"はかない","recalcitrant":"言うことを聞かない",
    "to epitomize":"体現する","indispensable":"不可欠な"
  };
  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "de:vocab:" + deck + ":" + it[0],
      lang: "de",
      level,
      deck,
      type: "vocab",
      jp: it[0], kana: it[1] || "", romaji: it[1] || "", en: it[2],
      ja: JA[it[2]] || "",
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

    colorsA1: vocabCards("de-colors-a1", "A1", [
      ["rot","roːt","red"],
      ["blau","blaʊ","blue"],
      ["grün","ɡryːn","green"],
      ["gelb","ɡɛlp","yellow"],
      ["schwarz","ʃvarts","black"],
      ["weiß","vaɪs","white"],
      ["orange","oˈrãːʒə","orange"],
      ["rosa","ˈroːza","pink"],
      ["lila","ˈliːla","purple"],
      ["braun","braʊn","brown"],
      ["grau","ɡraʊ","grey"],
      ["die Farbe","ˈfarbə","color"]
    ]),
    daysA1: vocabCards("de-days-a1", "A1", [
      ["Montag","ˈmoːntaːk","Monday"],
      ["Dienstag","ˈdiːnstaːk","Tuesday"],
      ["Mittwoch","ˈmɪtvɔx","Wednesday"],
      ["Donnerstag","ˈdɔnɐstaːk","Thursday"],
      ["Freitag","ˈfraɪtaːk","Friday"],
      ["Samstag","ˈzamstaːk","Saturday"],
      ["Sonntag","ˈzɔntaːk","Sunday"],
      ["der Tag","taːk","day"],
      ["die Woche","ˈvɔxə","week"],
      ["der Monat","ˈmoːnat","month"],
      ["das Jahr","jaːɐ̯","year"]
    ]),
    timeA1: vocabCards("de-time-a1", "A1", [
      ["heute","ˈhɔʏtə","today"],
      ["morgen","ˈmɔrɡn̩","tomorrow"],
      ["gestern","ˈɡɛstɐn","yesterday"],
      ["jetzt","jɛtst","now"],
      ["später","ˈʃpɛːtɐ","later"],
      ["früh","fryː","early"],
      ["spät","ʃpɛːt","late"],
      ["immer","ˈɪmɐ","always"],
      ["nie","niː","never"],
      ["oft","ɔft","often"],
      ["manchmal","ˈmançmaːl","sometimes"],
      ["die Uhr","uːɐ̯","clock / o'clock"]
    ]),
    weatherA1: vocabCards("de-weather-a1", "A1", [
      ["das Wetter","ˈvɛtɐ","weather"],
      ["die Sonne","ˈzɔnə","sun"],
      ["der Regen","ˈreːɡn̩","rain"],
      ["der Schnee","ʃneː","snow"],
      ["der Wind","vɪnt","wind"],
      ["die Wolke","ˈvɔlkə","cloud"],
      ["warm","varm","warm"],
      ["kühl","kyːl","cool"],
      ["sonnig","ˈzɔnɪç","sunny"],
      ["regnerisch","ˈreːɡnərɪʃ","rainy"]
    ]),
    bodyA1: vocabCards("de-body-a1", "A1", [
      ["der Kopf","kɔpf","head"],
      ["das Auge","ˈaʊɡə","eye"],
      ["die Nase","ˈnaːzə","nose"],
      ["der Mund","mʊnt","mouth"],
      ["das Ohr","oːɐ̯","ear"],
      ["die Hand","hant","hand"],
      ["der Arm","arm","arm"],
      ["das Bein","baɪn","leg"],
      ["der Fuß","fuːs","foot"],
      ["der Bauch","baʊx","belly"],
      ["das Haar","haːɐ̯","hair"],
      ["der Zahn","tsaːn","tooth"]
    ]),
    clothesA1: vocabCards("de-clothes-a1", "A1", [
      ["die Kleidung","ˈklaɪdʊŋ","clothes"],
      ["das Hemd","hɛmt","shirt"],
      ["die Hose","ˈhoːzə","trousers"],
      ["der Rock","rɔk","skirt"],
      ["das Kleid","klaɪt","dress"],
      ["die Schuhe","ˈʃuːə","shoes"],
      ["die Jacke","ˈjakə","jacket"],
      ["der Mantel","ˈmantl̩","coat"],
      ["die Mütze","ˈmʏtsə","cap / hat"],
      ["die Socken","ˈzɔkn̩","socks"]
    ]),
    animalsA1: vocabCards("de-animals-a1", "A1", [
      ["das Tier","tiːɐ̯","animal"],
      ["der Vogel","ˈfoːɡl̩","bird"],
      ["das Pferd","pfeːɐ̯t","horse"],
      ["die Kuh","kuː","cow"],
      ["das Schwein","ʃvaɪn","pig"],
      ["das Schaf","ʃaːf","sheep"],
      ["der Bär","bɛːɐ̯","bear"],
      ["der Löwe","ˈløːvə","lion"],
      ["der Fisch","fɪʃ","fish"],
      ["die Maus","maʊs","mouse"],
      ["das Kaninchen","kaˈniːnçən","rabbit"],
      ["der Elefant","eleˈfant","elephant"]
    ]),
    questionsA1: vocabCards("de-quest-a1", "A1", [
      ["wer","veːɐ̯","who"],
      ["was","vas","what"],
      ["wo","voː","where"],
      ["wann","van","when"],
      ["wie","viː","how"],
      ["warum","vaˈrʊm","why"],
      ["welche","ˈvɛlçə","which"],
      ["wie viel","viː fiːl","how much"],
      ["woher","voˈheːɐ̯","where from"],
      ["wohin","voˈhɪn","where to"]
    ]),
    phrasesA1: vocabCards("de-phrases-a1", "A1", [
      ["Wie geht's?","viː ɡeːts","How are you?"],
      ["Mir geht es gut.","miːɐ̯ ɡeːt ɛs ɡuːt","I'm fine."],
      ["Wie heißt du?","viː haɪst duː","What's your name?"],
      ["Ich heiße ...","ɪç ˈhaɪsə","My name is ..."],
      ["Woher kommst du?","voˈheːɐ̯ kɔmst duː","Where are you from?"],
      ["Ich komme aus ...","ɪç ˈkɔmə aʊs","I'm from ..."],
      ["Ich verstehe nicht.","ɪç fɛɐ̯ˈʃteːə nɪçt","I don't understand."],
      ["Sprechen Sie Englisch?","ˈʃprɛçn̩ ziː ˈɛŋlɪʃ","Do you speak English?"],
      ["Wie bitte?","viː ˈbɪtə","Pardon?"],
      ["Es tut mir leid.","ɛs tuːt miːɐ̯ laɪt","I'm sorry."],
      ["Kein Problem.","kaɪn proˈbleːm","No problem."],
      ["Bis bald!","bɪs balt","See you soon!"]
    ]),
    verbs2A1: vocabCards("de-verbs2-a1", "A1", [
      ["wohnen","ˈvoːnən","to live (reside)"],
      ["heißen","ˈhaɪsn̩","to be called"],
      ["arbeiten","ˈarbaɪtn̩","to work"],
      ["lernen","ˈlɛrnən","to learn"],
      ["spielen","ˈʃpiːlən","to play"],
      ["kaufen","ˈkaʊfn̩","to buy"],
      ["fahren","ˈfaːrən","to drive / go"],
      ["laufen","ˈlaʊfn̩","to run / walk"],
      ["geben","ˈɡeːbn̩","to give"],
      ["nehmen","ˈneːmən","to take"],
      ["finden","ˈfɪndn̩","to find"],
      ["brauchen","ˈbraʊxn̩","to need"]
    ]),
    smallWordsA1: vocabCards("de-small-a1", "A1", [
      ["und","ʊnt","and"],
      ["oder","ˈoːdɐ","or"],
      ["aber","ˈaːbɐ","but"],
      ["nicht","nɪçt","not"],
      ["auch","aʊx","also"],
      ["sehr","zeːɐ̯","very"],
      ["hier","hiːɐ̯","here"],
      ["da","daː","there"],
      ["mit","mɪt","with"],
      ["ohne","ˈoːnə","without"],
      ["für","fyːɐ̯","for"],
      ["weil","vaɪl","because"]
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
    { id: "de-u-col1", level: "A1", title: "Colors", icon: "🎨", color: "#fda4af", lessons: [
      lesson("de-l-col-v","Colors","flashcards", { cards: VOCAB.colorsA1 }),
      lesson("de-l-col-q","Quiz","quiz",         { cards: VOCAB.colorsA1 })
    ]},
    { id: "de-u-days1", level: "A1", title: "Days & calendar", icon: "📅", color: "#bae6fd", lessons: [
      lesson("de-l-days-v","Days & time words","flashcards", { cards: VOCAB.daysA1 }),
      lesson("de-l-days-q","Quiz","quiz",                    { cards: VOCAB.daysA1 })
    ]},
    { id: "de-u-time1", level: "A1", title: "Time words", icon: "⏰", color: "#fde68a", lessons: [
      lesson("de-l-time-v","Today, now, later...","flashcards", { cards: VOCAB.timeA1 }),
      lesson("de-l-time-q","Quiz","quiz",                       { cards: VOCAB.timeA1 })
    ]},
    { id: "de-u-weather1", level: "A1", title: "Weather", icon: "☀️", color: "#bfdbfe", lessons: [
      lesson("de-l-weather-v","Weather","flashcards", { cards: VOCAB.weatherA1 }),
      lesson("de-l-weather-q","Quiz","quiz",          { cards: VOCAB.weatherA1 })
    ]},
    { id: "de-u-body1", level: "A1", title: "Body", icon: "🧍", color: "#fbcfe8", lessons: [
      lesson("de-l-body-v","Body parts","flashcards", { cards: VOCAB.bodyA1 }),
      lesson("de-l-body-q","Quiz","quiz",             { cards: VOCAB.bodyA1 })
    ]},
    { id: "de-u-clothes1", level: "A1", title: "Clothes", icon: "👕", color: "#c7d2fe", lessons: [
      lesson("de-l-clothes-v","Clothes","flashcards", { cards: VOCAB.clothesA1 }),
      lesson("de-l-clothes-q","Quiz","quiz",          { cards: VOCAB.clothesA1 })
    ]},
    { id: "de-u-animals1", level: "A1", title: "Animals", icon: "🐶", color: "#a7f3d0", lessons: [
      lesson("de-l-animals-v","Animals","flashcards", { cards: VOCAB.animalsA1 }),
      lesson("de-l-animals-q","Quiz","quiz",          { cards: VOCAB.animalsA1 })
    ]},
    { id: "de-u-quest1", level: "A1", title: "Question words", icon: "❓", color: "#fed7aa", lessons: [
      lesson("de-l-quest-v","wer, was, wo...","flashcards", { cards: VOCAB.questionsA1 }),
      lesson("de-l-quest-q","Quiz","quiz",                  { cards: VOCAB.questionsA1 })
    ]},
    { id: "de-u-phrases1", level: "A1", title: "Useful phrases", icon: "💬", color: "#fbb6ce", lessons: [
      lesson("de-l-phrases-v","Everyday phrases","flashcards", { cards: VOCAB.phrasesA1 }),
      lesson("de-l-phrases-q","Quiz","quiz",                   { cards: VOCAB.phrasesA1 })
    ]},
    { id: "de-u-verbs2", level: "A1", title: "More verbs", icon: "⚡", color: "#bbf7d0", lessons: [
      lesson("de-l-verbs2-v","Everyday verbs","flashcards", { cards: VOCAB.verbs2A1 }),
      lesson("de-l-verbs2-q","Quiz","quiz",                 { cards: VOCAB.verbs2A1 })
    ]},
    { id: "de-u-small1", level: "A1", title: "Linking words", icon: "🔗", color: "#fde68a", lessons: [
      lesson("de-l-small-v","und, oder, aber...","flashcards", { cards: VOCAB.smallWordsA1 }),
      lesson("de-l-small-q","Quiz","quiz",                     { cards: VOCAB.smallWordsA1 })
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
