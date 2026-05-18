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
      ex: (typeof EX !== "undefined" && EX[it[0]]) || [],
      jp: it[0], kana: it[1] || "", romaji: it[1] || "", en: it[2],
      ja: JA[it[2]] || "",
      de: "",
      front: it[0], back: it[2], hint: it[1] || "",
      speakText: it[0]
    }));
  }

  // AI-authored natural example sentences (1 per word, 2 when the
  // word has two distinct meanings). [target_sentence, japanese_tr].
  const EX = {
    "hallo": [["Hallo, wie geht es dir heute?","やあ、今日は元気？"]],
    "guten Morgen": [["Guten Morgen, hast du gut geschlafen?","おはよう、よく眠れた？"]],
    "guten Tag": [["Guten Tag, ich möchte einen Termin vereinbaren.","こんにちは、予約を取りたいのですが。"]],
    "guten Abend": [["Guten Abend, schön, dass Sie da sind.","こんばんは、お越しいただきうれしいです。"]],
    "gute Nacht": [["Gute Nacht, schlaf gut und träum was Schönes!","おやすみ、よく眠っていい夢を見てね！"]],
    "tschüss": [["Tschüss, wir sehen uns morgen wieder!","じゃあね、また明日会おう！"]],
    "auf Wiedersehen": [["Auf Wiedersehen und vielen Dank für Ihren Besuch.","さようなら、ご来訪ありがとうございました。"]],
    "danke": [["Danke für deine Hilfe, das war wirklich nett.","手伝ってくれてありがとう、本当に親切だったね。"]],
    "bitte": [["Kannst du mir bitte das Salz reichen?","塩を取ってもらえますか？"],["Vielen Dank! – Bitte, gern geschehen.","どうもありがとう！ ― どういたしまして。"]],
    "Entschuldigung": [["Entschuldigung, wissen Sie, wie spät es ist?","すみません、今何時かわかりますか？"],["Entschuldigung, das war meine Schuld.","ごめんなさい、それは私のせいでした。"]],
    "ja": [["Ja, ich komme gerne mit ins Kino.","うん、喜んで映画に一緒に行くよ。"]],
    "nein": [["Nein, danke, ich möchte keinen Kaffee mehr.","いいえ、結構です、もうコーヒーはいりません。"]],
    "vielleicht": [["Vielleicht regnet es morgen, nimm einen Schirm mit.","明日は雨かもしれないから、傘を持っていって。"]],
    "ich": [["Ich gehe heute Abend mit Freunden essen.","私は今晩、友達と食事に行きます。"]],
    "du": [["Hast du heute schon etwas gegessen?","君は今日もう何か食べた？"]],
    "Sie": [["Können Sie mir bitte den Weg zum Bahnhof zeigen?","駅への道を教えていただけますか？"]],
    "er": [["Er arbeitet seit drei Jahren bei dieser Firma.","彼は三年前からこの会社で働いています。"]],
    "sie": [["Sie liest jeden Abend ein Buch vor dem Schlafen.","彼女は毎晩寝る前に本を読みます。"],["Sie spielen am Wochenende oft zusammen Fußball.","彼らは週末によく一緒にサッカーをします。"]],
    "es": [["Es schneit draußen, zieh dir eine warme Jacke an.","外は雪が降っているから、暖かい上着を着て。"]],
    "wir": [["Wir fahren nächste Woche in den Urlaub nach Italien.","私たちは来週イタリアへ休暇に行きます。"]],
    "ihr": [["Habt ihr schon eure Hausaufgaben gemacht?","君たちはもう宿題をやった？"]],
    "eins": [["Es ist schon eins, wir sollten Mittagessen.","もう一時だ、お昼を食べたほうがいい。"]],
    "zwei": [["Ich hätte gern zwei Brötchen, bitte.","パンを二つください。"]],
    "drei": [["Wir haben drei Kinder, zwei Jungen und ein Mädchen.","うちには子供が三人、男の子が二人と女の子が一人います。"]],
    "vier": [["Der Tisch hat vier Beine und ist sehr stabil.","そのテーブルには脚が四本あり、とても丈夫です。"]],
    "fünf": [["Der Zug kommt in fünf Minuten an.","電車はあと五分で到着します。"]],
    "sechs": [["Mein Sohn steht jeden Tag um sechs Uhr auf.","息子は毎日六時に起きます。"]],
    "sieben": [["Eine Woche hat sieben Tage.","一週間は七日あります。"]],
    "acht": [["Das Geschäft öffnet morgens um acht Uhr.","その店は朝八時に開きます。"]],
    "neun": [["Sie ist neun Jahre alt und geht in die dritte Klasse.","彼女は九歳で、三年生です。"]],
    "zehn": [["Gib mir bitte zehn Minuten, dann bin ich fertig.","あと十分くれれば、終わるよ。"]],
    "hundert": [["Das Buch hat fast hundert Seiten.","その本はほぼ百ページあります。"]],
    "tausend": [["Tausend Dank für das tolle Geschenk!","素敵なプレゼントを本当にありがとう！"]],
    "die Familie": [["Am Sonntag besucht die ganze Familie meine Großeltern.","日曜日には家族全員で祖父母を訪ねます。"]],
    "der Vater": [["Mein Vater kocht am Wochenende gern für uns.","父は週末に私たちのためによく料理をします。"]],
    "die Mutter": [["Meine Mutter arbeitet als Lehrerin an einer Schule.","母は学校で教師として働いています。"]],
    "der Bruder": [["Mein kleiner Bruder spielt den ganzen Tag Videospiele.","弟は一日中テレビゲームをしています。"]],
    "die Schwester": [["Meine Schwester studiert Medizin in München.","姉はミュンヘンで医学を学んでいます。"]],
    "der Sohn": [["Ihr Sohn ist letztes Jahr in die Schule gekommen.","彼女の息子は去年学校に入りました。"]],
    "die Tochter": [["Unsere Tochter lernt seit Kurzem Klavier.","うちの娘は最近ピアノを習い始めました。"]],
    "das Kind": [["Das Kind spielt fröhlich im Garten.","その子は庭で楽しそうに遊んでいます。"]],
    "der Freund": [["Mein bester Freund wohnt direkt nebenan.","親友はすぐ隣に住んでいます。"]],
    "die Freundin": [["Meine Freundin hat heute Geburtstag.","私の女友達は今日が誕生日です。"]],
    "der Hund": [["Der Hund bellt jedes Mal, wenn jemand klingelt.","その犬は誰かがベルを鳴らすたびに吠えます。"]],
    "die Katze": [["Die Katze schläft den ganzen Tag auf dem Sofa.","その猫は一日中ソファーで寝ています。"]],
    "das Wasser": [["Kann ich bitte ein Glas Wasser haben?","お水を一杯いただけますか？"]],
    "das Brot": [["Ich kaufe morgens immer frisches Brot beim Bäcker.","私は朝いつもパン屋で焼きたてのパンを買います。"]],
    "die Milch": [["Trinkst du deinen Kaffee mit Milch?","コーヒーには牛乳を入れて飲みますか？"]],
    "der Kaffee": [["Ohne meinen Kaffee am Morgen funktioniere ich nicht.","朝のコーヒーがないと私は調子が出ません。"]],
    "der Tee": [["Bei Erkältung trinke ich gern heißen Tee mit Honig.","風邪のときははちみつ入りの熱いお茶を飲むのが好きです。"]],
    "der Reis": [["Zum Curry essen wir meistens Reis.","カレーには大抵ご飯を食べます。"]],
    "der Apfel": [["Jeden Tag esse ich einen Apfel zum Frühstück.","毎日朝食にりんごを一つ食べます。"]],
    "das Ei": [["Zum Frühstück esse ich gern ein gekochtes Ei.","朝食にはゆで卵を一つ食べるのが好きです。"]],
    "der Fisch": [["Freitags essen wir oft frischen Fisch.","金曜日には新鮮な魚をよく食べます。"]],
    "der Käse": [["Auf dem Brot möchte ich gern etwas Käse.","パンにチーズを少し乗せたいです。"]],
    "das Fleisch": [["Ich esse kein Fleisch, ich bin Vegetarier.","私は肉を食べません、ベジタリアンです。"]],
    "das Gemüse": [["Iss bitte dein Gemüse, es ist gesund.","野菜を食べてね、体にいいから。"]],
    "sein": [["Ich möchte später einmal Arzt sein.","将来はいつか医者になりたいです。"]],
    "haben": [["Wir haben am Samstag leider keine Zeit.","残念ながら土曜日は時間がありません。"]],
    "essen": [["Was möchtest du heute Abend essen?","今晩は何を食べたい？"]],
    "trinken": [["Bei dieser Hitze musst du viel Wasser trinken.","この暑さでは水をたくさん飲まないといけません。"]],
    "gehen": [["Ich gehe jeden Morgen zu Fuß zur Arbeit.","私は毎朝歩いて職場に行きます。"]],
    "kommen": [["Kommst du heute Abend zu meiner Party?","今晩私のパーティーに来る？"]],
    "sehen": [["Von hier oben kann man die ganze Stadt sehen.","ここからは町全体が見えます。"]],
    "sprechen": [["Sprechen Sie Englisch oder Deutsch?","英語かドイツ語を話しますか？"]],
    "lesen": [["Abends lese ich gern ein spannendes Buch.","夜には面白い本を読むのが好きです。"]],
    "schreiben": [["Ich muss noch eine E-Mail an meinen Chef schreiben.","上司にまだメールを書かなければなりません。"]],
    "machen": [["Was machst du am Wochenende?","週末は何をするの？"]],
    "mögen": [["Ich mag keinen Kaffee, ich trinke lieber Tee.","私はコーヒーが好きではなく、紅茶のほうが好きです。"]],
    "groß": [["Berlin ist eine sehr große Stadt.","ベルリンはとても大きな町です。"],["Mein Bruder ist größer als ich.","兄は私より背が高いです。"]],
    "klein": [["Wir wohnen in einer kleinen Wohnung im Zentrum.","私たちは中心部の小さなアパートに住んでいます。"]],
    "gut": [["Das Essen in diesem Restaurant ist wirklich gut.","このレストランの料理は本当においしいです。"]],
    "schlecht": [["Mir geht es heute leider sehr schlecht.","残念ながら今日は体調がとても悪いです。"]],
    "schön": [["Was für ein schöner Tag heute!","今日はなんて素敵な日でしょう！"]],
    "hässlich": [["Das alte Gebäude finde ich ziemlich hässlich.","あの古い建物はかなり醜いと思います。"]],
    "heiß": [["Vorsicht, der Kaffee ist noch sehr heiß!","気をつけて、コーヒーはまだとても熱いよ！"]],
    "kalt": [["Im Winter ist es hier oft sehr kalt.","冬にはここはよくとても寒いです。"]],
    "glücklich": [["Sie ist mit ihrem neuen Job sehr glücklich.","彼女は新しい仕事にとても満足しています。"]],
    "traurig": [["Er war sehr traurig, als sein Hund starb.","彼は犬が死んだときとても悲しんでいました。"]],
    "neu": [["Ich habe mir ein neues Fahrrad gekauft.","私は新しい自転車を買いました。"]],
    "alt": [["Wie alt bist du eigentlich?","ところで君は何歳なの？"]],
    "rot": [["Bei Rot musst du an der Ampel anhalten.","信号が赤のときは止まらなければなりません。"]],
    "blau": [["Heute ist der Himmel ganz blau und klar.","今日は空が真っ青で晴れています。"]],
    "grün": [["Im Frühling werden die Bäume wieder grün.","春には木々が再び緑になります。"]],
    "gelb": [["Die Sonnenblumen im Garten sind leuchtend gelb.","庭のひまわりは鮮やかな黄色です。"]],
    "schwarz": [["Meine neue Katze ist ganz schwarz.","私の新しい猫は真っ黒です。"]],
    "weiß": [["Im Winter sind die Berge weiß.","冬には山が白くなります。"]],
    "orange": [["Ich trage heute ein oranges T-Shirt.","今日はオレンジ色のTシャツを着ています。"]],
    "rosa": [["Sie hat sich rosa Schuhe gekauft.","彼女はピンクの靴を買いました。"]],
    "lila": [["Die Blumen im Garten sind lila.","庭の花は紫色です。"]],
    "braun": [["Mein Hund hat braune Augen.","私の犬は茶色の目をしています。"]],
    "grau": [["Heute ist der Himmel ganz grau.","今日は空が真っ灰色です。"]],
    "die Farbe": [["Welche Farbe magst du am liebsten?","どの色が一番好きですか。"]],
    "Montag": [["Am Montag fange ich wieder mit der Arbeit an.","月曜日にまた仕事を始めます。"]],
    "Dienstag": [["Jeden Dienstag gehe ich zum Sport.","毎週火曜日にスポーツに行きます。"]],
    "Mittwoch": [["Am Mittwoch haben wir eine wichtige Sitzung.","水曜日に大事な会議があります。"]],
    "Donnerstag": [["Donnerstag kommt meine Schwester zu Besuch.","木曜日に妹が遊びに来ます。"]],
    "Freitag": [["Am Freitag treffe ich mich mit Freunden.","金曜日に友達と会います。"]],
    "Samstag": [["Am Samstag schlafe ich gern lange.","土曜日はゆっくり寝るのが好きです。"]],
    "Sonntag": [["Am Sonntag besuchen wir meine Großeltern.","日曜日に祖父母を訪ねます。"]],
    "der Tag": [["Es war ein langer und anstrengender Tag.","長くて疲れる一日でした。"]],
    "die Woche": [["Diese Woche habe ich sehr viel zu tun.","今週はとてもやることが多いです。"]],
    "der Monat": [["Im nächsten Monat fahre ich nach Berlin.","来月ベルリンに行きます。"]],
    "das Jahr": [["Dieses Jahr will ich mehr Deutsch lernen.","今年はもっとドイツ語を勉強したいです。"]],
    "heute": [["Heute ist das Wetter wirklich schön.","今日は本当に天気がいいです。"]],
    "morgen": [["Morgen muss ich früh aufstehen.","明日は早く起きなければなりません。"]],
    "gestern": [["Gestern habe ich einen guten Film gesehen.","昨日いい映画を見ました。"]],
    "jetzt": [["Ich habe jetzt leider keine Zeit.","今は残念ながら時間がありません。"]],
    "später": [["Wir telefonieren später noch einmal.","あとでもう一度電話しましょう。"]],
    "früh": [["Am Wochenende stehe ich nicht so früh auf.","週末はそんなに早く起きません。"]],
    "spät": [["Es ist schon spät, ich gehe ins Bett.","もう遅いので、寝ます。"]],
    "immer": [["Sie kommt immer pünktlich zur Arbeit.","彼女はいつも時間通りに仕事に来ます。"]],
    "nie": [["Ich trinke nie Kaffee am Abend.","私は夜に決してコーヒーを飲みません。"]],
    "oft": [["Wir gehen oft im Park spazieren.","私たちはよく公園を散歩します。"]],
    "manchmal": [["Manchmal koche ich für meine Freunde.","ときどき友達のために料理をします。"]],
    "die Uhr": [["Es ist jetzt acht Uhr morgens.","今は朝の8時です。"]],
    "das Wetter": [["Wie ist das Wetter heute in München?","今日のミュンヘンの天気はどうですか。"]],
    "die Sonne": [["Die Sonne scheint heute den ganzen Tag.","今日は一日中太陽が照っています。"]],
    "der Regen": [["Wegen des Regens bleiben wir zu Hause.","雨のため、私たちは家にいます。"]],
    "der Schnee": [["Die Kinder spielen im Schnee.","子どもたちが雪の中で遊んでいます。"]],
    "der Wind": [["Heute weht ein kalter Wind.","今日は冷たい風が吹いています。"]],
    "die Wolke": [["Am Himmel ist keine einzige Wolke.","空には雲ひとつありません。"]],
    "warm": [["Im Sommer ist es hier sehr warm.","夏はここはとても暖かいです。"]],
    "kühl": [["Am Abend wird es draußen kühl.","夕方は外が涼しくなります。"]],
    "sonnig": [["Morgen wird es sonnig und trocken.","明日は晴れて乾燥します。"]],
    "regnerisch": [["Das Wetter war den ganzen Tag regnerisch.","天気は一日中雨模様でした。"]],
    "der Kopf": [["Mein Kopf tut seit heute Morgen weh.","今朝から頭が痛いです。"]],
    "das Auge": [["Sie hat ein blaues Auge bekommen.","彼女は目のまわりにあざができました。"]],
    "die Nase": [["Meine Nase ist wegen der Erkältung verstopft.","風邪で鼻が詰まっています。"]],
    "der Mund": [["Beim Essen soll man den Mund nicht aufmachen.","食べるときは口を開けてはいけません。"]],
    "das Ohr": [["Das laute Konzert tut meinen Ohren weh.","うるさいコンサートで耳が痛いです。"]],
    "die Hand": [["Wasch dir bitte vor dem Essen die Hände.","食事の前に手を洗ってください。"]],
    "der Arm": [["Beim Sport habe ich mir den Arm verletzt.","スポーツで腕をけがしました。"]],
    "das Bein": [["Nach dem Lauf tun mir die Beine weh.","走った後、脚が痛いです。"]],
    "der Fuß": [["Ich gehe lieber zu Fuß zur Arbeit.","私は仕事に歩いて行く方が好きです。"]],
    "der Bauch": [["Nach dem großen Essen tut mir der Bauch weh.","たくさん食べた後、お腹が痛いです。"]],
    "das Haar": [["Sie hat lange, dunkle Haare.","彼女は長くて黒い髪をしています。"]],
    "der Zahn": [["Mein Zahn tut weh, ich muss zum Arzt.","歯が痛いので、医者に行かなければなりません。"]],
    "die Kleidung": [["Für die Reise packe ich warme Kleidung ein.","旅行のために暖かい服を詰めます。"]],
    "das Hemd": [["Er trägt zur Arbeit ein weißes Hemd.","彼は仕事に白いシャツを着ます。"]],
    "die Hose": [["Diese Hose ist mir leider zu eng.","このズボンは残念ながらきつすぎます。"]],
    "der Rock": [["Sie trägt heute einen langen Rock.","彼女は今日長いスカートをはいています。"]],
    "das Kleid": [["Zur Hochzeit trägt sie ein rotes Kleid.","結婚式に彼女は赤いドレスを着ます。"]],
    "die Schuhe": [["Meine neuen Schuhe sind sehr bequem.","私の新しい靴はとても履き心地がいいです。"]],
    "die Jacke": [["Zieh deine Jacke an, es ist kalt draußen.","上着を着なさい、外は寒いです。"]],
    "der Mantel": [["Im Winter trage ich immer einen dicken Mantel.","冬はいつも厚いコートを着ます。"]],
    "die Mütze": [["Bei der Kälte setze ich eine warme Mütze auf.","寒いので暖かい帽子をかぶります。"]],
    "die Socken": [["Im Winter trage ich dicke, warme Socken.","冬は厚くて暖かい靴下をはきます。"]],
    "das Tier": [["Welches Tier magst du am liebsten?","どの動物が一番好きですか。"]],
    "der Vogel": [["Ein kleiner Vogel sitzt auf dem Baum.","小さな鳥が木にとまっています。"]],
    "das Pferd": [["Meine Tochter reitet gern auf einem Pferd.","私の娘は馬に乗るのが好きです。"]],
    "die Kuh": [["Auf dem Bauernhof gibt es viele Kühe.","農場にはたくさんの牛がいます。"]],
    "das Schwein": [["Der Bauer füttert jeden Morgen die Schweine.","農夫は毎朝豚に餌をやります。"]],
    "das Schaf": [["Auf der Wiese stehen viele weiße Schafe.","牧草地にたくさんの白い羊がいます。"]],
    "der Bär": [["Im Zoo haben wir einen großen Bären gesehen.","動物園で大きなクマを見ました。"]],
    "der Löwe": [["Der Löwe ist der König der Tiere.","ライオンは動物の王です。"]],
    "die Maus": [["In der Küche läuft eine kleine Maus.","台所で小さなネズミが走っています。"]],
    "das Kaninchen": [["Mein Sohn hat ein weißes Kaninchen als Haustier.","息子はペットに白いウサギを飼っています。"]],
    "der Elefant": [["Der Elefant ist ein sehr großes Tier.","ゾウはとても大きな動物です。"]],
    "wer": [["Wer kommt heute Abend zur Party?","今晩誰がパーティーに来ますか。"]],
    "was": [["Was machst du am Wochenende?","週末は何をしますか。"]],
    "wo": [["Wo ist hier die nächste Apotheke?","ここから一番近い薬局はどこですか。"]],
    "wann": [["Wann beginnt der Film im Kino?","映画は何時に始まりますか。"]],
    "wie": [["Wie heißt du mit Nachnamen?","あなたの名字は何といいますか。"]],
    "warum": [["Warum bist du heute so traurig?","どうして今日はそんなに悲しいのですか。"]],
    "welche": [["Welche Farbe gefällt dir am besten?","どの色が一番気に入っていますか。"]],
    "wie viel": [["Wie viel kostet dieses Buch?","この本はいくらですか。"]],
    "woher": [["Woher kommst du ursprünglich?","もともとどこの出身ですか。"]],
    "wohin": [["Wohin fahrt ihr in den Sommerferien?","夏休みにどこへ行きますか。"]],
    "Wie geht's?": [["Hallo Anna, wie geht's dir heute?","やあアンナ、今日は調子はどう。"]],
    "Mir geht es gut.": [["Danke der Nachfrage, mir geht es gut.","お気遣いありがとう、私は元気です。"]],
    "Wie heißt du?": [["Hallo, ich bin neu hier. Wie heißt du?","こんにちは、私はここに来たばかりです。お名前は何ですか？"]],
    "Ich heiße ...": [["Guten Tag, ich heiße Anna und freue mich.","こんにちは、私はアンナといいます。よろしくお願いします。"]],
    "Woher kommst du?": [["Dein Akzent klingt interessant, woher kommst du?","あなたのアクセントは面白いですね、出身はどこですか？"]],
    "Ich komme aus ...": [["Ich komme aus Japan und lebe seit einem Jahr hier.","私は日本出身で、ここに住んで一年になります。"]],
    "Ich verstehe nicht.": [["Können Sie das bitte wiederholen? Ich verstehe nicht.","もう一度言っていただけますか？わかりません。"]],
    "Sprechen Sie Englisch?": [["Entschuldigung, sprechen Sie Englisch?","すみません、英語を話せますか？"]],
    "Wie bitte?": [["Wie bitte? Ich habe Sie nicht richtig verstanden.","もう一度お願いします。よく聞き取れませんでした。"]],
    "Es tut mir leid.": [["Es tut mir leid, dass ich zu spät gekommen bin.","遅れてしまって、ごめんなさい。"]],
    "Kein Problem.": [["Du kannst mein Auto nehmen, kein Problem.","私の車を使っていいよ、問題ないよ。"]],
    "Bis bald!": [["Schön, dich zu sehen. Bis bald!","会えてよかった。またね！"]],
    "wohnen": [["Wir wohnen seit drei Jahren in einer kleinen Wohnung.","私たちは三年前から小さなアパートに住んでいます。"]],
    "heißen": [["Mein Hund heißt Bello und ist sehr verspielt.","私の犬はベロという名前で、とても遊び好きです。"]],
    "arbeiten": [["Meine Mutter arbeitet als Ärztin im Krankenhaus.","私の母は病院で医者として働いています。"]],
    "lernen": [["Ich lerne jeden Abend zwei Stunden Deutsch.","私は毎晩二時間ドイツ語を勉強しています。"]],
    "spielen": [["Die Kinder spielen im Garten Fußball.","子どもたちは庭でサッカーをしています。"]],
    "kaufen": [["Ich möchte heute neue Schuhe kaufen.","今日新しい靴を買いたいです。"]],
    "fahren": [["Wir fahren am Wochenende mit dem Zug nach Berlin.","私たちは週末に電車でベルリンへ行きます。"]],
    "laufen": [["Jeden Morgen laufe ich eine Runde im Park.","毎朝、私は公園を一周走ります。"]],
    "geben": [["Kannst du mir bitte das Salz geben?","塩を取ってもらえますか？"]],
    "nehmen": [["Ich nehme den Bus, weil es regnet.","雨が降っているので、私はバスに乗ります。"]],
    "finden": [["Ich kann meinen Schlüssel nicht finden.","私は鍵を見つけられません。"]],
    "brauchen": [["Für den Kuchen brauchen wir noch Mehl und Eier.","ケーキのためにまだ小麦粉と卵が必要です。"]],
    "und": [["Ich trinke gern Kaffee und Tee am Morgen.","私は朝にコーヒーと紅茶を飲むのが好きです。"]],
    "oder": [["Möchtest du Wasser oder Saft?","水とジュース、どちらがいいですか？"]],
    "aber": [["Das Hotel war schön, aber sehr teuer.","そのホテルは素敵でしたが、とても高かったです。"]],
    "nicht": [["Heute habe ich leider keine Zeit, ich kann nicht kommen.","今日は残念ながら時間がなく、来られません。"]],
    "auch": [["Mein Bruder spielt Gitarre, und ich auch.","私の兄はギターを弾きます、私もです。"]],
    "sehr": [["Das Essen in diesem Restaurant ist sehr gut.","このレストランの料理はとてもおいしいです。"]],
    "hier": [["Bitte warte hier, ich bin gleich zurück.","ここで待っていてください、すぐ戻ります。"]],
    "da": [["Schau mal, da drüben steht dein Freund.","見て、あそこに君の友達が立っているよ。"]],
    "mit": [["Ich fahre mit dem Fahrrad zur Arbeit.","私は自転車で仕事に行きます。"]],
    "ohne": [["Er trinkt seinen Kaffee immer ohne Zucker.","彼はいつも砂糖なしでコーヒーを飲みます。"]],
    "für": [["Dieses Geschenk ist für meine Großmutter.","このプレゼントは私の祖母のためのものです。"]],
    "weil": [["Ich bleibe heute zu Hause, weil ich krank bin.","私は病気なので、今日は家にいます。"]],
    "aufstehen": [["Ich muss morgen früh um sechs Uhr aufstehen.","私は明日朝六時に起きなければなりません。"]],
    "frühstücken": [["Am Sonntag frühstücken wir gemütlich auf dem Balkon.","日曜日は私たちはバルコニーでゆっくり朝食をとります。"]],
    "schlafen": [["Das Baby schläft jetzt endlich ruhig.","赤ちゃんはやっと静かに眠っています。"]],
    "duschen": [["Nach dem Sport dusche ich immer kalt.","運動の後、私はいつも冷たいシャワーを浴びます。"]],
    "kochen": [["Heute Abend koche ich für die ganze Familie.","今晩、私は家族全員のために料理をします。"]],
    "einkaufen": [["Am Samstag gehen wir auf dem Markt einkaufen.","土曜日に私たちは市場へ買い物に行きます。"]],
    "das Haus": [["Unser Haus hat einen großen Garten hinten.","私たちの家は裏に大きな庭があります。"]],
    "die Wohnung": [["Die Wohnung im dritten Stock ist sehr hell.","三階のアパートはとても明るいです。"]],
    "die Schule": [["Die Kinder gehen morgens zu Fuß zur Schule.","子どもたちは朝、歩いて学校に行きます。"]],
    "die Arbeit": [["Nach der Arbeit treffe ich mich oft mit Freunden.","仕事の後、私はよく友達と会います。"]],
    "das Restaurant": [["In diesem Restaurant gibt es leckere italienische Pasta.","このレストランにはおいしいイタリアのパスタがあります。"]],
    "das Krankenhaus": [["Meine Tante liegt seit gestern im Krankenhaus.","私のおばは昨日から病院に入院しています。"]],
    "der Bahnhof": [["Ich treffe dich um acht Uhr am Bahnhof.","八時に駅で会いましょう。"]],
    "der Supermarkt": [["Der Supermarkt hat bis zwanzig Uhr geöffnet.","そのスーパーは二十時まで営業しています。"]],
    "die Reise": [["Unsere Reise nach Italien war wirklich unvergesslich.","私たちのイタリア旅行は本当に忘れられないものでした。"]],
    "der Flughafen": [["Wir müssen zwei Stunden vor Abflug am Flughafen sein.","出発の二時間前に空港にいなければなりません。"]],
    "der Koffer": [["Mein Koffer war so schwer, dass ich ihn kaum tragen konnte.","私のスーツケースはとても重くて、ほとんど運べませんでした。"]],
    "das Hotel": [["Das Hotel lag direkt am Strand und war sehr ruhig.","そのホテルはビーチのすぐそばにあり、とても静かでした。"]],
    "die Fahrkarte": [["Ich habe meine Fahrkarte zu Hause vergessen.","私は乗車券を家に忘れてしまいました。"]],
    "die Reservierung": [["Ich habe eine Reservierung auf den Namen Schmidt.","シュミットの名前で予約をしています。"]],
    "die Ankunft": [["Bei unserer Ankunft regnete es in Strömen.","私たちが到着したとき、土砂降りの雨でした。"]],
    "die Abfahrt": [["Die Abfahrt des Zuges verzögert sich um zehn Minuten.","列車の出発は十分遅れています。"]],
    "glauben": [["Ich glaube, dass er die Wahrheit sagt.","私は彼が本当のことを言っていると思います。"]],
    "denken": [["Ich denke oft an meine Kindheit auf dem Land.","私はよく田舎での子ども時代のことを考えます。"]],
    "meinen": [["Was meinst du mit dieser seltsamen Bemerkung?","そのおかしな発言で何を言いたいのですか？"]],
    "zustimmen": [["Ich kann deinem Vorschlag voll und ganz zustimmen.","私はあなたの提案に完全に賛成できます。"]],
    "ablehnen": [["Der Chef hat meinen Urlaubsantrag leider abgelehnt.","上司は残念ながら私の休暇申請を却下しました。"]],
    "die Meinung": [["Meiner Meinung nach sollten wir früher anfangen.","私の意見では、もっと早く始めるべきです。"]],
    "wahrscheinlich": [["Es wird morgen wahrscheinlich den ganzen Tag regnen.","明日はおそらく一日中雨が降るでしょう。"]],
    "die Herausforderung": [["Der neue Job ist eine große Herausforderung für mich.","新しい仕事は私にとって大きな挑戦です。"]],
    "die Gelegenheit": [["Bei nächster Gelegenheit besuche ich euch unbedingt.","次の機会にぜひあなたたちを訪ねます。"]],
    "die Folge": [["Die Entscheidung hatte ernste finanzielle Folgen.","その決定は深刻な財政的結果をもたらしました。"]],
    "nachhaltig": [["Wir sollten nachhaltiger leben und weniger verschwenden.","私たちはもっと持続可能に暮らし、無駄を減らすべきだ。"]],
    "die Auseinandersetzung": [["Es gab eine heftige Auseinandersetzung über das Budget.","予算をめぐって激しい論争がありました。"]],
    "der Zusammenhang": [["In diesem Zusammenhang ist seine Aussage wichtig.","この文脈において、彼の発言は重要です。"]],
    "nachschlagen": [["Unbekannte Wörter schlage ich immer im Wörterbuch nach.","知らない単語はいつも辞書で調べます。"]],
    "aufgeben": [["Gib nicht so schnell auf, du schaffst das bestimmt.","そんなにすぐ諦めないで、きっとできるよ。"]],
    "verschieben": [["Wir müssen das Treffen leider auf nächste Woche verschieben.","残念ながら会議を来週に延期しなければなりません。"]],
    "herausfinden": [["Die Polizei konnte nicht herausfinden, wer der Täter war.","警察は犯人が誰だったかを突き止められませんでした。"]],
    "teilnehmen": [["Über fünfzig Studenten nehmen an dem Workshop teil.","五十人以上の学生がそのワークショップに参加します。"]],
    "die Nuance": [["Diese feine Nuance geht in der Übersetzung leicht verloren.","この微妙なニュアンスは翻訳で簡単に失われてしまいます。"]],
    "abmildern": [["Neue Maßnahmen sollen die Folgen der Krise abmildern.","新しい対策は危機の影響を和らげるためのものです。"]],
    "pragmatisch": [["Sie geht an Probleme immer sehr pragmatisch heran.","彼女はいつも問題に非常に実際的に取り組みます。"]],
    "mehrdeutig": [["Seine Antwort war absichtlich mehrdeutig formuliert.","彼の答えは意図的に多義的に表現されていました。"]],
    "differenziert": [["Sie betrachtet das Thema sehr differenziert und sachlich.","彼女はそのテーマを非常に細かく、客観的に考察しています。"]],
    "Tomaten auf den Augen haben": [["Den Fehler hast du übersehen? Du hast wohl Tomaten auf den Augen.","そのミスを見落としたの？まったく節穴だね。"]],
    "die Daumen drücken": [["Ich drücke dir für die Prüfung morgen die Daumen.","明日の試験、うまくいくよう祈っているよ。"]],
    "ins Gras beißen": [["In dem alten Film beißen am Ende fast alle Helden ins Gras.","その古い映画では、最後にほとんどの主人公が死んでしまう。"]],
    "jemandem auf den Keks gehen": [["Sein ständiges Gejammer geht mir wirklich auf den Keks.","彼の絶え間ない愚痴は本当に私の神経に障る。"]],
    "die Katze im Sack kaufen": [["Probiere das Auto vorher aus, kauf nicht die Katze im Sack.","前にその車を試してみて、よく見ずに買わないように。"]],
    "allgegenwärtig": [["Heutzutage sind Smartphones in unserem Alltag allgegenwärtig geworden.","今日では、スマートフォンは私たちの日常生活に遍在するようになった。"]],
    "vergänglich": [["Sie wusste, dass Ruhm vergänglich ist und nur kurz währt.","彼女は名声がはかなく、ほんの短い間しか続かないことを知っていた。"]],
    "widerspenstig": [["Das widerspenstige Kind weigerte sich, ins Bett zu gehen.","その手に負えない子どもは、寝床に入ろうとしなかった。"]],
    "verkörpern": [["Diese Schauspielerin verkörpert auf der Bühne die ideale Heldin.","この女優は舞台の上で理想のヒロインを体現している。"]],
    "unabdingbar": [["Vertrauen ist eine unabdingbare Voraussetzung für eine gute Zusammenarbeit.","信頼は良い協力関係にとって不可欠な前提条件である。"]]
  };

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
      titleJa: "sein / haben — 「〜である」「持っている」",
      intro: "<b>sein</b> conjugates ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie sind.<br><b>haben</b>: ich habe, du hast, er hat, wir haben, ihr habt, sie haben.",
      introJa: "<b>sein</b>（〜である）の活用: ich bin / du bist / er・sie・es ist / wir sind / ihr seid / sie sind。<br><b>haben</b>（持っている）: ich habe / du hast / er hat / wir haben / ihr habt / sie haben。主語に合わせて形が変わるよ。",
      examples: [
        { jp: "Ich bin Student.", en: "I am a student.", ja: "私は学生です。", de: "" },
        { jp: "Sie ist müde.", en: "She is tired.", ja: "彼女は疲れています。", de: "" },
        { jp: "Wir haben Zeit.", en: "We have time.", ja: "私たちは時間があります。", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Du ___ nett.", choices: ["bin","bist","ist","sind"], answer: "bist" },
        { type: "mc", q: "Ich ___ einen Hund.", choices: ["habe","hast","hat","haben"], answer: "habe" }
      ]
    },
    {
      id: "de-g-articles", level: "A1",
      title: "der / die / das — gendered articles",
      titleJa: "der / die / das — 名詞の性（冠詞）",
      intro: "Every German noun has a gender: <b>der</b> (m), <b>die</b> (f), <b>das</b> (n). Plurals always use <b>die</b>.",
      introJa: "ドイツ語の名詞には性があるよ。<b>der</b>＝男性、<b>die</b>＝女性、<b>das</b>＝中性。複数形はいつも <b>die</b> を使う。名詞は冠詞とセットで覚えよう。",
      examples: [
        { jp: "der Mann", en: "the man (m)", ja: "その男性（男性名詞）", de: "" },
        { jp: "die Frau", en: "the woman (f)", ja: "その女性（女性名詞）", de: "" },
        { jp: "das Kind", en: "the child (n)", ja: "その子ども（中性名詞）", de: "" }
      ],
      quiz: [
        { type: "mc", q: "___ Apfel (m)", choices: ["der","die","das","den"], answer: "der" },
        { type: "mc", q: "___ Katze (f)", choices: ["der","die","das","dem"], answer: "die" }
      ]
    },
    {
      id: "de-g-present", level: "A1",
      title: "Present tense (regular verbs)",
      titleJa: "現在形（規則動詞）",
      intro: "Drop -en, add: <b>-e, -st, -t, -en, -t, -en</b>. machen → ich mache, du machst, er macht …",
      introJa: "語尾の -en を取って、主語に合わせて <b>-e / -st / -t / -en / -t / -en</b> を付けるよ。例: machen → ich mache、du machst、er macht …",
      examples: [
        { jp: "Ich spiele Fußball.", en: "I play football.", ja: "私はサッカーをします。", de: "" },
        { jp: "Du lernst Deutsch.", en: "You learn German.", ja: "きみはドイツ語を勉強しています。", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Er ___ (kommen).", choices: ["komme","kommst","kommt","kommen"], answer: "kommt" }
      ]
    },
    {
      id: "de-g-akkusativ", level: "A2",
      title: "Accusative case",
      titleJa: "4格（対格・直接目的語）",
      intro: "The direct object takes the accusative. Masculine <b>der → den</b>; die/das/plural stay the same.",
      introJa: "直接目的語（〜を）は4格になるよ。男性名詞だけ <b>der → den</b> に変化。女性・中性・複数は形が変わらない。",
      examples: [
        { jp: "Ich sehe den Mann.", en: "I see the man.", ja: "私はその男性を見ます。", de: "" },
        { jp: "Sie kauft einen Apfel.", en: "She buys an apple.", ja: "彼女はりんごを1つ買います。", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Ich habe ___ Hund (m).", choices: ["einen","ein","eine","einem"], answer: "einen" }
      ]
    },
    {
      id: "de-g-perfekt", level: "B1",
      title: "Perfekt (past tense)",
      titleJa: "現在完了（話し言葉の過去）",
      intro: "Spoken past = <b>haben/sein + Partizip II</b>. gemacht, gegangen, gesehen … Motion/change verbs use <b>sein</b>.",
      introJa: "話し言葉の過去は <b>haben か sein ＋ 過去分詞</b>。例: gemacht / gegangen / gesehen …。移動・状態変化の動詞は <b>sein</b> を使うよ。",
      examples: [
        { jp: "Ich habe gegessen.", en: "I have eaten / I ate.", ja: "私は食べました。", de: "" },
        { jp: "Er ist gegangen.", en: "He has gone / he went.", ja: "彼は行きました。", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Wir ___ nach Berlin gefahren.", choices: ["sind","haben","ist","hat"], answer: "sind" }
      ]
    },
    {
      id: "de-g-dativ", level: "B1",
      title: "Dative case",
      titleJa: "3格（与格・間接目的語）",
      intro: "Indirect object / after certain prepositions (mit, nach, aus, bei, von, zu). der→dem, die→der, das→dem, plural→den (+n).",
      introJa: "間接目的語（〜に）や特定の前置詞（mit, nach, aus, bei, von, zu）の後で使うよ。冠詞の変化: der→dem、die→der、das→dem、複数→den（名詞に -n も付く）。",
      examples: [
        { jp: "Ich gebe dem Kind das Buch.", en: "I give the child the book.", ja: "私はその子どもに本をあげます。", de: "" },
        { jp: "Sie fährt mit dem Bus.", en: "She goes by bus.", ja: "彼女はバスで行きます。", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Ich helfe ___ Frau (f).", choices: ["der","die","dem","den"], answer: "der" }
      ]
    },
    {
      id: "de-g-modal", level: "B2",
      title: "Modal verbs",
      titleJa: "話法の助動詞（modal verbs）",
      intro: "können, müssen, wollen, sollen, dürfen, mögen. Modal conjugated, main verb infinitive at the end.",
      introJa: "können（〜できる）, müssen（〜しなければ）, wollen（〜したい）, sollen（〜すべき）, dürfen（〜してよい）, mögen（好き）。助動詞を活用させ、本動詞は原形で文末に置くよ。",
      examples: [
        { jp: "Ich kann schwimmen.", en: "I can swim.", ja: "私は泳げます。", de: "" },
        { jp: "Du musst lernen.", en: "You have to study.", ja: "きみは勉強しなければなりません。", de: "" }
      ],
      quiz: [
        { type: "mc", q: "Wir ___ heute arbeiten.", choices: ["müssen","muss","musst","müsst"], answer: "müssen" }
      ]
    },
    {
      id: "de-g-konjunktiv", level: "C1",
      title: "Konjunktiv II (would / hypothetical)",
      titleJa: "接続法第2式（仮定・丁寧）",
      intro: "Polite / unreal: <b>würde + Infinitiv</b>, or hätte/wäre/könnte. „Ich würde gern…“",
      introJa: "丁寧な言い方や非現実の仮定に使うよ。<b>würde ＋ 動詞の原形</b>、または hätte / wäre / könnte。例:「Ich würde gern…（〜したいのですが）」。",
      examples: [
        { jp: "Ich würde gern kommen.", en: "I would like to come.", ja: "できれば行きたいのですが。", de: "" },
        { jp: "Wenn ich Zeit hätte, …", en: "If I had time, …", ja: "もし時間があれば、…", de: "" }
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
