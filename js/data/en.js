// English content - CEFR A1 to C2
window.DATA_EN = (function () {

  // Japanese gloss keyed by the English word — shown to the 俺 profile.
  const JA = {
    "hello":"こんにちは","hi":"やあ","good morning":"おはよう","good evening":"こんばんは",
    "good night":"おやすみ","goodbye":"さようなら","thank you":"ありがとう","sorry":"ごめんなさい",
    "please":"お願いします","yes":"はい","no":"いいえ","I":"私","you":"あなた","he":"彼","she":"彼女",
    "it":"それ","we":"私たち","they":"彼ら","one":"1","two":"2","three":"3","four":"4","five":"5",
    "six":"6","seven":"7","eight":"8","nine":"9","ten":"10","mother":"母","father":"父",
    "sister":"姉妹","brother":"兄弟","son":"息子","daughter":"娘","family":"家族","friend":"友だち",
    "water":"水","bread":"パン","rice":"米／ごはん","apple":"りんご","egg":"卵","milk":"牛乳",
    "coffee":"コーヒー","tea":"お茶","fish":"魚","to be":"〜である","to have":"持っている",
    "to eat":"食べる","to drink":"飲む","to go":"行く","to come":"来る","to see":"見る","to like":"好む",
    "big":"大きい","small":"小さい","good":"良い","bad":"悪い","happy":"幸せ","sad":"悲しい",
    "hot":"暑い／熱い","cold":"寒い／冷たい","wake up":"目を覚ます","get dressed":"服を着る",
    "have breakfast":"朝食をとる","go to work":"仕事に行く","come home":"帰宅する",
    "take a shower":"シャワーを浴びる","go to bed":"寝る","shop":"買い物する","buy":"買う","sell":"売る",
    "price":"値段","cheap":"安い","expensive":"高い","receipt":"レシート","cash":"現金","card":"カード",
    "flight":"フライト","luggage":"荷物","passport":"パスポート","delay":"遅延","reservation":"予約",
    "destination":"目的地","souvenir":"お土産","agree":"同意する","disagree":"反対する","maybe":"たぶん",
    "probably":"おそらく","definitely":"間違いなく","I think":"私は思う","actually":"実は",
    "challenge":"課題","opportunity":"機会","assumption":"思い込み","consequence":"結果",
    "controversy":"論争","sustainable":"持続可能な","look up":"調べる","give up":"あきらめる",
    "put off":"延期する","come across":"偶然出会う","bring about":"引き起こす","nuance":"ニュアンス",
    "mitigate":"和らげる","scrutinize":"精査する","pragmatic":"実用的な","ambiguous":"あいまいな",
    "a piece of cake":"とても簡単なこと","break the ice":"場の緊張をほぐす","hit the books":"猛勉強する",
    "under the weather":"体調が悪い","spill the beans":"秘密を漏らす","ubiquitous":"どこにでもある",
    "serendipity":"思いがけない幸運","ephemeral":"はかない","recalcitrant":"反抗的な","epitomize":"体現する",
    // B1 travel (added)
    "departure":"出発","arrival":"到着","customs":"税関","itinerary":"旅程",
    "accommodation":"宿泊施設","sightseeing":"観光","currency":"通貨","round trip":"往復",
    "layover":"乗り継ぎ","jet lag":"時差ぼけ","visa":"ビザ","check-in":"チェックイン",
    "carry-on":"機内持ち込み手荷物","aisle seat":"通路側の席","window seat":"窓側の席",
    "travel agency":"旅行代理店","guidebook":"ガイドブック","backpack":"リュックサック",
    "terminal":"ターミナル","baggage claim":"手荷物受取所","fare":"運賃","cancel":"取り消す",
    "abroad":"海外で","voyage":"航海／長旅","tourist":"観光客","journey":"旅",
    "suitcase":"スーツケース","boarding pass":"搭乗券",
    // B1 opinions (added)
    "in my opinion":"私の意見では","point of view":"視点","perspective":"観点",
    "suggest":"提案する","recommend":"勧める","prefer":"〜の方を好む","doubt":"疑う",
    "certain":"確信している","convinced":"確信した","persuade":"説得する","argue":"論じる",
    "claim":"主張する","assume":"想定する","believe":"信じる","consider":"よく考える",
    "admit":"認める","deny":"否定する","object":"反対する","support":"支持する",
    "oppose":"反対する","justify":"正当化する","emphasize":"強調する","criticize":"批判する",
    "approve":"承認する","reject":"拒否する","hesitate":"ためらう","insist":"強く主張する",
    "conclude":"結論づける",
    // B2 abstract (added)
    "perception":"認識","motivation":"動機","integrity":"誠実さ","ambition":"野心",
    "resilience":"回復力","empathy":"共感","prejudice":"偏見","dilemma":"ジレンマ",
    "hypothesis":"仮説","phenomenon":"現象","contradiction":"矛盾","implication":"含意／影響",
    "framework":"枠組み","tendency":"傾向","concept":"概念","principle":"原則",
    "criterion":"基準","notion":"考え","outcome":"結果","scenario":"シナリオ",
    "rationale":"根拠","paradox":"逆説","premise":"前提","bias":"偏り",
    // B2 phrasal (added)
    "carry out":"実行する","point out":"指摘する","figure out":"解明する","turn down":"断る",
    "bring up":"話題に出す","set up":"設立する","get along":"仲良くやる",
    "look forward to":"楽しみにする","come up with":"思いつく","run out of":"使い果たす",
    "take over":"引き継ぐ","deal with":"対処する","put up with":"我慢する",
    "break down":"故障する","work out":"解決する／運動する","call off":"中止する",
    "look into":"調査する","go through":"経験する","sort out":"整理する","hold on":"待つ",
    // C1 nuance (added)
    "meticulous":"几帳面な","candid":"率直な","plausible":"もっともらしい",
    "inevitable":"避けられない","profound":"深遠な","subtle":"微妙な","arbitrary":"恣意的な",
    "coherent":"首尾一貫した","redundant":"冗長な","tentative":"暫定的な","explicit":"明示的な",
    "implicit":"暗黙の","prevalent":"広く行き渡った","intrinsic":"本質的な",
    "compelling":"説得力のある","discreet":"思慮深い","robust":"頑健な","viable":"実行可能な",
    "feasible":"実現可能な","stark":"厳しい／際立った",
    // C1 idioms (added)
    "once in a blue moon":"ごくまれに","cost an arm and a leg":"大金がかかる",
    "bite the bullet":"困難に立ち向かう","beat around the bush":"遠回しに言う",
    "the ball is in your court":"次はあなたの番だ","cut corners":"手を抜く",
    "on the same page":"認識が一致している","get cold feet":"怖じ気づく",
    "the last straw":"我慢の限界","a blessing in disguise":"不幸中の幸い",
    "call it a day":"仕事を切り上げる","miss the boat":"好機を逃す",
    "pull someone's leg":"からかう","on cloud nine":"有頂天で","sit on the fence":"態度を決めない",
    "the tip of the iceberg":"氷山の一角","throw in the towel":"降参する",
    "jump on the bandwagon":"時流に乗る","by the book":"規則通りに","against the clock":"時間と競争して",
    // C2 mastery (added)
    "quintessential":"典型的な","juxtaposition":"並置","ostensibly":"表向きは",
    "surreptitious":"こっそりとした","perfunctory":"おざなりの","sycophant":"おべっか使い",
    "esoteric":"難解な","magnanimous":"度量の大きい","pernicious":"有害な",
    "obfuscate":"曖昧にする","equivocal":"どっちつかずの","sanguine":"楽観的な",
    "vicarious":"代理の／疑似体験の","antithetical":"正反対の","idiosyncratic":"特異な",
    "laconic":"簡潔な","ineffable":"言葉にできない","perfidious":"不誠実な",
    "mellifluous":"美しい響きの","propensity":"性向"
  };
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
      ja: JA[it[0]] || "",
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
    "ephemeral":"vergänglich","recalcitrant":"widerspenstig","epitomize":"verkörpern",
    // B1 travel (added)
    "departure":"Abflug","arrival":"Ankunft","customs":"Zoll","itinerary":"Reiseroute",
    "accommodation":"Unterkunft","sightseeing":"Besichtigung","currency":"Währung",
    "round trip":"Hin- und Rückfahrt","layover":"Zwischenstopp","jet lag":"Jetlag",
    "visa":"Visum","check-in":"Check-in","carry-on":"Handgepäck","aisle seat":"Gangplatz",
    "window seat":"Fensterplatz","travel agency":"Reisebüro","guidebook":"Reiseführer",
    "backpack":"Rucksack","terminal":"Terminal","baggage claim":"Gepäckausgabe",
    "fare":"Fahrpreis","cancel":"stornieren","abroad":"im Ausland","voyage":"Reise",
    "tourist":"Tourist","journey":"Reise","suitcase":"Koffer","boarding pass":"Bordkarte",
    // B1 opinions (added)
    "in my opinion":"meiner Meinung nach","point of view":"Standpunkt",
    "perspective":"Perspektive","suggest":"vorschlagen","recommend":"empfehlen",
    "prefer":"bevorzugen","doubt":"bezweifeln","certain":"sicher","convinced":"überzeugt",
    "persuade":"überreden","argue":"argumentieren","claim":"behaupten","assume":"annehmen",
    "believe":"glauben","consider":"in Betracht ziehen","admit":"zugeben","deny":"leugnen",
    "object":"Einwände erheben","support":"unterstützen","oppose":"sich widersetzen",
    "justify":"rechtfertigen","emphasize":"betonen","criticize":"kritisieren",
    "approve":"genehmigen","reject":"zurückweisen","hesitate":"zögern",
    "insist":"bestehen auf","conclude":"schlussfolgern",
    // B2 abstract (added)
    "perception":"Wahrnehmung","motivation":"Motivation","integrity":"Integrität",
    "ambition":"Ehrgeiz","resilience":"Widerstandsfähigkeit","empathy":"Empathie",
    "prejudice":"Vorurteil","dilemma":"Dilemma","hypothesis":"Hypothese",
    "phenomenon":"Phänomen","contradiction":"Widerspruch","implication":"Implikation",
    "framework":"Rahmen","tendency":"Tendenz","concept":"Konzept","principle":"Prinzip",
    "criterion":"Kriterium","notion":"Vorstellung","outcome":"Ergebnis","scenario":"Szenario",
    "rationale":"Begründung","paradox":"Paradox","premise":"Prämisse",
    "bias":"Voreingenommenheit",
    // B2 phrasal (added)
    "carry out":"durchführen","point out":"hinweisen auf","figure out":"herausfinden",
    "turn down":"ablehnen","bring up":"zur Sprache bringen","set up":"einrichten",
    "get along":"gut auskommen","look forward to":"sich freuen auf",
    "come up with":"sich ausdenken","run out of":"ausgehen","take over":"übernehmen",
    "deal with":"sich befassen mit","put up with":"sich abfinden mit",
    "break down":"zusammenbrechen","work out":"lösen / trainieren","call off":"absagen",
    "look into":"untersuchen","go through":"durchmachen","sort out":"ordnen","hold on":"warten",
    // C1 nuance (added)
    "meticulous":"akribisch","candid":"offen","plausible":"plausibel",
    "inevitable":"unvermeidlich","profound":"tiefgründig","subtle":"subtil",
    "arbitrary":"willkürlich","coherent":"kohärent","redundant":"redundant",
    "tentative":"vorläufig","explicit":"ausdrücklich","implicit":"implizit",
    "prevalent":"vorherrschend","intrinsic":"intrinsisch","compelling":"überzeugend",
    "discreet":"diskret","robust":"robust","viable":"tragfähig","feasible":"machbar",
    "stark":"schroff / deutlich",
    // C1 idioms (added)
    "once in a blue moon":"sehr selten","cost an arm and a leg":"ein Vermögen kosten",
    "bite the bullet":"in den sauren Apfel beißen","beat around the bush":"um den heißen Brei reden",
    "the ball is in your court":"du bist am Zug","cut corners":"an der falschen Stelle sparen",
    "on the same page":"einer Meinung sein","get cold feet":"kalte Füße bekommen",
    "the last straw":"der Tropfen, der das Fass zum Überlaufen bringt",
    "a blessing in disguise":"ein Glück im Unglück","call it a day":"für heute Schluss machen",
    "miss the boat":"eine Gelegenheit verpassen","pull someone's leg":"jemanden auf den Arm nehmen",
    "on cloud nine":"im siebten Himmel","sit on the fence":"unentschlossen sein",
    "the tip of the iceberg":"die Spitze des Eisbergs","throw in the towel":"das Handtuch werfen",
    "jump on the bandwagon":"auf den Zug aufspringen","by the book":"nach Vorschrift",
    "against the clock":"gegen die Uhr",
    // C2 mastery (added)
    "quintessential":"typisch / wesenhaft","juxtaposition":"Gegenüberstellung",
    "ostensibly":"angeblich","surreptitious":"heimlich","perfunctory":"oberflächlich",
    "sycophant":"Speichellecker","esoteric":"esoterisch","magnanimous":"großmütig",
    "pernicious":"schädlich","obfuscate":"verschleiern","equivocal":"zweideutig",
    "sanguine":"zuversichtlich","vicarious":"stellvertretend","antithetical":"gegensätzlich",
    "idiosyncratic":"eigentümlich","laconic":"lakonisch","ineffable":"unaussprechlich",
    "perfidious":"heimtückisch","mellifluous":"wohlklingend","propensity":"Neigung"
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

    // ── B1 (5× volume) ──
    travelB1: vocabCards("en-travel-b1", "B1", [
      ["flight","flaɪt","airplane journey"],
      ["luggage","ˈlʌɡɪdʒ","bags and suitcases"],
      ["passport","ˈpɑːspɔːrt","travel document"],
      ["delay","dɪˈleɪ","late arrival"],
      ["reservation","ˌrɛzərˈveɪʃən","booking"],
      ["destination","ˌdɛstəˈneɪʃən","where you're going"],
      ["souvenir","ˌsuːvəˈnɪər","memento bought while traveling"],
      ["departure","dɪˈpɑːrtʃər","the act of leaving"],
      ["arrival","əˈraɪvəl","reaching a place"],
      ["customs","ˈkʌstəmz","border goods inspection"],
      ["itinerary","aɪˈtɪnəˌrɛri","planned travel route"],
      ["accommodation","əˌkɒməˈdeɪʃən","place to stay"],
      ["sightseeing","ˈsaɪtˌsiːɪŋ","visiting attractions"],
      ["currency","ˈkɜːrənsi","money of a country"],
      ["round trip","ˌraʊnd ˈtrɪp","journey there and back"],
      ["layover","ˈleɪˌoʊvər","stop between flights"],
      ["jet lag","ˈdʒɛt læɡ","tiredness from time zones"],
      ["visa","ˈviːzə","permit to enter a country"],
      ["check-in","ˈtʃɛk ɪn","registering at the airport"],
      ["carry-on","ˈkæri ɒn","hand luggage"],
      ["aisle seat","ˈaɪl siːt","seat by the corridor"],
      ["window seat","ˈwɪndoʊ siːt","seat by the window"],
      ["travel agency","ˈtrævəl ˈeɪdʒənsi","company that arranges trips"],
      ["guidebook","ˈɡaɪdbʊk","book of travel information"],
      ["backpack","ˈbækpæk","bag carried on the back"],
      ["terminal","ˈtɜːrmɪnəl","airport building"],
      ["baggage claim","ˈbæɡɪdʒ kleɪm","where you collect luggage"],
      ["fare","fɛr","price of a ticket"],
      ["cancel","ˈkænsəl","call off a booking"],
      ["abroad","əˈbrɔːd","in a foreign country"],
      ["voyage","ˈvɔɪɪdʒ","a long journey"],
      ["tourist","ˈtʊrɪst","a person who travels for pleasure"],
      ["journey","ˈdʒɜːrni","act of traveling from one place to another"],
      ["suitcase","ˈsuːtkeɪs","case for carrying clothes"],
      ["boarding pass","ˈbɔːrdɪŋ pæs","document to board a plane"]
    ]),
    opinionsB1: vocabCards("en-opinion-b1", "B1", [
      ["agree","əˈɡriː","share an opinion"],
      ["disagree","ˌdɪsəˈɡriː","not share an opinion"],
      ["maybe","ˈmeɪbi","perhaps"],
      ["probably","ˈprɒbəbli","most likely"],
      ["definitely","ˈdɛfɪnətli","without doubt"],
      ["I think","aɪ θɪŋk","in my opinion"],
      ["actually","ˈæktʃuəli","in fact"],
      ["in my opinion","ɪn maɪ əˈpɪnjən","as I see it"],
      ["point of view","pɔɪnt ʌv vjuː","a way of considering something"],
      ["perspective","pərˈspɛktɪv","a particular attitude"],
      ["suggest","səˈdʒɛst","put forward an idea"],
      ["recommend","ˌrɛkəˈmɛnd","advise as good"],
      ["prefer","prɪˈfɜːr","like better"],
      ["doubt","daʊt","feel uncertain about"],
      ["certain","ˈsɜːrtən","completely sure"],
      ["convinced","kənˈvɪnst","completely sure of a belief"],
      ["persuade","pərˈsweɪd","make someone agree"],
      ["argue","ˈɑːrɡjuː","give reasons for or against"],
      ["claim","kleɪm","state something is true"],
      ["assume","əˈsuːm","accept as true without proof"],
      ["believe","bɪˈliːv","accept as true"],
      ["consider","kənˈsɪdər","think carefully about"],
      ["admit","ədˈmɪt","confess to be true"],
      ["deny","dɪˈnaɪ","say something is not true"],
      ["object","əbˈdʒɛkt","express disapproval"],
      ["support","səˈpɔːrt","agree with and help"],
      ["oppose","əˈpoʊz","be against"],
      ["justify","ˈdʒʌstɪˌfaɪ","show to be reasonable"],
      ["emphasize","ˈɛmfəˌsaɪz","give special importance to"],
      ["criticize","ˈkrɪtɪˌsaɪz","point out faults"],
      ["approve","əˈpruːv","officially agree to"],
      ["reject","rɪˈdʒɛkt","refuse to accept"],
      ["hesitate","ˈhɛzɪˌteɪt","pause before deciding"],
      ["insist","ɪnˈsɪst","demand firmly"],
      ["conclude","kənˈkluːd","decide after thought"]
    ]),

    // ── B2 (5× volume) ──
    abstractB2: vocabCards("en-abs-b2", "B2", [
      ["challenge","ˈtʃælɪndʒ","difficult task"],
      ["opportunity","ˌɒpərˈtjuːnɪti","favorable chance"],
      ["assumption","əˈsʌmpʃən","thing believed without proof"],
      ["consequence","ˈkɒnsɪkwəns","result of an action"],
      ["controversy","ˈkɒntrəvɜːrsi","public disagreement"],
      ["sustainable","səˈsteɪnəbəl","able to continue long-term"],
      ["perception","pərˈsɛpʃən","the way something is understood"],
      ["motivation","ˌmoʊtɪˈveɪʃən","reason for acting"],
      ["integrity","ɪnˈtɛɡrɪti","being honest and moral"],
      ["ambition","æmˈbɪʃən","strong desire to achieve"],
      ["resilience","rɪˈzɪljəns","ability to recover quickly"],
      ["empathy","ˈɛmpəθi","understanding others' feelings"],
      ["prejudice","ˈprɛdʒʊdɪs","unfair preconceived opinion"],
      ["dilemma","dɪˈlɛmə","difficult choice"],
      ["hypothesis","haɪˈpɒθɪsɪs","proposed explanation"],
      ["phenomenon","fɪˈnɒmɪnən","an observable fact"],
      ["contradiction","ˌkɒntrəˈdɪkʃən","statement opposing another"],
      ["implication","ˌɪmplɪˈkeɪʃən","a likely consequence"],
      ["framework","ˈfreɪmwɜːrk","a basic supporting structure"],
      ["tendency","ˈtɛndənsi","an inclination to do something"],
      ["concept","ˈkɒnsɛpt","an abstract idea"],
      ["principle","ˈprɪnsɪpəl","a fundamental rule"],
      ["criterion","kraɪˈtɪriən","a standard for judging"],
      ["notion","ˈnoʊʃən","a belief or idea"],
      ["outcome","ˈaʊtkʌm","the final result"],
      ["scenario","sɪˈnɑːrioʊ","a possible situation"],
      ["rationale","ˌræʃəˈnæl","the reasons behind something"],
      ["paradox","ˈpærəˌdɒks","a self-contradictory truth"],
      ["premise","ˈprɛmɪs","a basis for reasoning"],
      ["bias","ˈbaɪəs","unfair tendency to favor"]
    ]),
    phrasalB2: vocabCards("en-phrasal-b2", "B2", [
      ["look up","lʊk ʌp","search for information"],
      ["give up","ɡɪv ʌp","stop trying"],
      ["put off","pʊt ɒf","postpone"],
      ["come across","kʌm əˈkrɒs","find unexpectedly"],
      ["bring about","brɪŋ əˈbaʊt","cause to happen"],
      ["carry out","ˈkæri aʊt","perform a task"],
      ["point out","pɔɪnt aʊt","draw attention to"],
      ["figure out","ˈfɪɡjər aʊt","work out a solution"],
      ["turn down","tɜːrn daʊn","refuse an offer"],
      ["bring up","brɪŋ ʌp","mention a topic"],
      ["set up","sɛt ʌp","establish or arrange"],
      ["get along","ɡɛt əˈlɒŋ","have a good relationship"],
      ["look forward to","lʊk ˈfɔːrwərd tuː","await with pleasure"],
      ["come up with","kʌm ʌp wɪð","produce an idea"],
      ["run out of","rʌn aʊt ʌv","have no more left"],
      ["take over","teɪk ˈoʊvər","take control of"],
      ["deal with","diːl wɪð","handle a situation"],
      ["put up with","pʊt ʌp wɪð","tolerate"],
      ["break down","breɪk daʊn","stop functioning"],
      ["work out","wɜːrk aʊt","find a solution; exercise"],
      ["call off","kɔːl ɒf","cancel"],
      ["look into","lʊk ˈɪntuː","investigate"],
      ["go through","ɡoʊ θruː","experience or examine"],
      ["sort out","sɔːrt aʊt","organize or resolve"],
      ["hold on","hoʊld ɒn","wait a moment"]
    ]),

    // ── C1 (5× volume) ──
    nuanceC1: vocabCards("en-nuance-c1", "C1", [
      ["nuance","ˈnjuːɑːns","subtle difference"],
      ["mitigate","ˈmɪtɪɡeɪt","make less severe"],
      ["scrutinize","ˈskruːtəˌnaɪz","examine closely"],
      ["pragmatic","præɡˈmætɪk","practical, results-oriented"],
      ["ambiguous","æmˈbɪɡjuəs","open to interpretation"],
      ["meticulous","mɪˈtɪkjʊləs","extremely careful about detail"],
      ["candid","ˈkændɪd","honest and direct"],
      ["plausible","ˈplɔːzɪbəl","seemingly reasonable"],
      ["inevitable","ɪnˈɛvɪtəbəl","certain to happen"],
      ["profound","prəˈfaʊnd","very deep or intense"],
      ["subtle","ˈsʌtəl","delicate, not obvious"],
      ["arbitrary","ˈɑːrbɪtrəri","based on whim, not reason"],
      ["coherent","koʊˈhɪrənt","logical and consistent"],
      ["redundant","rɪˈdʌndənt","unnecessary repetition"],
      ["tentative","ˈtɛntətɪv","not certain, provisional"],
      ["explicit","ɪkˈsplɪsɪt","stated clearly and openly"],
      ["implicit","ɪmˈplɪsɪt","implied, not stated"],
      ["prevalent","ˈprɛvələnt","widespread"],
      ["intrinsic","ɪnˈtrɪnsɪk","belonging naturally"],
      ["compelling","kəmˈpɛlɪŋ","convincing and powerful"],
      ["discreet","dɪˈskriːt","careful to avoid attention"],
      ["robust","roʊˈbʌst","strong and sturdy"],
      ["viable","ˈvaɪəbəl","capable of working"],
      ["feasible","ˈfiːzɪbəl","possible to do easily"],
      ["stark","stɑːrk","severe or sharply clear"]
    ]),
    idiomsC1: vocabCards("en-idioms-c1", "C1", [
      ["a piece of cake","ə piːs ʌv keɪk","very easy"],
      ["break the ice","breɪk ði aɪs","start a conversation"],
      ["hit the books","hɪt ðə bʊks","study hard"],
      ["under the weather","ˈʌndər ðə ˈwɛðər","feeling ill"],
      ["spill the beans","spɪl ðə biːnz","reveal a secret"],
      ["once in a blue moon","wʌns ɪn ə bluː muːn","very rarely"],
      ["cost an arm and a leg","kɒst ən ɑːrm ænd ə lɛɡ","be very expensive"],
      ["bite the bullet","baɪt ðə ˈbʊlɪt","face something difficult bravely"],
      ["beat around the bush","biːt əˈraʊnd ðə bʊʃ","avoid the main point"],
      ["the ball is in your court","ðə bɔːl ɪz ɪn jʊr kɔːrt","it is your decision now"],
      ["cut corners","kʌt ˈkɔːrnərz","do something cheaply or quickly"],
      ["on the same page","ɒn ðə seɪm peɪdʒ","in agreement"],
      ["get cold feet","ɡɛt koʊld fiːt","become nervous before an event"],
      ["the last straw","ðə lɑːst strɔː","the final problem one can tolerate"],
      ["a blessing in disguise","ə ˈblɛsɪŋ ɪn dɪsˈɡaɪz","a hidden benefit"],
      ["call it a day","kɔːl ɪt ə deɪ","stop working for now"],
      ["miss the boat","mɪs ðə boʊt","miss an opportunity"],
      ["pull someone's leg","pʊl ˈsʌmwʌnz lɛɡ","tease someone playfully"],
      ["on cloud nine","ɒn klaʊd naɪn","extremely happy"],
      ["sit on the fence","sɪt ɒn ðə fɛns","avoid making a decision"],
      ["the tip of the iceberg","ðə tɪp ʌv ði ˈaɪsbɜːrɡ","a small visible part of a big problem"],
      ["throw in the towel","θroʊ ɪn ðə ˈtaʊəl","give up"],
      ["jump on the bandwagon","dʒʌmp ɒn ðə ˈbændˌwæɡən","join a popular trend"],
      ["by the book","baɪ ðə bʊk","strictly following the rules"],
      ["against the clock","əˈɡɛnst ðə klɒk","rushing to meet a deadline"]
    ]),

    // ── C2 (5× volume) ──
    masteryC2: vocabCards("en-mast-c2", "C2", [
      ["ubiquitous","juːˈbɪkwɪtəs","present everywhere"],
      ["serendipity","ˌsɛrənˈdɪpəti","fortunate happenstance"],
      ["ephemeral","ɪˈfɛmərəl","lasting a very short time"],
      ["recalcitrant","rɪˈkælsɪtrənt","stubbornly uncooperative"],
      ["epitomize","ɪˈpɪtəˌmaɪz","be a perfect example of"],
      ["quintessential","ˌkwɪntɪˈsɛnʃəl","the most perfect example"],
      ["juxtaposition","ˌdʒʌkstəpəˈzɪʃən","placing things side by side for contrast"],
      ["ostensibly","ɒˈstɛnsɪbli","apparently but perhaps not really"],
      ["surreptitious","ˌsʌrəpˈtɪʃəs","done secretly"],
      ["perfunctory","pərˈfʌŋktəri","done without care or interest"],
      ["sycophant","ˈsɪkəfænt","a person who flatters for gain"],
      ["esoteric","ˌɛsəˈtɛrɪk","understood by only a few"],
      ["magnanimous","mæɡˈnænɪməs","generous and forgiving"],
      ["pernicious","pərˈnɪʃəs","subtly harmful"],
      ["obfuscate","ˈɒbfəˌskeɪt","make deliberately unclear"],
      ["equivocal","ɪˈkwɪvəkəl","ambiguous, open to two meanings"],
      ["sanguine","ˈsæŋɡwɪn","optimistic in a difficult situation"],
      ["vicarious","vɪˈkɛriəs","experienced through another person"],
      ["antithetical","ˌæntɪˈθɛtɪkəl","directly opposed"],
      ["idiosyncratic","ˌɪdiəsɪŋˈkrætɪk","peculiar to an individual"],
      ["laconic","ləˈkɒnɪk","using very few words"],
      ["ineffable","ɪnˈɛfəbəl","too great to be expressed in words"],
      ["perfidious","pərˈfɪdiəs","deceitful and untrustworthy"],
      ["mellifluous","mɛˈlɪfluəs","sweet-sounding"],
      ["propensity","prəˈpɛnsɪti","a natural inclination"]
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
