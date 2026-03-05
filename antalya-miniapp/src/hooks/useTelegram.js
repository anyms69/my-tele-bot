import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [tg, setTg] = useState(null)
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const webApp = window?.Telegram?.WebApp
    if (webApp) {
      webApp.ready()
      webApp.expand()
      webApp.setHeaderColor('#0c4a6e')
      webApp.setBackgroundColor('#f0f9ff')
      setTg(webApp)
      setUser(webApp.initDataUnsafe?.user || null)
    }
    setReady(true)
  }, [])

  const showAlert = (msg) => tg?.showAlert(msg)
  const showConfirm = (msg, cb) => tg?.showConfirm(msg, cb)
  const haptic = (type = 'light') => tg?.HapticFeedback?.impactOccurred(type)
  const close = () => tg?.close()

  return { tg, user, ready, showAlert, showConfirm, haptic, close }
}
