import { useState, useEffect, useCallback } from 'react'
import {
  Search, Users, Briefcase, Fuel, Settings2, ChevronDown, ChevronUp,
  X, Check, Plus, RefreshCw, Wifi, WifiOff, Star, Edit3
} from 'lucide-react'
import { useT } from '../hooks/useTranslation'
import { useAppStore } from '../hooks/useStore'
import { cars as localCars, carTypes } from '../data/cars'
import { ImageUploader } from '../hooks/useImageManager'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'

// ── Переводы для трансмиссии и топлива ───────────────────
const TRANS = {
  manual: { ru: 'Механика', en: 'Manual', tr: 'Manuel' },
  auto:   { ru: 'Автомат',  en: 'Automatic', tr: 'Otomatik' },
}
const FUEL = {
  petrol:   { ru: 'Бензин', en: 'Petrol', tr: 'Benzin',  icon: '⛽' },
  diesel:   { ru: 'Дизель', en: 'Diesel', tr: 'Dizel',   icon: '🛢️' },
  hybrid:   { ru: 'Гибрид', en: 'Hybrid', tr: 'Hibrit',  icon: '🔋' },
  electric: { ru: 'Электро',en: 'Electric',tr: 'Elektrik',icon: '⚡' },
}

// ── Детальная карточка авто ───────────────────────────────
function CarSheet({ car, onClose, onBook, lang }) {
  const { get } = useT()
  const [showExtras, setShowExtras] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  if (!car) return null

  const trans = TRANS[car.transmission]?.[lang] || car.transmission
  const fuel  = FUEL[car.fuel]

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-t-3xl max-h-[92vh] overflow-y-auto">

        {/* ── Фото ── */}
        <div className="relative h-52 bg-sea-100 rounded-t-3xl overflow-hidden flex-shrink-0">
          {/* Главное фото */}
          <img
            src={car.images?.[activeImage] || car.images?.[0] || ''}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <button onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white rounded-full p-2">
            <X size={18} />
          </button>

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge type={car.badge} />
            <span className="bg-black/30 backdrop-blur-sm text-white text-[10px] font-body font-bold px-2 py-1 rounded-full">
              {carTypes.find(t => t.key === car.type)?.emoji} {carTypes.find(t => t.key === car.type)?.[lang]}
            </span>
          </div>

          {/* Превью галереи */}
          {(car.images?.length || 0) > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {car.images.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeImage ? 'bg-white w-3' : 'bg-white/50'}`} />
              ))}
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <h2 className="font-display text-white text-xl font-bold">
              {car.brand} {car.model}
            </h2>
            <p className="font-body text-sea-200 text-xs">{car.generation} · {car.year}</p>
          </div>
        </div>

        {/* ── Управление фото (toggle) ── */}
        <div className="px-4 pt-3">
          <button onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-1.5 text-sea-500 font-body font-semibold text-xs">
            <Edit3 size={12} />
            {lang === 'ru' ? (editMode ? 'Скрыть редактор фото' : 'Управление фото') :
             lang === 'en' ? (editMode ? 'Hide photo editor' : 'Manage photos') :
             (editMode ? 'Fotoğraf düzenlemeyi gizle' : 'Fotoğrafları yönet')}
          </button>

          {editMode && (
            <div className="mt-2 p-3 bg-sea-50 rounded-2xl">
              <p className="font-body text-sea-700 text-xs font-semibold mb-2">
                {lang === 'ru' ? '📸 Добавьте свои фото авто' :
                 lang === 'en' ? '📸 Add your car photos' :
                 '📸 Araç fotoğraflarınızı ekleyin'}
              </p>
              <ImageUploader
                entityType="car"
                entityId={car.id}
                fallbackUrl={car.images?.[0]}
                lang={lang}
              />
            </div>
          )}
        </div>

        {/* ── Контент ── */}
        <div className="p-4 space-y-4">

          {/* Рейтинг + цена */}
          <div className="flex items-center justify-between">
            <StarRating rating={car.rating} reviews={car.reviews} size="md" />
            <div className="text-right">
              <div>
                <span className="text-xs text-gray-400 font-body">{lang === 'ru' ? 'от ' : 'from '}</span>
                <span className="text-2xl font-display font-bold text-sea-700">${car.priceDay}</span>
                <span className="text-xs text-gray-400 font-body">/день</span>
              </div>
              <div className="text-xs text-teal-600 font-body font-semibold">
                ${car.priceWeek} {lang === 'ru' ? '/ неделя' : lang === 'en' ? '/ week' : '/ hafta'}
              </div>
            </div>
          </div>

          {/* Краткое описание */}
          <p className="font-body text-gray-600 text-sm leading-relaxed border-l-2 border-sea-300 pl-3">
            {car.shortDesc?.[lang]}
          </p>

          {/* Характеристики */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Users size={14}/>,    label: `${car.seats} ${lang === 'ru' ? 'мест' : lang === 'en' ? 'seats' : 'koltuk'}` },
              { icon: <Briefcase size={14}/>, label: `${car.luggage} ${lang === 'ru' ? 'чемодана' : lang === 'en' ? 'bags' : 'bavul'}` },
              { icon: <span className="text-sm">{TRANS[car.transmission] ? '⚙️' : '⚙️'}</span>, label: trans },
              { icon: <span className="text-sm">{fuel?.icon}</span>, label: fuel?.[lang] },
              { icon: <Settings2 size={14}/>, label: `${car.engine} · ${car.power} л.с.` },
              { icon: <span className="text-sm">💰</span>, label: car.deposit === 0 ? (lang === 'ru' ? 'Без депозита' : lang === 'en' ? 'No deposit' : 'Depozito yok') : `Депозит $${car.deposit}` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-sea-50 rounded-xl px-3 py-2">
                <span className="text-sea-500 flex-shrink-0">{item.icon}</span>
                <span className="font-body text-sea-800 text-xs font-semibold">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Фичи */}
          {car.features?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {car.features.map((f, i) => (
                <span key={i} className="bg-white border border-sea-100 text-sea-700 font-body text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                  {f.icon} {f[lang] || f.ru}
                </span>
              ))}
            </div>
          )}

          {/* Включено */}
          <div className="space-y-1.5 border-t border-sea-100 pt-3">
            <p className="font-body font-bold text-sea-800 text-xs uppercase tracking-wide mb-2">
              {lang === 'ru' ? 'Включено' : lang === 'en' ? 'Included' : 'Dahil'}
            </p>
            {car.included?.[lang]?.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check size={13} className="text-teal-500 flex-shrink-0" />
                <span className="font-body text-gray-700 text-xs">{item}</span>
              </div>
            ))}
            {car.notIncluded?.[lang]?.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="font-body text-gray-400 text-xs font-semibold mt-2">
                  {lang === 'ru' ? 'Не включено:' : lang === 'en' ? 'Not included:' : 'Dahil değil:'}
                </p>
                {car.notIncluded[lang].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm leading-none">✗</span>
                    <span className="font-body text-gray-400 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Доп. опции */}
          {car.extras?.length > 0 && (
            <>
              <button onClick={() => setShowExtras(!showExtras)}
                className="w-full flex items-center justify-between py-2 border-t border-sea-100">
                <span className="font-body font-semibold text-sea-800 text-sm">
                  {lang === 'ru' ? '➕ Дополнительные опции' : lang === 'en' ? '➕ Extras' : '➕ Ekstra seçenekler'}
                </span>
                {showExtras ? <ChevronUp size={15} className="text-sea-400" /> : <ChevronDown size={15} className="text-sea-400" />}
              </button>
              {showExtras && (
                <div className="grid grid-cols-2 gap-2 pb-1">
                  {car.extras.map((ex) => (
                    <div key={ex.id} className="bg-sea-50 border border-sea-100 rounded-xl px-3 py-2">
                      <div className="text-lg mb-0.5">{ex.icon}</div>
                      <div className="font-body text-sea-800 text-xs font-semibold leading-tight">{ex[lang] || ex.ru}</div>
                      <div className="font-body text-teal-600 text-xs font-bold mt-0.5">+${ex.price}/день</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Требования */}
          {car.requirements?.[lang] && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2.5">
              <p className="font-body text-amber-800 text-xs leading-relaxed">
                📋 {car.requirements[lang]}
              </p>
            </div>
          )}

          {/* Совет */}
          {car.tip?.[lang] && (
            <div className="bg-sea-50 border border-sea-100 rounded-2xl px-3 py-2.5">
              <p className="font-body text-sea-700 text-xs leading-relaxed">{car.tip[lang]}</p>
            </div>
          )}

          {/* CTA */}
          <div className="flex gap-3 pt-2 border-t border-sea-100">
            <button onClick={() => onBook?.(car)}
              className="flex-1 bg-sea-gradient text-white font-body font-bold py-3.5 rounded-2xl shadow-sea hover:opacity-90 active:scale-95 transition-all">
              {lang === 'ru' ? '🚗 Забронировать' : lang === 'en' ? '🚗 Book now' : '🚗 Rezervasyon'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Карточка в списке ────────────────────────────────────
function CarCard({ car, onClick, lang }) {
  const trans = TRANS[car.transmission]?.[lang] || car.transmission
  const fuel  = FUEL[car.fuel]

  return (
    <div onClick={() => onClick(car)}
      className="bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">

      {/* Фото */}
      <div className="relative h-40 overflow-hidden bg-sea-100">
        <img
          src={car.images?.[0] || ''}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <Badge type={car.badge} />
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-black/30 backdrop-blur-sm text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full">
            {carTypes.find(t => t.key === car.type)?.emoji} {carTypes.find(t => t.key === car.type)?.[lang]}
          </span>
        </div>
        <div className="absolute bottom-2 left-3">
          <h3 className="font-display text-white font-bold text-base leading-tight">
            {car.brand} {car.model}
          </h3>
          <p className="font-body text-sea-200 text-[11px]">{car.year} · {trans}</p>
        </div>
      </div>

      {/* Контент */}
      <div className="p-3">
        {/* Характеристики */}
        <div className="flex items-center gap-3 text-gray-500 text-xs font-body mb-2">
          <span className="flex items-center gap-1"><Users size={11}/> {car.seats}</span>
          <span className="flex items-center gap-1"><Briefcase size={11}/> {car.luggage}</span>
          <span className="flex items-center gap-1">{fuel?.icon} {fuel?.[lang]}</span>
          {car.deposit === 0 && (
            <span className="text-teal-600 font-semibold">
              {lang === 'ru' ? '✓ Без залога' : lang === 'en' ? '✓ No deposit' : '✓ Depozito yok'}
            </span>
          )}
        </div>

        {/* Цена */}
        <div className="flex items-center justify-between">
          <StarRating rating={car.rating} reviews={car.reviews} />
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-body">от </span>
            <span className="font-display font-bold text-sea-700 text-lg">${car.priceDay}</span>
            <span className="text-[10px] text-gray-400 font-body">/день</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Главная страница авто ────────────────────────────────
export default function CarsPage() {
  const { lang, get } = useT()
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('all')
  const [selected, setSelected]   = useState(null)
  const [visible,  setVisible]    = useState(false)
  // Используем локальные данные (позже можно подключить Google Sheets так же, как экскурсии)
  const [carsData] = useState(localCars)

  useEffect(() => { setTimeout(() => setVisible(true), 30) }, [])

  const filtered = carsData.filter((car) => {
    const matchType = activeType === 'all' || car.type === activeType
    const q = search.toLowerCase()
    const matchQ = !q
      || `${car.brand} ${car.model}`.toLowerCase().includes(q)
      || car.shortDesc?.[lang]?.toLowerCase().includes(q)
    return matchType && matchQ && car.available !== false
  })

  const setPendingBooking = useAppStore((s) => s.setPendingBooking)
  const setActivePage     = useAppStore((s) => s.setActivePage)

  const handleBook = (car) => {
    window?.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
    setPendingBooking({ type: 'car', item: car })
    setSelected(null)
    setActivePage('booking')
  }

  return (
    <div className={`min-h-screen bg-sea-50 pb-24 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* ── Header ── */}
      <header className="relative bg-hero-gradient px-4 pt-12 pb-5 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />
        <h1 className="font-display text-white text-2xl font-bold">
          {lang === 'ru' ? 'Аренда авто' : lang === 'en' ? 'Car Rental' : 'Araç Kiralama'}
        </h1>
        <p className="font-body text-sea-200 text-xs mt-0.5 mb-4">
          {lang === 'ru' ? `${carsData.length} автомобилей · Доставка в аэропорт и отель` :
           lang === 'en' ? `${carsData.length} cars · Airport & hotel delivery` :
           `${carsData.length} araç · Havalimanı ve otel teslimi`}
        </p>

        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sea-300" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ru' ? 'Марка, модель, тип...' : lang === 'en' ? 'Brand, model, type...' : 'Marka, model...'}
            className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-sea-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </header>

      {/* ── Фильтр типов ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-sea-100 px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {carTypes.map(({ key, emoji, ru, en, tr: trLabel }) => {
            const label = lang === 'ru' ? ru : lang === 'en' ? en : trLabel
            const active = activeType === key
            const count = key === 'all' ? carsData.length : carsData.filter(c => c.type === key).length
            return (
              <button key={key} onClick={() => setActiveType(key)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full font-body font-semibold text-xs transition-all ${
                  active
                    ? 'bg-sea-600 text-white shadow-sm'
                    : 'bg-sea-50 text-gray-500 border border-sea-100 hover:border-sea-300'
                }`}>
                <span>{emoji}</span>
                <span>{label}</span>
                <span className={`text-[10px] ml-0.5 ${active ? 'text-sea-200' : 'text-gray-400'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Инфо-полоска ── */}
      <div className="px-4 py-3 flex items-center gap-3 bg-teal-50 border-b border-teal-100">
        <span className="text-teal-600 text-lg">✅</span>
        <p className="font-body text-teal-700 text-xs leading-tight">
          {lang === 'ru' ? 'Все авто — бесплатная доставка в аэропорт и отель. Эконом-класс — без депозита.' :
           lang === 'en' ? 'All cars — free airport & hotel delivery. Economy class — no deposit.' :
           'Tüm araçlar — ücretsiz havalimanı ve otel teslimi. Ekonomi sınıfı — depozitosu yok.'}
        </p>
      </div>

      {/* ── Счётчик ── */}
      <div className="px-4 pt-3 pb-1">
        <p className="font-body text-gray-400 text-xs">
          {lang === 'ru' ? `Найдено: ${filtered.length}` :
           lang === 'en' ? `Found: ${filtered.length}` :
           `Bulundu: ${filtered.length}`}
        </p>
      </div>

      {/* ── Сетка ── */}
      <div className="px-4 grid grid-cols-1 gap-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-body text-sea-400 text-sm">
              {lang === 'ru' ? 'Ничего не найдено' : lang === 'en' ? 'Nothing found' : 'Bulunamadı'}
            </p>
          </div>
        ) : (
          filtered.map((car) => (
            <CarCard key={car.id} car={car} lang={lang} onClick={setSelected} />
          ))
        )}
      </div>

      {/* ── Detail Sheet ── */}
      {selected && (
        <CarSheet
          car={selected}
          lang={lang}
          onClose={() => setSelected(null)}
          onBook={handleBook}
        />
      )}
    </div>
  )
}
