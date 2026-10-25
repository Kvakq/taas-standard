// =========================================
// CASE-BASED QUIZ QUESTIONS DATA (ANNEX D)
// =========================================

const quizData = [
  {
    question:
      "Õppejõud annab kodutöö, kuid unustab juhendis märkida lubatud AI kasutustaseme. Millisel tasemel võid AI-d vaikimisi kasutada (§ 18)?",
    options: [
      "A0 – AI on täielikult keelatud, kuni õppejõud pole luba andnud.",
      "A1 – AI õpitoena (võib küsida selgitusi ja ideid, kuid AI loodud sisu ei tohi lõpptöösse ilma loata lisada).",
      "A2 – AI abivahendina koos deklaratsiooniga.",
      "A4 – AI-d võib vabalt kasutada, sest piiranguid polnud kirjas.",
    ],
    correct: 1,
    explanation:
      "§ 18 (Vaikereegel): Kui taset ei ole enne töö alustamist määratud, võib õppija kasutada AI-d üksnes A1 tasemel (AI õpitoena).",
  },
  {
    question:
      "Kas uusimate keelemudelite (nt GPT-5 Thinking) genereeritud fakte ja viiteid võib esitada töös ilma algallikatest kontrollimata (Teooria 2.1, § 6)?",
    options: [
      "Jah, sest uuemad mudelid teaduslikes allikates enam ei eksi.",
      "Jah, kui lisad töö lõppu AI kasutuse deklaratsiooni.",
      "Ei, ka uuemad mudelid teevad vigu (nt 4,5% väidetest) ja võivad genereerida valeinfot – vastutus lasub alati õppijal.",
      "Ainult siis, kui kasutad tasulist AI versiooni.",
    ],
    correct: 2,
    explanation:
      "Teooria 2.1 ja § 6 (Inimvastutus): OpenAI 2025. a hindamises oli ka GPT-5 Thinking mudeli väidetest 4,5% ebaõiged. Õppija vastutab alati faktide ja allikate õigsuse eest.",
  },
  {
    question:
      "Tudeng kirjutab aruande ise, kuid kasutab ChatGPT-d teksti struktuuri parandamiseks, keeletoimetamiseks ja koodi vigade selgitamiseks. Millisele tasemele see vastab (§ 15, Lisa A)?",
    options: [
      "A0 – AI keelatud",
      "A1 – AI õpitoena",
      "A2 – AI abivahendina",
      "A4 – AI-keskne kasutus",
    ],
    correct: 2,
    explanation:
      "§ 15 ja Lisa A: A2 tasemel (AI abivahendina) on lubatud struktuuri arendamine, keeletoimetamine ja koodi parandus, kuid oluline AI-panus tuleb deklareerida.",
  },
  {
    question:
      "Millist teavet EI TOHI sisestada avalikku (asutuse poolt heaks kiitmata) AI teenusesse (§ 10)?",
    options: [
      "Üldiseid matemaatika- või programmeerimisülesandeid.",
      "Avalikke teadusartikleid, millel on vaba ligipääs.",
      "Isikuandmeid, hindamata õppijatöid, eksamiülesandeid ja konfidentsiaalset teadusmaterjali.",
      "Enda kirjutatud mustandit keeletoimetamiseks A2 tasemel.",
    ],
    correct: 2,
    explanation:
      "§ 10 (Andmekaitse ja konfidentsiaalsus): Avalikku AI teenusesse ei tohi sisestada isikuandmeid, hindamata töid, eksamiülesandeid ega piiratud juurdepääsuga teavet.",
  },
  {
    question:
      "Õppejõud kontrollib tudengi esseed AI-detektoriga, mis näitab 85% AI tõenäosust. Kas ainult selle tulemuse põhjal võib töö lugeda rikkumiseks ja panna hindeks „0“ (§ 11, § 29, § 30)?",
    options: [
      "Jah, kui detektori protsent on üle 50%.",
      "Ei – AI-detektor võib anda valepositiivseid tulemusi ega ole ainus tõend; vajalik on inimese sisuline kontroll ja õppija selgitus.",
      "Jah, sest AI-detektorid on 100% töökindlad.",
      "Ainult siis, kui tudeng kasutas tasuta AI tööriista.",
    ],
    correct: 1,
    explanation:
      "§ 29 ja § 30: AI-detektori positiivne tulemus üksi ei ole rikkumine ega otsustav tõend (Xiang et al. 2026; Weber-Wulff et al. 2023). Õppijale peab andma võimaluse oma tööprotsessi selgitada.",
  },
  {
    question:
      "Millal on AI kasutuse deklaratsiooni (Lisa B) esitamine kohustuslik (§ 8, § 14–17)?",
    options: [
      "Alates A2 tasemest olulise AI-panuse korral (ning A1 tasemel, kui AI mõjutas töö suunda oluliselt).",
      "Ainult A0 tasemel.",
      "Deklaratsioon on alati vabatahtlik.",
      "Ainult siis, kui õppejõud kahtlustab akadeemilist pettust.",
    ],
    correct: 0,
    explanation:
      "§ 8 ja § 14–17: Oluline AI-panus tuleb deklareerida A2–A4 tasemel ning A1 tasemel juhul, kui AI mõjutas töö suunda või lahenduskäiku oluliselt.",
  },
  {
    question:
      "Ülesandele on määratud tase A3 (AI integreeritud). Tudeng kopeerib AI genereeritud analüüsi otse oma töösse ilma seda kontrollimata ja hindamata. Kas see on lubatud (§ 16, Lisa A)?",
    options: [
      "Jah, sest A3 tasemel on AI kasutamine ülesande ametlik osa.",
      "Ei – ka A3 tasemel on AI väljundi pime kopeerimine ilma õppija kriitilise analüüsi ja allikakontrollita keelatud.",
      "Jah, kui tudeng märgib tööriista nime deklaratsioonis.",
      "Jah, kui tekstis pole kirjavigu.",
    ],
    correct: 1,
    explanation:
      "§ 16 ja Lisa A: A3 tasemel hinnatakse promptimist, AI-väljundite kriitilist hindamist ja parandamist. Pime kopeerimine ilma analüüsita on keelatud.",
  },
  {
    question:
      "Õppejõud teeb kohustuslikuks tasulise AI teenuse kasutamise, kuid kool tasuta ligipääsu ei paku. Kas see vastab standardile (§ 9)?",
    options: [
      "Jah, tudeng peab vajalikud õppevahendid ise ostma.",
      "Ei – kohustuslik AI kasutus ei tohi seada õppijat halvemasse olukorda tasulise teenuse tõttu; asutus peab tagama ligipääsu või samaväärse alternatiivi.",
      "Jah, kui tegemist on A4 taseme ülesandega.",
      "Jah, kui kuutasu on alla 25 euro.",
    ],
    correct: 1,
    explanation:
      "§ 9 (Võrdse kohtlemise ja ligipääsetavuse põhimõte): Kui ülesanne nõuab konkreetset AI teenust, peab asutus või õpetaja tagama võimaluse seda kasutada või pakkuma tasuta alternatiivi.",
  },
];
