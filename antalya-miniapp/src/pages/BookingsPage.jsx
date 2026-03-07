import { useState } from 'react'
import { Clock, CheckCircle2, XCircle, MapPin, Car, Calendar, ChevronRight, Trash2, Phone, MessageCircle } from 'lucide-react'
import { useT } from '../hooks/useTranslation'
import { useAppStore } from '../hooks/useStore'

// ── Статус-бейдж ─────────────────────────────────────────
function StatusBadge({ status, lang }) {
  const map = {
    pending: { ru: 'Ожидает',   en: 'Pending',   tr: 'Bekliyor', color: 'bg-amber-100 text-amber-700',  icon: <Clock size={11}/> },
    paid:    { ru: 'Оплачено',  en: 'Paid',      tr: 'Ödendi',   color: 'bg-teal-100  text-teal-700',   icon: <CheckCircle2 size={11}/> },
    confirmed:{ ru: 'Подтверждено', en: 'Confirmed', tr: 'Onaylandı', color: 'bg-sea-100 text-sea-700', icon: <CheckCircle2 size={11}/> },
    cancelled:{ ru: 'Отменено', en: 'Cancelled', tr: 'İptal',    color: 'bg-red-100   text-red-600',    icon: <XCircle size={11}/> },
  }
  const s = map[status] || map.pending
  return (
    <span className={`inline-flex items-center gap-1 font-body font-bold text-[10px] px-2 py-0.5 rounded-full ${s.color}`}>
      {s.icon} {s[lang]}
    </span>
  )
}

// ── Карточка брони ────────────────────────────────────────
function BookingCard({ booking, lang, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const isExc = booking.type === 'excursion'

  const dateStr = isExc
    ? booking.date
    : `${booking.pickupDate} → ${booking.returnDate}`

  const guestsStr = isExc
    ? `${booking.adults} взр.${booking.children > 0 ? ` + ${booking.children} дет.` : ''}`
    : `${booking.rentalDays} ${lang === 'ru' ? 'дн.' : lang === 'en' ? 'days' : 'gün'} · ${booking.pickupLocation}`

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Верхняя часть — всегда видна */}
      <div className="p-4" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start gap-3">
          {/* Иконка типа */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isExc ? 'bg-sea-100' : 'bg-teal-100'}`}>
            {isExc ? <MapPin size={18} className="text-sea-600" /> : <Car size={18} className="text-teal-600" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <h3 className="font-display font-bold text-sea-900 text-sm truncate">{booking.itemTitle}</h3>
              <StatusBadge status={booking.status} lang={lang} />
            </div>

            <div className="flex items-center gap-3 text-gray-400 text-xs font-body">
              <span className="flex items-center gap-1">
                <Calendar size={11}/> {dateStr}
              </span>
            </div>
            <p className="font-body text-gray-500 text-xs mt-0.5">{guestsStr}</p>
          </div>

          <ChevronRight size={16} className={`text-sea-300 flex-shrink-0 transition-transform mt-1 ${expanded ? 'rotate-90' : ''}`} />
        </div>

        {/* Цена */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-sea-50">
          <span className="font-body text-gray-400 text-xs">
            #{booking.id?.slice(-8).toUpperCase()}
          </span>
          <span className="font-display font-bold text-sea-700 text-lg">${booking.totalPrice}</span>
        </div>
      </div>

      {/* Развёрнутые детали */}
      {expanded && (
        <div className="border-t border-sea-50 px-4 pb-4 pt-3 space-y-3">
          {[
            { label: lang === 'ru' ? 'Имя' : lang === 'en' ? 'Name' : 'Ad', value: booking.name },
            { label: lang === 'ru' ? 'Телефон' : 'Phone', value: booking.phone },
            booking.pickupLocation && !isExc
              ? { label: lang === 'ru' ? 'Место' : 'Location', value: booking.pickupLocation }
              : null,
            booking.extras?.length
              ? { label: lang === 'ru' ? 'Опции' : 'Extras', value: booking.extras.join(', ') }
              : null,
            booking.comment
              ? { label: lang === 'ru' ? 'Комментарий' : 'Comment', value: booking.comment }
              : null,
          ].filter(Boolean).map((row, i) => (
            <div key={i} className="flex gap-3">
              <span className="font-body text-gray-400 text-xs w-20 flex-shrink-0 pt-0.5">{row.label}</span>
              <span className="font-body text-sea-800 text-xs font-semibold flex-1">{row.value}</span>
            </div>
          ))}

          {/* Кнопки действий */}
          <div className="flex gap-2 pt-1">
            <a
              href={`tel:${booking.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-sea-50 border border-sea-200 text-sea-700 font-body font-bold text-xs py-2.5 rounded-xl active:scale-95 transition-all"
            >
              <Phone size={13}/> {lang === 'ru' ? 'Позвонить' : lang === 'en' ? 'Call' : 'Ara'}
            </a>
            {booking.telegramUsername && (
              <a
                href={`https://t.me/${booking.telegramUsername}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-sea-600 text-white font-body font-bold text-xs py-2.5 rounded-xl active:scale-95 transition-all"
              >
                <MessageCircle size={13}/> Telegram
              </a>
            )}
            <button
              onClick={() => onDelete(booking.id)}
              className="w-10 flex items-center justify-center bg-red-50 border border-red-200 text-red-400 rounded-xl active:scale-95 transition-all"
            >
              <Trash2 size={14}/>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════
//  ГЛАВНАЯ СТРАНИЦА — МОИ БРОНИ
// ════════════════════════════════════════════════════════
export default function BookingsPage() {
  const { lang } = useT()
  const bookings = useAppStore((s) => s.bookings)
  const removeBooking = useAppStore((s) => s.removeBooking)
  const setActivePage = useAppStore((s) => s.setActivePage)
  const [filter, setFilter] = useState('all') // all | excursion | car

  const L = {
    ru: { title: 'Мои брони', empty: 'Нет бронирований', emptySub: 'Здесь появятся ваши заявки', excursions: 'Экскурсии', cars: 'Авто', all: 'Все', goBook: 'Забронировать' },
    en: { title: 'My Bookings', empty: 'No bookings yet', emptySub: 'Your requests will appear here', excursions: 'Excursions', cars: 'Cars', all: 'All', goBook: 'Book now' },
    tr: { title: 'Rezervasyonlarım', empty: 'Henüz rezervasyon yok', emptySub: 'Talepleriniz burada görünecek', excursions: 'Turlar', cars: 'Araçlar', all: 'Tümü', goBook: 'Rezervasyon' },
  }[lang]

  const filtered = bookings.filter(b => filter === 'all' || b.type === filter)

  const counts = {
    all: bookings.length,
    excursion: bookings.filter(b => b.type === 'excursion').length,
    car: bookings.filter(b => b.type === 'car').length,
  }

  return (
    <div className="min-h-screen bg-sea-50 pb-24">

      {/* Header */}
      <header className="bg-hero-gradient px-4 pt-12 pb-6">
        <h1 className="font-display text-white text-2xl font-bold">{L.title}</h1>
        <p className="font-body text-sea-200 text-xs mt-0.5">
          {bookings.length > 0
            ? `${bookings.length} ${lang === 'ru' ? 'заявок' : lang === 'en' ? 'bookings' : 'rezervasyon'}`
            : L.emptySub}
        </p>
      </header>

      {/* Фильтр */}
      <div className="px-4 py-3 flex gap-2">
        {[
          { key: 'all',       label: L.all,        emoji: '📋' },
          { key: 'excursion', label: L.excursions,  emoji: '🗺️' },
          { key: 'car',       label: L.cars,        emoji: '🚗' },
        ].map(({ key, label, emoji }) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-body font-semibold text-xs transition-all ${
              filter === key
                ? 'bg-sea-600 text-white shadow-sm'
                : 'bg-white text-gray-500 border border-sea-100'
            }`}>
            {emoji} {label}
            {counts[key] > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${filter === key ? 'bg-white/20 text-white' : 'bg-sea-100 text-sea-600'}`}>
                {counts[key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Список */}
      <div className="px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="font-display text-sea-800 font-bold text-lg mb-1">{L.empty}</p>
            <p className="font-body text-gray-400 text-sm mb-6">{L.emptySub}</p>
            <button
              onClick={() => setActivePage('excursions')}
              className="bg-sea-gradient text-white font-body font-bold px-6 py-3 rounded-2xl shadow-sea active:scale-95 transition-all"
            >
              {L.goBook}
            </button>
          </div>
        ) : (
          filtered.map(b => (
            <BookingCard key={b.id} booking={b} lang={lang} onDelete={removeBooking} />
          ))
        )}
      </div>
    </div>
  )
}
