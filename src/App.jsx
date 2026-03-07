import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'
import { useAppStore } from './hooks/useStore'
import BottomNav from './components/layout/BottomNav'
import HomePage      from './pages/HomePage'
import ExcursionsPage from './pages/ExcursionsPage'
import CarsPage      from './pages/CarsPage'
import BookingPage   from './pages/BookingPage'
import BookingsPage  from './pages/BookingsPage'

const PAGES = {
  home:       HomePage,
  excursions: ExcursionsPage,
  cars:       CarsPage,
  booking:    BookingPage,   // форма бронирования (без таббара)
  bookings:   BookingsPage,
}

// Страницы без нижней навигации
const NO_NAV = ['booking']

export default function App() {
  const { user } = useTelegram()
  const setTgUser  = useAppStore((s) => s.setTgUser)
  const activePage = useAppStore((s) => s.activePage)

  useEffect(() => { if (user) setTgUser(user) }, [user])

  const Page = PAGES[activePage] || HomePage
  const showNav = !NO_NAV.includes(activePage)

  return (
    <div className="max-w-lg mx-auto relative font-body">
      <Page />
      {showNav && <BottomNav />}
    </div>
  )
}
