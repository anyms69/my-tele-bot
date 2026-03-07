import { useT } from '../../hooks/useTranslation'

const styles = {
  popular: 'bg-sea-500 text-white',
  hot:     'bg-orange-500 text-white',
  new:     'bg-teal-500 text-white',
}

const icons = {
  popular: '⭐',
  hot:     '🔥',
  new:     '✨',
}

export default function Badge({ type }) {
  const { get } = useT()
  if (!type) return null
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-body font-bold px-2 py-0.5 rounded-full ${styles[type]}`}>
      {icons[type]} {get(`home.${type}_badge`)}
    </span>
  )
}
