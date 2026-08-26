import { Star } from 'lucide-react';

export function StarRating({
  value,
  size = 16,
  showValue = false,
}: {
  value: number;
  size?: number;
  showValue?: boolean;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? 'fill-brand-500 text-brand-500'
                : isHalf
                ? 'fill-brand-300 text-brand-300'
                : 'fill-ink-200 text-ink-200'
            }
          />
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-sm font-semibold text-ink-700">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
