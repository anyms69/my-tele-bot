export default function StarRating({ rating, reviews, size = 'sm' }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1,2,3,4,5].map((i) => (
          <span key={i} className={size === 'sm' ? 'text-xs' : 'text-sm'}>
            {i <= full ? '★' : half && i === full + 1 ? '⯨' : '☆'}
          </span>
        ))}
      </div>
      <span className={`font-body font-bold text-sea-700 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {rating.toFixed(1)}
      </span>
      {reviews && (
        <span className="text-gray-400 text-xs font-body">({reviews})</span>
      )}
    </div>
  )
}
