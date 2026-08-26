import { useMemo, useState } from 'react';
import { Heart, Eye, Salad, UtensilsCrossed, Cake, Wine, Star } from 'lucide-react';
import { menuItems, type Category } from '@/data';
import { SectionHeading } from '@/components/SectionHeading';
import { useScrollReveal } from '@/hooks';
import { useRouter } from '@/router';

const tabs: { name: Category | 'All'; icon: typeof Salad }[] = [
  { name: 'All', icon: Salad },
  { name: 'Starters', icon: Salad },
  { name: 'Main Course', icon: UtensilsCrossed },
  { name: 'Desserts', icon: Cake },
  { name: 'Beverages', icon: Wine },
];

export function MenuPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { navigate } = useRouter();
  const [active, setActive] = useState<Category | 'All'>('All');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const items = useMemo(
    () => (active === 'All' ? menuItems : menuItems.filter((m) => m.category === active)),
    [active]
  );

  const toggleFav = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div ref={ref}>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src="https://images.pexels.com/photos/8194817/pexels-photo-8194817.jpeg?auto=compress&cs=tinysrgb&h=700&w=1600"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="section relative py-16 text-center sm:py-20">
          <span className="eyebrow bg-white/10 text-brand-300 ring-1 ring-white/15">Our Menu</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl text-balance">
            A taste of every kitchen
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-300">
            Browse dishes from our featured restaurants, filter by course, and save the ones you
            want to come back to.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="section pt-10">
        <div className="no-scrollbar -mx-5 flex justify-start gap-2 overflow-x-auto px-5 sm:justify-center sm:mx-0 sm:px-0">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setActive(t.name)}
                className={`chip whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-soft'
                    : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-brand-300 hover:text-brand-600'
                }`}
              >
                <Icon size={16} /> {t.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="section py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item) => {
            const isFav = favorites.has(item.id);
            return (
              <article
                key={item.id}
                className="card group animate-fade-up"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <button
                    onClick={() => toggleFav(item.id)}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all duration-300 ${
                      isFav
                        ? 'bg-brand-500 text-white scale-110'
                        : 'bg-white/90 text-ink-600 hover:bg-white hover:text-brand-500'
                    }`}
                  >
                    <Heart size={16} className={isFav ? 'fill-current' : ''} />
                  </button>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink-800 backdrop-blur">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-bold leading-snug text-ink-900">
                      {item.name}
                    </h3>
                    <span className="shrink-0 font-display text-lg font-bold text-brand-600">
                      ${item.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-ink-600">
                      <Star size={14} className="fill-brand-500 text-brand-500" />
                      {item.rating.toFixed(1)}
                      <span className="text-ink-300">·</span>
                      <span className="text-ink-500">{item.cuisine}</span>
                    </div>
                    <button
                      onClick={() => navigate({ name: 'experience', restaurantId: item.restaurantId })}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3.5 py-2 text-xs font-semibold text-ink-700 transition-all duration-300 hover:bg-brand-500 hover:text-white"
                    >
                      <Eye size={14} /> View Item
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Favorites CTA */}
      <section className="section pb-12">
        <div className="reveal flex flex-col items-center justify-between gap-4 rounded-3xl bg-brand-50 p-8 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white">
              <Heart size={22} className="fill-current" />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold text-ink-900">
                {favorites.size} dish{favorites.size === 1 ? '' : 'es'} saved
              </h3>
              <p className="text-sm text-ink-500">Tap the heart on any dish to build your favourites list.</p>
            </div>
          </div>
          <button onClick={() => navigate({ name: 'discover' })} className="btn-primary">
            Find a restaurant
          </button>
        </div>
      </section>
    </div>
  );
}
