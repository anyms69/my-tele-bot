import { useAppStore } from './useStore'
import { translations } from '../i18n/translations'

export const useT = () => {
  const lang = useAppStore((s) => s.lang)
  const t = translations[lang] || translations.ru

  const get = (path) => {
    const keys = path.split('.')
    return keys.reduce((obj, key) => obj?.[key], t) || path
  }

  return { t, get, lang }
}
