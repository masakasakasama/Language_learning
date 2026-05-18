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
      ex: (typeof EX !== "undefined" && EX[it[0]]) || [],
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

  // AI-authored natural example sentences (1 per word, 2 when the
  // word has two distinct meanings). [target_sentence, japanese_tr].
  const EX = {
    "hello": [["Hello, it's nice to finally meet you in person.","こんにちは、やっとお会いできてうれしいです。"]],
    "hi": [["Hi! I didn't expect to see you here.","やあ！ここで会うなんて思わなかったよ。"]],
    "good morning": [["Good morning, did you sleep well last night?","おはよう、昨夜はよく眠れた？"]],
    "good evening": [["Good evening, everyone, thank you for coming tonight.","皆さん、こんばんは。今夜はお越しいただきありがとうございます。"]],
    "good night": [["Good night, sweet dreams, see you tomorrow.","おやすみ、いい夢を見てね、また明日。"]],
    "goodbye": [["She waved goodbye as the train slowly left.","電車がゆっくり出発する中、彼女は手を振って別れを告げた。"]],
    "thank you": [["Thank you so much for helping me move today.","今日は引っ越しを手伝ってくれて本当にありがとう。"]],
    "sorry": [["I'm sorry, I didn't mean to step on your foot.","ごめんなさい、足を踏むつもりはなかったんです。"]],
    "please": [["Could you pass me the salt, please?","塩を取ってもらえますか？"]],
    "yes": [["Yes, I'd love to come to your party.","うん、ぜひあなたのパーティーに行きたい。"]],
    "no": [["No, I haven't finished the report yet.","いいえ、まだ報告書は終わっていません。"]],
    "I": [["I usually walk to school every morning.","私は毎朝たいてい歩いて学校に行く。"]],
    "you": [["Do you want to grab lunch with me?","一緒にお昼を食べに行かない？"]],
    "he": [["He works at a hospital downtown.","彼は街の病院で働いている。"]],
    "she": [["She is learning to play the guitar.","彼女はギターを習っている。"]],
    "it": [["It's raining hard, so take an umbrella.","雨がひどく降っているから傘を持っていって。"]],
    "we": [["We are going to the beach this weekend.","私たちは今週末ビーチに行く予定だ。"]],
    "they": [["They moved to Canada two years ago.","彼らは2年前にカナダに引っ越した。"]],
    "one": [["I only need one ticket for the movie.","映画のチケットは1枚だけでいい。"]],
    "two": [["I have two cats and a dog at home.","家には猫が2匹と犬が1匹いる。"]],
    "three": [["The meeting starts at three in the afternoon.","会議は午後3時に始まる。"]],
    "four": [["There are four people in my family.","私の家族は4人です。"]],
    "five": [["The store opens in five minutes.","店はあと5分で開く。"]],
    "six": [["I woke up at six this morning.","今朝は6時に起きた。"]],
    "seven": [["She read seven books over the summer.","彼女は夏の間に7冊の本を読んだ。"]],
    "eight": [["The train leaves at eight o'clock sharp.","電車はきっかり8時に出発する。"]],
    "nine": [["He scored nine points in the game.","彼は試合で9点を取った。"]],
    "ten": [["Give me ten minutes to get ready.","準備するのに10分ちょうだい。"]],
    "mother": [["My mother makes the best soup in the world.","母は世界一おいしいスープを作る。"]],
    "father": [["His father taught him how to ride a bike.","彼の父は自転車の乗り方を教えてくれた。"]],
    "sister": [["My little sister is afraid of spiders.","妹はクモが怖いんだ。"]],
    "brother": [["My brother is two years older than me.","兄は私より2歳年上だ。"]],
    "son": [["Their son just started elementary school.","彼らの息子は小学校に入ったばかりだ。"]],
    "daughter": [["Her daughter wants to become a doctor.","彼女の娘は医者になりたがっている。"]],
    "family": [["We always have dinner as a family on Sundays.","日曜日はいつも家族そろって夕食をとる。"]],
    "friend": [["My best friend lives just down the street.","親友はすぐ近くの通りに住んでいる。"]],
    "water": [["Can I have a glass of water, please?","お水を一杯いただけますか？"]],
    "bread": [["I bought fresh bread from the bakery this morning.","今朝パン屋で焼きたてのパンを買った。"]],
    "rice": [["We eat rice with almost every meal.","私たちはほとんど毎食ご飯を食べる。"]],
    "apple": [["She packed an apple in her lunch bag.","彼女はお弁当袋にリンゴを入れた。"]],
    "egg": [["I had a boiled egg for breakfast.","朝食にゆで卵を食べた。"]],
    "milk": [["We're out of milk, can you buy some?","牛乳が切れてるから買ってきてくれる？"]],
    "coffee": [["I can't start my day without a cup of coffee.","コーヒーを一杯飲まないと一日が始まらない。"]],
    "tea": [["Would you like some green tea after dinner?","夕食の後に緑茶はいかがですか？"]],
    "fish": [["We had grilled fish for dinner last night.","昨夜の夕食は焼き魚だった。"]],
    "to be": [["I want to be a teacher when I grow up.","大人になったら先生になりたい。"]],
    "to have": [["I'd like to have a quiet weekend at home.","家で静かな週末を過ごしたい。"]],
    "to eat": [["I'm too busy to eat lunch today.","今日は忙しすぎて昼食を食べる暇がない。"]],
    "to drink": [["It's important to drink enough water in summer.","夏は十分に水を飲むことが大切だ。"]],
    "to go": [["I don't want to go out in this cold.","この寒さの中で外に出たくない。"]],
    "to come": [["Thanks for taking the time to come today.","今日はわざわざ来てくれてありがとう。"]],
    "to see": [["I was happy to see my old friends again.","旧友にまた会えてうれしかった。"]],
    "to like": [["You don't have to like everyone you work with.","一緒に働く人全員を好きになる必要はない。"]],
    "big": [["They live in a big house near the park.","彼らは公園の近くの大きな家に住んでいる。"]],
    "small": [["She keeps a small notebook in her pocket.","彼女はポケットに小さなノートを入れている。"]],
    "good": [["This is a really good restaurant for the price.","ここは値段の割に本当においしいレストランだ。"]],
    "bad": [["I had a bad headache all day yesterday.","昨日は一日中ひどい頭痛がした。"]],
    "happy": [["I'm so happy that you passed the exam.","試験に合格して本当にうれしいよ。"]],
    "sad": [["She felt sad when her friend moved away.","友達が引っ越して彼女は悲しかった。"]],
    "hot": [["Be careful, the soup is still very hot.","気をつけて、スープはまだとても熱いよ。"]],
    "cold": [["It's so cold outside that my hands are freezing.","外がとても寒くて手がかじかんでいる。"]],
    "wake up": [["I usually wake up before my alarm goes off.","私はたいてい目覚ましが鳴る前に起きる。"]],
    "get dressed": [["Hurry up and get dressed or we'll be late.","早く着替えないと遅れちゃうよ。"]],
    "have breakfast": [["I never skip breakfast before a long day.","忙しい一日の前は決して朝食を抜かない。"]],
    "go to work": [["I go to work by train every morning.","私は毎朝電車で仕事に行く。"]],
    "come home": [["He usually comes home around seven in the evening.","彼はたいてい夜7時頃に帰宅する。"]],
    "take a shower": [["I like to take a shower right after exercising.","運動した直後にシャワーを浴びるのが好きだ。"]],
    "go to bed": [["The kids go to bed at nine on school nights.","学校のある日は子どもたちは9時に寝る。"]],
    "shop": [["There's a great little coffee shop around the corner.","角を曲がったところに素敵な小さなコーヒー店がある。"]],
    "buy": [["I need to buy a birthday present for my mom.","母の誕生日プレゼントを買わなくちゃ。"]],
    "sell": [["They decided to sell their old car online.","彼らは古い車をネットで売ることにした。"]],
    "price": [["The price of vegetables has gone up recently.","最近、野菜の値段が上がっている。"]],
    "cheap": [["This phone is cheap but works really well.","この携帯は安いけどとてもよく動く。"]],
    "expensive": [["That restaurant is too expensive for a weekday lunch.","あのレストランは平日のランチには高すぎる。"]],
    "receipt": [["Keep the receipt in case you want a refund.","返金したくなったときのためにレシートを取っておいて。"]],
    "cash": [["Sorry, we only accept cash at this stall.","すみません、この屋台は現金のみなんです。"]],
    "card": [["Can I pay by card, or is it cash only?","カードで払えますか、それとも現金のみですか？"]],
    "flight": [["Our flight was delayed by three hours because of the storm.","嵐のせいで私たちのフライトは3時間遅れた。"]],
    "luggage": [["My luggage didn't arrive on the same flight as me.","私の荷物は私と同じ便で届かなかった。"]],
    "passport": [["Don't forget to check that your passport is still valid.","パスポートがまだ有効か確認するのを忘れないで。"]],
    "delay": [["A signal problem caused a long delay on the line.","信号トラブルでその路線は大幅に遅れた。"]],
    "reservation": [["I made a dinner reservation for seven o'clock.","7時に夕食の予約を入れました。"]],
    "destination": [["After ten hours of driving, we finally reached our destination.","10時間運転して、ようやく目的地に着いた。"]],
    "souvenir": [["She bought a small souvenir for everyone in the office.","彼女は職場のみんなにちょっとしたお土産を買った。"]],
    "departure": [["Please arrive two hours before your scheduled departure.","出発予定時刻の2時間前には到着してください。"]],
    "arrival": [["Our arrival was delayed because of heavy snow at the airport.","空港の大雪のせいで私たちの到着は遅れた。"]],
    "customs": [["It took almost an hour to get through customs at the airport.","空港の税関を通過するのに一時間近くかかった。"]],
    "itinerary": [["I've planned a detailed itinerary for our two-week trip to Italy.","イタリアへの二週間の旅行のために詳細な旅程を計画した。"]],
    "accommodation": [["We booked our accommodation near the beach for the summer holiday.","夏の休暇のためにビーチ近くの宿を予約した。"]],
    "sightseeing": [["We spent the whole afternoon sightseeing around the old town.","私たちは午後ずっと旧市街を観光して過ごした。"]],
    "currency": [["You should exchange some currency before you leave the country.","出国する前にいくらか両替しておいたほうがいい。"]],
    "round trip": [["A round trip ticket to London is cheaper than two one-way fares.","ロンドンへの往復チケットは片道二枚より安い。"]],
    "layover": [["We had a six-hour layover in Dubai on the way to Sydney.","シドニーへ行く途中、ドバイで六時間の乗り継ぎがあった。"]],
    "jet lag": [["I had terrible jet lag for three days after flying to Japan.","日本へ飛行機で行った後、三日間ひどい時差ぼけだった。"]],
    "visa": [["You need a tourist visa to stay in that country for a month.","その国に一か月滞在するには観光ビザが必要だ。"]],
    "check-in": [["Online check-in saves a lot of time at the airport.","オンラインチェックインは空港で多くの時間を節約できる。"]],
    "carry-on": [["I only travel with a carry-on to avoid waiting for luggage.","荷物を待たずに済むよう、私は機内持ち込み手荷物だけで旅行する。"]],
    "aisle seat": [["I prefer an aisle seat so I can stretch my legs easily.","足を伸ばしやすいので、私は通路側の席が好きだ。"]],
    "window seat": [["She always chooses a window seat to watch the clouds.","彼女は雲を眺めるためにいつも窓側の席を選ぶ。"]],
    "travel agency": [["We booked the whole tour through a local travel agency.","私たちは地元の旅行代理店でツアー全体を予約した。"]],
    "guidebook": [["The guidebook recommended a small restaurant near the cathedral.","ガイドブックは大聖堂近くの小さなレストランを勧めていた。"]],
    "backpack": [["He carried everything he needed in a single large backpack.","彼は必要なものすべてを大きなリュック一つに入れて持ち運んだ。"]],
    "terminal": [["Our flight leaves from Terminal 2, so we should hurry.","私たちの便は第二ターミナルから出るので、急いだほうがいい。"]],
    "baggage claim": [["We waited at baggage claim for almost thirty minutes.","私たちは手荷物受取所で三十分近く待った。"]],
    "fare": [["The bus fare went up again this year.","バスの運賃は今年また上がった。"]],
    "cancel": [["I had to cancel my hotel reservation because of the storm.","嵐のせいでホテルの予約をキャンセルしなければならなかった。"]],
    "abroad": [["She has always wanted to study abroad in France.","彼女はずっとフランスに留学したいと思っていた。"]],
    "voyage": [["The long sea voyage took more than two weeks.","その長い船旅は二週間以上かかった。"]],
    "tourist": [["The old castle is full of tourists during the summer.","その古城は夏の間、観光客でいっぱいだ。"]],
    "journey": [["The journey from London to Edinburgh by train is very scenic.","ロンドンからエディンバラまでの電車の旅はとても景色が良い。"]],
    "suitcase": [["My suitcase was so heavy I could barely lift it.","私のスーツケースはとても重くて、ほとんど持ち上げられなかった。"]],
    "boarding pass": [["Please have your boarding pass ready before you reach the gate.","ゲートに着く前に搭乗券を用意しておいてください。"]],
    "agree": [["I completely agree with what you said at the meeting.","会議であなたが言ったことに私は完全に同意します。"]],
    "disagree": [["I have to disagree with you on this point.","この点についてはあなたに反対せざるを得ません。"]],
    "maybe": [["Maybe we should leave earlier to avoid the traffic.","渋滞を避けるために、もしかしたらもっと早く出たほうがいいかもしれない。"]],
    "probably": [["It will probably rain later, so take an umbrella.","後で雨が降りそうだから、傘を持っていきなさい。"]],
    "definitely": [["I will definitely call you as soon as I arrive.","到着したら必ずあなたに電話します。"]],
    "I think": [["I think this restaurant is better than the one we tried yesterday.","この店は昨日行った店より良いと思う。"]],
    "actually": [["I thought it was easy, but actually it was quite hard.","簡単だと思っていたが、実際にはかなり難しかった。"]],
    "in my opinion": [["In my opinion, we should wait until next week to decide.","私の意見では、決めるのは来週まで待つべきだ。"]],
    "point of view": [["From a parent's point of view, the rule makes perfect sense.","親の視点から見れば、その規則は完全に理にかなっている。"]],
    "perspective": [["Traveling abroad gave me a whole new perspective on life.","海外を旅して、人生について全く新しい見方を得た。"]],
    "suggest": [["I suggest we take a short break before continuing the work.","作業を続ける前に少し休憩を取ることを提案します。"]],
    "recommend": [["I would highly recommend this book to anyone learning English.","英語を学ぶ人なら誰にでもこの本を強くお勧めします。"]],
    "prefer": [["I prefer tea to coffee in the morning.","私は朝、コーヒーより紅茶が好きだ。"]],
    "doubt": [["I doubt he will finish the project by Friday.","彼が金曜までにそのプロジェクトを終えられるか疑わしい。"]],
    "certain": [["Are you certain you locked the front door before leaving?","出る前に玄関の鍵をかけたのは確かですか。"]],
    "convinced": [["After the demonstration, I was convinced the product really worked.","実演を見て、その製品が本当に効くと確信した。"]],
    "persuade": [["It took a long time to persuade her to join the team.","彼女をチームに参加させるよう説得するのに長い時間がかかった。"]],
    "argue": [["They often argue about money, but they always make up.","彼らはよくお金のことで言い争うが、いつも仲直りする。"]],
    "claim": [["He claims he saw the accident, but no one believes him.","彼は事故を見たと主張しているが、誰も信じていない。"]],
    "assume": [["Don't assume the meeting is cancelled just because she's absent.","彼女が欠席しているからといって会議が中止だと決めつけないで。"]],
    "believe": [["I can't believe how quickly the children have grown.","子どもたちがこんなに早く成長したなんて信じられない。"]],
    "consider": [["You should carefully consider all the options before deciding.","決める前にすべての選択肢を慎重に検討すべきだ。"]],
    "admit": [["He finally admitted that he had made a mistake.","彼はついに自分が間違いを犯したと認めた。"]],
    "deny": [["She continued to deny that she had taken the money.","彼女はお金を取ったことを否定し続けた。"]],
    "object": [["Several residents objected to the plan to build a new road.","数人の住民が新しい道路を建設する計画に反対した。"]],
    "support": [["My family always supported me when I changed careers.","私が転職したとき、家族はいつも私を支えてくれた。"]],
    "oppose": [["Many people strongly oppose raising the local taxes.","多くの人が地方税の引き上げに強く反対している。"]],
    "justify": [["Nothing can justify treating other people so unfairly.","他人をそれほど不公平に扱うことは何も正当化できない。"]],
    "emphasize": [["The teacher emphasized the importance of regular practice.","先生は日々の練習の重要性を強調した。"]],
    "criticize": [["It's easy to criticize others, but harder to do better yourself.","他人を批判するのは簡単だが、自分でうまくやるのは難しい。"]],
    "approve": [["The board finally approved the budget for next year.","役員会はようやく来年の予算を承認した。"]],
    "reject": [["The company rejected his proposal without giving any reason.","会社は理由も告げずに彼の提案を却下した。"]],
    "hesitate": [["Don't hesitate to ask if you have any questions.","質問があれば遠慮せずに聞いてください。"]],
    "insist": [["She insisted on paying for dinner even though I offered.","私が申し出たのに、彼女は夕食代を払うと言い張った。"]],
    "conclude": [["After reviewing the data, we concluded the experiment had failed.","データを検討した結果、実験は失敗したと結論づけた。"]],
    "challenge": [["Learning a new language is a real challenge, but it's worth it.","新しい言語を学ぶのは大変だが、その価値はある。"]],
    "opportunity": [["Studying abroad gave her a great opportunity to grow.","留学は彼女に成長する素晴らしい機会を与えた。"]],
    "assumption": [["His plan was based on the assumption that prices would stay low.","彼の計画は価格が低いままだという前提に基づいていた。"]],
    "consequence": [["He didn't think about the consequences of his careless decision.","彼は軽率な決定がもたらす結果について考えなかった。"]],
    "controversy": [["The new policy caused a lot of controversy among teachers.","その新しい方針は教師の間で多くの論争を引き起こした。"]],
    "sustainable": [["The company is trying to develop more sustainable farming methods.","その会社はより持続可能な農業の方法を開発しようとしている。"]],
    "perception": [["The campaign aimed to change public perception of the disease.","そのキャンペーンはその病気に対する世間の認識を変えることを目指した。"]],
    "motivation": [["Her main motivation for studying medicine was to help people.","彼女が医学を学ぶ主な動機は人々を助けることだった。"]],
    "integrity": [["He is respected for his honesty and integrity in business.","彼はビジネスにおける誠実さと高潔さで尊敬されている。"]],
    "ambition": [["Her ambition is to start her own company before she's thirty.","彼女の野望は三十歳になる前に自分の会社を立ち上げることだ。"]],
    "resilience": [["The team showed great resilience after losing the first match.","そのチームは初戦に負けた後、見事な回復力を見せた。"]],
    "empathy": [["A good nurse needs both skill and genuine empathy.","良い看護師には技術と本物の共感の両方が必要だ。"]],
    "prejudice": [["We must work hard to overcome prejudice in our society.","私たちは社会の偏見を克服するために懸命に努力しなければならない。"]],
    "dilemma": [["She faced a difficult dilemma between her career and her family.","彼女はキャリアと家族の間で難しいジレンマに直面した。"]],
    "hypothesis": [["The scientists tested their hypothesis with a series of experiments.","科学者たちは一連の実験で自分たちの仮説を検証した。"]],
    "phenomenon": [["The northern lights are a beautiful natural phenomenon.","オーロラは美しい自然現象だ。"]],
    "contradiction": [["There's a clear contradiction between what he says and what he does.","彼の言うこととすることの間には明らかな矛盾がある。"]],
    "implication": [["The decision has serious implications for the whole industry.","その決定は業界全体に深刻な影響を及ぼす。"]],
    "framework": [["The new law provides a framework for protecting workers' rights.","新しい法律は労働者の権利を守るための枠組みを提供する。"]],
    "tendency": [["He has a tendency to arrive late for important meetings.","彼は重要な会議に遅れて来る傾向がある。"]],
    "concept": [["The teacher explained the concept of gravity with a simple example.","先生は簡単な例で重力の概念を説明した。"]],
    "principle": [["She refused to lie because it went against her principles.","彼女は自分の信条に反するので嘘をつくのを拒んだ。"]],
    "criterion": [["Price is not the only criterion when choosing a university.","大学を選ぶとき、価格だけが基準ではない。"]],
    "notion": [["She had a romantic notion that her work would change the world.","彼女は自分の仕事が世界を変えるというロマンチックな考えを抱いていた。"]],
    "outcome": [["We won't know the outcome of the election until tomorrow.","選挙の結果は明日まで分からないだろう。"]],
    "scenario": [["In the worst-case scenario, we lose all our savings.","最悪のシナリオでは、私たちは貯金を全部失う。"]],
    "rationale": [["He explained the rationale behind the new company policy.","彼は新しい会社方針の根拠を説明した。"]],
    "paradox": [["It's a paradox that the more choices we have, the unhappier we feel.","選択肢が多いほど不幸に感じるというのは逆説だ。"]],
    "premise": [["The whole argument rests on a false premise.","その議論全体が誤った前提の上に成り立っている。"]],
    "bias": [["The report showed a clear bias against younger applicants.","その報告書には若い応募者に対する明らかな偏りが見られた。"]],
    "look up": [["I'll look up the word in the dictionary if I don't know it.","知らない単語があれば辞書で調べるよ。"]],
    "give up": [["Don't give up just because the first attempt failed.","最初の試みが失敗したからといって諦めないで。"]],
    "put off": [["They put off the meeting until next Monday.","彼らは会議を来週の月曜日まで延期した。"]],
    "come across": [["I came across some old photos while cleaning the attic.","屋根裏を掃除しているとき、古い写真を偶然見つけた。"]],
    "bring about": [["The new manager brought about huge changes in the team.","新しいマネージャーはチームに大きな変化をもたらした。"]],
    "carry out": [["The scientists carried out a series of experiments.","科学者たちは一連の実験を行った。"]],
    "point out": [["She pointed out a mistake in my calculations.","彼女は私の計算の誤りを指摘した。"]],
    "figure out": [["I can't figure out how to use this new software.","この新しいソフトの使い方がどうしても分からない。"]],
    "turn down": [["He turned down the job offer because the salary was too low.","給料が低すぎたので、彼はその仕事のオファーを断った。"]],
    "bring up": [["She brought up an interesting point during the discussion.","彼女は議論の中で興味深い点を持ち出した。"]],
    "set up": [["They set up a new office in Tokyo last year.","彼らは昨年、東京に新しいオフィスを設立した。"]],
    "get along": [["My brother and I get along really well these days.","最近、兄と私はとても仲良くやっている。"]],
    "look forward to": [["I'm really looking forward to seeing you next week.","来週あなたに会えるのを本当に楽しみにしています。"]],
    "come up with": [["She came up with a brilliant idea to save money.","彼女はお金を節約する素晴らしいアイデアを思いついた。"]],
    "run out of": [["We ran out of milk, so I'll go to the store.","牛乳が切れたので、お店に行ってくるね。"]],
    "take over": [["A bigger company took over the small startup.","大きな会社がその小さなスタートアップを買収した。"]],
    "deal with": [["I have to deal with several difficult customers every day.","私は毎日、何人かの難しい客に対応しなければならない。"]],
    "put up with": [["I can't put up with this noise any longer.","この騒音にはこれ以上我慢できない。"]],
    "break down": [["My car broke down on the highway last night.","昨夜、私の車は高速道路で故障した。"]],
    "work out": [["I'm sure everything will work out in the end.","最後にはきっと全てうまくいくと思うよ。"],["She works out at the gym three times a week.","彼女は週に三回ジムで運動している。"]],
    "call off": [["They called off the picnic because of the rain.","雨のため、彼らはピクニックを中止した。"]],
    "look into": [["The police are looking into the cause of the accident.","警察はその事故の原因を調査している。"]],
    "go through": [["She went through a very difficult time after the divorce.","彼女は離婚後、とてもつらい時期を経験した。"],["Let's go through the report once more before sending it.","送る前にもう一度その報告書を見直そう。"]],
    "sort out": [["I need to sort out this mess before the guests arrive.","客が来る前にこの散らかりを片付ける必要がある。"]],
    "hold on": [["Hold on a second, I'll check the schedule for you.","ちょっと待ってください、スケジュールを確認しますね。"]],
    "nuance": [["He explained the subtle nuance between the two words.","彼は二つの語の微妙なニュアンスの違いを説明した。"]],
    "mitigate": [["The government took steps to mitigate the economic damage.","政府は経済的被害を軽減するための対策を講じた。"]],
    "scrutinize": [["The auditors scrutinized every line of the financial report.","監査人たちは財務報告書の一行一行を精査した。"]],
    "pragmatic": [["She took a pragmatic approach and focused on what actually works.","彼女は実用的な手法を取り、実際に機能することに集中した。"]],
    "ambiguous": [["His answer was so ambiguous that nobody knew what he meant.","彼の答えはあまりに曖昧で、誰も彼の意図が分からなかった。"]],
    "meticulous": [["She is meticulous about keeping her records in perfect order.","彼女は記録を完璧に整理することに非常に几帳面だ。"]],
    "candid": [["I appreciate your candid feedback on my presentation.","私のプレゼンへの率直なご意見に感謝します。"]],
    "plausible": [["His explanation sounded plausible, but I still had doubts.","彼の説明はもっともらしく聞こえたが、それでも私は疑っていた。"]],
    "inevitable": [["With such poor management, the company's collapse was inevitable.","そんなずさんな経営では、会社の崩壊は避けられなかった。"]],
    "profound": [["The book had a profound effect on the way I see life.","その本は私の人生観に深い影響を与えた。"]],
    "subtle": [["There was a subtle change in his tone of voice.","彼の声のトーンにかすかな変化があった。"]],
    "arbitrary": [["The decision seemed completely arbitrary and unfair.","その決定は全く恣意的で不公平に思えた。"]],
    "coherent": [["She gave a clear and coherent explanation of the problem.","彼女はその問題について明快で筋の通った説明をした。"]],
    "redundant": [["The second paragraph is redundant and should be deleted.","二つ目の段落は冗長なので削除すべきだ。"]],
    "tentative": [["We've made a tentative plan to meet on Friday.","金曜日に会うという暫定的な計画を立てた。"]],
    "explicit": [["The instructions were explicit about what we should not do.","その指示は、してはいけないことを明確に述べていた。"]],
    "implicit": [["There was an implicit agreement that we would share the cost.","費用を分担するという暗黙の了解があった。"]],
    "prevalent": [["This belief is still prevalent in many rural areas.","この考えは今でも多くの農村部で広く見られる。"]],
    "intrinsic": [["Curiosity is an intrinsic part of human nature.","好奇心は人間の本質に固有のものだ。"]],
    "compelling": [["She made a compelling case for changing the policy.","彼女はその方針を変えるべきだという説得力のある主張をした。"]],
    "discreet": [["Please be discreet about what I told you yesterday.","昨日話したことについては、どうか口外しないでください。"]],
    "robust": [["The bridge was built to be robust enough for heavy trucks.","その橋は大型トラックにも耐えられる頑丈な造りだった。"]],
    "viable": [["Solar power has become a viable alternative to coal.","太陽光発電は石炭に代わる実行可能な選択肢になった。"]],
    "feasible": [["It's not feasible to finish the whole project in one week.","プロジェクト全体を一週間で終えるのは現実的ではない。"]],
    "stark": [["There is a stark contrast between the rich and the poor here.","ここでは富裕層と貧困層の間にくっきりとした対比がある。"]],
    "a piece of cake": [["The exam was a piece of cake; I finished it in twenty minutes.","その試験は朝飯前で、二十分で終わった。"]],
    "break the ice": [["He told a funny story to break the ice at the party.","彼はパーティーで場を和ませるために面白い話をした。"]],
    "hit the books": [["Final exams are coming, so I really need to hit the books.","期末試験が近いので、本気で勉強しなければならない。"]],
    "under the weather": [["I'm feeling a bit under the weather, so I'll stay home today.","少し体調が悪いので、今日は家にいるよ。"]],
    "spill the beans": [["Come on, spill the beans! What did she say about me?","ねえ、白状してよ！彼女は私について何て言ったの？"]],
    "once in a blue moon": [["My uncle visits us only once in a blue moon.","おじが私たちを訪ねてくるのは本当にまれだ。"]],
    "cost an arm and a leg": [["That designer handbag cost her an arm and a leg.","あのブランドのバッグは彼女にとってとても高価だった。"]],
    "bite the bullet": [["I hate the dentist, but I'll have to bite the bullet and go.","歯医者は嫌いだけど、覚悟を決めて行くしかない。"]],
    "beat around the bush": [["Stop beating around the bush and tell me what happened.","遠回しに言うのはやめて、何が起きたのか教えて。"]],
    "the ball is in your court": [["I've made my offer, so now the ball is in your court.","私は提案をしたので、今度はあなたが決める番だ。"]],
    "cut corners": [["The builder cut corners, and now the roof is leaking.","業者が手抜きをしたので、今や屋根が雨漏りしている。"]],
    "on the same page": [["Let's have a quick meeting to make sure we're all on the same page.","全員の認識を合わせるために、短い会議をしよう。"]],
    "get cold feet": [["He got cold feet the night before the wedding.","彼は結婚式の前夜に怖気づいてしまった。"]],
    "the last straw": [["His rude comment was the last straw, and she quit.","彼の失礼な発言が我慢の限界で、彼女は辞めた。"]],
    "a blessing in disguise": [["Losing that job turned out to be a blessing in disguise.","あの仕事を失ったことは、結果的に不幸中の幸いだった。"]],
    "call it a day": [["We've worked enough; let's call it a day.","十分働いたから、今日はこれで終わりにしよう。"]],
    "miss the boat": [["If you don't apply now, you'll miss the boat.","今応募しないと、チャンスを逃すよ。"]],
    "pull someone's leg": [["Don't worry, I'm just pulling your leg.","心配しないで、ただからかっているだけだよ。"]],
    "on cloud nine": [["She was on cloud nine after hearing she got the job.","採用されたと聞いて、彼女は天にも昇る気持ちだった。"]],
    "sit on the fence": [["You can't sit on the fence forever; you must choose a side.","いつまでも様子見はできない。どちらかを選ばなければ。"]],
    "the tip of the iceberg": [["These complaints are just the tip of the iceberg.","これらの苦情は氷山の一角にすぎない。"]],
    "throw in the towel": [["After months of failure, he finally threw in the towel.","何ヶ月もの失敗の末、彼はついに諦めた。"]],
    "jump on the bandwagon": [["Many companies jumped on the bandwagon once the trend went viral.","その流行が広まると、多くの会社が便乗した。"]],
    "by the book": [["Our new boss does everything strictly by the book.","新しい上司は何でも厳密に規則通りに行う。"]],
    "against the clock": [["The team worked against the clock to finish before the deadline.","チームは締め切り前に終わらせようと時間と競争して働いた。"]],
    "ubiquitous": [["Smartphones have become ubiquitous in modern daily life.","スマートフォンは現代の日常生活でどこにでもある存在になった。"]],
    "serendipity": [["Meeting my future wife at that café was pure serendipity.","あのカフェで未来の妻に出会えたのは、まさに幸運な偶然だった。"]],
    "ephemeral": [["Fame can be ephemeral, vanishing as quickly as it comes.","名声ははかなく、訪れたのと同じくらい早く消えることがある。"]],
    "recalcitrant": [["The recalcitrant employee refused to follow the new procedures.","その反抗的な従業員は新しい手順に従うことを拒んだ。"]],
    "epitomize": [["Her quiet kindness epitomizes everything a good teacher should be.","彼女の静かな優しさは、良い教師であるべき姿そのものを体現している。"]],
    "quintessential": [["He is the quintessential gentleman, always polite and considerate.","彼はいつも礼儀正しく思いやりのある、典型的な紳士だ。"]],
    "juxtaposition": [["The juxtaposition of wealth and poverty in the city is striking.","その都市における富と貧困の対比は際立っている。"]],
    "ostensibly": [["He left early, ostensibly to catch a train, but really to avoid her.","彼は早く帰った。表向きは電車に乗るためだが、本当は彼女を避けるためだった。"]],
    "surreptitious": [["She took a surreptitious glance at her phone during the meeting.","彼女は会議中にこっそりと携帯電話をちらりと見た。"]],
    "perfunctory": [["He gave a perfunctory nod and went back to his work.","彼はおざなりにうなずいて、また仕事に戻った。"]],
    "sycophant": [["The manager surrounded himself with sycophants who praised every decision.","その上司は、どんな決定もほめそやす取り巻きで身を固めていた。"]],
    "esoteric": [["The lecture was so esoteric that only specialists could follow it.","その講義はあまりに難解で、専門家しかついていけなかった。"]],
    "magnanimous": [["She was magnanimous in victory and praised her opponent warmly.","彼女は勝っても寛大で、対戦相手を温かくたたえた。"]],
    "pernicious": [["The pernicious effects of the rumor slowly destroyed his reputation.","そのうわさの陰湿な影響は、徐々に彼の評判を壊していった。"]],
    "obfuscate": [["Politicians often obfuscate the truth with vague, technical language.","政治家はしばしば、曖昧で専門的な言葉で真実を覆い隠す。"]],
    "equivocal": [["His equivocal answer left everyone unsure of his real intentions.","彼の曖昧な返答に、誰もが彼の本心をつかめないままだった。"]],
    "sanguine": [["Despite the setbacks, she remained sanguine about the project's future.","数々の挫折にもかかわらず、彼女はプロジェクトの将来に楽観的なままだった。"]],
    "vicarious": [["He got a vicarious thrill from watching his daughter's races.","彼は娘のレースを見て、わが事のような興奮を味わった。"]],
    "antithetical": [["Her values are antithetical to everything the company stands for.","彼女の価値観は、その会社が掲げるものすべてと正反対だ。"]],
    "idiosyncratic": [["His idiosyncratic writing style makes his novels instantly recognizable.","彼の独特な文体のおかげで、彼の小説はすぐにそれと分かる。"]],
    "laconic": [["His laconic reply told us he didn't want to discuss it.","彼の素っ気ない返事から、それについて話したくないのが分かった。"]],
    "ineffable": [["Standing on the summit, she felt an ineffable sense of peace.","山頂に立って、彼女は言葉にできない安らぎを感じた。"]],
    "perfidious": [["His perfidious friend secretly sold the company's secrets to rivals.","その不実な友人は、会社の機密をひそかにライバルに売っていた。"]],
    "mellifluous": [["The singer's mellifluous voice filled the quiet hall.","その歌手の甘く美しい声が、静かなホールを満たした。"]],
    "propensity": [["He has a propensity for taking risks that worries his family.","彼は危険を冒す傾向があり、それが家族を心配させている。"]]
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
