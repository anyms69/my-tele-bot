import { useState, useEffect } from 'react'
import { Search, MapPin, Thermometer, Wind, Car, Map, Anchor, ArrowRight, Compass } from 'lucide-react'
import { useT } from '../hooks/useTranslation'
import { useAppStore } from '../hooks/useStore'
import { useTelegram } from '../hooks/useTelegram'
import LangSwitcher from '../components/ui/LangSwitcher'
import ExcursionCard from '../components/ui/ExcursionCard'
import CarCard from '../components/ui/CarCard'
import { excursions, cars } from '../data'

// Mock weather data (replace with real API call)
const weatherData = {
  temp: 32,
  feels: 35,
  condition: 'sunny',
  wind: 12,
  city: 'Antalya',
}

const conditionIcons = { sunny: '☀️', cloudy: '⛅', rainy: '🌧️' }

function getGreeting(t) {
  const h = new Date().getHours()
  if (h < 12) return t.home.greeting_morning
  if (h < 18) return t.home.greeting_day
  return t.home.greeting_evening
}

// Quick access tiles
const quickTiles = [
  {
    key: 'excursions',
    icon: Map,
    page: 'excursions',
    color: 'from-sea-500 to-sea-700',
    emoji: '🗺️',
  },
  {
    key: 'cars',
    icon: Car,
    page: 'cars',
    color: 'from-teal-500 to-teal-700',
    emoji: '🚗',
  },
  {
    key: 'transfers',
    icon: Compass,
    page: 'excursions',
    color: 'from-sky-400 to-sky-600',
    emoji: '🚐',
  },
  {
    key: 'yachts',
    icon: Anchor,
    page: 'excursions',
    color: 'from-indigo-400 to-indigo-600',
    emoji: '⛵',
  },
]

export default function HomePage() {
  const { t, get, lang } = useT()
  const setActivePage = useAppStore((s) => s.setActivePage)
  const { user } = useTelegram()
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const firstName = user?.first_name || ''

  // Animate in on mount
  const [visible, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])

  const handleBook = (item) => {
    // Will connect to booking flow in next sprint
    window?.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
  }

  return (
    <div className={`min-h-screen bg-sea-50 pb-20 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* ── HERO HEADER ── */}
      <header className="relative overflow-hidden bg-hero-gradient px-4 pt-12 pb-8">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-sea-300/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />

        {/* Top row: greeting + lang switcher */}
        <div className="relative flex items-start justify-between mb-6">
          <div>
            <p className="font-body text-sea-200 text-sm mb-0.5">
              {conditionIcons[weatherData.condition]} {getGreeting(t)}
              {firstName && <span className="text-white font-semibold">, {firstName}</span>}
            </p>
            <h1 className="font-display text-white text-2xl font-bold leading-tight">
              {get('home.subtitle')}
            </h1>
            <div className="flex items-center gap-1 mt-1 text-sea-200 text-xs font-body">
              <MapPin size={11} />
              <span>{weatherData.city}</span>
            </div>
          </div>
          <LangSwitcher />
        </div>

        {/* Weather pill */}
        <div className="relative flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 mb-5 border border-white/10">
          <span className="text-3xl">{conditionIcons[weatherData.condition]}</span>
          <div>
            <div className="flex items-end gap-1">
              <span className="font-display text-white text-3xl font-bold">{weatherData.temp}°</span>
              <span className="font-body text-sea-200 text-sm pb-1">C</span>
            </div>
            <div className="font-body text-sea-200 text-xs">
              {get('home.weather_feels')} {weatherData.feels}° · <Wind className="inline" size={10} /> {weatherData.wind} км/ч
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-white font-body font-semibold text-sm capitalize">
              {t.weather[weatherData.condition]}
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sea-300" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            placeholder={get('home.search_placeholder')}
            className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl pl-10 pr-4 py-3 text-white placeholder-sea-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>
      </header>

      {/* ── QUICK ACCESS ── */}
      <section className="px-4 py-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-sea-900 font-semibold text-base">
            {get('home.section_quick')}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickTiles.map(({ key, page, color, emoji }) => (
            <button
              key={key}
              onClick={() => setActivePage(page)}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-sea text-2xl active:scale-95 transition-transform`}>
                {emoji}
              </div>
              <span className="font-body text-[11px] font-semibold text-sea-800 text-center leading-tight">
                {get(`home.card_${key}`)}
              </span>
              <span className="font-body text-[10px] text-gray-400 text-center leading-tight">
                {get(`home.card_${key}_sub`)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ── POPULAR EXCURSIONS ── */}
      <section className="py-2">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-display text-sea-900 font-semibold text-base">
            {get('home.section_popular')} — {lang === 'ru' ? 'Экскурсии' : lang === 'en' ? 'Excursions' : 'Turlar'}
          </h2>
          <button
            onClick={() => setActivePage('excursions')}
            className="flex items-center gap-1 text-sea-500 font-body text-xs font-semibold"
          >
            {get('home.see_all')} <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {excursions.map((exc) => (
            <div key={exc.id} className="snap-start">
              <ExcursionCard excursion={exc} onBook={handleBook} />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOT DEALS ── */}
      <section className="px-4 py-4">
        <div className="bg-gradient-to-br from-orange-400 to-rose-500 rounded-3xl p-4 shadow-lg overflow-hidden relative">
          <div className="absolute -right-4 -top-4 text-6xl opacity-20">🔥</div>
          <h2 className="font-display text-white font-bold text-lg mb-1">
            {get('home.section_hot')}
          </h2>
          <p className="font-body text-orange-100 text-xs mb-3">
            {lang === 'ru' ? 'Скидки до 20% на этой неделе' :
             lang === 'en' ? 'Up to 20% off this week' :
             'Bu hafta %20\'ye kadar indirim'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setActivePage('excursions')}
              className="bg-white text-orange-500 font-body font-bold text-xs px-4 py-2 rounded-xl active:scale-95 transition-transform"
            >
              {lang === 'ru' ? 'Яхт-круиз −20%' : lang === 'en' ? 'Yacht −20%' : 'Yat −%20'}
            </button>
            <button
              onClick={() => setActivePage('cars')}
              className="bg-white/20 border border-white/30 text-white font-body font-bold text-xs px-4 py-2 rounded-xl active:scale-95 transition-transform"
            >
              {lang === 'ru' ? 'Clio −15%' : `Clio −15%`}
            </button>
          </div>
        </div>
      </section>

      {/* ── POPULAR CARS ── */}
      <section className="py-2 pb-4">
        <div className="flex items-center justify-between px-4 mb-3">
          <h2 className="font-display text-sea-900 font-semibold text-base">
            {get('home.section_popular')} — {lang === 'ru' ? 'Авто' : lang === 'en' ? 'Cars' : 'Araçlar'}
          </h2>
          <button
            onClick={() => setActivePage('cars')}
            className="flex items-center gap-1 text-teal-600 font-body text-xs font-semibold"
          >
            {get('home.see_all')} <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {cars.slice(0, 3).map((car) => (
            <div key={car.id} className="snap-start">
              <CarCard car={car} onBook={handleBook} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
