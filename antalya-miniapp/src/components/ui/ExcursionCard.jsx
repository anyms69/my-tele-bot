import { Clock, Users } from 'lucide-react'
import Badge from './Badge'
import StarRating from './StarRating'
import { useT } from '../../hooks/useTranslation'
import { useAppStore } from '../../hooks/useStore'

export default function ExcursionCard({ excursion, onBook }) {
  const { get, lang } = useT()
  const setActivePage = useAppStore((s) => s.setActivePage)

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-card bg-white flex-shrink-0 w-64">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={excursion.image}
          alt={excursion.title[lang]}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-gradient" />
        <div className="absolute top-2 left-2">
          <Badge type={excursion.badge} />
        </div>
        <div className="absolute bottom-2 left-3 right-3">
          <h3 className="font-display font-semibold text-white text-sm leading-tight">
            {excursion.title[lang]}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <StarRating rating={excursion.rating} reviews={excursion.reviews} />

        <div className="flex items-center gap-3 text-gray-500">
          <span className="flex items-center gap-1 text-xs font-body">
            <Clock size={12} />
            {excursion.duration}{get('home.hours')}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-gray-400 font-body">{get('home.from_price')} </span>
            <span className="text-lg font-display font-bold text-sea-700">€{excursion.price}</span>
            <span className="text-xs text-gray-400 font-body">{get('home.per_person')}</span>
          </div>
          <button
            onClick={() => onBook?.(excursion)}
            className="bg-sea-gradient text-white text-xs font-body font-bold px-3 py-1.5 rounded-xl shadow-sea hover:opacity-90 active:scale-95 transition-all"
          >
            {get('home.book_now')}
          </button>
        </div>
      </div>
    </div>
  )
}
