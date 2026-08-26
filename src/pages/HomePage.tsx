import { useState } from 'react';
import {
  Search,
  MapPin,
  Salad,
  UtensilsCrossed,
  Cake,
  Wine,
  Compass,
  ShieldCheck,
  Sparkles,
  Heart,
  Clock,
  Star,
} from 'lucide-react';
import { restaurants, categories, type Category } from '@/data';
import { RestaurantCard } from '@/components/RestaurantCard';
import { SectionHeading } from '@/components/SectionHeading';
import { useScrollReveal } from '@/hooks';
import { useRouter } from '@/router';

const iconMap = { Salad, UtensilsCrossed, Cake, Wine };

const whyFeatures = [
  {
    icon: Compass,
    title: 'Curated Discovery',
    text: 'Hand-picked restaurants vetted by local foodies, so every option is worth your evening.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Reviews',
    text: 'Real ratings from a community of diners you can rely on, not paid placements.',
  },
  {
    icon: Sparkles,
    title: 'Effortless Reservations',
    text: 'Find a table, pick a time, and request a booking in under a minute.',
  },
  {
    icon: Heart,
    title: 'Personalised Tastes',
    text: 'Save favourites, follow cuisines, and let Foodie Finder learn what you love.',
  },
];

const stats = [
  { value: '2,400+', label: 'Restaurants' },
  { value: '180K', label: 'Foodie Reviews' },
  { value: '60+', label: 'Cuisines' },
  { value: '24/7', label: 'Open Kitchens' },
];

export function HomePage() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const explore = () => navigate({ name: 'discover' });

  const featured = restaurants.slice(0, 6);

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
            alt="Gourmet restaurant table"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-900/70 to-brand-900/55" />
        </div>

        <div className="section relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur animate-fade-in">
              <Sparkles size={14} /> Discover. Taste. Enjoy.
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl text-balance animate-fade-up">
              Discover Your Next Favorite Food
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 animate-fade-up [animation-delay:120ms]">
              From hidden neighbourhood gems to celebrated fine dining — explore curated
              restaurants, browse beautiful menus, and reserve a table in seconds.
            </p>

            {/* Search */}
            <div className="mt-9 rounded-3xl bg-white/95 p-4 shadow-card backdrop-blur sm:p-5 animate-fade-up [animation-delay:220ms]">
              <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <div className="relative">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                  <input
                    className="input pl-11"
                    placeholder="Restaurant, cuisine, or dish"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && explore()}
                  />
                </div>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                  />
                  <input
                    className="input pl-11"
                    placeholder="Location or postcode"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && explore()}
                  />
                </div>
                <button onClick={explore} className="btn-primary sm:px-8">
                  Explore Now
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="animate-fade-up"
                  style={{ animationDelay: `${320 + i * 80}ms` }}
                >
                  <div className="font-display text-3xl font-bold text-white">{s.value}</div>
                  <div className="mt-1 text-sm text-ink-300">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section py-20 sm:py-24">
        <SectionHeading
          eyebrow="Browse by craving"
          title="Popular Food Categories"
          subtitle="Whether you are starting light or finishing sweet, jump straight to the courses you love."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap];
            return (
              <button
                key={cat.name}
                onClick={() => navigate({ name: 'menu' })}
                className="reveal group relative overflow-hidden rounded-3xl bg-white p-6 text-left shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-card"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 transition-all duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon size={26} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{cat.name}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{cat.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Browse {cat.name}
                </div>
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured restaurants */}
      <section className="section py-20 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Editor's picks"
            title="Featured Restaurants"
            subtitle="A taste of what your city is cooking right now — each one a Foodie Finder favourite."
            align="left"
          />
          <button onClick={() => navigate({ name: 'discover' })} className="btn-ghost shrink-0">
            View all restaurants
          </button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <div key={r.id} className="reveal">
              <RestaurantCard restaurant={r} />
            </div>
          ))}
        </div>
      </section>

      {/* Why Foodie Finder */}
      <section className="section py-20 sm:py-24">
        <div className="rounded-3xl bg-ink-900 p-8 sm:p-12 lg:p-16">
          <SectionHeading
            eyebrow="Why us"
            title="Why Foodie Finder?"
            subtitle="We make great food easier to find, to trust, and to book — all in one beautifully simple place."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyFeatures.map((f) => (
              <div
                key={f.title}
                className="reveal rounded-2xl bg-ink-800/60 p-6 ring-1 ring-white/5 transition-all duration-500 hover:bg-ink-800"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <f.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="section py-12">
        <div className="reveal flex flex-col items-center justify-between gap-6 rounded-3xl bg-brand-500 p-8 text-center sm:p-12 lg:flex-row lg:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Hungry? Your next favourite meal is one tap away.
            </h3>
            <p className="mt-2 text-brand-50">
              Join thousands of foodies discovering new restaurants every day.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button onClick={() => navigate({ name: 'discover' })} className="btn-dark">
              Start Discovering
            </button>
            <button
              onClick={() => navigate({ name: 'menu' })}
              className="btn bg-white text-brand-600 hover:bg-brand-50 hover:-translate-y-0.5"
            >
              Browse the Menu
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
