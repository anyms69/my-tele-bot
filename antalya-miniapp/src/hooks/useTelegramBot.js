// ════════════════════════════════════════════════════════
//  useTelegramBot.js
//
//  Два сценария:
//  1. sendBookingAlert — POST на Telegram Bot API
//     (бот пишет владельцу в личку с деталями заявки)
//  2. requestPayment — открывает Telegram Payments invoice
//     через Telegram.WebApp.openInvoice
//
//  КАК НАСТРОИТЬ:
//  .env:
//    VITE_BOT_TOKEN=123456:ABC-xyz       ← токен бота
//    VITE_OWNER_CHAT_ID=123456789        ← твой Telegram user ID
//    VITE_PAYMENT_PROVIDER_TOKEN=...     ← от @BotFather > Payments
//
//  Получить токен:  @BotFather → /newbot
//  Получить chat_id: напиши боту, затем
//    https://api.telegram.org/bot<TOKEN>/getUpdates
//  Платёжный токен: @BotFather → /mybots → Payments → Stripe TEST
// ════════════════════════════════════════════════════════

import { useState, useCallback } from 'react'

const BOT_TOKEN            = import.meta.env.VITE_BOT_TOKEN            || null
const OWNER_CHAT_ID        = import.meta.env.VITE_OWNER_CHAT_ID        || null
const PAYMENT_PROVIDER_TOKEN = import.meta.env.VITE_PAYMENT_PROVIDER_TOKEN || null

// ── Форматирование сообщения для бота ────────────────────
function formatBookingMessage(booking, lang = 'ru') {
  const type = booking.type === 'car' ? '🚗 Аренда авто' : '🗺️ Экскурсия'
  const lines = [
    `${type} — НОВАЯ ЗАЯВКА`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `📌 ${booking.itemTitle}`,
    ``,
    `👤 Имя: ${booking.name}`,
    `📞 Телефон: ${booking.phone}`,
    booking.telegramUsername ? `💬 Telegram: @${booking.telegramUsername}` : null,
    booking.telegramId       ? `🆔 TG ID: ${booking.telegramId}` : null,
    ``,
    booking.type === 'excursion'
      ? `📅 Дата тура: ${booking.date}`
      : `📅 Получение: ${booking.pickupDate}  →  Возврат: ${booking.returnDate}`,
    booking.type === 'excursion'
      ? `👥 Взрослых: ${booking.adults}  |  Детей: ${booking.children}`
      : `📍 Место получения: ${booking.pickupLocation}`,
    booking.extras?.length
      ? `➕ Доп. опции: ${booking.extras.join(', ')}` : null,
    booking.comment ? `💬 Комментарий: ${booking.comment}` : null,
    ``,
    `💰 ИТОГО: $${booking.totalPrice}`,
    `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `#новая_заявка #${booking.type}`,
  ].filter(Boolean)

  return lines.join('\n')
}

// ════════════════════════════════════════════════════════
//  Хук
// ════════════════════════════════════════════════════════
export function useTelegramBot() {
  const [sending,  setSending]  = useState(false)
  const [payState, setPayState] = useState('idle') // idle | waiting | paid | failed

  // ── 1. Отправить уведомление боту ────────────────────
  const sendBookingAlert = useCallback(async (booking) => {
    if (!BOT_TOKEN || !OWNER_CHAT_ID) {
      console.warn('[TgBot] VITE_BOT_TOKEN or VITE_OWNER_CHAT_ID not set — skipping alert')
      return { ok: false, reason: 'no_config' }
    }

    setSending(true)
    try {
      const text = formatBookingMessage(booking)
      const res  = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id:    OWNER_CHAT_ID,
            text,
            parse_mode: 'HTML',
          }),
        }
      )
      const json = await res.json()
      return json.ok ? { ok: true } : { ok: false, reason: json.description }
    } catch (err) {
      console.error('[TgBot] sendMessage failed:', err)
      return { ok: false, reason: err.message }
    } finally {
      setSending(false)
    }
  }, [])

  // ── 2. Telegram Payments ─────────────────────────────
  //  Открывает встроенный инвойс Telegram.
  //  Реальное списание денег происходит через Stripe / другой провайдер.
  //  В тестовом режиме используй Stripe TEST токен от @BotFather.
  const requestPayment = useCallback(async (booking) => {
    const tg = window?.Telegram?.WebApp
    if (!tg) {
      console.warn('[TgBot] Not inside Telegram WebApp')
      return { ok: false, reason: 'not_in_tg' }
    }
    if (!PAYMENT_PROVIDER_TOKEN) {
      console.warn('[TgBot] VITE_PAYMENT_PROVIDER_TOKEN not set')
      return { ok: false, reason: 'no_payment_token' }
    }
    if (!BOT_TOKEN) {
      console.warn('[TgBot] VITE_BOT_TOKEN not set')
      return { ok: false, reason: 'no_bot_token' }
    }

    setPayState('waiting')
    try {
      // Шаг 1: создать invoice_link через Bot API
      const amount = Math.round(booking.totalPrice * 100) // в центах (USD)
      const title  = booking.itemTitle
      const description =
        booking.type === 'excursion'
          ? `${booking.date} · Взр: ${booking.adults}, Дет: ${booking.children}`
          : `${booking.pickupDate} → ${booking.returnDate} · ${booking.pickupLocation}`

      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            description,
            payload:          JSON.stringify({ bookingId: booking.localId }),
            provider_token:   PAYMENT_PROVIDER_TOKEN,
            currency:         'USD',
            prices: [{ label: title, amount }],
            photo_url:        booking.itemImage || undefined,
            need_name:        true,
            need_phone_number:true,
          }),
        }
      )
      const json = await res.json()
      if (!json.ok) throw new Error(json.description)

      const invoiceUrl = json.result

      // Шаг 2: открыть инвойс внутри Telegram WebApp
      return await new Promise((resolve) => {
        tg.openInvoice(invoiceUrl, (status) => {
          // status: 'paid' | 'cancelled' | 'failed' | 'pending'
          setPayState(status === 'paid' ? 'paid' : 'failed')
          resolve({ ok: status === 'paid', status })
        })
      })
    } catch (err) {
      console.error('[TgBot] Payment failed:', err)
      setPayState('failed')
      return { ok: false, reason: err.message }
    }
  }, [])

  return {
    sendBookingAlert,
    requestPayment,
    sending,
    payState,
    hasBot:     !!(BOT_TOKEN && OWNER_CHAT_ID),
    hasPayment: !!(BOT_TOKEN && PAYMENT_PROVIDER_TOKEN),
  }
}
