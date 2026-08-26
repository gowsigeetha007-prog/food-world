import { useMemo, useState } from 'react';
import {
  MapPin,
  Clock,
  Star,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Facebook,
  CalendarDays,
  ArrowLeft,
  Share2,
  Navigation,
} from 'lucide-react';
import { restaurants, menuItems, reviews } from '@/data';
import { StarRating } from '@/components/StarRating';
import { ReservationModal } from '@/components/ReservationModal';
import { useScrollReveal, useScrollTopOnMount } from '@/hooks';
import { useRouter } from '@/router';

export function ExperiencePage({ restaurantId }: { restaurantId: string }) {
  useScrollTopOnMount();
  const ref = useScrollReveal<HTMLDivElement>();
  const { navigate } = useRouter();
  const [activeImg, setActiveImg] = useState(0);
  const [reserveOpen, setReserveOpen] = useState(false);

  const restaurant = useMemo(
    () => restaurants.find((r) => r.id === restaurantId) ?? restaurants[0],
    [restaurantId]
  );
  const dishes = useMemo(
    () => menuItems.filter((m) => m.restaurantId === restaurant.id),
    [restaurant.id]
  );
  const popular = useMemo(
    () =>
      restaurant.popularDishes
        .map((id) => menuItems.find((m) => m.id === id))
        .filter(Boolean)
        .slice(0, 3),
    [restaurant.id]
  );
  const restoReviews = useMemo(
    () => reviews.filter((r) => r.restaurantId === restaurant.id),
    [restaurant.id]
  );

  return (
    <div ref={ref}>
      {/* Gallery */}
      <section className="section pt-8">
        <button
          onClick={() => navigate({ name: 'discover' })}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition hover:text-brand-600"
        >
          <ArrowLeft size={16} /> Back to discover
        </button>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={restaurant.gallery[activeImg]}
              alt={restaurant.name}
              className="aspect-[16/10] w-full object-cover transition-opacity duration-500"
            />
            <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink-900 backdrop-blur">
              <StarRating value={restaurant.rating} size={12} />
              {restaurant.rating.toFixed(1)}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-2">
            {restaurant.gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                className={`group relative aspect-square overflow-hidden rounded-2xl ring-2 transition-all duration-300 sm:aspect-[4/3] ${
                  activeImg === i ? 'ring-brand-500' : 'ring-transparent hover:ring-brand-300'
                }`}
              >
                <img
                  src={src}
                  alt={`${restaurant.name} ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="section pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="reveal flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {restaurant.cuisine}
                </span>
                <h1 className="mt-3 font-display text-4xl font-bold text-ink-900 sm:text-5xl">
                  {restaurant.name}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} className="text-brand-500" /> {restaurant.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-brand-500" /> {restaurant.hours}
                  </span>
                  <span className="font-semibold text-ink-700">{restaurant.priceRange}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink-600 ring-1 ring-ink-200 transition hover:text-brand-600 hover:ring-brand-300">
                  <Share2 size={18} />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-ink-600 ring-1 ring-ink-200 transition hover:text-brand-600 hover:ring-brand-300">
                  <Navigation size={18} />
                </button>
              </div>
            </div>

            <div className="reveal mt-8">
              <h2 className="font-display text-2xl font-bold text-ink-900">About</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-600">{restaurant.about}</p>
            </div>

            {/* Popular dishes */}
            <div className="reveal mt-10">
              <h2 className="font-display text-2xl font-bold text-ink-900">Popular Dishes</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {popular.map((dish) => dish && (
                  <div key={dish.id} className="overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-bold leading-snug text-ink-900">{dish.name}</h3>
                      <div className="mt-1.5 flex items-center justify-between">
                        <span className="font-bold text-brand-600">${dish.price}</span>
                        <span className="flex items-center gap-1 text-xs text-ink-500">
                          <Star size={12} className="fill-brand-500 text-brand-500" />
                          {dish.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu cards */}
            <div className="reveal mt-10">
              <h2 className="font-display text-2xl font-bold text-ink-900">From the Menu</h2>
              <div className="mt-5 space-y-3">
                {dishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-soft transition-all duration-300 hover:shadow-card"
                  >
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img src={dish.image} alt={dish.name} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate font-display text-sm font-bold text-ink-900">{dish.name}</h3>
                        <span className="shrink-0 font-bold text-brand-600">${dish.price}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-ink-500">{dish.description}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
                        <Star size={11} className="fill-brand-500 text-brand-500" />
                        {dish.rating.toFixed(1)}
                        <span className="text-ink-300">·</span>
                        {dish.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="reveal mt-10">
              <h2 className="font-display text-2xl font-bold text-ink-900">Customer Reviews</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {restoReviews.length ? (
                  restoReviews.map((r) => (
                    <div key={r.id} className="rounded-2xl bg-white p-5 shadow-soft">
                      <div className="flex items-center gap-3">
                        <img src={r.avatar} alt={r.name} className="h-11 w-11 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-ink-900">{r.name}</p>
                          <div className="flex items-center gap-2">
                            <StarRating value={r.rating} size={12} />
                            <span className="text-xs text-ink-400">{r.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-ink-600">{r.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-ink-500">No reviews yet for this restaurant.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="reveal lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-display text-3xl font-bold text-ink-900">{restaurant.rating.toFixed(1)}</p>
                  <StarRating value={restaurant.rating} size={14} />
                </div>
                <p className="text-sm text-ink-500">{restaurant.reviews.toLocaleString()} reviews</p>
              </div>

              <div className="mt-6 space-y-3 border-t border-ink-100 pt-5 text-sm">
                <InfoRow icon={<MapPin size={16} />} label="Location" value={restaurant.location} />
                <InfoRow icon={<Clock size={16} />} label="Hours" value={restaurant.hours} />
                <InfoRow icon={<CalendarDays size={16} />} label="Price" value={restaurant.priceRange} />
              </div>

              <button onClick={() => setReserveOpen(true)} className="btn-primary mt-6 w-full">
                Reserve a Table
              </button>
              <button className="btn-ghost mt-3 w-full">
                <Phone size={16} /> Contact Restaurant
              </button>

              <div className="mt-6 flex justify-center gap-3 border-t border-ink-100 pt-5">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <button
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-100 text-ink-600 transition hover:bg-brand-500 hover:text-white"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-5 overflow-hidden rounded-3xl shadow-soft">
              <div className="relative h-56 bg-ink-100">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.25) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="relative flex h-12 w-12 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-40" />
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white shadow-soft">
                      <MapPin size={22} />
                    </span>
                  </span>
                  <p className="mt-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-700 backdrop-blur">
                    {restaurant.location}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ReservationModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        restaurantName={restaurant.name}
      />
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-brand-500">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</p>
        <p className="text-sm font-medium text-ink-800">{value}</p>
      </div>
    </div>
  );
}
