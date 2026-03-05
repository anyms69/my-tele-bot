// ════════════════════════════════════════════════════════
//  useGoogleSheets.js
//  Интеграция с Google Sheets через Apps Script Web App
//
//  КАК ПОДКЛЮЧИТЬ:
//  1. Создай Google Таблицу с листами:
//     - "Экскурсии" (id, title_ru, title_en, title_tr,
//        shortDesc_ru, price_adult, price_child, category,
//        duration_hours, rating, reviews, badge, active)
//     - "Бронирования" (timestamp, name, phone, excursion_id,
//        date, adults, children, total_price, status, notes)
//
//  2. Открой Расширения → Apps Script, вставь код из
//     /src/data/appsscript-template.js
//     Опубликуй как Web App (Доступ: Все)
//     Скопируй URL → вставь в SHEETS_WEBHOOK_URL ниже
//
//  3. В src/data/config.js задай:
//     export const SHEETS_WEBHOOK_URL = 'https://script.google.com/...'
// ════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react'

// ── Замени на свой URL после деплоя Apps Script ──────────
const SHEETS_URL = import.meta.env.VITE_SHEETS_URL || null
// ─────────────────────────────────────────────────────────

/**
 * Хук для чтения экскурсий из Google Sheets.
 * Если VITE_SHEETS_URL не задан — возвращает fallback (данные из файла).
 */
export function useSheetExcursions(fallbackData = []) {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [source, setSource] = useState('local') // 'local' | 'sheets'

  const fetchFromSheets = useCallback(async () => {
    if (!SHEETS_URL) {
      setSource('local')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${SHEETS_URL}?action=getExcursions`, {
        method: 'GET',
        mode: 'cors',
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const json = await res.json()

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        // Маппинг строк Google Sheets → структура приложения
        const mapped = json.data
          .filter((row) => row.active !== 'FALSE' && row.active !== false)
          .map((row) => ({
            id: Number(row.id),
            slug: row.slug || `excursion-${row.id}`,
            category: row.category || 'history',
            badge: row.badge || null,
            image: row.image || '',
            title: {
              ru: row.title_ru || '',
              en: row.title_en || row.title_ru || '',
              tr: row.title_tr || row.title_ru || '',
            },
            shortDesc: {
              ru: row.shortDesc_ru || '',
              en: row.shortDesc_en || row.shortDesc_ru || '',
              tr: row.shortDesc_tr || row.shortDesc_ru || '',
            },
            fullDesc: {
              ru: row.fullDesc_ru || '',
              en: row.fullDesc_en || row.fullDesc_ru || '',
              tr: row.fullDesc_tr || row.fullDesc_ru || '',
            },
            highlights: {
              ru: (row.highlights_ru || '').split('|').filter(Boolean),
              en: (row.highlights_en || '').split('|').filter(Boolean),
              tr: (row.highlights_tr || '').split('|').filter(Boolean),
            },
            price: {
              adult: Number(row.price_adult) || 0,
              child: Number(row.price_child) || 0,
              childAge: row.price_childAge || '',
              infant: Number(row.price_infant) || 0,
              infantAge: row.price_infantAge || '',
            },
            currency: row.currency || 'USD',
            duration: {
              hours: Number(row.duration_hours) || 0,
              label: { ru: row.duration_label_ru || '', en: row.duration_label_en || '', tr: row.duration_label_tr || '' },
            },
            distance: {
              km: Number(row.distance_km) || 0,
              fromCity: row.distance_fromCity || 'Antalya',
            },
            departure: row.departure || '',
            returnTime: row.returnTime || '',
            schedule: {
              ru: (row.schedule_ru || '').split(',').map((s) => s.trim()).filter(Boolean),
              en: (row.schedule_en || '').split(',').map((s) => s.trim()).filter(Boolean),
              tr: (row.schedule_tr || '').split(',').map((s) => s.trim()).filter(Boolean),
            },
            included: {
              ru: (row.included_ru || '').split('|').filter(Boolean),
              en: (row.included_en || '').split('|').filter(Boolean),
              tr: (row.included_tr || '').split('|').filter(Boolean),
            },
            notIncluded: {
              ru: (row.notIncluded_ru || '').split('|').filter(Boolean),
              en: (row.notIncluded_en || '').split('|').filter(Boolean),
              tr: (row.notIncluded_tr || '').split('|').filter(Boolean),
            },
            tip: {
              ru: row.tip_ru || '',
              en: row.tip_en || '',
              tr: row.tip_tr || '',
            },
            rating: Number(row.rating) || 4.5,
            reviews: Number(row.reviews) || 0,
          }))

        setData(mapped)
        setSource('sheets')
      } else {
        // Sheets вернул пустые данные — используем fallback
        setSource('local')
      }
    } catch (err) {
      console.warn('[Sheets] Fetch failed, using local data:', err.message)
      setError(err.message)
      setSource('local')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchFromSheets()
  }, [fetchFromSheets])

  return { data, loading, error, source, refetch: fetchFromSheets }
}

/**
 * Хук для отправки бронирования в Google Sheets
 */
export function useSheetBooking() {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null) // 'success' | 'error'

  const sendBooking = useCallback(async (bookingData) => {
    if (!SHEETS_URL) {
      console.warn('[Sheets] No URL configured. Booking not sent to Sheets.')
      setResult('no_url')
      return false
    }

    setSending(true)
    setResult(null)

    try {
      const payload = {
        action: 'addBooking',
        timestamp: new Date().toISOString(),
        ...bookingData,
      }

      const res = await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'text/plain' }, // Apps Script требует text/plain для POST
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (json.success) {
        setResult('success')
        return true
      } else {
        throw new Error(json.error || 'Unknown error')
      }
    } catch (err) {
      console.error('[Sheets] Booking failed:', err)
      setResult('error')
      return false
    } finally {
      setSending(false)
    }
  }, [])

  return { sendBooking, sending, result }
}
