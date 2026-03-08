import { create } from 'zustand'
import { getLang } from '../i18n/translations'

export const useAppStore = create((set) => ({
  // ── Язык ─────────────────────────────────────────────
  lang: getLang(),
  setLang: (lang) => set({ lang }),

  // ── Telegram user ────────────────────────────────────
  tgUser: null,
  setTgUser: (user) => set({ tgUser: user }),

  // ── Навигация ────────────────────────────────────────
  activePage: 'home',
  setActivePage: (page) => set({ activePage: page }),

  // ── Черновик бронирования ────────────────────────────
  pendingBooking: null,
  setPendingBooking: (b) => set({ pendingBooking: b }),
  clearPendingBooking: () => set({ pendingBooking: null }),

  // ── Сохранённые брони ────────────────────────────────
  bookings: (() => {
    try { return JSON.parse(localStorage.getItem('antalya_bookings') || '[]') }
    catch { return [] }
  })(),

  addBooking: (booking) =>
    set((s) => {
      const next = [
        { ...booking, id: `bk_${Date.now()}`, createdAt: new Date().toISOString() },
        ...s.bookings,
      ]
      try { localStorage.setItem('antalya_bookings', JSON.stringify(next)) } catch {}
      return { bookings: next }
    }),

  updateBookingStatus: (id, status) =>
    set((s) => {
      const next = s.bookings.map((b) => b.id === id ? { ...b, status } : b)
      try { localStorage.setItem('antalya_bookings', JSON.stringify(next)) } catch {}
      return { bookings: next }
    }),

  removeBooking: (id) =>
    set((s) => {
      const next = s.bookings.filter((b) => b.id !== id)
      try { localStorage.setItem('antalya_bookings', JSON.stringify(next)) } catch {}
      return { bookings: next }
    }),

  // ── Фильтры ──────────────────────────────────────────
  excursionFilter: 'all',
  setExcursionFilter: (f) => set({ excursionFilter: f }),

  carSearch: { pickupDate: '', returnDate: '', location: 'airport', type: 'all' },
  setCarSearch: (data) => set((s) => ({ carSearch: { ...s.carSearch, ...data } })),
}))
