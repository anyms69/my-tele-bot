import { Home, Map, Car, ClipboardList } from 'lucide-react'
import { useAppStore } from '../../hooks/useStore'
import { useT } from '../../hooks/useTranslation'

const TABS = [
  { key: 'home',       Icon: Home,          labelKey: 'nav.home' },
  { key: 'excursions', Icon: Map,           labelKey: 'nav.excursions' },
  { key: 'cars',       Icon: Car,           labelKey: 'nav.cars' },
  { key: 'bookings',   Icon: ClipboardList, labelKey: 'nav.bookings' },
]

export default function BottomNav() {
  const activePage  = useAppStore((s) => s.activePage)
  const setActivePage = useAppStore((s) => s.setActivePage)
  const bookings    = useAppStore((s) => s.bookings)
  const { get }     = useT()

  const pendingCount = bookings.filter((b) => b.status === 'pending').length

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 max-w-lg mx-auto">
      <div className="bg-white/95 backdrop-blur-md border-t border-sea-100 px-2 pb-safe">
        <div className="flex items-center">
          {TABS.map(({ key, Icon, labelKey }) => {
            const active = activePage === key
            const isBk   = key === 'bookings'
            return (
              <button
                key={key}
                onClick={() => setActivePage(key)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 transition-all active:scale-90 relative ${
                  active ? 'text-sea-600' : 'text-gray-400'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
                  {isBk && pendingCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                      {pendingCount > 9 ? '9+' : pendingCount}
                    </span>
                  )}
                </div>
                <span className={`font-body text-[10px] font-semibold leading-none ${active ? 'text-sea-600' : 'text-gray-400'}`}>
                  {get(labelKey)}
                </span>
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-sea-600 rounded-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
