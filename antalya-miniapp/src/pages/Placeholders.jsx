import { useT } from '../hooks/useTranslation'

export function ExcursionsPage() {
  const { lang } = useT()
  return (
    <div className="min-h-screen bg-sea-50 pb-20 flex items-center justify-center">
      <div className="text-center text-sea-400">
        <div className="text-5xl mb-3">🗺️</div>
        <p className="font-display text-xl font-semibold text-sea-700">
          {lang === 'ru' ? 'Экскурсии' : lang === 'en' ? 'Excursions' : 'Turlar'}
        </p>
        <p className="font-body text-sm text-sea-400 mt-1">
          {lang === 'ru' ? 'Скоро...' : lang === 'en' ? 'Coming soon...' : 'Yakında...'}
        </p>
      </div>
    </div>
  )
}

export function CarsPage() {
  const { lang } = useT()
  return (
    <div className="min-h-screen bg-sea-50 pb-20 flex items-center justify-center">
      <div className="text-center text-sea-400">
        <div className="text-5xl mb-3">🚗</div>
        <p className="font-display text-xl font-semibold text-sea-700">
          {lang === 'ru' ? 'Аренда авто' : lang === 'en' ? 'Car Rental' : 'Araç Kiralama'}
        </p>
        <p className="font-body text-sm text-sea-400 mt-1">
          {lang === 'ru' ? 'Скоро...' : lang === 'en' ? 'Coming soon...' : 'Yakında...'}
        </p>
      </div>
    </div>
  )
}

export function BookingsPage() {
  const { lang } = useT()
  return (
    <div className="min-h-screen bg-sea-50 pb-20 flex items-center justify-center">
      <div className="text-center text-sea-400">
        <div className="text-5xl mb-3">📋</div>
        <p className="font-display text-xl font-semibold text-sea-700">
          {lang === 'ru' ? 'Мои брони' : lang === 'en' ? 'My Bookings' : 'Rezervasyonlarım'}
        </p>
        <p className="font-body text-sm text-sea-400 mt-1">
          {lang === 'ru' ? 'Скоро...' : lang === 'en' ? 'Coming soon...' : 'Yakında...'}
        </p>
      </div>
    </div>
  )
}
