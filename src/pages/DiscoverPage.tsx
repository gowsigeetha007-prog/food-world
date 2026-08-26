import { useMemo, useState } from 'react';
import { Search, MapPin, SlidersHorizontal, X, Star } from 'lucide-react';
import { restaurants, cuisines, type Category } from '@/data';
import { RestaurantCard } from '@/components/RestaurantCard';
import { useScrollReveal } from '@/hooks';

const categoryFilters: (Category | 'All')[] = [
  'All',
  'Starters',
  'Main Course',
  'Desserts',
  'Beverages',
];

const priceOptions = ['$', '$$', '$$$', '$$$$'] as const;
const ratingOptions = [4.5, 4.7, 4.8] as const;

export function DiscoverPage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [cuisine, setCuisine] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(4);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q);
      const matchesLoc =
        !location.trim() ||
        r.location.toLowerCase().includes(location.trim().toLowerCase());
      const matchesCat =
        category === 'All' || r.categories.includes(category);
      const matchesCuisine = cuisine === 'All' || r.cuisine === cuisine;
      const matchesRating = r.rating >= minRating;
      const matchesPrice = r.priceRange.length <= maxPrice;
      const matchesDistance = r.distanceKm <= maxDistance;
      return (
        matchesQuery &&
        matchesLoc &&
        matchesCat &&
        matchesCuisine &&
        matchesRating &&
        matchesPrice &&
        matchesDistance
      );
    });
  }, [query, location, category, cuisine, minRating, maxPrice, maxDistance]);

  const reset = () => {
    setQuery('');
    setLocation('');
    setCategory('All');
    setCuisine('All');
    setMinRating(0);
    setMaxPrice(4);
    setMaxDistance(10);
  };

  return (
    <div ref={ref}>
      {/* Header */}
      <section className="relative overflow-hidden bg-ink-900">
        <img
          src="https://images.pexels.com/photos/7627408/pexels-photo-7627408.jpeg?auto=compress&cs=tinysrgb&h=700&w=1600"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="section relative py-16 sm:py-20">
          <div className="max-w-2xl">
            <span className="eyebrow bg-white/10 text-brand-300 ring-1 ring-white/15">
              Discover
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl text-balance">
              Find the perfect place to eat
            </h1>
            <p className="mt-4 text-lg text-ink-300">
              Search by restaurant, cuisine, or dish — then refine by rating, price, and distance
              to land on exactly the right table.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-white/95 p-4 shadow-card backdrop-blur sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <div className="relative">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  className="input pl-11"
                  placeholder="Restaurant, cuisine, or dish"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  className="input pl-11"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="btn-ghost sm:px-5"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="section pt-10">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {categoryFilters.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`chip whitespace-nowrap ${
                category === c
                  ? 'bg-brand-500 text-white shadow-soft'
                  : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-brand-300 hover:text-brand-600'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Filters + grid */}
      <section className="section py-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside
            className={`reveal ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-ink-900">Refine</h3>
                <button
                  onClick={reset}
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Reset all
                </button>
              </div>

              <FilterGroup label="Cuisine">
                <select
                  className="input"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  <option value="All">All cuisines</option>
                  {cuisines.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </FilterGroup>

              <FilterGroup label="Minimum rating">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setMinRating(0)}
                    className={`chip ${minRating === 0 ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'}`}
                  >
                    Any
                  </button>
                  {ratingOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`chip ${minRating === r ? 'bg-brand-500 text-white' : 'bg-ink-100 text-ink-600 hover:bg-ink-200'}`}
                    >
                      <Star size={12} className="fill-current" /> {r.toFixed(1)}+
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label={`Max price · ${'$'.repeat(maxPrice)}`}>
                <input
                  type="range"
                  min={1}
                  max={4}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <div className="mt-1 flex justify-between text-xs text-ink-400">
                  {priceOptions.map((p) => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup label={`Max distance · ${maxDistance} km`}>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
              </FilterGroup>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-ink-500">
                <span className="font-bold text-ink-900">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'restaurant' : 'restaurants'} found
              </p>
              <button
                onClick={() => setShowFilters((s) => !s)}
                className="btn-ghost px-4 py-2 text-xs lg:hidden"
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>

            {filtered.length === 0 ? (
              <div className="reveal flex flex-col items-center rounded-3xl bg-white py-20 text-center shadow-soft">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink-100 text-ink-400">
                  <X size={26} />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                  No restaurants match
                </h3>
                <p className="mt-2 max-w-sm text-sm text-ink-500">
                  Try widening your filters — lower the rating, increase the distance, or reset all.
                </p>
                <button onClick={reset} className="btn-primary mt-6">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((r) => (
                  <div key={r.id} className="reveal">
                    <RestaurantCard restaurant={r} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 border-t border-ink-100 pt-5">
      <p className="label">{label}</p>
      {children}
    </div>
  );
}
