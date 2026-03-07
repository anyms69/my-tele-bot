export const translations = {
  ru: {
    nav: {
      home: 'Главная',
      excursions: 'Экскурсии',
      cars: 'Авто',
      bookings: 'Брони',
    },
    home: {
      greeting_morning: 'Доброе утро',
      greeting_day: 'Добрый день',
      greeting_evening: 'Добрый вечер',
      subtitle: 'Откройте лучшее из Анталии',
      weather_feels: 'Ощущается как',
      search_placeholder: 'Экскурсии, авто, маршруты...',
      section_quick: 'Быстрый доступ',
      section_popular: 'Популярное',
      section_hot: '🔥 Горящие предложения',
      card_excursions: 'Экскурсии',
      card_excursions_sub: '30+ маршрутов',
      card_cars: 'Аренда авто',
      card_cars_sub: 'От €15/день',
      card_transfers: 'Трансфер',
      card_transfers_sub: 'Аэропорт — отель',
      card_yachts: 'Яхты',
      card_yachts_sub: 'Морские прогулки',
      see_all: 'Все',
      book_now: 'Забронировать',
      from_price: 'от',
      per_day: '/день',
      per_person: '/чел',
      duration: 'Длит.',
      hours: 'ч',
      days: 'дн',
      stars: 'звёзд',
      rating: 'Рейтинг',
      popular_badge: 'Популярное',
      hot_badge: 'Горящее',
      new_badge: 'Новинка',
    },
    weather: {
      sunny: 'Солнечно',
      cloudy: 'Облачно',
      rainy: 'Дождь',
    }
  },
  en: {
    nav: {
      home: 'Home',
      excursions: 'Excursions',
      cars: 'Cars',
      bookings: 'Bookings',
    },
    home: {
      greeting_morning: 'Good morning',
      greeting_day: 'Good afternoon',
      greeting_evening: 'Good evening',
      subtitle: 'Discover the best of Antalya',
      weather_feels: 'Feels like',
      search_placeholder: 'Excursions, cars, routes...',
      section_quick: 'Quick access',
      section_popular: 'Popular',
      section_hot: '🔥 Hot deals',
      card_excursions: 'Excursions',
      card_excursions_sub: '30+ routes',
      card_cars: 'Car Rental',
      card_cars_sub: 'From €15/day',
      card_transfers: 'Transfer',
      card_transfers_sub: 'Airport — Hotel',
      card_yachts: 'Yachts',
      card_yachts_sub: 'Sea trips',
      see_all: 'All',
      book_now: 'Book now',
      from_price: 'from',
      per_day: '/day',
      per_person: '/person',
      duration: 'Dur.',
      hours: 'h',
      days: 'd',
      stars: 'stars',
      rating: 'Rating',
      popular_badge: 'Popular',
      hot_badge: 'Hot',
      new_badge: 'New',
    },
    weather: {
      sunny: 'Sunny',
      cloudy: 'Cloudy',
      rainy: 'Rainy',
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      excursions: 'Turlar',
      cars: 'Araç',
      bookings: 'Rezervasyonlar',
    },
    home: {
      greeting_morning: 'Günaydın',
      greeting_day: 'İyi günler',
      greeting_evening: 'İyi akşamlar',
      subtitle: "Antalya'nın en iyisini keşfedin",
      weather_feels: 'Hissedilen',
      search_placeholder: 'Turlar, araçlar, rotalar...',
      section_quick: 'Hızlı erişim',
      section_popular: 'Popüler',
      section_hot: '🔥 Fırsatlar',
      card_excursions: 'Turlar',
      card_excursions_sub: '30+ rota',
      card_cars: 'Araç Kiralama',
      card_cars_sub: "€15'ten/gün",
      card_transfers: 'Transfer',
      card_transfers_sub: 'Havalimanı — Otel',
      card_yachts: 'Yatlar',
      card_yachts_sub: 'Deniz gezileri',
      see_all: 'Tümü',
      book_now: 'Rezervasyon',
      from_price: 'den',
      per_day: '/gün',
      per_person: '/kişi',
      duration: 'Süre',
      hours: 's',
      days: 'g',
      stars: 'yıldız',
      rating: 'Puan',
      popular_badge: 'Popüler',
      hot_badge: 'Fırsat',
      new_badge: 'Yeni',
    },
    weather: {
      sunny: 'Güneşli',
      cloudy: 'Bulutlu',
      rainy: 'Yağmurlu',
    }
  }
}

export const getLang = () => {
  try {
    const tgLang = window?.Telegram?.WebApp?.initDataUnsafe?.user?.language_code
    if (tgLang === 'tr') return 'tr'
    if (tgLang === 'en') return 'en'
    return 'ru'
  } catch {
    return 'ru'
  }
}
