// ════════════════════════════════════════════════════════
//  РЕАЛЬНЫЙ АВТОПАРК ДЛЯ АРЕНДЫ В АНТАЛИИ
//  Источники: AntalyaCars, LocalRent, GetMeCar,
//  TurkeyRentCar, FormulaAntalya (2024–2025)
//  Цены: ВЫСОКИЙ СЕЗОН (май–октябрь, USD/день)
// ════════════════════════════════════════════════════════

export const cars = [

  // ──────────────────────────────────────────────────────
  // ЭКОНОМ-КЛАСС
  // ──────────────────────────────────────────────────────

  {
    id: 1,
    slug: 'fiat-egea',
    type: 'economy',
    badge: 'popular',
    // images[0] — главное фото, остальные — галерея
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=700&q=80',
    ],
    // Поле для загружаемых пользователем фото (хранятся в Google Sheets / local storage)
    customImages: [],

    brand: 'Fiat',
    model: 'Egea',
    generation: 'Tipo',
    year: 2023,
    transmission: 'manual',   // manual | auto
    fuel: 'petrol',            // petrol | diesel | hybrid | electric
    seats: 5,
    doors: 4,
    luggage: 2,                // кол-во чемоданов ~23кг
    ac: true,
    engine: '1.4',
    power: 95,

    shortDesc: {
      ru: 'Самая популярная модель в аренде в Анталии. Экономичная, манёвренная — идеал для поездок по городу и побережью. Без депозита для эконом-класса.',
      en: 'The most popular rental car in Antalya. Fuel-efficient and nimble — perfect for city and coastal trips. No deposit for economy class.',
      tr: "Antalya'da en popüler kiralık araç. Yakıt tasarruflu ve manevra kabiliyetli — şehir ve kıyı gezileri için ideal. Ekonomi sınıfında depozito yok.",
    },

    features: [
      { icon: '❄️', ru: 'Кондиционер', en: 'Air conditioning', tr: 'Klima' },
      { icon: '📻', ru: 'Радио / AUX', en: 'Radio / AUX', tr: 'Radyo / AUX' },
      { icon: '⚡', ru: 'USB зарядка', en: 'USB charger', tr: 'USB şarj' },
      { icon: '🔒', ru: 'Центральный замок', en: 'Central lock', tr: 'Merkezi kilit' },
    ],

    // Реальные цены 2024-2025 (USD / день)
    priceDay:  28,
    priceWeek: 175,   // ~25/день
    deposit:   0,     // без депозита для эконом
    currency: 'USD',

    // Дополнительные опции
    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор',     en: 'GPS navigator',  tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло',    en: 'Child seat',     tr: 'Çocuk koltuğu' },
      { id: 'wifi',  icon: '📶', price: 7,  ru: 'Wi-Fi роутер',      en: 'Wi-Fi router',   tr: 'Wi-Fi router' },
      { id: 'driver',icon: '🧑‍✈️',price: 40, ru: 'Водитель',          en: 'Driver',         tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО (обязательная страховка)', 'Безлимитный пробег', 'Доставка в аэропорт / отель', 'Второй водитель бесплатно'],
      en: ['Third-party liability insurance', 'Unlimited mileage', 'Airport / hotel delivery', 'Second driver free'],
      tr: ['Trafik sigortası', 'Sınırsız kilometre', 'Havalimanı / otel teslimi', 'İkinci sürücü ücretsiz'],
    },
    notIncluded: {
      ru: ['КАСКО (полное КАСКО — +5$/день)', 'Штрафы за нарушения ПДД', 'Топливо'],
      en: ['Comprehensive insurance (full CASCO +$5/day)', 'Traffic fines', 'Fuel'],
      tr: ['Kasko (tam kasko +$5/gün)', 'Trafik cezaları', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 21 года, стаж от 1 года, паспорт + ВУ (на латинице)',
      en: 'Age 21+, 1+ year experience, passport + driving license (Latin script)',
      tr: 'Yaş 21+, 1+ yıl deneyim, pasaport + sürücü belgesi (Latin alfabesi)',
    },

    tip: {
      ru: '💡 Fiat Egea — самая распространённая машина в аренде по всей Турции. Запчасти везде, сервисов много.',
      en: '💡 Fiat Egea is the most widely rented car across Turkey. Parts are everywhere, service is easy to find.',
      tr: '💡 Fiat Egea, Türkiye\'nin her yerinde en yaygın kiralık araçtır. Yedek parça her yerde, servis bulmak kolay.',
    },

    rating: 4.6,
    reviews: 312,
    available: true,
  },

  {
    id: 2,
    slug: 'renault-clio',
    type: 'economy',
    badge: 'popular',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=700&q=80',
    ],
    customImages: [],

    brand: 'Renault',
    model: 'Clio',
    generation: 'V',
    year: 2023,
    transmission: 'auto',
    fuel: 'petrol',
    seats: 5,
    doors: 4,
    luggage: 2,
    ac: true,
    engine: '1.0 TCe',
    power: 90,

    shortDesc: {
      ru: 'Renault Clio с автоматом — лучший выбор для тех, кто не хочет механику. Современный салон, экономный мотор, удобно в городском трафике Анталии.',
      en: 'Renault Clio automatic — best choice if you prefer auto. Modern interior, fuel-efficient engine, comfortable in Antalya city traffic.',
      tr: "Renault Clio otomatik — manuel istemeyenler için en iyi seçim. Modern iç mekan, yakıt tasarruflu motor, Antalya şehir trafiğinde rahat.",
    },

    features: [
      { icon: '❄️', ru: 'Кондиционер', en: 'Air conditioning', tr: 'Klima' },
      { icon: '📱', ru: 'Android Auto / CarPlay', en: 'Android Auto / CarPlay', tr: 'Android Auto / CarPlay' },
      { icon: '⚡', ru: 'USB зарядка', en: 'USB charger', tr: 'USB şarj' },
      { icon: '📷', ru: 'Камера заднего вида', en: 'Rear camera', tr: 'Geri görüş kamerası' },
    ],

    priceDay:  33,
    priceWeek: 210,
    deposit:   0,
    currency: 'USD',

    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор',   en: 'GPS navigator', tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло',  en: 'Child seat',    tr: 'Çocuk koltuğu' },
      { id: 'wifi',  icon: '📶', price: 7,  ru: 'Wi-Fi роутер',    en: 'Wi-Fi router',  tr: 'Wi-Fi router' },
      { id: 'driver',icon: '🧑‍✈️',price: 40, ru: 'Водитель',        en: 'Driver',        tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО', 'Безлимитный пробег', 'Доставка в аэропорт / отель', 'Второй водитель бесплатно'],
      en: ['Third-party insurance', 'Unlimited mileage', 'Airport / hotel delivery', 'Second driver free'],
      tr: ['Trafik sigortası', 'Sınırsız km', 'Havalimanı / otel teslimi', 'İkinci sürücü ücretsiz'],
    },
    notIncluded: {
      ru: ['КАСКО — +5$/день', 'Штрафы', 'Топливо'],
      en: ['Full insurance — +$5/day', 'Fines', 'Fuel'],
      tr: ['Kasko — +$5/gün', 'Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 21 года, стаж от 1 года, паспорт + ВУ',
      en: 'Age 21+, 1+ year, passport + driving license',
      tr: 'Yaş 21+, 1+ yıl, pasaport + sürücü belgesi',
    },

    tip: {
      ru: '💡 Автомат — огромный плюс в горных серпантинах вокруг Анталии и в пробках на трассе Анталия — Кемер.',
      en: '💡 Automatic is a big advantage on the mountain roads around Antalya and in traffic on the Antalya–Kemer highway.',
      tr: '💡 Otomatik, Antalya çevresindeki dağ yollarında ve Antalya–Kemer yolundaki trafikte büyük avantaj.',
    },

    rating: 4.7,
    reviews: 284,
    available: true,
  },

  {
    id: 3,
    slug: 'hyundai-i20',
    type: 'economy',
    badge: null,
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=700&q=80',
    ],
    customImages: [],

    brand: 'Hyundai',
    model: 'i20',
    generation: 'III',
    year: 2022,
    transmission: 'manual',
    fuel: 'petrol',
    seats: 5,
    doors: 4,
    luggage: 2,
    ac: true,
    engine: '1.2',
    power: 84,

    shortDesc: {
      ru: 'Корейская надёжность по цене эконома. Просторнее Clio и Egea внутри — хорошо подходит для пар и небольших семей. Самый популярный хэтчбек на DiscoverCars в Анталии.',
      en: 'Korean reliability at economy price. More spacious than Clio and Egea inside — great for couples and small families. The most booked hatchback on DiscoverCars in Antalya.',
      tr: "Ekonomi fiyatına Kore güvenilirliği. Clio ve Egea'dan içeride daha geniş — çiftler ve küçük aileler için ideal. Antalya'da DiscoverCars'ta en çok rezerve edilen hatchback.",
    },

    features: [
      { icon: '❄️', ru: 'Кондиционер', en: 'Air conditioning', tr: 'Klima' },
      { icon: '📻', ru: 'Bluetooth', en: 'Bluetooth', tr: 'Bluetooth' },
      { icon: '⚡', ru: 'USB зарядка', en: 'USB charger', tr: 'USB şarj' },
    ],

    priceDay:  30,
    priceWeek: 190,
    deposit:   0,
    currency: 'USD',

    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор', en: 'GPS navigator', tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло', en: 'Child seat',   tr: 'Çocuk koltuğu' },
      { id: 'driver',icon: '🧑‍✈️',price: 40, ru: 'Водитель',      en: 'Driver',       tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО', 'Безлимитный пробег', 'Доставка в аэропорт / отель'],
      en: ['Third-party insurance', 'Unlimited mileage', 'Airport / hotel delivery'],
      tr: ['Trafik sigortası', 'Sınırsız km', 'Havalimanı / otel teslimi'],
    },
    notIncluded: {
      ru: ['КАСКО — +5$/день', 'Штрафы', 'Топливо'],
      en: ['Full insurance — +$5/day', 'Fines', 'Fuel'],
      tr: ['Kasko — +$5/gün', 'Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 21 года, стаж от 1 года, паспорт + ВУ',
      en: 'Age 21+, 1+ year, passport + driving license',
      tr: 'Yaş 21+, 1+ yıl, pasaport + sürücü belgesi',
    },

    tip: {
      ru: '💡 Hyundai i20 — по данным DiscoverCars, самая часто арендуемая машина в Анталии в 2024 году.',
      en: '💡 Hyundai i20 — according to DiscoverCars, the most rented car in Antalya in 2024.',
      tr: '💡 Hyundai i20 — DiscoverCars verilerine göre 2024\'te Antalya\'da en çok kiralanan araç.',
    },

    rating: 4.6,
    reviews: 198,
    available: true,
  },

  // ──────────────────────────────────────────────────────
  // КОМФОРТ / СРЕДНИЙ КЛАСС
  // ──────────────────────────────────────────────────────

  {
    id: 4,
    slug: 'toyota-corolla',
    type: 'comfort',
    badge: 'popular',
    images: [
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=700&q=80',
    ],
    customImages: [],

    brand: 'Toyota',
    model: 'Corolla',
    generation: 'XII',
    year: 2023,
    transmission: 'auto',
    fuel: 'hybrid',
    seats: 5,
    doors: 4,
    luggage: 3,
    ac: true,
    engine: '1.8 Hybrid',
    power: 122,

    shortDesc: {
      ru: 'Самый экономичный на топливо вариант среднего класса. Гибрид — расход 4–5 л/100 км. Тихий, просторный, автомат. Идеален для длинных поездок Анталия–Памуккале и Анталия–Кекова.',
      en: 'Most fuel-efficient mid-size option. Hybrid — 4–5L/100km. Quiet, spacious, automatic. Ideal for long trips Antalya–Pamukkale or Antalya–Kekova.',
      tr: "Orta sınıfın en yakıt tasarruflu seçeneği. Hibrit — 4–5L/100km. Sessiz, geniş, otomatik. Antalya–Pamukkale veya Antalya–Kekova uzun yolculukları için ideal.",
    },

    features: [
      { icon: '🔋', ru: 'Гибридный двигатель', en: 'Hybrid engine', tr: 'Hibrit motor' },
      { icon: '❄️', ru: 'Климат-контроль', en: 'Climate control', tr: 'İklim kontrolü' },
      { icon: '📱', ru: 'Apple CarPlay', en: 'Apple CarPlay', tr: 'Apple CarPlay' },
      { icon: '📷', ru: 'Камера 360°', en: '360° camera', tr: '360° kamera' },
      { icon: '🛡️', ru: 'Lane assist', en: 'Lane assist', tr: 'Şerit takip' },
    ],

    priceDay:  42,
    priceWeek: 265,
    deposit:   150,
    currency: 'USD',

    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор',   en: 'GPS navigator', tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло',  en: 'Child seat',    tr: 'Çocuk koltuğu' },
      { id: 'wifi',  icon: '📶', price: 7,  ru: 'Wi-Fi роутер',    en: 'Wi-Fi router',  tr: 'Wi-Fi router' },
      { id: 'driver',icon: '🧑‍✈️',price: 40, ru: 'Водитель',        en: 'Driver',        tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО', 'Безлимитный пробег', 'Доставка в аэропорт / отель', 'Второй водитель бесплатно'],
      en: ['Third-party insurance', 'Unlimited mileage', 'Airport / hotel delivery', 'Second driver free'],
      tr: ['Trafik sigortası', 'Sınırsız km', 'Havalimanı / otel teslimi', 'İkinci sürücü ücretsiz'],
    },
    notIncluded: {
      ru: ['КАСКО — +7$/день', 'Штрафы', 'Топливо'],
      en: ['Full insurance — +$7/day', 'Fines', 'Fuel'],
      tr: ['Kasko — +$7/gün', 'Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 21 года, стаж от 1 года, паспорт + ВУ, депозит 150$',
      en: 'Age 21+, 1+ year, passport + driving license, $150 deposit',
      tr: 'Yaş 21+, 1+ yıl, pasaport + sürücü belgesi, $150 depozit',
    },

    tip: {
      ru: '💡 Гибрид экономит ~30% на бензине по сравнению с обычным авто. При поездках на дальние маршруты разница ощутима.',
      en: '💡 Hybrid saves ~30% on fuel compared to regular cars. Noticeable on long routes.',
      tr: '💡 Hibrit, normal araçlara göre yakıtta ~%30 tasarruf sağlıyor. Uzun güzergahlarda fark belirgin.',
    },

    rating: 4.9,
    reviews: 176,
    available: true,
  },

  // ──────────────────────────────────────────────────────
  // SUV / КРОССОВЕРЫ
  // ──────────────────────────────────────────────────────

  {
    id: 5,
    slug: 'nissan-qashqai',
    type: 'suv',
    badge: 'hot',
    images: [
      'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=700&q=80',
    ],
    customImages: [],

    brand: 'Nissan',
    model: 'Qashqai',
    generation: 'III',
    year: 2023,
    transmission: 'auto',
    fuel: 'petrol',
    seats: 5,
    doors: 5,
    luggage: 4,
    ac: true,
    engine: '1.3 DIG-T',
    power: 158,

    shortDesc: {
      ru: 'Самый популярный кроссовер в аренде в Турции. Высокая посадка, автомат, просторный багажник. Одинаково хорош на трассе, в горных серпантинах и на грунтовых дорогах к пляжам.',
      en: 'The most popular crossover rental in Turkey. High seating, automatic, spacious boot. Equally good on highways, mountain roads and dirt tracks to beaches.',
      tr: "Türkiye'de en popüler kiralık crossover. Yüksek oturuş, otomatik, geniş bagaj. Otobanda, dağ yollarında ve sahil patikalarında eşit derecede iyi.",
    },

    features: [
      { icon: '❄️', ru: 'Климат-контроль', en: 'Climate control', tr: 'İklim kontrolü' },
      { icon: '📱', ru: 'Android Auto / CarPlay', en: 'Android Auto / CarPlay', tr: 'Android Auto / CarPlay' },
      { icon: '📷', ru: 'Камера заднего вида', en: 'Rear camera', tr: 'Geri görüş kamerası' },
      { icon: '⛽', ru: 'Экономичный мотор', en: 'Fuel-efficient engine', tr: 'Yakıt tasarruflu motor' },
      { icon: '🛣️', ru: 'Адаптивный круиз', en: 'Adaptive cruise', tr: 'Adaptif hız sabitleyici' },
    ],

    priceDay:  52,
    priceWeek: 330,
    deposit:   200,
    currency: 'USD',

    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор',   en: 'GPS navigator', tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло',  en: 'Child seat',    tr: 'Çocuk koltuğu' },
      { id: 'wifi',  icon: '📶', price: 7,  ru: 'Wi-Fi роутер',    en: 'Wi-Fi router',  tr: 'Wi-Fi router' },
      { id: 'rack',  icon: '🏂', price: 10, ru: 'Багажник на крышу', en: 'Roof rack',   tr: 'Çatı bagajı' },
      { id: 'driver',icon: '🧑‍✈️',price: 40, ru: 'Водитель',        en: 'Driver',        tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО', 'Безлимитный пробег', 'Доставка в аэропорт / отель', 'Второй водитель бесплатно'],
      en: ['Third-party insurance', 'Unlimited mileage', 'Airport / hotel delivery', 'Second driver free'],
      tr: ['Trafik sigortası', 'Sınırsız km', 'Havalimanı / otel teslimi', 'İkinci sürücü ücretsiz'],
    },
    notIncluded: {
      ru: ['КАСКО — +8$/день', 'Штрафы', 'Топливо'],
      en: ['Full insurance — +$8/day', 'Fines', 'Fuel'],
      tr: ['Kasko — +$8/gün', 'Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 21 года, стаж от 2 лет, паспорт + ВУ, депозит 200$',
      en: 'Age 21+, 2+ years, passport + driving license, $200 deposit',
      tr: 'Yaş 21+, 2+ yıl, pasaport + sürücü belgesi, $200 depozit',
    },

    tip: {
      ru: '💡 Для поездок в Каппадокию, Памуккале и горные районы — Qashqai комфортнее, чем седан. Большой клиренс спасёт на грунтовках.',
      en: '💡 For Cappadocia, Pamukkale and mountain areas — Qashqai is more comfortable than a sedan. Good clearance helps on dirt roads.',
      tr: '💡 Kapadokya, Pamukkale ve dağlık bölgeler için — Qashqai bir sedandan daha rahat. Yüksek marj toprak yollarda kurtarır.',
    },

    rating: 4.8,
    reviews: 241,
    available: true,
  },

  {
    id: 6,
    slug: 'dacia-duster',
    type: 'suv',
    badge: null,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80',
    ],
    customImages: [],

    brand: 'Dacia',
    model: 'Duster',
    generation: 'II',
    year: 2022,
    transmission: 'manual',
    fuel: 'petrol',
    seats: 5,
    doors: 5,
    luggage: 3,
    ac: true,
    engine: '1.6',
    power: 114,

    shortDesc: {
      ru: 'Бюджетный внедорожник — дешевле Qashqai, но с большим клиренсом. Лучший выбор для поездок по горным дорогам Тавра, к диким пляжам и в труднодоступные места.',
      en: 'Budget 4x4 — cheaper than Qashqai but with better clearance. Best for mountain roads in the Taurus, wild beaches and off-the-beaten-track destinations.',
      tr: "Bütçe dostu SUV — Qashqai'den ucuz ama daha yüksek marjlı. Toroslar'daki dağ yolları, ücra plajlar ve zorlu rotalar için en iyi seçim.",
    },

    features: [
      { icon: '🏔️', ru: 'Высокий клиренс (210 мм)', en: 'High clearance (210mm)', tr: 'Yüksek marj (210mm)' },
      { icon: '❄️', ru: 'Кондиционер', en: 'Air conditioning', tr: 'Klima' },
      { icon: '📻', ru: 'Bluetooth', en: 'Bluetooth', tr: 'Bluetooth' },
      { icon: '💰', ru: 'Лучшая цена в классе', en: 'Best price in class', tr: 'Sınıfının en iyi fiyatı' },
    ],

    priceDay:  38,
    priceWeek: 240,
    deposit:   150,
    currency: 'USD',

    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор', en: 'GPS navigator', tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло', en: 'Child seat',   tr: 'Çocuk koltuğu' },
      { id: 'driver',icon: '🧑‍✈️',price: 40, ru: 'Водитель',      en: 'Driver',       tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО', 'Безлимитный пробег', 'Доставка в аэропорт / отель'],
      en: ['Third-party insurance', 'Unlimited mileage', 'Airport / hotel delivery'],
      tr: ['Trafik sigortası', 'Sınırsız km', 'Havalimanı / otel teslimi'],
    },
    notIncluded: {
      ru: ['КАСКО — +7$/день', 'Штрафы', 'Топливо'],
      en: ['Full insurance — +$7/day', 'Fines', 'Fuel'],
      tr: ['Kasko — +$7/gün', 'Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 21 года, стаж от 1 года, паспорт + ВУ, депозит 150$',
      en: 'Age 21+, 1+ year, passport + driving license, $150 deposit',
      tr: 'Yaş 21+, 1+ yıl, pasaport + sürücü belgesi, $150 depozit',
    },

    tip: {
      ru: '💡 Duster — выбор для тех, кто планирует ехать к скрытым пляжам Чиралы, Адрасан или в горы. На грунтовке не застрянет.',
      en: '💡 Duster — the pick for those heading to hidden beaches like Çıralı, Adrasan or into the mountains. Won\'t get stuck on dirt roads.',
      tr: '💡 Duster — Çıralı, Adrasan gibi saklı plajlara veya dağlara gidecekler için seçim. Toprak yolda sıkışmaz.',
    },

    rating: 4.5,
    reviews: 134,
    available: true,
  },

  // ──────────────────────────────────────────────────────
  // МИНИВЭН
  // ──────────────────────────────────────────────────────

  {
    id: 7,
    slug: 'mercedes-vito',
    type: 'minivan',
    badge: null,
    images: [
      'https://images.unsplash.com/photo-1570733577524-3a047079e80d?w=700&q=80',
    ],
    customImages: [],

    brand: 'Mercedes',
    model: 'Vito',
    generation: 'W447',
    year: 2022,
    transmission: 'auto',
    fuel: 'diesel',
    seats: 8,
    doors: 4,
    luggage: 8,
    ac: true,
    engine: '2.1 CDI',
    power: 136,

    shortDesc: {
      ru: 'Лучший выбор для семьи или группы до 8 человек. Огромный багажник, автомат, дизель — экономичен на длинных маршрутах. Часто используется для аренды с водителем.',
      en: 'Best choice for a family or group of up to 8. Huge boot, automatic, diesel — economical on long routes. Often rented with a driver.',
      tr: "8 kişiye kadar aile veya grup için en iyi seçim. Dev bagaj, otomatik, dizel — uzun güzergahlarda ekonomik. Genellikle şoförlü kiralanır.",
    },

    features: [
      { icon: '👨‍👩‍👧‍👦', ru: '8 мест', en: '8 seats', tr: '8 koltuk' },
      { icon: '❄️', ru: 'Климат-контроль', en: 'Climate control', tr: 'İklim kontrolü' },
      { icon: '🎵', ru: 'Мультимедиа система', en: 'Multimedia system', tr: 'Multimedya sistemi' },
      { icon: '⛽', ru: 'Дизель — экономичный', en: 'Diesel — economical', tr: 'Dizel — ekonomik' },
      { icon: '🧳', ru: 'Багажник на 8 чемоданов', en: 'Fits 8 large suitcases', tr: '8 büyük bavul kapasitesi' },
    ],

    priceDay:  75,
    priceWeek: 470,
    deposit:   300,
    currency: 'USD',

    extras: [
      { id: 'gps',   icon: '🗺️', price: 5,  ru: 'GPS-навигатор',   en: 'GPS navigator',       tr: 'GPS navigasyon' },
      { id: 'seat',  icon: '👶', price: 5,  ru: 'Детское кресло',  en: 'Child seat',           tr: 'Çocuk koltuğu' },
      { id: 'wifi',  icon: '📶', price: 7,  ru: 'Wi-Fi роутер',    en: 'Wi-Fi router',         tr: 'Wi-Fi router' },
      { id: 'driver',icon: '🧑‍✈️',price: 45, ru: 'Водитель',        en: 'Driver',               tr: 'Şoför' },
    ],

    included: {
      ru: ['ОСАГО', 'Безлимитный пробег', 'Доставка в аэропорт / отель', 'Второй водитель бесплатно'],
      en: ['Third-party insurance', 'Unlimited mileage', 'Airport / hotel delivery', 'Second driver free'],
      tr: ['Trafik sigortası', 'Sınırsız km', 'Havalimanı / otel teslimi', 'İkinci sürücü ücretsiz'],
    },
    notIncluded: {
      ru: ['КАСКО — +10$/день', 'Штрафы', 'Топливо'],
      en: ['Full insurance — +$10/day', 'Fines', 'Fuel'],
      tr: ['Kasko — +$10/gün', 'Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 25 лет, стаж от 3 лет, паспорт + ВУ, депозит 300$',
      en: 'Age 25+, 3+ years, passport + driving license, $300 deposit',
      tr: 'Yaş 25+, 3+ yıl, pasaport + sürücü belgesi, $300 depozit',
    },

    tip: {
      ru: '💡 Для группы 5–8 человек минивэн часто выгоднее, чем 2 отдельных авто. Удобно ехать всем вместе.',
      en: '💡 For groups of 5–8, a minivan is often cheaper than 2 separate cars. Everyone travels together.',
      tr: '💡 5–8 kişilik gruplar için minivan genellikle 2 ayrı araçtan daha uygun. Herkes birlikte gider.',
    },

    rating: 4.7,
    reviews: 98,
    available: true,
  },

  // ──────────────────────────────────────────────────────
  // ПРЕМИУМ
  // ──────────────────────────────────────────────────────

  {
    id: 8,
    slug: 'mercedes-c-class',
    type: 'premium',
    badge: 'new',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=700&q=80',
    ],
    customImages: [],

    brand: 'Mercedes',
    model: 'C-Class',
    generation: 'W206',
    year: 2024,
    transmission: 'auto',
    fuel: 'petrol',
    seats: 5,
    doors: 4,
    luggage: 3,
    ac: true,
    engine: '2.0 Turbo',
    power: 204,

    shortDesc: {
      ru: 'Флагман премиум-аренды в Анталии. Новый Mercedes W206 2024 года: цифровая приборная панель, массаж передних сидений, запах из флакона в салоне. Для деловых поездок и особых случаев.',
      en: 'Flagship premium rental in Antalya. New Mercedes W206 2024: digital dashboard, front seat massage, in-car fragrance. For business trips and special occasions.',
      tr: "Antalya'nın en üst premium kiralık aracı. Yeni Mercedes W206 2024: dijital gösterge paneli, ön koltuk masajı, araç içi koku. İş seyahatleri ve özel günler için.",
    },

    features: [
      { icon: '💺', ru: 'Массаж передних сидений', en: 'Front seat massage', tr: 'Ön koltuk masajı' },
      { icon: '📱', ru: 'MBUX + CarPlay + Android', en: 'MBUX + CarPlay + Android', tr: 'MBUX + CarPlay + Android' },
      { icon: '🌡️', ru: 'Многозонный климат', en: 'Multi-zone climate', tr: 'Çok bölgeli iklim' },
      { icon: '🔊', ru: 'Burmester аудиосистема', en: 'Burmester audio', tr: 'Burmester ses sistemi' },
      { icon: '🛡️', ru: 'Пакет Driver Assist', en: 'Driver Assist package', tr: 'Driver Assist paketi' },
    ],

    priceDay:  95,
    priceWeek: 595,
    deposit:   500,
    currency: 'USD',

    extras: [
      { id: 'driver',icon: '🧑‍✈️',price: 50, ru: 'Личный водитель', en: 'Personal driver', tr: 'Özel şoför' },
      { id: 'wifi',  icon: '📶', price: 7,  ru: 'Wi-Fi роутер',    en: 'Wi-Fi router',   tr: 'Wi-Fi router' },
    ],

    included: {
      ru: ['ОСАГО', 'КАСКО включено', 'Безлимитный пробег', 'Доставка в аэропорт / отель', 'Второй водитель бесплатно'],
      en: ['Third-party + full CASCO included', 'Unlimited mileage', 'Airport / hotel delivery', 'Second driver free'],
      tr: ['Trafik sigortası + kasko dahil', 'Sınırsız km', 'Havalimanı / otel teslimi', 'İkinci sürücü ücretsiz'],
    },
    notIncluded: {
      ru: ['Штрафы', 'Топливо'],
      en: ['Fines', 'Fuel'],
      tr: ['Cezalar', 'Yakıt'],
    },

    requirements: {
      ru: 'Возраст от 25 лет, стаж от 3 лет, паспорт + ВУ, депозит 500$',
      en: 'Age 25+, 3+ years, passport + driving license, $500 deposit',
      tr: 'Yaş 25+, 3+ yıl, pasaport + sürücü belgesi, $500 depozit',
    },

    tip: {
      ru: '💡 КАСКО уже включена в стоимость — никаких доплат. Звоните за 48 часов для гарантии наличия конкретного авто.',
      en: '💡 Full insurance already included — no extra charges. Call 48 hours ahead to guarantee a specific car is available.',
      tr: '💡 Kasko fiyata dahil — ek ücret yok. Belirli bir aracın mevcut olduğundan emin olmak için 48 saat önceden arayın.',
    },

    rating: 4.9,
    reviews: 67,
    available: true,
  },
]

// ════════════════════════════════════════════════════════
//  ТИПЫ АВТО (для фильтра)
// ════════════════════════════════════════════════════════
export const carTypes = [
  { key: 'all',     emoji: '🚗', ru: 'Все',       en: 'All',       tr: 'Tümü' },
  { key: 'economy', emoji: '💸', ru: 'Эконом',    en: 'Economy',   tr: 'Ekonomi' },
  { key: 'comfort', emoji: '🛋️', ru: 'Комфорт',   en: 'Comfort',   tr: 'Konfor' },
  { key: 'suv',     emoji: '🏔️', ru: 'SUV',       en: 'SUV',       tr: 'SUV' },
  { key: 'minivan', emoji: '👨‍👩‍👧‍👦', ru: 'Минивэн',  en: 'Minivan',   tr: 'Minivan' },
  { key: 'premium', emoji: '💎', ru: 'Премиум',   en: 'Premium',   tr: 'Premium' },
]
