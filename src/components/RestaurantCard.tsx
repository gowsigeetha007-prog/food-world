import { MapPin, ArrowRight } from 'lucide-react';
import type { Restaurant } from '@/data';
import { StarRating } from './StarRating';
import { useRouter } from '@/router';

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { navigate } = useRouter();

  return (
    <article className="card group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink-900 shadow-soft backdrop-blur">
          <StarRating value={restaurant.rating} size={12} />
          <span>{restaurant.rating.toFixed(1)}</span>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-bold text-white shadow-soft">
          {restaurant.priceRange}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-ink-900">{restaurant.name}</h3>
          <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {restaurant.cuisine}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-ink-500">
          <MapPin size={14} className="text-brand-500" />
          <span>{restaurant.location}</span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-500 line-clamp-2">
          {restaurant.about}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 pt-1">
          <span className="text-xs font-medium text-ink-400">
            {restaurant.reviews.toLocaleString()} reviews
          </span>
          <button
            onClick={() => navigate({ name: 'experience', restaurantId: restaurant.id })}
            className="group/btn inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-brand-500"
          >
            View Details
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
