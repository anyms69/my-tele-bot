import { useState, useEffect, useCallback } from 'react'
import {
  ArrowLeft, User, Phone, Calendar, Users, Car,
  MapPin, MessageSquare, Check, X, Loader2,
  CreditCard, Send, ChevronLeft, ChevronRight,
  AlertCircle, CheckCircle2, Clock, Briefcase
} from 'lucide-react'
import { useT } from '../hooks/useTranslation'
import { useAppStore } from '../hooks/useStore'
import { useTelegramBot } from '../hooks/useTelegramBot'
import { useSheetBooking } from '../hooks/useGoogleSheets'

// ════════════════════════════════════════════════════════
//  КОНСТАНТЫ
// ════════════════════════════════════════════════════════

// Места получения авто
const PICKUP_LOCATIONS = {
  ru: ['Аэропорт Анталия (AYT)', 'Центр Анталии', 'Кемер', 'Белек', 'Алания', 'Сиде', 'Лара', 'Доставка в отель'],
  en: ['Antalya Airport (AYT)', 'Antalya Center', 'Kemer', 'Belek', 'Alanya', 'Side', 'Lara', 'Hotel delivery'],
  tr: ['Antalya Havalimanı (AYT)', 'Antalya Merkez', 'Kemer', 'Belek', 'Alanya', 'Side', 'Lara', 'Otel teslimat'],
}

// ════════════════════════════════════════════════════════
//  МИНИ-КОМПОНЕНТЫ
// ════════════════════════════════════════════════════════

// Поле ввода
function Field({ label, error, children }) {
  return (
    <div className="space-y-1">
      {label && <label className="font-body text-sea-800 text-xs font-semibold">{label}</label>}
      {children}
      {error && (
        <p className="font-body text-red-500 text-xs flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

// Инпут
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-sea-400" size={15} />}
      <input
        {...props}
        className={`w-full bg-sea-50 border ${props.error ? 'border-red-300' : 'border-sea-100'} rounded-2xl py-3 font-body text-sm text-sea-900 placeholder-sea-300 focus:outline-none focus:ring-2 focus:ring-sea-300 transition-all ${Icon ? 'pl-10 pr-4' : 'px-4'}`}
      />
    </div>
  )
}

// Мини-шаговый индикатор
function StepDots({ total, current }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`rounded-full transition-all duration-300 ${
          i === current ? 'w-5 h-2 bg-sea-600' :
          i < current  ? 'w-2 h-2 bg-teal-400' :
                         'w-2 h-2 bg-sea-200'
        }`} />
      ))}
    </div>
  )
}

// Счётчик людей
function Counter({ value, onChange, min = 0, max = 20, label }) {
  return (
    <div className="flex items-center justify-between bg-sea-50 border border-sea-100 rounded-2xl px-4 py-3">
      <span className="font-body text-sea-800 text-sm font-semibold">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full bg-white border border-sea-200 flex items-center justify-center text-sea-600 font-bold active:scale-90 transition-all"
        >−</button>
        <span className="font-display font-bold text-sea-800 text-lg w-6 text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full bg-sea-600 flex items-center justify-center text-white font-bold active:scale-90 transition-all"
        >+</button>
      </div>
    </div>
  )
}

// Простой inline-выбор даты
function DatePicker({ value, onChange, label, minDate, lang }) {
  const [open, setOpen] = useState(false)
  const today = new Date()
  const min = minDate ? new Date(minDate) : today

  // Генерируем следующие 90 дней
  const days = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  }).filter(d => d >= min)

  const months = [...new Set(days.map(d => `${d.getFullYear()}-${d.getMonth()}`))]

  const formatDate = (d) => {
    if (!d) return ''
    const date = new Date(d)
    return date.toLocaleDateString(
      lang === 'ru' ? 'ru-RU' : lang === 'tr' ? 'tr-TR' : 'en-GB',
      { day: 'numeric', month: 'short', year: 'numeric' }
    )
  }

  const isoDate = (d) => d.toISOString().split('T')[0]

  return (
    <div className="space-y-1">
      {label && <label className="font-body text-sea-800 text-xs font-semibold">{label}</label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-3 bg-sea-50 border ${value ? 'border-sea-400' : 'border-sea-100'} rounded-2xl px-4 py-3 text-left transition-all`}
      >
        <Calendar size={15} className={value ? 'text-sea-600' : 'text-sea-300'} />
        <span className={`font-body text-sm flex-1 ${value ? 'text-sea-900 font-semibold' : 'text-sea-300'}`}>
          {value ? formatDate(value) : (lang === 'ru' ? 'Выберите дату' : lang === 'en' ? 'Select date' : 'Tarih seç')}
        </span>
        {value && (
          <button type="button" onClick={(e) => { e.stopPropagation(); onChange('') }}
            className="text-sea-400 hover:text-red-400">
            <X size={13} />
          </button>
        )}
      </button>

      {open && (
        <div className="bg-white border border-sea-100 rounded-2xl shadow-card overflow-hidden max-h-64 overflow-y-auto">
          {months.map(monthKey => {
            const [y, m] = monthKey.split('-').map(Number)
            const monthDays = days.filter(d => d.getFullYear() === y && d.getMonth() === m)
            const monthName = new Date(y, m).toLocaleDateString(
              lang === 'ru' ? 'ru-RU' : lang === 'tr' ? 'tr-TR' : 'en-GB',
              { month: 'long', year: 'numeric' }
            )
            return (
              <div key={monthKey}>
                <div className="px-4 py-2 bg-sea-50 font-body text-sea-600 text-xs font-bold uppercase tracking-wide sticky top-0">
                  {monthName}
                </div>
                <div className="grid grid-cols-4 gap-1 p-2">
                  {monthDays.map(d => {
                    const iso = isoDate(d)
                    const selected = value === iso
                    const dayNum = d.getDate()
                    const dayName = d.toLocaleDateString(
                      lang === 'ru' ? 'ru-RU' : lang === 'tr' ? 'tr-TR' : 'en-GB',
                      { weekday: 'short' }
                    )
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => { onChange(iso); setOpen(false) }}
                        className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                          selected ? 'bg-sea-600 text-white' : 'hover:bg-sea-50 text-sea-800'
                        }`}
                      >
                        <span className="font-body text-[10px] opacity-60">{dayName}</span>
                        <span className="font-display font-bold text-sm">{dayNum}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ════════════════════════════════════════════════════════
//  ИТОГОВЫЙ ЭКРАН — УСПЕХ
// ════════════════════════════════════════════════════════
function SuccessScreen({ booking, lang, onDone }) {
  const L = {
    ru: { title: 'Заявка отправлена!', sub: 'Мы свяжемся с вами в течение 15 минут для подтверждения.', id: 'Номер заявки', done: 'Отлично!', bookings: 'Мои брони' },
    en: { title: 'Booking sent!', sub: 'We will contact you within 15 minutes to confirm.', id: 'Booking ID', done: 'Great!', bookings: 'My bookings' },
    tr: { title: 'Rezervasyon gönderildi!', sub: '15 dakika içinde onay için sizinle iletişime geçeceğiz.', id: 'Rezervasyon no', done: 'Harika!', bookings: 'Rezervasyonlarım' },
  }[lang]

  return (
    <div className="min-h-screen bg-sea-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-6 animate-float">
        <CheckCircle2 size={48} className="text-teal-500" />
      </div>
      <h2 className="font-display text-sea-900 text-2xl font-bold mb-2">{L.title}</h2>
      <p className="font-body text-gray-500 text-sm mb-6 leading-relaxed">{L.sub}</p>

      <div className="bg-white rounded-2xl shadow-card px-6 py-4 w-full max-w-xs mb-8 space-y-3">
        <div className="flex justify-between text-sm font-body">
          <span className="text-gray-400">{L.id}</span>
          <span className="text-sea-700 font-bold font-mono">{booking.id?.slice(-8).toUpperCase()}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-gray-400">{lang === 'ru' ? 'Услуга' : lang === 'en' ? 'Service' : 'Hizmet'}</span>
          <span className="text-sea-800 font-semibold text-right max-w-[55%] truncate">{booking.itemTitle}</span>
        </div>
        <div className="flex justify-between text-sm font-body border-t border-sea-100 pt-2">
          <span className="text-gray-400">{lang === 'ru' ? 'Итого' : lang === 'en' ? 'Total' : 'Toplam'}</span>
          <span className="text-sea-700 font-display font-bold">${booking.totalPrice}</span>
        </div>
        <div className="flex justify-between text-sm font-body">
          <span className="text-gray-400">{lang === 'ru' ? 'Статус' : lang === 'en' ? 'Status' : 'Durum'}</span>
          <span className={`font-body font-bold text-xs px-2 py-0.5 rounded-full ${
            booking.status === 'paid'
              ? 'bg-teal-100 text-teal-700'
              : 'bg-amber-100 text-amber-700'
          }`}>
            {booking.status === 'paid'
              ? (lang === 'ru' ? '✅ Оплачено' : lang === 'en' ? '✅ Paid' : '✅ Ödendi')
              : (lang === 'ru' ? '⏳ Ожидает' : lang === 'en' ? '⏳ Pending' : '⏳ Bekliyor')}
          </span>
        </div>
      </div>

      <div className="flex gap-3 w-full max-w-xs">
        <button onClick={onDone}
          className="flex-1 bg-sea-gradient text-white font-body font-bold py-3.5 rounded-2xl shadow-sea active:scale-95 transition-all">
          {L.done}
        </button>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════
//  ГЛАВНАЯ СТРАНИЦА БРОНИРОВАНИЯ
// ════════════════════════════════════════════════════════
export default function BookingPage() {
  const { lang } = useT()
  const tgUser = useAppStore((s) => s.tgUser)
  const pendingBooking = useAppStore((s) => s.pendingBooking)
  const clearPendingBooking = useAppStore((s) => s.clearPendingBooking)
  const setActivePage = useAppStore((s) => s.setActivePage)
  const addBooking = useAppStore((s) => s.addBooking)

  const { sendBookingAlert, requestPayment, sending, payState, hasBot, hasPayment } = useTelegramBot()
  const { sendBooking: sendToSheets } = useSheetBooking()

  // ── Определяем тип из pendingBooking ────────────────
  const item = pendingBooking?.item
  const type = pendingBooking?.type || 'excursion' // 'excursion' | 'car'

  // ── Форма ────────────────────────────────────────────
  const [step, setStep] = useState(0)   // 0: данные, 1: детали, 2: итог
  const [done, setDone]  = useState(false)
  const [finalBooking, setFinalBooking] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const [form, setForm] = useState({
    name:           tgUser?.first_name ? `${tgUser.first_name} ${tgUser.last_name || ''}`.trim() : '',
    phone:          '',
    // Экскурсия
    date:           '',
    adults:         2,
    children:       0,
    // Авто
    pickupDate:     '',
    returnDate:     '',
    pickupLocation: PICKUP_LOCATIONS[lang]?.[0] || '',
    // Доп. опции авто
    extras:         [],
    // Общее
    comment:        '',
    payNow:         false,
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  // Автозаполнение языка
  useEffect(() => {
    if (lang && !form.pickupLocation) {
      set('pickupLocation', PICKUP_LOCATIONS[lang]?.[0] || '')
    }
  }, [lang])

  // ── Если нет pendingBooking — возвращаем на Home ─────
  useEffect(() => {
    if (!item) setActivePage('home')
  }, [item])

  if (!item) return null

  // ── Расчёт цены ──────────────────────────────────────
  const calcPrice = () => {
    if (type === 'excursion') {
      const adultPrice = item.price?.adult || 0
      const childPrice = item.price?.child || 0
      return form.adults * adultPrice + form.children * childPrice
    }
    // Авто
    const pickup = form.pickupDate ? new Date(form.pickupDate) : null
    const ret    = form.returnDate ? new Date(form.returnDate) : null
    const days   = pickup && ret ? Math.max(1, Math.round((ret - pickup) / 86400000)) : 1
    const base   = (item.priceDay || 0) * days
    const extrasTotal = form.extras.reduce((sum, extId) => {
      const ex = item.extras?.find((e) => e.id === extId)
      return sum + (ex ? ex.price * days : 0)
    }, 0)
    return base + extrasTotal
  }

  const totalPrice = calcPrice()
  const rentalDays = (() => {
    if (type !== 'car') return 1
    const p = form.pickupDate ? new Date(form.pickupDate) : null
    const r = form.returnDate ? new Date(form.returnDate) : null
    return p && r ? Math.max(1, Math.round((r - p) / 86400000)) : 1
  })()

  // ── Валидация ─────────────────────────────────────────
  const validate = () => {
    const e = {}
    const L = {
      ru: { req: 'Обязательное поле', phone: 'Введите корректный номер', dateReq: 'Выберите дату', returnAfter: 'Дата возврата должна быть после получения', adults: 'Минимум 1 взрослый' },
      en: { req: 'Required', phone: 'Enter a valid phone number', dateReq: 'Select a date', returnAfter: 'Return must be after pickup', adults: 'At least 1 adult' },
      tr: { req: 'Zorunlu alan', phone: 'Geçerli numara girin', dateReq: 'Tarih seçin', returnAfter: 'Dönüş tarımı teslimden sonra olmalı', adults: 'En az 1 yetişkin' },
    }[lang]

    if (!form.name.trim())  e.name  = L.req
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 7) e.phone = L.phone

    if (type === 'excursion') {
      if (!form.date)          e.date   = L.dateReq
      if (form.adults < 1)     e.adults = L.adults
    } else {
      if (!form.pickupDate)    e.pickupDate  = L.dateReq
      if (!form.returnDate)    e.returnDate  = L.dateReq
      if (form.pickupDate && form.returnDate && form.returnDate <= form.pickupDate)
        e.returnDate = L.returnAfter
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Финальная отправка ───────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    setSubmitError('')

    const booking = {
      type,
      itemId:    item.id,
      itemTitle: type === 'excursion' ? item.title?.[lang] : `${item.brand} ${item.model}`,
      itemImage: item.images?.[0] || item.image || '',
      name:      form.name.trim(),
      phone:     form.phone.trim(),
      telegramId:       tgUser?.id       || '',
      telegramUsername: tgUser?.username || '',
      // Экскурсия
      date:      form.date,
      adults:    form.adults,
      children:  form.children,
      // Авто
      pickupDate:     form.pickupDate,
      returnDate:     form.returnDate,
      pickupLocation: form.pickupLocation,
      rentalDays,
      extras:    form.extras,
      comment:   form.comment,
      totalPrice,
      currency:  'USD',
      status:    'pending',
      payNow:    form.payNow,
    }

    // 1. Сохранить локально
    addBooking(booking)

    // 2. Отправить в Google Sheets
    sendToSheets(booking).catch(() => {})

    // 3. Уведомить бота
    if (hasBot) {
      await sendBookingAlert({ ...booking, localId: booking.id })
    }

    // 4. Telegram Payments (если выбрано «Оплатить сейчас»)
    if (form.payNow && hasPayment) {
      const payResult = await requestPayment({ ...booking, localId: booking.id })
      booking.status = payResult.ok ? 'paid' : 'pending'
    }

    setFinalBooking(booking)
    setDone(true)
    setSubmitting(false)
  }

  // ── Успешный экран ────────────────────────────────────
  if (done && finalBooking) {
    return (
      <SuccessScreen
        booking={finalBooking}
        lang={lang}
        onDone={() => { clearPendingBooking(); setActivePage('bookings') }}
      />
    )
  }

  // ── Метки шагов ──────────────────────────────────────
  const STEPS = {
    ru: ['Контакты', type === 'car' ? 'Даты и место' : 'Дата и гости', 'Оплата'],
    en: ['Contacts', type === 'car' ? 'Dates & location' : 'Date & guests', 'Payment'],
    tr: ['İletişim', type === 'car' ? 'Tarihler & konum' : 'Tarih & misafirler', 'Ödeme'],
  }[lang]

  return (
    <div className="min-h-screen bg-sea-50 pb-8">

      {/* ── Header ── */}
      <header className="bg-hero-gradient px-4 pt-12 pb-5">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => step > 0 ? setStep(step - 1) : (clearPendingBooking(), setActivePage('excursions'))}
            className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 active:scale-90 transition-all">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="font-body text-sea-200 text-xs">
              {type === 'excursion'
                ? (lang === 'ru' ? 'Бронирование экскурсии' : lang === 'en' ? 'Excursion booking' : 'Tur rezervasyonu')
                : (lang === 'ru' ? 'Бронирование авто' : lang === 'en' ? 'Car booking' : 'Araç rezervasyonu')}
            </p>
            <h1 className="font-display text-white font-bold text-lg leading-tight truncate">
              {type === 'excursion' ? item.title?.[lang] : `${item.brand} ${item.model}`}
            </h1>
          </div>
        </div>
        <StepDots total={3} current={step} />
        <div className="flex justify-between mt-2">
          {STEPS.map((s, i) => (
            <span key={i} className={`font-body text-[10px] font-semibold ${i === step ? 'text-white' : i < step ? 'text-teal-300' : 'text-sea-400'}`}>
              {i < step ? '✓ ' : ''}{s}
            </span>
          ))}
        </div>
      </header>

      {/* ── Фото + цена сверху ── */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-card overflow-hidden flex items-center gap-3 p-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-sea-100">
          <img
            src={item.images?.[0] || item.image || ''}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sea-900 text-sm truncate">
            {type === 'excursion' ? item.title?.[lang] : `${item.brand} ${item.model} ${item.year}`}
          </p>
          <p className="font-body text-gray-400 text-xs">
            {type === 'excursion'
              ? `${item.duration?.hours}ч · $${item.price?.adult}/взр`
              : `$${item.priceDay}/день · ${rentalDays} ${lang === 'ru' ? 'дн' : lang === 'en' ? 'days' : 'gün'}`}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-body text-gray-400 text-xs">
            {lang === 'ru' ? 'Итого' : lang === 'en' ? 'Total' : 'Toplam'}
          </p>
          <p className="font-display font-bold text-sea-700 text-xl">${totalPrice}</p>
        </div>
      </div>

      {/* ── Форма по шагам ── */}
      <div className="px-4 mt-4 space-y-3">

        {/* ── ШАГ 0: Контактные данные ── */}
        {step === 0 && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <h2 className="font-display text-sea-900 font-bold text-base">
                {lang === 'ru' ? '👤 Контактные данные' : lang === 'en' ? '👤 Your details' : '👤 İletişim bilgileri'}
              </h2>

              <Field label={lang === 'ru' ? 'Имя и фамилия' : lang === 'en' ? 'Full name' : 'Ad Soyad'} error={errors.name}>
                <Input
                  icon={User}
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder={lang === 'ru' ? 'Иван Петров' : lang === 'en' ? 'John Smith' : 'Ahmet Yılmaz'}
                  error={errors.name}
                />
              </Field>

              <Field label={lang === 'ru' ? 'Номер телефона' : lang === 'en' ? 'Phone number' : 'Telefon numarası'} error={errors.phone}>
                <Input
                  icon={Phone}
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="+7 999 123 45 67"
                  error={errors.phone}
                />
              </Field>

              {tgUser && (
                <div className="flex items-center gap-2 bg-sea-50 rounded-xl px-3 py-2">
                  <span className="text-sea-400 text-xs">💬</span>
                  <span className="font-body text-sea-600 text-xs">
                    Telegram: {tgUser.username ? `@${tgUser.username}` : tgUser.first_name}
                    <span className="text-teal-500 ml-1">
                      {lang === 'ru' ? '(заполнено автоматически)' : lang === 'en' ? '(auto-filled)' : '(otomatik)'}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── ШАГ 1: Детали (дата/время/люди) ── */}
        {step === 1 && type === 'excursion' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <h2 className="font-display text-sea-900 font-bold text-base">
                {lang === 'ru' ? '📅 Дата и количество гостей' : lang === 'en' ? '📅 Date & guests' : '📅 Tarih ve misafirler'}
              </h2>

              <DatePicker
                value={form.date}
                onChange={(v) => set('date', v)}
                label={lang === 'ru' ? 'Дата экскурсии' : lang === 'en' ? 'Tour date' : 'Tur tarihi'}
                lang={lang}
              />
              {errors.date && (
                <p className="font-body text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.date}
                </p>
              )}

              <div className="space-y-2">
                <Counter
                  value={form.adults}
                  onChange={(v) => set('adults', v)}
                  min={1}
                  label={lang === 'ru' ? `👨‍👩 Взрослые ($${item.price?.adult}/чел)` : lang === 'en' ? `👨‍👩 Adults ($${item.price?.adult}/pp)` : `👨‍👩 Yetişkinler ($${item.price?.adult})`}
                />
                {item.price?.child > 0 && (
                  <Counter
                    value={form.children}
                    onChange={(v) => set('children', v)}
                    min={0}
                    label={lang === 'ru' ? `👧 Дети (${item.price.childAge} л.) — $${item.price.child}` : lang === 'en' ? `👧 Children (${item.price.childAge} y.) — $${item.price.child}` : `👧 Çocuklar (${item.price.childAge}) — $${item.price.child}`}
                  />
                )}
                {item.price?.infant === 0 && (
                  <div className="text-center font-body text-teal-600 text-xs font-semibold">
                    {lang === 'ru' ? `Дети до ${item.price.infantAge} лет — бесплатно` : lang === 'en' ? `Under ${item.price.infantAge} — free` : `${item.price.infantAge} altı — ücretsiz`}
                  </div>
                )}
              </div>
            </div>

            {/* Расписание */}
            {item.schedule?.[lang]?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card p-4">
                <p className="font-body text-sea-800 text-xs font-bold mb-2">
                  {lang === 'ru' ? '📆 Дни проведения' : lang === 'en' ? '📆 Tour days' : '📆 Tur günleri'}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {item.schedule[lang].map((d, i) => (
                    <span key={i} className="bg-sea-100 text-sea-700 font-body font-semibold text-xs px-2.5 py-1 rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
                {item.departure && item.departure !== 'гибко' && (
                  <p className="font-body text-gray-400 text-xs mt-2">
                    🕐 {item.departure} → {item.returnTime}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {step === 1 && type === 'car' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-4">
              <h2 className="font-display text-sea-900 font-bold text-base">
                {lang === 'ru' ? '📅 Даты и место' : lang === 'en' ? '📅 Dates & location' : '📅 Tarihler ve konum'}
              </h2>

              <DatePicker
                value={form.pickupDate}
                onChange={(v) => { set('pickupDate', v); if (form.returnDate && form.returnDate <= v) set('returnDate', '') }}
                label={lang === 'ru' ? '🚗 Дата получения авто' : lang === 'en' ? '🚗 Pickup date' : '🚗 Teslim alma tarihi'}
                lang={lang}
              />
              {errors.pickupDate && (
                <p className="font-body text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.pickupDate}
                </p>
              )}

              <DatePicker
                value={form.returnDate}
                onChange={(v) => set('returnDate', v)}
                label={lang === 'ru' ? '🏁 Дата возврата авто' : lang === 'en' ? '🏁 Return date' : '🏁 İade tarihi'}
                minDate={form.pickupDate || undefined}
                lang={lang}
              />
              {errors.returnDate && (
                <p className="font-body text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.returnDate}
                </p>
              )}

              {/* Итог дней */}
              {rentalDays > 1 && (
                <div className="bg-teal-50 rounded-xl px-4 py-2 text-center">
                  <span className="font-body text-teal-700 text-sm font-semibold">
                    {rentalDays} {lang === 'ru' ? 'дней' : lang === 'en' ? 'days' : 'gün'}
                    {' · '}
                    ${item.priceDay}/день × {rentalDays} = <strong>${item.priceDay * rentalDays}</strong>
                  </span>
                </div>
              )}

              {/* Место получения */}
              <Field label={lang === 'ru' ? '📍 Место получения' : lang === 'en' ? '📍 Pickup location' : '📍 Teslim noktası'}>
                <div className="grid grid-cols-1 gap-1.5">
                  {PICKUP_LOCATIONS[lang].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => set('pickupLocation', loc)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-body text-sm transition-all ${
                        form.pickupLocation === loc
                          ? 'bg-sea-600 border-sea-600 text-white font-semibold'
                          : 'bg-sea-50 border-sea-100 text-sea-700 hover:border-sea-300'
                      }`}
                    >
                      <MapPin size={13} className="flex-shrink-0" />
                      {loc}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* Доп. опции */}
            {item.extras?.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card p-4">
                <h3 className="font-display text-sea-900 font-bold text-sm mb-3">
                  {lang === 'ru' ? '➕ Дополнительно' : lang === 'en' ? '➕ Extras' : '➕ Ekstralar'}
                </h3>
                <div className="space-y-2">
                  {item.extras.map((ex) => {
                    const checked = form.extras.includes(ex.id)
                    return (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => set('extras', checked
                          ? form.extras.filter((e) => e !== ex.id)
                          : [...form.extras, ex.id]
                        )}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
                          checked
                            ? 'bg-sea-50 border-sea-400'
                            : 'bg-white border-sea-100 hover:border-sea-200'
                        }`}
                      >
                        <span className="text-lg">{ex.icon}</span>
                        <span className="flex-1 text-left font-body text-sm text-sea-800">{ex[lang] || ex.ru}</span>
                        <span className="font-body text-teal-600 text-xs font-bold">+${ex.price}/д</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          checked ? 'bg-sea-600 border-sea-600' : 'border-sea-200'
                        }`}>
                          {checked && <Check size={11} className="text-white" />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ШАГ 2: Итог и оплата ── */}
        {step === 2 && (
          <div className="space-y-3">
            {/* Итоговая карточка */}
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <h2 className="font-display text-sea-900 font-bold text-base">
                {lang === 'ru' ? '🧾 Проверьте заявку' : lang === 'en' ? '🧾 Review your booking' : '🧾 Rezervasyonu kontrol edin'}
              </h2>

              {[
                { icon: '👤', label: lang === 'ru' ? 'Имя' : 'Name', value: form.name },
                { icon: '📞', label: lang === 'ru' ? 'Телефон' : 'Phone', value: form.phone },
                type === 'excursion'
                  ? { icon: '📅', label: lang === 'ru' ? 'Дата' : 'Date', value: form.date }
                  : { icon: '📅', label: lang === 'ru' ? 'Период' : 'Period', value: `${form.pickupDate} → ${form.returnDate} (${rentalDays}д)` },
                type === 'excursion'
                  ? { icon: '👥', label: lang === 'ru' ? 'Гости' : 'Guests', value: `${form.adults} взр.${form.children > 0 ? ` + ${form.children} дет.` : ''}` }
                  : { icon: '📍', label: lang === 'ru' ? 'Место' : 'Location', value: form.pickupLocation },
                form.extras?.length > 0 ? {
                  icon: '➕', label: lang === 'ru' ? 'Опции' : 'Extras',
                  value: form.extras.map(id => item.extras?.find(e => e.id === id)?.[lang] || id).join(', ')
                } : null,
              ].filter(Boolean).map((row, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base w-5 flex-shrink-0">{row.icon}</span>
                  <span className="font-body text-gray-400 text-sm w-20 flex-shrink-0">{row.label}</span>
                  <span className="font-body text-sea-800 text-sm font-semibold flex-1">{row.value}</span>
                </div>
              ))}

              <div className="border-t border-sea-100 pt-3 flex items-center justify-between">
                <span className="font-body text-gray-500 font-semibold">
                  {lang === 'ru' ? 'ИТОГО' : lang === 'en' ? 'TOTAL' : 'TOPLAM'}
                </span>
                <span className="font-display font-bold text-sea-700 text-2xl">${totalPrice}</span>
              </div>
            </div>

            {/* Комментарий */}
            <div className="bg-white rounded-2xl shadow-card p-4">
              <label className="font-body text-sea-800 text-xs font-semibold block mb-2">
                {lang === 'ru' ? '💬 Комментарий (необязательно)' : lang === 'en' ? '💬 Comment (optional)' : '💬 Yorum (isteğe bağlı)'}
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => set('comment', e.target.value)}
                rows={3}
                placeholder={lang === 'ru' ? 'Пожелания, вопросы, особые требования...' : lang === 'en' ? 'Wishes, questions, special requirements...' : 'Dilekler, sorular, özel istekler...'}
                className="w-full bg-sea-50 border border-sea-100 rounded-xl px-4 py-3 font-body text-sm text-sea-900 placeholder-sea-300 focus:outline-none focus:ring-2 focus:ring-sea-300 resize-none"
              />
            </div>

            {/* Способ оплаты */}
            <div className="bg-white rounded-2xl shadow-card p-4 space-y-3">
              <h3 className="font-display text-sea-900 font-bold text-sm">
                {lang === 'ru' ? '💳 Способ оплаты' : lang === 'en' ? '💳 Payment' : '💳 Ödeme'}
              </h3>

              {/* Оплатить потом */}
              <button
                type="button"
                onClick={() => set('payNow', false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                  !form.payNow ? 'bg-sea-50 border-sea-400' : 'bg-white border-sea-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${!form.payNow ? 'bg-sea-600 border-sea-600' : 'border-sea-300'}`}>
                  {!form.payNow && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div className="text-left flex-1">
                  <p className="font-body text-sea-800 text-sm font-semibold">
                    {lang === 'ru' ? '📩 Заявка без оплаты' : lang === 'en' ? '📩 Request (pay later)' : '📩 Talep (sonra öde)'}
                  </p>
                  <p className="font-body text-gray-400 text-xs">
                    {lang === 'ru' ? 'Мы свяжемся и подтвердим' : lang === 'en' ? "We'll contact you to confirm" : 'Onay için sizinle iletişime geçeceğiz'}
                  </p>
                </div>
              </button>

              {/* Оплатить сейчас через Telegram */}
              {hasPayment && (
                <button
                  type="button"
                  onClick={() => set('payNow', true)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                    form.payNow ? 'bg-sea-50 border-sea-400' : 'bg-white border-sea-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${form.payNow ? 'bg-sea-600 border-sea-600' : 'border-sea-300'}`}>
                    {form.payNow && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-body text-sea-800 text-sm font-semibold">
                      💳 {lang === 'ru' ? 'Оплатить сейчас' : lang === 'en' ? 'Pay now' : 'Şimdi öde'} — ${totalPrice}
                    </p>
                    <p className="font-body text-gray-400 text-xs">
                      {lang === 'ru' ? 'Telegram Payments · Stripe' : 'Telegram Payments · Stripe'}
                    </p>
                  </div>
                  <CreditCard size={18} className="text-sea-400 flex-shrink-0" />
                </button>
              )}
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="font-body text-red-600 text-sm">⚠️ {submitError}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Кнопки навигации ── */}
      <div className="px-4 mt-6 flex gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-2 bg-white border border-sea-200 text-sea-700 font-body font-bold px-5 py-3.5 rounded-2xl active:scale-95 transition-all"
          >
            <ChevronLeft size={16} />
            {lang === 'ru' ? 'Назад' : lang === 'en' ? 'Back' : 'Geri'}
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (step < 2) {
              if (validate()) setStep(step + 1)
            } else {
              handleSubmit()
            }
          }}
          disabled={submitting || sending}
          className="flex-1 flex items-center justify-center gap-2 bg-sea-gradient text-white font-body font-bold py-3.5 rounded-2xl shadow-sea hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
        >
          {submitting || sending ? (
            <><Loader2 size={16} className="animate-spin" /> {lang === 'ru' ? 'Отправка...' : lang === 'en' ? 'Sending...' : 'Gönderiliyor...'}</>
          ) : step < 2 ? (
            <>{lang === 'ru' ? 'Далее' : lang === 'en' ? 'Next' : 'İleri'} <ChevronRight size={16} /></>
          ) : form.payNow && hasPayment ? (
            <><CreditCard size={16} /> {lang === 'ru' ? `Оплатить $${totalPrice}` : lang === 'en' ? `Pay $${totalPrice}` : `$${totalPrice} öde`}</>
          ) : (
            <><Send size={16} /> {lang === 'ru' ? 'Отправить заявку' : lang === 'en' ? 'Send booking' : 'Rezervasyon gönder'}</>
          )}
        </button>
      </div>
    </div>
  )
}
