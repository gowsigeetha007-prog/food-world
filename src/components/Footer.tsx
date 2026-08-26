import { Utensils, Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { useRouter, type Route } from '@/router';

const linkGroups: { title: string; links: { label: string; route: Route }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', route: { name: 'home' } },
      { label: 'Discover Restaurants', route: { name: 'discover' } },
      { label: 'Browse Menu', route: { name: 'menu' } },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Reviews', route: { name: 'reviews' } },
      { label: 'Contact', route: { name: 'reviews' } },
      { label: 'Reserve a Table', route: { name: 'reviews' } },
    ],
  },
];

const socials = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Youtube, label: 'Youtube' },
];

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="mt-24 bg-ink-900 text-ink-200">
      <div className="section py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-8">
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white">
                <Utensils size={20} />
              </span>
              <span className="font-display text-xl font-bold text-white">
                Foodie<span className="text-brand-400">Finder</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">
              Discover. Taste. Enjoy. Your companion for finding remarkable restaurants and
              unforgettable food experiences, wherever you are.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-800 text-ink-300 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-500 hover:text-white"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.route)}
                      className="text-sm text-ink-400 transition-colors hover:text-brand-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Visit</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <span>248 Market Street, San Francisco, CA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-brand-400" />
                <span>+1 (415) 555-0148</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-brand-400" />
                <span>hello@foodiefinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 text-sm text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Foodie Finder. Crafted with care.</p>
          <p>Discover. Taste. Enjoy.</p>
        </div>
      </div>
    </footer>
  );
}
