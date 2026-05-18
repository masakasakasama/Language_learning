// Spanish content - CEFR A1 to C2
window.DATA_ES = (function () {
  function vocabCards(deck, level, items) {
    return items.map((it) => ({
      id: "es:vocab:" + deck + ":" + it[0],
      lang: "es",
      level,
      deck,
      type: "vocab",
      ex: (typeof EX !== "undefined" && EX[it[0]]) || [],
      jp: it[0], kana: it[1] || "", romaji: it[1] || "", en: it[2],
      de: DE_VOCAB[it[0]] || "",
      front: it[0], back: it[2], hint: it[1] || "",
      speakText: it[0]
    }));
  }
  const DE_VOCAB = {
    "hola":"hallo","buenos días":"guten Morgen","buenas tardes":"guten Tag (nachmittags)",
    "buenas noches":"guten Abend / gute Nacht","adiós":"auf Wiedersehen",
    "hasta luego":"bis später","gracias":"danke","por favor":"bitte",
    "perdón":"Entschuldigung","sí":"ja","no":"nein",
    "yo":"ich","tú":"du","usted":"Sie (höflich)","él":"er","ella":"sie",
    "nosotros":"wir","vosotros":"ihr (Spanien)","ellos":"sie (Pl.)",
    "uno":"eins","dos":"zwei","tres":"drei","cuatro":"vier","cinco":"fünf",
    "seis":"sechs","siete":"sieben","ocho":"acht","nueve":"neun","diez":"zehn",
    "familia":"Familie","padre":"Vater","madre":"Mutter","hermano":"Bruder",
    "hermana":"Schwester","hijo":"Sohn","hija":"Tochter","amigo":"Freund","amiga":"Freundin",
    "perro":"Hund","gato":"Katze",
    "agua":"Wasser","pan":"Brot","leche":"Milch","café":"Kaffee","té":"Tee",
    "arroz":"Reis","manzana":"Apfel","huevo":"Ei","pescado":"Fisch","queso":"Käse",
    "ser":"sein (Eigenschaft)","estar":"sein (Zustand)","tener":"haben","comer":"essen",
    "beber":"trinken","ir":"gehen","venir":"kommen","ver":"sehen","hablar":"sprechen","leer":"lesen",
    "grande":"groß","pequeño":"klein","bueno":"gut","malo":"schlecht","bonito":"hübsch",
    "feo":"hässlich","caliente":"heiß","frío":"kalt","feliz":"glücklich","triste":"traurig",
    // A2 routines & places
    "levantarse":"aufstehen","desayunar":"frühstücken","trabajar":"arbeiten",
    "estudiar":"lernen","dormir":"schlafen","ducharse":"duschen",
    "casa":"Haus","escuela":"Schule","trabajo":"Arbeit","restaurante":"Restaurant",
    "hospital":"Krankenhaus","tienda":"Geschäft","parque":"Park",
    // B1 travel & opinions
    "viaje":"Reise","aeropuerto":"Flughafen","maleta":"Koffer","hotel":"Hotel",
    "billete":"Fahrkarte","reserva":"Reservierung","llegada":"Ankunft",
    "creer":"glauben","pensar":"denken","estar de acuerdo":"einverstanden sein",
    "quizás":"vielleicht","seguramente":"sicherlich",
    // B2 abstract
    "desafío":"Herausforderung","oportunidad":"Gelegenheit","consecuencia":"Konsequenz",
    "sostenible":"nachhaltig","controversia":"Kontroverse",
    // C1 nuance & idioms
    "matiz":"Nuance","mitigar":"abmildern","pragmático":"pragmatisch","ambigüo":"mehrdeutig",
    "estar en las nubes":"in den Wolken sein","dar en el clavo":"den Nagel auf den Kopf treffen",
    "echar una mano":"eine Hand reichen","tomar el pelo":"jdn. auf den Arm nehmen",
    // C2 mastery
    "ubicuo":"allgegenwärtig","efímero":"vergänglich",
    "recalcitrante":"widerspenstig","epitomar":"verkörpern"
  };

  // AI-authored natural example sentences (1 per word, 2 when the
  // word has two distinct meanings). [target_sentence, japanese_tr].
  const EX = {
    "hola": [["¡Hola! ¿Cómo estás hoy?","やあ！今日は元気？"]],
    "buenos días": [["Buenos días, ¿durmió bien anoche?","おはようございます、昨夜はよく眠れましたか？"]],
    "buenas tardes": [["Buenas tardes, ¿en qué puedo ayudarle?","こんにちは、何かお手伝いしましょうか？"]],
    "buenas noches": [["Buenas noches, que descanses bien.","おやすみなさい、ゆっくり休んでね。"]],
    "adiós": [["Adiós, nos vemos mañana en la oficina.","さようなら、明日オフィスで会いましょう。"]],
    "hasta luego": [["Tengo que irme ya, ¡hasta luego!","もう行かなきゃ、またね！"]],
    "gracias": [["Muchas gracias por tu ayuda con la mudanza.","引っ越しを手伝ってくれて本当にありがとう。"]],
    "por favor": [["¿Me pasas la sal, por favor?","塩を取ってくれますか、お願いします。"]],
    "perdón": [["Perdón, ¿sabe dónde está la estación?","すみません、駅はどこか分かりますか？"]],
    "sí": [["Sí, claro que quiero ir contigo al cine.","うん、もちろん一緒に映画に行きたいよ。"]],
    "no": [["No, hoy no puedo quedar, lo siento.","いや、今日は会えないんだ、ごめんね。"]],
    "yo": [["Yo prefiero el café sin azúcar.","私は砂糖なしのコーヒーが好きです。"]],
    "tú": [["¿Tú vives cerca de aquí?","君はこの近くに住んでいるの？"]],
    "usted": [["¿Usted ya conoce al nuevo director?","あなたはもう新しい部長をご存じですか？"]],
    "él": [["Él trabaja en un banco del centro.","彼は中心街の銀行で働いています。"]],
    "ella": [["Ella habla tres idiomas con fluidez.","彼女は三つの言語を流暢に話します。"]],
    "nosotros": [["Nosotros vamos a la playa este fin de semana.","私たちは今週末に海へ行きます。"]],
    "vosotros": [["¿Vosotros ya habéis comido?","君たちはもう食べた？"]],
    "ellos": [["Ellos llegaron tarde a la reunión.","彼らは会議に遅れて来ました。"]],
    "uno": [["Solo me queda uno, ¿lo quieres?","一つだけ残ってるけど、いる？"]],
    "dos": [["Quiero dos cafés con leche, por favor.","カフェオレを二つください。"]],
    "tres": [["Tengo tres hermanos mayores.","私には三人の兄がいます。"]],
    "cuatro": [["La reunión empieza a las cuatro.","会議は四時に始まります。"]],
    "cinco": [["El niño cumple cinco años mañana.","その子は明日五歳になります。"]],
    "seis": [["Trabajo seis días a la semana.","私は週に六日働いています。"]],
    "siete": [["Me levanto a las siete todos los días.","毎日七時に起きます。"]],
    "ocho": [["El tren sale dentro de ocho minutos.","電車は八分後に出発します。"]],
    "nueve": [["La tienda abre a las nueve de la mañana.","店は朝九時に開きます。"]],
    "diez": [["Necesito diez minutos más para terminar.","終えるのにあと十分必要です。"]],
    "familia": [["Toda mi familia se reúne en Navidad.","私の家族は皆クリスマスに集まります。"]],
    "padre": [["Mi padre cocina muy bien los domingos.","父は日曜日にとても上手に料理をします。"]],
    "madre": [["Mi madre me llama por teléfono cada noche.","母は毎晩私に電話をかけてきます。"]],
    "hermano": [["Mi hermano estudia medicina en Madrid.","私の兄はマドリードで医学を勉強しています。"]],
    "hermana": [["Mi hermana toca el piano desde niña.","私の姉は子供の頃からピアノを弾いています。"]],
    "hijo": [["Su hijo juega al fútbol los sábados.","彼の息子は土曜日にサッカーをします。"]],
    "hija": [["Mi hija quiere ser veterinaria.","私の娘は獣医になりたがっています。"]],
    "amigo": [["Voy a cenar con un amigo esta noche.","今夜は友達と夕食に行きます。"]],
    "amiga": [["Mi mejor amiga vive en Barcelona.","私の親友はバルセロナに住んでいます。"]],
    "perro": [["Saco a pasear al perro cada mañana.","毎朝犬を散歩に連れて行きます。"]],
    "gato": [["El gato duerme todo el día en el sofá.","猫は一日中ソファで寝ています。"]],
    "agua": [["¿Me puede traer un vaso de agua, por favor?","お水を一杯持ってきていただけますか？"]],
    "pan": [["Compro pan fresco en la panadería cada día.","毎日パン屋で焼きたてのパンを買います。"]],
    "leche": [["No me queda leche para el café.","コーヒー用の牛乳がもうありません。"]],
    "café": [["Tomo un café solo por la mañana.","朝はブラックコーヒーを飲みます。"]],
    "té": [["¿Quieres una taza de té caliente?","温かいお茶を一杯どう？"]],
    "arroz": [["El arroz con pollo es mi plato favorito.","チキンライスは私の大好物です。"]],
    "manzana": [["Me como una manzana después de comer.","食後にりんごを一つ食べます。"]],
    "huevo": [["Para el desayuno preparo un huevo frito.","朝食に目玉焼きを一つ作ります。"]],
    "pescado": [["Los viernes solemos comer pescado.","金曜日はたいてい魚を食べます。"]],
    "queso": [["Me encanta el queso con un poco de vino.","少しのワインとチーズが大好きです。"]],
    "ser": [["Quiero ser médico cuando termine la universidad.","大学を出たら医者になりたいです。"]],
    "estar": [["Hoy no quiero estar solo en casa.","今日は家で一人でいたくありません。"]],
    "tener": [["Voy a tener una reunión importante mañana.","明日は大事な会議があります。"]],
    "comer": [["Vamos a comer algo, tengo mucha hambre.","何か食べに行こう、すごくお腹がすいた。"]],
    "beber": [["Es importante beber mucha agua en verano.","夏はたくさん水を飲むことが大切です。"]],
    "ir": [["Quiero ir al museo este domingo.","今度の日曜に美術館へ行きたいです。"]],
    "venir": [["¿Puedes venir a mi casa esta tarde?","今日の午後、うちに来られる？"]],
    "ver": [["Esta noche vamos a ver una película juntos.","今夜は一緒に映画を見ます。"]],
    "hablar": [["Necesito hablar contigo un momento.","ちょっと君と話す必要があります。"]],
    "leer": [["Me gusta leer antes de dormir.","寝る前に読書をするのが好きです。"]],
    "grande": [["Vivimos en una casa muy grande.","私たちはとても大きな家に住んでいます。"]],
    "pequeño": [["Mi apartamento es pequeño pero cómodo.","私のアパートは小さいけれど快適です。"]],
    "bueno": [["Este restaurante es muy bueno y barato.","このレストランはとても美味しくて安いです。"]],
    "malo": [["Hoy hace muy mal tiempo para salir.","今日は出かけるには天気がとても悪いです。"]],
    "bonito": [["¡Qué bonito es este pueblo!","この村はなんてきれいなんだろう！"]],
    "feo": [["Ese edificio es bastante feo, la verdad.","正直、あの建物はかなり醜いです。"]],
    "caliente": [["Cuidado, el café está muy caliente.","気をつけて、コーヒーがとても熱いよ。"]],
    "frío": [["Hace mucho frío esta mañana.","今朝はとても寒いです。"]],
    "feliz": [["Estoy muy feliz de verte de nuevo.","また会えてとても幸せです。"]],
    "triste": [["Está triste porque su amiga se va.","友達が去るので彼女は悲しんでいます。"]],
    "levantarse": [["Tengo que levantarme temprano para el tren.","電車のために早起きしなければなりません。"]],
    "desayunar": [["Suelo desayunar tostadas con café.","たいていトーストとコーヒーで朝食をとります。"]],
    "trabajar": [["Mañana tengo que trabajar hasta tarde.","明日は遅くまで働かなければなりません。"]],
    "estudiar": [["Voy a estudiar español dos horas hoy.","今日は二時間スペイン語を勉強します。"]],
    "dormir": [["No pude dormir bien por el ruido.","騒音のせいでよく眠れませんでした。"]],
    "ducharse": [["Me gusta ducharse con agua fría en verano.","夏は冷たい水でシャワーを浴びるのが好きです。"]],
    "casa": [["Voy a quedarme en casa todo el día.","一日中家にいるつもりです。"]],
    "escuela": [["Los niños van a la escuela en autobús.","子供たちはバスで学校へ行きます。"]],
    "trabajo": [["Mi trabajo es interesante pero muy difícil.","私の仕事は面白いけれどとても難しいです。"]],
    "restaurante": [["Reservé una mesa en un restaurante italiano.","イタリアンレストランの席を予約しました。"]],
    "hospital": [["Mi tía trabaja como enfermera en el hospital.","私のおばは病院で看護師として働いています。"]],
    "tienda": [["Esa tienda cierra a las nueve de la noche.","あの店は夜九時に閉まります。"]],
    "parque": [["Los domingos paseamos por el parque.","日曜日には公園を散歩します。"]],
    "viaje": [["El viaje a Perú fue inolvidable.","ペルーへの旅行は忘れられないものでした。"]],
    "aeropuerto": [["Tenemos que llegar al aeropuerto dos horas antes.","二時間前には空港に着かなければなりません。"]],
    "maleta": [["Hice la maleta la noche antes de salir de viaje.","旅行に出る前の晩にスーツケースに荷物を詰めた。"]],
    "hotel": [["Reservamos un hotel cerca de la playa para las vacaciones.","休暇のためにビーチの近くのホテルを予約した。"]],
    "billete": [["Compré el billete de tren por internet sin problemas.","問題なくインターネットで電車の切符を買った。"]],
    "reserva": [["Tengo una reserva para dos personas a las nueve.","9時に二人分の予約をしています。"]],
    "llegada": [["La llegada del vuelo se retrasó dos horas por la tormenta.","嵐のせいでその便の到着は2時間遅れた。"]],
    "creer": [["No creo que llueva mañana, así que iremos al campo.","明日は雨が降らないと思うので、田舎へ行きます。"]],
    "pensar": [["Estoy pensando en cambiar de trabajo el año que viene.","来年仕事を変えようかと考えています。"]],
    "estar de acuerdo": [["Estoy de acuerdo contigo en que deberíamos esperar un poco.","もう少し待つべきだという点で君に賛成だ。"]],
    "quizás": [["Quizás vayamos al cine esta noche, todavía no lo sé.","今夜は映画に行くかもしれないけど、まだわからない。"]],
    "seguramente": [["Seguramente Ana ya ha llegado a casa a estas horas.","この時間ならアナはきっともう家に着いているだろう。"]],
    "desafío": [["Aprender un idioma nuevo es un gran desafío para cualquiera.","新しい言語を学ぶことは誰にとっても大きな挑戦だ。"]],
    "oportunidad": [["Esta beca es una oportunidad única para estudiar en el extranjero.","この奨学金は留学する絶好の機会だ。"]],
    "consecuencia": [["No medir las palabras puede tener consecuencias graves en el trabajo.","言葉を選ばないと職場で深刻な結果を招くことがある。"]],
    "sostenible": [["La empresa apuesta por un modelo de producción más sostenible.","その会社はより持続可能な生産モデルを目指している。"]],
    "controversia": [["La nueva ley generó una gran controversia entre los ciudadanos.","その新しい法律は市民の間で大きな論争を引き起こした。"]],
    "matiz": [["Tu explicación es buena, pero le falta un matiz importante.","君の説明はいいけれど、重要なニュアンスが欠けている。"]],
    "mitigar": [["Plantar árboles ayuda a mitigar los efectos del cambio climático.","木を植えることは気候変動の影響を緩和するのに役立つ。"]],
    "pragmático": [["Mi jefe es muy pragmático y siempre busca soluciones realistas.","私の上司はとても実際的で、いつも現実的な解決策を探す。"]],
    "ambigüo": [["Su respuesta fue tan ambigua que nadie supo qué decidir.","彼の返事はあまりに曖昧で、誰も何を決めるべきかわからなかった。"]],
    "estar en las nubes": [["Durante la reunión estabas en las nubes y no escuchaste nada.","会議中、君はぼんやりしていて何も聞いていなかった。"]],
    "dar en el clavo": [["Con ese comentario diste en el clavo sobre el problema real.","そのコメントで君は本当の問題の核心を突いた。"]],
    "echar una mano": [["¿Me puedes echar una mano con estas cajas tan pesadas?","この重い箱を運ぶのを手伝ってくれる？"]],
    "tomar el pelo": [["No me tomes el pelo, sé perfectamente lo que pasó.","からかわないでよ、何が起きたかちゃんとわかってるんだから。"]],
    "ubicuo": [["El uso del móvil se ha vuelto ubicuo en la vida moderna.","携帯電話の使用は現代生活において至る所に存在するようになった。"]],
    "efímero": [["La fama en las redes suele ser efímera y poco duradera.","ネット上の名声はしばしばはかなく、長続きしない。"]],
    "recalcitrante": [["A pesar de las pruebas, mantuvo una actitud recalcitrante ante el juez.","証拠があるにもかかわらず、彼は裁判官の前で頑迷な態度を貫いた。"]],
    "epitomar": [["Esa novela epitoma el espíritu de toda una generación perdida.","その小説は失われた一世代の精神を体現している。"]]
  };

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
