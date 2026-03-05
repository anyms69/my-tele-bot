// ════════════════════════════════════════════════════════
//  РЕАЛЬНЫЕ ЭКСКУРСИИ РЕГИОНА АНТАЛИЯ
//  Источники: Travel24, ExcursionMania, Turteka,
//  Tripster, GoldWayTravel, AlfaTurizm (2024–2025)
// ════════════════════════════════════════════════════════

export const excursions = [

  // ──────────────────────────────────────────────────────
  // 1. ДЕМРЕ — МИРА — КЕКОВА
  //    Самый популярный тур региона (история + море + религия)
  // ──────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'demre-mira-kekova',
    category: 'history',
    badge: 'popular',
    image: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?w=700&q=80',

    title: {
      ru: 'Демре — Мира — Кекова',
      en: 'Demre — Myra — Kekova',
      tr: 'Demre — Mira — Kekova',
    },

    // Краткое описание — главный экран / карточка
    shortDesc: {
      ru: 'История, религия и затонувший город за один день. Церковь Николая Чудотворца, скальные гробницы Миры и яхта с прозрачным дном над «Турецкой Атлантидой».',
      en: 'History, religion and a sunken city in one day. Church of St. Nicholas, Myra rock tombs, and a glass-bottom boat over the "Turkish Atlantis".',
      tr: 'Tarih, din ve batık şehir tek günde. Noel Baba Kilisesi, Mira kaya mezarları ve "Türk Atlantisi"nin üzerinde cam tabanlı tekne.',
    },

    // Полное описание — детальная карточка
    fullDesc: {
      ru: 'Маршрут проходит по территории древнего государства Ликия. Сначала — Мира: скальные гробницы II века до н.э., высеченные прямо в скалах, и греко-римский амфитеатр на 10 000 зрителей, один из крупнейших в Ликии. Затем — Демре с церковью Святого Николая Чудотворца IV века, реального прообраза Санта-Клауса. Финал — яхта с прозрачным дном к острову Кекова, где после античного землетрясения целый город ушёл под воду. Купание в открытом Средиземном море.',
      en: 'The route passes through the ancient kingdom of Lycia. First — Myra: 2nd-century BC rock tombs carved directly into cliffs, and a Greco-Roman amphitheater for 10,000 spectators. Then Demre with the 4th-century Church of St. Nicholas — the real-life Santa Claus. The finale — a glass-bottom boat to Kekova island, where an ancient earthquake submerged an entire city. Swimming in the open Mediterranean.',
      tr: "Rota, antik Likya Krallığı topraklarından geçiyor. Önce Mira: MÖ 2. yüzyıldan kayalara oyulmuş mezarlar ve 10.000 kişilik Yunan-Roma amfitiyatrosu. Ardından gerçek Noel Baba'nın kilisesi — MS 4. yüzyıldan Demre. Final — antik depremde sular altında kalan şehri gösteren cam tabanlı tekne gezisi Kekova'ya. Açık Akdeniz'de yüzme.",
    },

    highlights: {
      ru: [
        'Скальные гробницы Миры (II в. до н.э.) — рядом с амфитеатром',
        'Амфитеатр на 10 000 мест — один из крупнейших в Ликии',
        'Церковь Св. Николая IV в. — саркофаг святого внутри',
        'Затонувший город Кекова — видно через стеклянное дно яхты',
        'Крепость Симена на холме над заливом',
        'Купание в открытом Средиземном море',
      ],
      en: [
        "Myra rock tombs (2nd c. BC) — next to the amphitheater",
        '10,000-seat amphitheater — one of the largest in Lycia',
        "St. Nicholas Church (4th c.) — saint's sarcophagus inside",
        'Sunken city of Kekova — visible through glass-bottom boat',
        'Simena Castle on a hill above the bay',
        'Swimming in the open Mediterranean',
      ],
      tr: [
        'Mira kaya mezarları (MÖ 2. yy) — amfitiyatronun yanında',
        '10.000 kişilik amfitiyatro — Likya\'nın en büyüklerinden',
        "Noel Baba Kilisesi (MS 4. yy) — içinde azizin lahdi",
        'Kekova batık şehri — cam tabanlı tekneden görünüyor',
        'Tepedeki Simena Kalesi',
        'Açık Akdeniz\'de yüzme',
      ],
    },

    // Реальные цены 2024 (источник: Travel24, Turteka, Sputnik8)
    price: { adult: 45, child: 30, childAge: '4–12', infant: 0, infantAge: '0–3' },
    currency: 'USD',

    // Реальные данные маршрута
    duration: { hours: 12, label: { ru: '12 часов', en: '12 hours', tr: '12 saat' } },
    distance: { km: 145, fromCity: 'Antalya' },
    departure: '07:00',
    returnTime: '19:30',
    schedule: {
      ru: ['Вт', 'Чт', 'Сб', 'Вс'],
      en: ['Tue', 'Thu', 'Sat', 'Sun'],
      tr: ['Sal', 'Per', 'Cmt', 'Paz'],
    },

    included: {
      ru: ['Трансфер отель → маршрут → отель', 'Русскоязычный гид', 'Обед в ресторане', 'Прогулка на яхте (2 ч)', 'Купание в море', 'Страховка'],
      en: ['Hotel round-trip transfer', 'Russian-speaking guide', 'Restaurant lunch', 'Yacht cruise (2h)', 'Sea swimming', 'Insurance'],
      tr: ['Otel transferi (gidiş-dönüş)', 'Rusça rehber', 'Restoran öğle yemeği', 'Tekne turu (2 sa)', 'Denizde yüzme', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Вход в церковь Св. Николая — 390 TL (≈20€)', 'Вход в Миру — 300 TL (≈13€)', 'Напитки', 'Личные расходы'],
      en: ['St. Nicholas Church entry — 390 TL (~€20)', 'Myra entry — 300 TL (~€13)', 'Drinks', 'Personal expenses'],
      tr: ['Noel Baba Kilisesi — 390 TL', 'Mira girişi — 300 TL', 'İçecekler', 'Kişisel harcamalar'],
    },

    tip: {
      ru: '💡 Возьмите купальник и полотенце — будет остановка для купания в море. Церковь — без открытых плеч и колен.',
      en: '💡 Bring a swimsuit and towel — there\'s a sea swimming stop. Church requires covered shoulders and knees.',
      tr: '💡 Mayo ve havlu getirin — denizde yüzme durağı var. Kilisede omuzlar ve dizler kapalı olmalı.',
    },

    rating: 4.9,
    reviews: 3200,
  },

  // ──────────────────────────────────────────────────────
  // 2. ПАМУККАЛЕ + ИЕРАПОЛИС
  //    Объект ЮНЕСКО, самый посещаемый тур из Анталии
  // ──────────────────────────────────────────────────────
  {
    id: 2,
    slug: 'pamukkale-hierapolis',
    category: 'nature',
    badge: 'popular',
    image: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=700&q=80',

    title: {
      ru: 'Памуккале — Хлопковый Замок',
      en: 'Pamukkale — Cotton Castle',
      tr: 'Pamukkale — Pamuk Kale',
    },

    shortDesc: {
      ru: 'Белоснежные травертиновые террасы — объект ЮНЕСКО. Купание в термальном бассейне Клеопатры +35°C с античными колоннами под водой.',
      en: 'Snow-white travertine terraces — UNESCO site. Bathing in Cleopatra\'s thermal pool at +35°C with ancient columns underwater.',
      tr: 'UNESCO Dünya Mirası beyaz traverten terasları. Kleopatra\'nın +35°C termal havuzunda yüzme, suda antik sütunlar.',
    },

    fullDesc: {
      ru: 'Выезд в 04:00–05:00 утра — дорога 3–4 часа. Памуккале образовалось за тысячи лет: термальные воды оставляли кальциевые осадки, создав белоснежные ступенчатые бассейны. Рядом — античный Иераполис: хорошо сохранившийся римский театр, крупнейший в мире некрополь, церковь апостола Филиппа и городские стены. Отдельно — бассейн Клеопатры (+35°C), на дне которого лежат упавшие античные колонны. По территории ходят только босиком.',
      en: "Departure at 04:00–05:00 — 3–4 hours drive. Pamukkale formed over thousands of years as thermal springs deposited calcium, creating snow-white terraced pools. Nearby: ancient Hierapolis with a well-preserved Roman theater, the world's largest necropolis, the Church of the Apostle Philip. Separate ticket for Cleopatra's Pool (+35°C) where ancient columns lie on the bottom. The terraces are walked barefoot only.",
      tr: "04:00–05:00'da hareket — 3–4 saatlik yol. Pamukkale, binlerce yıl boyunca termal suların kalsiyum biriktirmesiyle oluştu. Yanı başında antik Hierapolis: iyi korunmuş Roma tiyatrosu, dünyanın en büyük nekropolü, Aziz Philippus Kilisesi. Ayrı bilet gerektiren Kleopatra Havuzu (+35°C) — dipte antik sütunlar yatıyor. Teraslarda yalnız yalın ayak yürünür.",
    },

    highlights: {
      ru: [
        'Белые травертины — объект ЮНЕСКО (ходить только босиком)',
        'Купание в травертиновых террасах (+35°C)',
        'Бассейн Клеопатры — античные колонны на дне',
        'Иераполис: Roman театр, некрополь, стены IV в.',
        'Церковь апостола Филиппа',
        'Самый большой в мире античный некрополь',
      ],
      en: [
        'White travertines — UNESCO site (barefoot only)',
        'Bathing in travertine terraces (+35°C)',
        "Cleopatra's Pool — ancient columns on the bottom",
        'Hierapolis: Roman theater, necropolis, 4th-c. walls',
        'Church of the Apostle Philip',
        "World's largest ancient necropolis",
      ],
      tr: [
        'Beyaz travertenler — UNESCO (yalnız yalın ayak)',
        'Traverten teraslarında yüzme (+35°C)',
        "Kleopatra Havuzu — dipte antik sütunlar",
        'Hierapolis: Roma tiyatrosu, nekropol, surlar',
        'Aziz Philippus Kilisesi',
        'Dünyanın en büyük antik nekropolü',
      ],
    },

    price: { adult: 45, child: 45, childAge: '6–11', infant: 0, infantAge: '0–5' },
    currency: 'USD',

    duration: { hours: 14, label: { ru: '14 часов', en: '14 hours', tr: '14 saat' } },
    distance: { km: 246, fromCity: 'Antalya' },
    departure: '04:30',
    returnTime: '20:00',
    schedule: {
      ru: ['Вт', 'Пт', 'Вс'],
      en: ['Tue', 'Fri', 'Sun'],
      tr: ['Sal', 'Cum', 'Paz'],
    },

    included: {
      ru: ['Трансфер', 'Русскоязычный гид', 'Вход в Памуккале (30€)', 'Страховка'],
      en: ['Transfer', 'Russian-speaking guide', 'Pamukkale entry (€30)', 'Insurance'],
      tr: ['Transfer', 'Rusça rehber', 'Pamukkale girişi (€30)', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Обед (ресторан на месте)', 'Бассейн Клеопатры — 25€ доп.', 'Завтрак (нужен лнч-бокс с отеля)'],
      en: ['Lunch (on-site restaurant)', "Cleopatra's Pool — €25 extra", 'Breakfast (take lunch-box from hotel)'],
      tr: ['Öğle yemeği (yerinde restoran)', 'Kleopatra Havuzu — €25 ekstra', 'Kahvaltı (otelden lunch box alın)'],
    },

    tip: {
      ru: '💡 Выезд в 4 утра — возьмите лнч-бокс с отеля. Тапочки положите в сумку: по травертинам ходят только босиком. Обязательно купальник.',
      en: '💡 4am departure — take a lunch-box from the hotel. Put flip-flops in your bag: terraces are barefoot only. Swimsuit is a must.',
      tr: '💡 Sabah 4\'te hareket — otelden lunch box alın. Terliklerinizi çantaya koyun: teraslarda yalın ayak. Mayo şart.',
    },

    rating: 4.8,
    reviews: 4100,
  },

  // ──────────────────────────────────────────────────────
  // 3. ПАМУККАЛЕ + ОЗЕРО САЛДА
  //    Вариант с «Турецкими Мальдивами»
  // ──────────────────────────────────────────────────────
  {
    id: 3,
    slug: 'pamukkale-salda',
    category: 'nature',
    badge: 'hot',
    image: 'https://images.unsplash.com/photo-1625469189485-7b2bfae0c3a3?w=700&q=80',

    title: {
      ru: 'Памуккале + Озеро Салда',
      en: 'Pamukkale + Lake Salda',
      tr: 'Pamukkale + Salda Gölü',
    },

    shortDesc: {
      ru: 'Два природных чуда за день: белые травертины ЮНЕСКО и изумрудное горное озеро Салда — «Турецкие Мальдивы» с белым дном и прозрачной водой.',
      en: 'Two natural wonders in one day: UNESCO white travertines and emerald Lake Salda — the "Turkish Maldives" with a white floor and crystal water.',
      tr: 'Bir günde iki doğa harikası: UNESCO beyaz travertenleri ve kristal sulı Salda Gölü — "Türk Maldivleri".',
    },

    fullDesc: {
      ru: 'Комбинированный тур — самый популярный вариант Памуккале в 2024 году. Сначала — белые террасы Памуккале и античный Иераполис. Затем переезд к озеру Салда: дно из белоснежного минерала гидромагнезита делает воду изумрудно-бирюзовой. Температура воды держится +35°C круглый год. Говорят, именно это озеро NASA брала за эталон при изучении дна кратера на Марсе.',
      en: "The most popular Pamukkale combination in 2024. First — white Pamukkale terraces and ancient Hierapolis. Then a drive to Lake Salda: the floor of snow-white hydromagnesite mineral turns the water emerald-turquoise. Water temperature stays at +35°C year-round. NASA reportedly used this lake as a reference when studying a Mars crater floor.",
      tr: "2024'ün en popüler Pamukkale kombinasyonu. Önce beyaz Pamukkale terasları ve antik Hierapolis. Ardından Salda Gölü: beyaz hidromagnezitten oluşan dip, suyu zümrüt turkuazına çeviriyor. Yıl boyu +35°C. NASA'nın Mars krateri çalışmalarında referans aldığı söylenen göl.",
    },

    highlights: {
      ru: [
        'Белые террасы Памуккале — объект ЮНЕСКО',
        'Иераполис: театр, некрополь, стены',
        'Озеро Салда — белое дно, изумрудная вода',
        'Купание в озере Салда (+35°C круглый год)',
        'Эталон для исследований NASA (кратер на Марсе)',
        'Свободное время на озере — 1 час',
      ],
      en: [
        'Pamukkale white terraces — UNESCO',
        'Hierapolis: theater, necropolis, walls',
        'Lake Salda — white floor, emerald water',
        'Swimming in Lake Salda (+35°C year-round)',
        "NASA's Mars crater reference site",
        '1 hour of free time at the lake',
      ],
      tr: [
        'Pamukkale beyaz teraslar — UNESCO',
        'Hierapolis: tiyatro, nekropol, surlar',
        'Salda Gölü — beyaz dip, zümrüt su',
        'Salda\'da yüzme (+35°C yıl boyu)',
        "NASA'nın Mars krateri referansı",
        'Gölde 1 saat serbest zaman',
      ],
    },

    price: { adult: 40, child: 40, childAge: '4–12', infant: 0, infantAge: '0–3' },
    currency: 'USD',

    duration: { hours: 15, label: { ru: '15 часов', en: '15 hours', tr: '15 saat' } },
    distance: { km: 281, fromCity: 'Antalya' },
    departure: '04:30',
    returnTime: '21:00',
    schedule: {
      ru: ['Вт', 'Пт', 'Вс'],
      en: ['Tue', 'Fri', 'Sun'],
      tr: ['Sal', 'Cum', 'Paz'],
    },

    included: {
      ru: ['Трансфер', 'Гид', 'Вход в Памуккале', 'Страховка'],
      en: ['Transfer', 'Guide', 'Pamukkale entry', 'Insurance'],
      tr: ['Transfer', 'Rehber', 'Pamukkale girişi', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Обед', 'Бассейн Клеопатры — 25€'],
      en: ['Lunch', "Cleopatra's Pool — €25"],
      tr: ['Öğle yemeği', 'Kleopatra Havuzu — €25'],
    },

    tip: {
      ru: '💡 Длинный день (15 ч). Возьмите 2 купальника: один для Памуккале, второй — для озера Салда.',
      en: '💡 Long day (15h). Bring 2 swimsuits: one for Pamukkale, one for Lake Salda.',
      tr: '💡 Uzun gün (15 sa). 2 mayo getirin: biri Pamukkale, diğeri Salda Gölü için.',
    },

    rating: 4.8,
    reviews: 2200,
  },

  // ──────────────────────────────────────────────────────
  // 4. ПЕРГЕ — АСПЕНДОС — СИДЕ
  //    Три античных города за один день
  // ──────────────────────────────────────────────────────
  {
    id: 4,
    slug: 'perge-aspendos-side',
    category: 'history',
    badge: 'popular',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',

    title: {
      ru: 'Перге — Аспендос — Сиде',
      en: 'Perge — Aspendos — Side',
      tr: 'Perge — Aspendos — Side',
    },

    shortDesc: {
      ru: 'Три столицы древней Памфилии рядом с Анталией. Театр Аспендоса II века — лучший сохранившийся в Малой Азии — до сих пор принимает оперу и концерты.',
      en: 'Three capitals of ancient Pamphylia near Antalya. Aspendos Theater (2nd c.) — best preserved in Asia Minor — still hosts opera and concerts.',
      tr: "Antalya yakınında antik Pamphylia'nın üç başkenti. Aspendos Tiyatrosu (2. yy) — Küçük Asya'nın en iyi korunmuşu — hâlâ opera ve konser sahnesi.",
    },

    fullDesc: {
      ru: 'Перге — столица Памфилии и родина математика Аполлония. Здесь сохранились ворота, колоннады главной улицы, термы и нимфей. Аспендос — театр II века с 15 000 мест и акустикой, позволявшей слышать шёпот с любого ряда. Рядом — акведук длиной 15 км. Сиде: храм Аполлона и Афины прямо у Средиземного моря, агора и купание на пляже.',
      en: "Perge — capital of Pamphylia and birthplace of mathematician Apollonius. Preserved gates, main street colonnades, baths and nymphaeum. Aspendos — a 2nd-c. theater seating 15,000, with acoustics so perfect a whisper could be heard from any row. Nearby — a 15 km aqueduct. Side: temples of Apollo and Athena right by the Mediterranean, agora and beach swimming.",
      tr: "Perge — Pamphylia başkenti ve matematikçi Apollonius'un doğduğu yer. Kapılar, ana cadde sütunları, hamamlar ve nimfeum korunmuş. Aspendos — 15.000 kişilik MS 2. yüzyıl tiyatrosu; akustiği o kadar mükemmel ki her sıradan fısıltı duyulurdu. Yakınında 15 km'lik su kemeri. Side: Akdeniz kıyısında Apollon ve Athena tapınakları, agora ve plaj.",
    },

    highlights: {
      ru: [
        'Перге — ворота, колоннады, термы (III в. до н.э.)',
        'Театр Аспендоса — 15 000 мест, идеальная акустика',
        'Акведук Аспендоса — 15 км горного водопровода',
        'Храм Аполлона и Афины в Сиде прямо у моря',
        'Купание на пляже Сиде',
        'Агора Сиде и Музей Сиде',
      ],
      en: [
        'Perge — gates, colonnades, baths (3rd c. BC)',
        'Aspendos Theater — 15,000 seats, perfect acoustics',
        'Aspendos Aqueduct — 15 km mountain water supply',
        "Temple of Apollo & Athena in Side by the sea",
        'Side beach swimming',
        'Side Agora and Museum',
      ],
      tr: [
        'Perge — kapılar, sütunlar, hamamlar (MÖ 3. yy)',
        'Aspendos Tiyatrosu — 15.000 koltuk, mükemmel akustik',
        'Aspendos Su Kemeri — 15 km dağ su yolu',
        'Side\'de Apollon ve Athena tapınakları deniz kenarında',
        'Side plajında yüzme',
        'Side Agorası ve Müzesi',
      ],
    },

    price: { adult: 35, child: 18, childAge: '4–12', infant: 0, infantAge: '0–3' },
    currency: 'USD',

    duration: { hours: 10, label: { ru: '10 часов', en: '10 hours', tr: '10 saat' } },
    distance: { km: 55, fromCity: 'Antalya' },
    departure: '08:00',
    returnTime: '18:30',
    schedule: {
      ru: ['Вт', 'Чт', 'Сб'],
      en: ['Tue', 'Thu', 'Sat'],
      tr: ['Sal', 'Per', 'Cmt'],
    },

    included: {
      ru: ['Трансфер', 'Русскоязычный гид', 'Страховка'],
      en: ['Transfer', 'Russian-speaking guide', 'Insurance'],
      tr: ['Transfer', 'Rusça rehber', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Вход в Перге — ~10€', 'Вход в Аспендос — ~12€', 'Вход в Сиде — ~8€', 'Обед'],
      en: ['Perge entry — ~€10', 'Aspendos entry — ~€12', 'Side entry — ~€8', 'Lunch'],
      tr: ['Perge girişi — ~€10', 'Aspendos girişi — ~€12', 'Side girişi — ~€8', 'Öğle yemeği'],
    },

    tip: {
      ru: '💡 Удобная обувь обязательна — по античным руинам много ходьбы. Возьмите наличные на билеты.',
      en: '💡 Comfortable shoes are a must — lots of walking on ancient ruins. Bring cash for tickets.',
      tr: '💡 Rahat ayakkabı şart — antik harabelerde çok yürüme. Biletler için nakit getirin.',
    },

    rating: 4.8,
    reviews: 1850,
  },

  // ──────────────────────────────────────────────────────
  // 5. ОБЗОРНАЯ ЭКСКУРСИЯ ПО АНТАЛИИ
  //    Калеичи + Дюден + яхта + канатная дорога
  // ──────────────────────────────────────────────────────
  {
    id: 5,
    slug: 'antalya-city-tour',
    category: 'city',
    badge: null,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=700&q=80',

    title: {
      ru: 'Обзорная экскурсия по Анталии',
      en: 'Antalya City Tour',
      tr: 'Antalya Şehir Turu',
    },

    shortDesc: {
      ru: 'Всё главное в Анталии за один день: старый город Калеичи, водопад Дюден с 40 м прямо в море, прогулка на яхте и подъём на канатной дороге.',
      en: 'All the highlights of Antalya in one day: old town Kaleiçi, Düden waterfall 40m into the sea, yacht trip and cable car ride.',
      tr: 'Antalya\'nın tüm önemli yerleri tek günde: tarihi Kaleiçi, denize 40 m düşen Düden Şelalesi, tekne gezisi ve teleferik.',
    },

    fullDesc: {
      ru: 'Лучший способ познакомиться с самой Анталией. Старый город Калеичи с римскими стенами, ворота Адриана, минарет Йивли XIII века и башня Хыдырлык. Затем — водопад Дюден: вода падает с 40-метровой высоты прямо в Средиземное море, окружённая радугами. Прогулка на яхте вдоль берегов. Подъём на канатной дороге на гору Тюнектепе с видом на весь залив.',
      en: 'The best introduction to Antalya itself. Old town Kaleiçi with Roman walls, Hadrian\'s Gate, 13th-century Yivli Minaret and Hıdırlık Tower. Then Düden Waterfall: water drops 40m directly into the Mediterranean, framed by rainbows. Yacht cruise along the coast. Cable car ride up Tünektepe Mountain for a panoramic bay view.',
      tr: "Antalya'ya en iyi giriş. Roma surlarıyla Kaleiçi, Hadrianus Kapısı, 13. yüzyıldan Yivli Minare ve Hıdırlık Kulesi. Ardından Düden Şelalesi: su 40 m yüksekten doğrudan Akdeniz'e düşüyor, gökkuşakları eşliğinde. Kıyı boyunca tekne turu. Körfez panoraması için Tünektepe'ye teleferik.",
    },

    highlights: {
      ru: [
        'Калеичи — старый город с римскими стенами',
        'Ворота Адриана 130 г. н.э.',
        'Минарет Йивли XIII в.',
        'Водопад Дюден — 40 м прямо в море',
        'Прогулка на яхте вдоль берегов',
        'Канатная дорога на гору Тюнектепе',
      ],
      en: [
        "Kaleiçi — old town with Roman walls",
        "Hadrian's Gate (130 AD)",
        'Yivli Minaret (13th c.)',
        'Düden Waterfall — 40m into the sea',
        'Yacht cruise along the coast',
        'Cable car up Tünektepe Mountain',
      ],
      tr: [
        'Kaleiçi — Roma surlarıyla tarihi şehir',
        'Hadrianus Kapısı (MS 130)',
        'Yivli Minare (13. yy)',
        'Düden Şelalesi — denize 40 m düşüş',
        'Kıyı boyunca tekne turu',
        'Tünektepe\'ye teleferik',
      ],
    },

    price: { adult: 29, child: 15, childAge: '4–12', infant: 0, infantAge: '0–3' },
    currency: 'USD',

    duration: { hours: 8, label: { ru: '8 часов', en: '8 hours', tr: '8 saat' } },
    distance: { km: 10, fromCity: 'Antalya' },
    departure: '09:00',
    returnTime: '17:30',
    schedule: {
      ru: ['Ежедневно'],
      en: ['Daily'],
      tr: ['Her gün'],
    },

    included: {
      ru: ['Трансфер', 'Русскоязычный гид', 'Прогулка на яхте', 'Канатная дорога', 'Страховка'],
      en: ['Transfer', 'Russian-speaking guide', 'Yacht trip', 'Cable car', 'Insurance'],
      tr: ['Transfer', 'Rusça rehber', 'Tekne turu', 'Teleferik', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Вход в музеи', 'Обед', 'Напитки'],
      en: ['Museum entries', 'Lunch', 'Drinks'],
      tr: ['Müze girişleri', 'Öğle yemeği', 'İçecekler'],
    },

    tip: {
      ru: '💡 Прогулка к водопаду Дюден — обязательно возьмите дождевик или смените одежду: брызги сильные.',
      en: '💡 At Düden Waterfall bring a raincoat or change of clothes — the spray is powerful.',
      tr: '💡 Düden\'de yağmurluk veya yedek kıyafet getirin — çok ıslatır.',
    },

    rating: 4.7,
    reviews: 1400,
  },

  // ──────────────────────────────────────────────────────
  // 6. ДЖИП-САФАРИ В ГОРАХ ТАВРА
  //    Приключение, горные деревни, водопады, купание
  // ──────────────────────────────────────────────────────
  {
    id: 6,
    slug: 'jeep-safari-taurus',
    category: 'active',
    badge: 'new',
    image: 'https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?w=700&q=80',

    title: {
      ru: 'Джип-сафари в горах Тавра',
      en: 'Jeep Safari in the Taurus Mountains',
      tr: 'Toroslar\'da Jeep Safari',
    },

    shortDesc: {
      ru: 'Открытые джипы по горным деревням, каньонам и водопадам. Подъём 700 м, купание в горной реке, пикник под кедрами — с видом на Средиземное море.',
      en: 'Open-top jeeps through mountain villages, canyons and waterfalls. 700m climb, river swimming, cedar picnic — Mediterranean panorama.',
      tr: 'Açık üstlü jeeplerle dağ köyleri, kanyonlar ve şelaleler. 700m tırmanış, nehir yüzmesi, sedir pikniği — Akdeniz panoraması.',
    },

    fullDesc: {
      ru: 'Из отеля забирают открытые джипы с опытными водителями. Маршрут поднимается в горы Тавра на высоту ~700 м: горные деревни, где жизнь почти не изменилась за 100 лет, ущелья с горными реками, верхний водопад Дюден и пикник в тени кедров. С перевала — панорама на весь Анталийский залив. Купание в холодной горной реке в жаркий день — незабываемо.',
      en: 'Open-top jeeps with experienced drivers pick you up from the hotel. The route climbs the Taurus Mountains to ~700m: mountain villages little changed in 100 years, gorges with mountain rivers, Upper Düden Waterfall, and a picnic under cedar shade. From the pass — panorama over the entire Antalya Bay. Swimming in a cool mountain river on a hot day is unforgettable.',
      tr: 'Deneyimli sürücülerin kullandığı açık üstlü jeeplerle otelden alınıyorsunuz. Rota, Toros Dağları\'nı ~700 m\'ye kadar tırmanıyor: 100 yıldır pek değişmemiş dağ köyleri, nehirli vadiler, Yukarı Düden Şelalesi ve sedir gölgesinde piknik. Geçitten tüm Antalya Körfezi\'nin panoraması. Sıcak bir günde soğuk dağ nehrinde yüzmek unutulmaz.',
    },

    highlights: {
      ru: [
        'Горные деревни Тавра — традиционный быт',
        'Ущелье с купанием в горной реке',
        'Верхний водопад Дюден в горах',
        'Пикник с едой под кедрами',
        'Панорама Анталийского залива с 700 м',
        'Свободное время для фото',
      ],
      en: [
        'Taurus mountain villages — traditional life',
        'Canyon with mountain river swimming',
        'Upper Düden Waterfall in the mountains',
        'Picnic with food under cedar trees',
        'Antalya Bay panorama from 700m',
        'Free time for photos',
      ],
      tr: [
        'Toros dağ köyleri — geleneksel yaşam',
        'Dağ nehri yüzmeli kanyon',
        'Dağlarda Yukarı Düden Şelalesi',
        'Sedir ağaçları altında yiyecekli piknik',
        '700m\'den Antalya Körfezi panoraması',
        'Fotoğraf için serbest zaman',
      ],
    },

    price: { adult: 35, child: 18, childAge: '3–8', infant: 0, infantAge: '0–2' },
    currency: 'USD',

    duration: { hours: 9, label: { ru: '9 часов', en: '9 hours', tr: '9 saat' } },
    distance: { km: 80, fromCity: 'Antalya' },
    departure: '08:30',
    returnTime: '17:30',
    schedule: {
      ru: ['Пн', 'Ср', 'Пт', 'Вс'],
      en: ['Mon', 'Wed', 'Fri', 'Sun'],
      tr: ['Pzt', 'Çar', 'Cum', 'Paz'],
    },

    included: {
      ru: ['Джипы с водителями', 'Сопровождающий', 'Пикник', 'Страховка', 'Трансфер'],
      en: ['Jeeps with drivers', 'Escort guide', 'Picnic', 'Insurance', 'Transfer'],
      tr: ['Sürücülü jepler', 'Refakatçi', 'Piknik', 'Sigorta', 'Transfer'],
    },
    notIncluded: {
      ru: ['Купальные принадлежности (берите своё)', 'Напитки'],
      en: ['Swimming gear (bring your own)', 'Drinks'],
      tr: ['Yüzme malzemeleri (kendiniz getirin)', 'İçecekler'],
    },

    tip: {
      ru: '💡 Одевайтесь так, чтобы не жалко было испачкать — гарантированы пыль и вода. Купальник обязателен.',
      en: '💡 Wear clothes you don\'t mind getting dirty — dust and water are guaranteed. Swimsuit is a must.',
      tr: '💡 Kirlenebilecek giysiler giyin — toz ve ıslaklık kesin. Mayo şart.',
    },

    rating: 4.7,
    reviews: 980,
  },

  // ──────────────────────────────────────────────────────
  // 7. РАФТИНГ — КАНЬОН КЁПРЮЛЮ
  //    Экстрим на горной реке
  // ──────────────────────────────────────────────────────
  {
    id: 7,
    slug: 'rafting-koprulu',
    category: 'active',
    badge: 'hot',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=700&q=80',

    title: {
      ru: 'Рафтинг — каньон Кёпрюлю',
      en: 'Rafting — Köprülü Canyon',
      tr: 'Köprülü Kanyon Raftingi',
    },

    shortDesc: {
      ru: '14 км по горной реке Кёпрюлю в надувных лодках на 10 человек. Пороги, брызги, вековые сосны — один из лучших рафтинг-маршрутов Турции.',
      en: '14 km down the Köprülü mountain river in 10-person rafts. Rapids, splashes, ancient pines — one of Turkey\'s best rafting routes.',
      tr: '10 kişilik şişme botlarla Köprülü dağ nehrinde 14 km. Akıntılar, sıçramalar, asırlık çamlar — Türkiye\'nin en iyi rafting rotalarından biri.',
    },

    fullDesc: {
      ru: 'Национальный парк Кёпрюлю — в 75 км от Анталии. После инструктажа группы по 10 человек спускаются по реке через живописный каньон с 14-метровыми скальными стенами. Пороги 2–3 класса — подходит даже для новичков. По берегам — сосны возрастом 2000 лет. Внутри маршрута — античный город Селге и два римских моста. Обед в ресторане у реки.',
      en: 'Köprülü National Park — 75 km from Antalya. After briefing, groups of 10 descend the river through a scenic canyon with 14-meter cliff walls. Class 2–3 rapids — suitable even for beginners. Along the banks — 2,000-year-old pine trees. On the route: ancient city of Selge and two Roman bridges. Lunch at a riverside restaurant.',
      tr: "Köprülü Kanyon Milli Parkı — Antalya'dan 75 km. Brifing sonrası 10 kişilik gruplar, 14 metrelik kayalık duvarlı manzaralı kanyondan aşağı iniyor. 2–3. sınıf akıntılar — yeniler için bile uygun. Kıyılar boyunca 2.000 yıllık çam ağaçları. Rota üzerinde Selge antik şehri ve iki Roma köprüsü. Nehir kenarı restoranda öğle yemeği.",
    },

    highlights: {
      ru: [
        '14 км по реке Кёпрюлю (пороги 2–3 кл.)',
        'Каньон 14 м — национальный парк',
        'Сосны 2000 лет на берегах',
        'Античный город Селге',
        'Два римских моста на маршруте',
        'Обед у реки включён',
      ],
      en: [
        '14 km down Köprülü River (class 2–3 rapids)',
        '14m canyon walls — national park',
        '2,000-year-old pines along the banks',
        'Ancient city of Selge',
        'Two Roman bridges on the route',
        'Riverside lunch included',
      ],
      tr: [
        'Köprülü Nehri boyunca 14 km (2–3. sınıf)',
        '14m kanyon — milli park',
        'Kıyılarda 2.000 yıllık çamlar',
        'Selge antik şehri',
        'Rotada iki Roma köprüsü',
        'Nehir kenarı öğle yemeği dahil',
      ],
    },

    price: { adult: 40, child: 25, childAge: '7–14', infant: null, infantAge: '7+ лет' },
    currency: 'USD',

    duration: { hours: 8, label: { ru: '8 часов', en: '8 hours', tr: '8 saat' } },
    distance: { km: 75, fromCity: 'Antalya' },
    departure: '09:00',
    returnTime: '17:00',
    schedule: {
      ru: ['Ежедневно'],
      en: ['Daily'],
      tr: ['Her gün'],
    },

    included: {
      ru: ['Трансфер', 'Инструктаж', 'Жилет + шлем + весло', 'Обед', 'Страховка'],
      en: ['Transfer', 'Briefing', 'Vest + helmet + paddle', 'Lunch', 'Insurance'],
      tr: ['Transfer', 'Brifing', 'Yelek + kask + kürek', 'Öğle yemeği', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Гидрокостюм — аренда 5€', 'Напитки'],
      en: ['Wetsuit rental — €5', 'Drinks'],
      tr: ['Sörf kıyafeti kiralama — €5', 'İçecekler'],
    },

    tip: {
      ru: '💡 Минимальный возраст — 7 лет. Взрослым без ограничений по плаванию. Промокнете насквозь — это часть программы!',
      en: '💡 Minimum age 7. No swimming ability required for adults. You will get completely soaked — that\'s part of the fun!',
      tr: '💡 Minimum yaş 7. Yetişkinler için yüzme şartı yok. Tamamen ıslanacaksınız — bu programın bir parçası!',
    },

    rating: 4.8,
    reviews: 1600,
  },

  // ──────────────────────────────────────────────────────
  // 8. ТУРЕЦКИЙ ХАМАМ
  //    Классическое SPA в традиционной бане
  // ──────────────────────────────────────────────────────
  {
    id: 8,
    slug: 'turkish-hamam',
    category: 'wellness',
    badge: null,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80',

    title: {
      ru: 'Турецкий хамам',
      en: 'Turkish Hammam',
      tr: 'Türk Hamamı',
    },

    shortDesc: {
      ru: 'Классическая турецкая баня: сауна, пар с ментолом, пилинг кесе, пенный и масляный массаж. Подготавливает кожу к загару — лучше всего в первые дни отдыха.',
      en: 'Classic Turkish bath: sauna, menthol steam, kese scrub, foam and oil massage. Prepares skin for a tan — best in the first days of your holiday.',
      tr: 'Klasik Türk hamamı: sauna, mentollü buhar, kese peelingi, köpük ve yağ masajı. Cildi tana hazırlar — tatilin ilk günlerinde en iyisi.',
    },

    fullDesc: {
      ru: 'Трансфер забирает из отеля и привозит в SPA-центр. Программа: разогрев в сауне (сухой жар), парная с ментолом и джакузи, пилинг специальной перчаткой Кесе (снимает ороговевший слой кожи), пенный массаж на горячем мраморном камне, масляный массаж всего тела, маска для лица. Итого около 3 часов. Рекомендуют посетить в первые дни отпуска — кожа после хамама принимает загар ровно и без ожогов.',
      en: 'Transfer picks you up from the hotel and brings you to the SPA center. Programme: warm-up in dry sauna, menthol steam room with jacuzzi, kese glove scrub (removes dead skin), foam massage on hot marble stone, full-body oil massage, face mask. About 3 hours total. Recommended in the first days of the holiday — skin after hammam tans evenly and without burns.',
      tr: "Transfer otelden alıp SPA merkezine götürüyor. Program: kuru saunada ısınma, mentollü buhar odası ve jakuzi, kese peelingi (ölü deri temizliği), sıcak mermer üzerinde köpük masajı, vücut yağ masajı, yüz maskesi. Toplam yaklaşık 3 saat. Tatilin ilk günlerinde gitmeniz önerilir — hamam sonrası cilt düzgün ve yanmadan koyulaşır.",
    },

    highlights: {
      ru: [
        'Сауна — сухой жар, комфортный микроклимат',
        'Паровая баня с ментолом + джакузи',
        'Пилинг кесе — снимает ороговевший слой',
        'Пенный массаж на горячем мраморе',
        'Масляный массаж всего тела',
        'Маска для лица в финале',
      ],
      en: [
        'Sauna — dry heat, comfortable microclimate',
        'Menthol steam room + jacuzzi',
        'Kese scrub — removes dead skin layer',
        'Foam massage on hot marble',
        'Full-body oil massage',
        'Face mask at the end',
      ],
      tr: [
        'Sauna — kuru sıcak, konforlu iklim',
        'Mentollü buhar odası + jakuzi',
        'Kese peelingi — ölü deri tabakasını alır',
        'Sıcak mermer üzerinde köpük masajı',
        'Vücut yağ masajı',
        'Sonunda yüz maskesi',
      ],
    },

    price: { adult: 28, child: 15, childAge: '7–14', infant: null, infantAge: '7+ лет' },
    currency: 'USD',

    duration: { hours: 3, label: { ru: '3 часа', en: '3 hours', tr: '3 saat' } },
    distance: { km: 5, fromCity: 'Antalya' },
    departure: 'гибко',
    returnTime: '',
    schedule: {
      ru: ['Ежедневно'],
      en: ['Daily'],
      tr: ['Her gün'],
    },

    included: {
      ru: ['Трансфер', 'Сауна', 'Парная + джакузи', 'Пилинг кесе', 'Пенный массаж', 'Масляный массаж', 'Маска для лица'],
      en: ['Transfer', 'Sauna', 'Steam + jacuzzi', 'Kese scrub', 'Foam massage', 'Oil massage', 'Face mask'],
      tr: ['Transfer', 'Sauna', 'Buhar + jakuzi', 'Kese peelingi', 'Köpük masajı', 'Yağ masajı', 'Yüz maskesi'],
    },
    notIncluded: {
      ru: ['Дополнительные SPA-процедуры', 'Напитки в баре'],
      en: ['Extra SPA treatments', 'Bar drinks'],
      tr: ['Ek SPA hizmetleri', 'Bar içecekleri'],
    },

    tip: {
      ru: '💡 Лучше идти в первые 2–3 дня отпуска — хамам подготавливает кожу к солнцу. После хамама загар ложится ровнее.',
      en: '💡 Best in the first 2–3 days of the holiday — hammam preps skin for the sun. Tan goes on more evenly after hammam.',
      tr: '💡 Tatilin ilk 2–3 gününde en iyisi — hamam cildi güneşe hazırlar. Hamam sonrası ten daha düzgün koyulaşır.',
    },

    rating: 4.7,
    reviews: 760,
  },

  // ──────────────────────────────────────────────────────
  // 9. ПАРАГЛАЙДИНГ
  //    Тандемный полёт с горы над заливом
  // ──────────────────────────────────────────────────────
  {
    id: 9,
    slug: 'paragliding-antalya',
    category: 'active',
    badge: 'hot',
    image: 'https://images.unsplash.com/photo-1501621667575-af81f1afa7b8?w=700&q=80',

    title: {
      ru: 'Параглайдинг над морем',
      en: 'Paragliding over the Sea',
      tr: 'Deniz Üzerinde Yamaç Paraşütü',
    },

    shortDesc: {
      ru: 'Тандемный полёт с сертифицированным пилотом с горы 700 м над Анталийским заливом. Видео + фото в подарок, сертификат участника.',
      en: 'Tandem flight with a certified pilot from 700m over Antalya Bay. Free video + photo, participant certificate.',
      tr: '700 m\'den sertifikalı pilotla Antalya Körfezi üzerinde tandem uçuşu. Ücretsiz video + fotoğraf, katılım sertifikası.',
    },

    fullDesc: {
      ru: 'Один из немногих городов мира, где можно взлететь прямо с горы над курортом и через 20–30 минут приземлиться на пляже у моря. Стартовая площадка на высоте ~700 м над Средиземным морем. Подходит абсолютно для всех — опыт и физическая подготовка не нужны. Профессиональный пилот управляет параглайдом всё время полёта. На борту установлена GoPro-камера — видео и фото отправят после посадки.',
      en: 'One of the few cities in the world where you take off from a mountain right above the resort and land on the beach 20–30 minutes later. Launch at ~700m above the Mediterranean. Suitable for absolutely everyone — no experience or fitness required. The professional pilot controls the paraglider throughout the flight. GoPro camera on board — video and photo sent after landing.',
      tr: "Dünyanın birkaç şehrinden biri — tatil merkezinin hemen üzerindeki dağdan uçup 20–30 dakika sonra sahil plajına inebilirsiniz. Akdeniz'in ~700 m üzerinde başlangıç. Herkese uygun — deneyim ve kondisyon gerekmiyor. Profesyonel pilot tüm uçuş boyunca kontrolde. GoPro kamera var — video ve fotoğraf inişten sonra gönderiliyor.",
    },

    highlights: {
      ru: [
        'Старт с 700 м над Средиземным морем',
        'Полёт 20–30 минут над заливом',
        'Профессиональный пилот + снаряжение',
        'GoPro-видео и фото в подарок',
        'Посадка на пляже у моря',
        'Сертификат участника',
      ],
      en: [
        'Launch from 700m above the Mediterranean',
        '20–30 min flight over the bay',
        'Professional pilot + gear',
        'Free GoPro video and photo',
        'Landing on the beach by the sea',
        'Participant certificate',
      ],
      tr: [
        "Akdeniz'in 700 m üzerinden başlangıç",
        'Körfez üzerinde 20–30 dk uçuş',
        'Profesyonel pilot + ekipman',
        'Ücretsiz GoPro video ve fotoğraf',
        'Sahil plajına iniş',
        'Katılım sertifikası',
      ],
    },

    price: { adult: 90, child: null, childAge: null, infant: null, infantAge: '18+ лет, вес 40–110 кг' },
    currency: 'USD',

    duration: { hours: 3, label: { ru: '3 часа', en: '3 hours', tr: '3 saat' } },
    distance: { km: 20, fromCity: 'Antalya' },
    departure: 'гибко',
    returnTime: '',
    schedule: {
      ru: ['Ежедневно (при хорошей погоде)'],
      en: ['Daily (weather permitting)'],
      tr: ['Her gün (hava koşullarına göre)'],
    },

    included: {
      ru: ['Трансфер на старт', 'Инструктаж', 'Снаряжение', 'GoPro видео + фото', 'Страховка', 'Сертификат'],
      en: ['Transfer to launch', 'Briefing', 'Gear', 'GoPro video + photo', 'Insurance', 'Certificate'],
      tr: ['Başlangıç noktasına transfer', 'Brifing', 'Ekipman', 'GoPro video + fotoğraf', 'Sigorta', 'Sertifika'],
    },
    notIncluded: {
      ru: ['Личные расходы'],
      en: ['Personal expenses'],
      tr: ['Kişisel harcamalar'],
    },

    tip: {
      ru: '💡 Вес 40–110 кг, возраст от 18 лет. Без медицинских ограничений. Опыт не нужен — пилот делает всё сам.',
      en: '💡 Weight 40–110 kg, age 18+. No medical restrictions. No experience needed — the pilot does everything.',
      tr: '💡 Ağırlık 40–110 kg, yaş 18+. Tıbbi kısıtlama yok. Deneyim gerekmez — pilot her şeyi yapar.',
    },

    rating: 4.9,
    reviews: 620,
  },

  // ──────────────────────────────────────────────────────
  // 10. КАППАДОКИЯ (самолёт, 2 дня)
  //     Самый дальний, но популярный тур
  // ──────────────────────────────────────────────────────
  {
    id: 10,
    slug: 'cappadocia-2day',
    category: 'history',
    badge: 'popular',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=80',

    title: {
      ru: 'Каппадокия — 2 дня на самолёте',
      en: 'Cappadocia — 2 Days by Plane',
      tr: 'Kapadokya — Uçakla 2 Gün',
    },

    shortDesc: {
      ru: 'Скальные города, долины с туфовыми столбами и незабываемый рассвет на воздушном шаре над сказочными пейзажами. Перелёт из Анталии.',
      en: 'Cave cities, valleys with tuff pillars and an unforgettable sunrise in a hot air balloon over fairy-tale landscapes. Flight from Antalya.',
      tr: 'Kaya şehirleri, tüf sütunlu vadiler ve peri bacaları üzerinde unutulmaz sıcak hava balonu gün doğumu. Antalya\'dan uçuş.',
    },

    fullDesc: {
      ru: 'Двухдневный тур с перелётом из Анталии. День 1: долина Гёреме, скальный музей с фресками III–XI вв., Учхисар — скальная крепость, подземный город Деринкую или Каймаклы (уходит на 8 уровней под землю). Ужин и ночёвка в отеле 4*. День 2: восход на воздушном шаре над долинами (+299$) или наблюдение за шарами, долина Любви, Аванос — гончарное ремесло. Возврат в Анталию.',
      en: 'Two-day tour with a flight from Antalya. Day 1: Göreme Valley, rock museum with 3rd–11th c. frescoes, Uchisar — rock fortress, underground city of Derinkuyu or Kaymakli (8 levels underground). Dinner and night in a 4* hotel. Day 2: hot air balloon sunrise over the valleys (+$299) or watching balloons, Valley of Love, Avanos — pottery craft. Return to Antalya.',
      tr: "Antalya'dan uçuşlu 2 günlük tur. 1. Gün: Göreme Vadisi, MS 3–11. yy freskli kaya müzesi, Uçhisar kaya kalesi, Derinkuyu veya Kaymakli yeraltı şehri (8 katlı). 4* otelde akşam yemeği ve konaklama. 2. Gün: vadiler üzerinde sıcak hava balonu gün doğumu (+$299) veya balon izleme, Aşk Vadisi, Avanos çömlek sanatı. Antalya'ya dönüş.",
    },

    highlights: {
      ru: [
        'Перелёт Анталия → Кайсери → Анталия',
        'Скальный музей Гёреме (фрески III–XI вв.)',
        'Крепость Учхисар на вершине скалы',
        'Подземный город Деринкую — 8 этажей под землёй',
        'Долина Любви и долина Голубей',
        'Воздушный шар на рассвете (опционально)',
      ],
      en: [
        'Flight Antalya → Kayseri → Antalya',
        'Göreme rock museum (3rd–11th c. frescoes)',
        'Uchisar Castle on top of a rock',
        'Derinkuyu underground city — 8 floors underground',
        'Valley of Love and Pigeon Valley',
        'Hot air balloon at sunrise (optional)',
      ],
      tr: [
        'Antalya → Kayseri → Antalya uçuşu',
        'Göreme kaya müzesi (MS 3–11. yy freskleri)',
        "Kaya tepesinde Uçhisar Kalesi",
        'Derinkuyu yeraltı şehri — 8 kat yeraltı',
        'Aşk Vadisi ve Güvercinlik Vadisi',
        'Gün doğumunda sıcak hava balonu (opsiyonel)',
      ],
    },

    price: { adult: 299, child: 250, childAge: '5–12', infant: null, infantAge: 'от 5 лет' },
    currency: 'USD',

    duration: { hours: 48, label: { ru: '2 дня', en: '2 days', tr: '2 gün' } },
    distance: { km: 700, fromCity: 'Antalya' },
    departure: '07:00',
    returnTime: '22:00 (день 2)',
    schedule: {
      ru: ['Пн', 'Чт', 'Сб'],
      en: ['Mon', 'Thu', 'Sat'],
      tr: ['Pzt', 'Per', 'Cmt'],
    },

    included: {
      ru: ['Авиабилеты Анталия↔Кайсери', 'Трансферы', 'Отель 4* (1 ночь)', 'Завтрак + ужин в отеле', 'Русскоязычный гид', 'Страховка'],
      en: ['Flights Antalya↔Kayseri', 'Transfers', '4* hotel (1 night)', 'Breakfast + dinner', 'Russian-speaking guide', 'Insurance'],
      tr: ['Antalya↔Kayseri uçuşları', 'Transferler', '4* otel (1 gece)', 'Kahvaltı + akşam yemeği', 'Rusça rehber', 'Sigorta'],
    },
    notIncluded: {
      ru: ['Воздушный шар — 299$ доп.', 'Обеды', 'Входные билеты (~30–40$)', 'Личные расходы'],
      en: ['Hot air balloon — $299 extra', 'Lunches', 'Entry tickets (~$30–40)', 'Personal expenses'],
      tr: ['Sıcak hava balonu — $299 ekstra', 'Öğle yemekleri', 'Giriş biletleri (~$30–40)', 'Kişisel harcamalar'],
    },

    tip: {
      ru: '💡 Воздушный шар нужно бронировать заранее — места разбирают за недели. Берите тёплую куртку: ранним утром в Каппадокии холодно.',
      en: '💡 Book the balloon in advance — spots are taken weeks ahead. Bring a warm jacket: early morning in Cappadocia is cold.',
      tr: '💡 Balonu önceden rezerve edin — yerler haftalar öncesinden doluyor. Sıcak ceket getirin: Kapadokya\'da sabah erken soğuk olur.',
    },

    rating: 4.9,
    reviews: 890,
  },
]

// ════════════════════════════════════════════════════════
//  КАТЕГОРИИ
// ════════════════════════════════════════════════════════
export const excursionCategories = [
  { key: 'all',      emoji: '🌊', ru: 'Все',        en: 'All',        tr: 'Tümü' },
  { key: 'history',  emoji: '🏛️', ru: 'История',    en: 'History',    tr: 'Tarih' },
  { key: 'nature',   emoji: '🏔️', ru: 'Природа',    en: 'Nature',     tr: 'Doğa' },
  { key: 'sea',      emoji: '⛵', ru: 'Море',       en: 'Sea',        tr: 'Deniz' },
  { key: 'active',   emoji: '🪂', ru: 'Активный',   en: 'Active',     tr: 'Aktif' },
  { key: 'city',     emoji: '🏙️', ru: 'Город',      en: 'City',       tr: 'Şehir' },
  { key: 'wellness', emoji: '♨️', ru: 'SPA & Хамам', en: 'SPA & Bath', tr: 'SPA' },
]
