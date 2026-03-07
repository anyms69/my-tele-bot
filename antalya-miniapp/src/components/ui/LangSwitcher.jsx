import { useAppStore } from '../../hooks/useStore'

const langs = ['ru', 'en', 'tr']
const flags = { ru: '🇷🇺', en: '🇬🇧', tr: '🇹🇷' }

export default function LangSwitcher() {
  const lang = useAppStore((s) => s.lang)
  const setLang = useAppStore((s) => s.setLang)

  return (
    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full p-1">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`text-xs px-2 py-1 rounded-full font-body font-semibold transition-all duration-200 ${
            lang === l
              ? 'bg-white text-sea-700 shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          {flags[l]} {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
