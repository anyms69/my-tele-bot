import { useState, useEffect } from 'react'
import {
  Search, Clock, MapPin, ChevronDown, ChevronUp,
  X, Check, RefreshCw, Wifi, WifiOff
} from 'lucide-react'
import { useT } from '../hooks/useTranslation'
import { useAppStore } from '../hooks/useStore'
import { excursions as localExcursions, excursionCategories } from '../data/excursions'
import { useSheetExcursions } from '../hooks/useGoogleSheets'
import Badge from '../components/ui/Badge'
import StarRating from '../components/ui/StarRating'

// ── Иконки категорий ─────────────────────────────────────
const categoryIcon = {
  history: '🏛️', nature: '🏔️', sea: '⛵',
  active: '🪂', city: '🏙️', wellness: '♨️', all: '🌊',
}

// ── Детальная карточка (bottom sheet) ───────────────────
function ExcursionSheet({ exc, onClose, onBook, lang }) {
  const { get } = useT()
  const [showMore, setShowMore] = useState(false)

  if (!exc) return null

  const total = exc.price?.adult || 0

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto">

        {/* ── Image header ── */}
        <div className="relative h-56 overflow-hidden rounded-t-3xl flex-shrink-0">
          <img src={exc.image} alt={exc.title[lang]} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          <button onClick={onClose}
            className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white rounded-full p-2">
            <X size={18} />
          </button>

          <div className="absolute top-4 left-4 flex gap-2">
            <Badge type={exc.badge} />
            <span className="bg-black/30 backdrop-blur-sm text-white text-[10px] font-body font-bold px-2 py-1 rounded-full">
              {categoryIcon[exc.category]} {excursionCategories.find(c => c.key === exc.category)?.[lang] || exc.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-12">
            <h2 className="font-display text-white text-xl font-bold leading-snug">
              {exc.title[lang]}
            </h2>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-4 space-y-4">

          {/* Stats */}
          <div className="flex items-center gap-4 flex-wrap">
            <StarRating rating={exc.rating} reviews={exc.reviews} />
            <span className="flex items-center gap-1 text-gray-500 text-xs font-body">
              <Clock size={12} /> {exc.duration?.label?.[lang] || `${exc.duration?.hours}h`}
            </span>
            {exc.distance?.km > 0 && (
              <span className="flex items-center gap-1 text-gray-500 text-xs font-body">
                <MapPin size={12} /> {exc.distance.km} км
              </span>
            )}
          </div>

          {/* Short description */}
          <p className="font-body text-gray-600 text-sm leading-relaxed border-l-2 border-sea-300 pl-3">
            {exc.shortDesc?.[lang]}
          </p>

          {/* Full description toggle */}
          {exc.fullDesc?.[lang] && (
            <div>
              {showMore && (
                <p className="font-body text-gray-600 text-sm leading-relaxed mb-2">
                  {exc.fullDesc[lang]}
                </p>
              )}
              <button onClick={() => setShowMore(!showMore)}
                className="text-sea-500 font-body font-semibold text-xs flex items-center gap-1">
                {showMore
                  ? <>{lang === 'ru' ? 'Свернуть' : lang === 'en' ? 'Less' : 'Daha az'} <ChevronUp size={13} /></>
                  : <>{lang === 'ru' ? 'Читать полностью' : lang === 'en' ? 'Read more' : 'Daha fazla'} <ChevronDown size={13} /></>}
              </button>
            </div>
          )}

          {/* Highlights */}
          {exc.highlights?.[lang]?.length > 0 && (
            <div className="bg-sea-50 rounded-2xl p-3 space-y-2">
              <p className="font-body font-bold text-sea-800 text-xs uppercase tracking-wide">
                {lang === 'ru' ? '✅ Что вы увидите' : lang === 'en' ? '✅ What you\'ll see' : '✅ Görecekleriniz'}
              </p>
              {exc.highlights[lang].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check size={13} className="text-teal-500 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-gray-700 text-xs leading-snug">{item}</span>
                </div>
              ))}
            </div>
          )}

          {/* Schedule + departure */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 text-xs font-body">📅</span>
            {exc.schedule?.[lang]?.map((d, i) => (
              <span key={i} className="bg-sea-100 text-sea-700 font-body font-semibold text-xs px-2 py-0.5 rounded-full">
                {d}
              </span>
            ))}
            {exc.departure && exc.departure !== 'гибко' && (
              <span className="text-gray-400 font-body text-xs">
                {exc.departure}{exc.returnTime ? ` → ${exc.returnTime}` : ''}
              </span>
            )}
          </div>

          {/* Included / Not included */}
          <div className="space-y-1 border-t border-sea-100 pt-3">
            <p className="font-body font-bold text-sea-800 text-xs uppercase tracking-wide mb-2">
              {lang === 'ru' ? 'Что включено' : lang === 'en' ? 'Included' : 'Dahil'}
            </p>
            {exc.included?.[lang]?.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-teal-500 text-sm leading-none">✓</span>
                <span className="font-body text-gray-700 text-xs">{item}</span>
              </div>
            ))}
            {exc.notIncluded?.[lang]?.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="font-body text-gray-400 text-xs font-semibold mt-2">
                  {lang === 'ru' ? 'Не включено:' : lang === 'en' ? 'Not included:' : 'Dahil değil:'}
                </p>
                {exc.notIncluded[lang].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm leading-none">✗</span>
                    <span className="font-body text-gray-400 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tip */}
          {exc.tip?.[lang] && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2.5">
              <p className="font-body text-amber-800 text-xs leading-relaxed">{exc.tip[lang]}</p>
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-end justify-between pt-2 border-t border-sea-100">
            <div className="space-y-0.5">
              <div>
                <span className="text-xs text-gray-400 font-body">
                  {lang === 'ru' ? 'Взрослый от ' : lang === 'en' ? 'Adult from ' : 'Yetişkin '}
                </span>
                <span className="text-2xl font-display font-bold text-sea-700">
                  ${exc.price?.adult}
                </span>
              </div>
              {exc.price?.child > 0 && (
                <div className="text-xs text-gray-400 font-body">
                  {lang === 'ru' ? `Ребёнок (${exc.price.childAge} л.)` :
                   lang === 'en' ? `Child (${exc.price.childAge} y.)` :
                   `Çocuk (${exc.price.childAge})`} — ${exc.price.child}
                </div>
              )}
              {exc.price?.infant === 0 && exc.price?.infantAge && (
                <div className="text-xs text-teal-600 font-body font-semibold">
                  {lang === 'ru' ? `До ${exc.price.infantAge} — бесплатно` :
                   lang === 'en' ? `Under ${exc.price.infantAge} — free` :
                   `${exc.price.infantAge} altı — ücretsiz`}
                </div>
              )}
            </div>

            <button
              onClick={() => onBook?.(exc)}
              className="bg-sea-gradient text-white font-body font-bold px-6 py-3 rounded-2xl shadow-sea hover:opacity-90 active:scale-95 transition-all">
              {get('home.book_now')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Карточка в списке ────────────────────────────────────
function ExcursionCard({ exc, onClick, lang }) {
  return (
    <div
      onClick={() => onClick(exc)}
      className="bg-white rounded-2xl shadow-card overflow-hidden flex cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Фото */}
      <div className="relative w-28 flex-shrink-0">
        <img src={exc.image} alt={exc.title[lang]}
          className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        <div className="absolute top-2 left-1.5">
          <Badge type={exc.badge} />
        </div>
        {/* Категория */}
        <div className="absolute bottom-1.5 left-1.5 bg-black/40 backdrop-blur-sm rounded-full px-1.5 py-0.5">
          <span className="text-[10px]">{categoryIcon[exc.category]}</span>
        </div>
      </div>

      {/* Контент */}
      <div className="flex-1 p-3 min-w-0 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-semibold text-sea-900 text-sm leading-tight mb-1 line-clamp-2">
            {exc.title[lang]}
          </h3>
          <p className="font-body text-gray-500 text-xs leading-snug line-clamp-2 mb-2">
            {exc.shortDesc?.[lang]}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StarRating rating={exc.rating} />
            <span className="flex items-center gap-0.5 text-gray-400 text-xs font-body">
              <Clock size={10} /> {exc.duration?.hours}ч
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-body">от </span>
            <span className="font-display font-bold text-sea-700 text-sm">${exc.price?.adult}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Главная страница экскурсий ───────────────────────────
export default function ExcursionsPage() {
  const { lang, get } = useT()

  const { data: sheetData, loading, error, source, refetch } = useSheetExcursions(localExcursions)

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 30) }, [])

  const filtered = sheetData.filter((exc) => {
    const matchCat = activeCategory === 'all' || exc.category === activeCategory
    const q = search.toLowerCase()
    const matchQ = !q
      || exc.title[lang]?.toLowerCase().includes(q)
      || exc.shortDesc?.[lang]?.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  const setPendingBooking = useAppStore((s) => s.setPendingBooking)
  const setActivePage     = useAppStore((s) => s.setActivePage)

  const handleBook = (exc) => {
    window?.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium')
    setPendingBooking({ type: 'excursion', item: exc })
    setSelected(null)
    setActivePage('booking')
  }

  return (
    <div className={`min-h-screen bg-sea-50 pb-24 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>

      {/* ── Header ── */}
      <header className="relative bg-hero-gradient px-4 pt-12 pb-5 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-teal-400/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="font-display text-white text-2xl font-bold">
              {lang === 'ru' ? 'Экскурсии' : lang === 'en' ? 'Excursions' : 'Turlar'}
            </h1>
            <p className="font-body text-sea-200 text-xs mt-0.5">
              {lang === 'ru' ? `${sheetData.length} туров из региона Анталия` :
               lang === 'en' ? `${sheetData.length} tours from Antalya region` :
               `Antalya bölgesinden ${sheetData.length} tur`}
            </p>
          </div>

          {/* Источник данных + refresh */}
          <div className="flex items-center gap-2 mt-1">
            <button onClick={refetch} disabled={loading}
              className="bg-white/20 backdrop-blur-sm text-white p-1.5 rounded-full">
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            </button>
            <span className="flex items-center gap-1 text-white/70 text-[10px] font-body">
              {source === 'sheets'
                ? <><Wifi size={10} /> Sheets</>
                : <><WifiOff size={10} /> Local</>}
            </span>
          </div>
        </div>

        {/* Поиск */}
        <div className="relative mt-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sea-300" size={14} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={get('home.search_placeholder')}
            className="w-full bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl pl-10 pr-4 py-2.5 text-white placeholder-sea-300 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </header>

      {/* ── Фильтр категорий ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-sea-100 px-4 py-2.5">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {excursionCategories.map(({ key, emoji, ru, en, tr: trLabel }) => {
            const label = lang === 'ru' ? ru : lang === 'en' ? en : trLabel
            const active = activeCategory === key
            return (
              <button key={key} onClick={() => setActiveCategory(key)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full font-body font-semibold text-xs transition-all ${
                  active
                    ? 'bg-sea-600 text-white shadow-sm'
                    : 'bg-sea-50 text-gray-500 border border-sea-100 hover:border-sea-300'
                }`}>
                <span>{emoji}</span>
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Счётчик ── */}
      <div className="px-4 pt-3 pb-1 flex items-center justify-between">
        <p className="font-body text-gray-400 text-xs">
          {lang === 'ru' ? `Найдено: ${filtered.length}` :
           lang === 'en' ? `Found: ${filtered.length}` :
           `Bulundu: ${filtered.length}`}
        </p>
        {error && (
          <p className="font-body text-orange-400 text-xs">
            ⚠️ {lang === 'ru' ? 'Нет связи с Sheets' : 'Sheets offline'}
          </p>
        )}
      </div>

      {/* ── Список ── */}
      <div className="px-4 space-y-3">
        {loading ? (
          // Скелетон
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden flex h-28 animate-pulse">
              <div className="w-28 bg-sea-100 flex-shrink-0" />
              <div className="flex-1 p-3 space-y-2">
                <div className="h-3 bg-sea-100 rounded w-3/4" />
                <div className="h-2 bg-sea-50 rounded w-full" />
                <div className="h-2 bg-sea-50 rounded w-2/3" />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-body text-sea-400 text-sm">
              {lang === 'ru' ? 'Ничего не найдено' : lang === 'en' ? 'Nothing found' : 'Bulunamadı'}
            </p>
          </div>
        ) : (
          filtered.map((exc) => (
            <ExcursionCard key={exc.id} exc={exc} lang={lang} onClick={setSelected} />
          ))
        )}
      </div>

      {/* ── Detail Sheet ── */}
      {selected && (
        <ExcursionSheet
          exc={selected}
          lang={lang}
          onClose={() => setSelected(null)}
          onBook={handleBook}
        />
      )}
    </div>
  )
}
