import { Users, Briefcase, Zap } from 'lucide-react'
import Badge from './Badge'
import StarRating from './StarRating'
import { useT } from '../../hooks/useTranslation'

const transmissionLabel = {
  auto: { ru: 'Авто', en: 'Auto', tr: 'Otomatik' },
  manual: { ru: 'Механ.', en: 'Manual', tr: 'Manuel' },
}

export default function CarCard({ car, onBook }) {
  const { get, lang } = useT()

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-card bg-white flex-shrink-0 w-64">
      {/* Image */}
      <div className="relative h-36 overflow-hidden bg-sea-50">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-2 left-2">
          <Badge type={car.badge} />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-sea-900 text-base">
              {car.brand} {car.model}
            </h3>
            <span className="text-xs text-gray-400 font-body">{car.year}</span>
          </div>
          <StarRating rating={car.rating} />
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-gray-500">
          <span className="flex items-center gap-1 text-xs font-body">
            <Users size={12} /> {car.seats}
          </span>
          <span className="flex items-center gap-1 text-xs font-body">
            <Briefcase size={12} /> {car.luggage}
          </span>
          <span className="flex items-center gap-1 text-xs font-body">
            <Zap size={12} /> {transmissionLabel[car.transmission][lang]}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-gray-400 font-body">{get('home.from_price')} </span>
            <span className="text-lg font-display font-bold text-sea-700">€{car.priceDay}</span>
            <span className="text-xs text-gray-400 font-body">{get('home.per_day')}</span>
          </div>
          <button
            onClick={() => onBook?.(car)}
            className="bg-teal-600 text-white text-xs font-body font-bold px-3 py-1.5 rounded-xl hover:bg-teal-700 active:scale-95 transition-all shadow-md"
          >
            {get('home.book_now')}
          </button>
        </div>
      </div>
    </div>
  )
}
