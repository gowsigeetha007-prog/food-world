import { useState } from 'react';
import { Menu, X, Utensils } from 'lucide-react';
import { useRouter, type Route } from '@/router';

const links: { label: string; route: Route }[] = [
  { label: 'Home', route: { name: 'home' } },
  { label: 'Discover', route: { name: 'discover' } },
  { label: 'Menu', route: { name: 'menu' } },
  { label: 'Reviews', route: { name: 'reviews' } },
  { label: 'Contact', route: { name: 'reviews' } },
];

export function Navbar() {
  const { route, navigate } = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (r: Route) =>
    r.name === route.name ||
    (r.name === 'reviews' && route.name === 'reviews');

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-ink-100/80 bg-cream/85 backdrop-blur-xl">
        <nav className="section flex h-18 items-center justify-between py-3.5">
          <button
            onClick={() => go({ name: 'home' })}
            className="group flex items-center gap-2.5"
            aria-label="Foodie Finder home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft transition-transform duration-300 group-hover:-rotate-6">
              <Utensils size={20} />
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-ink-900">
              Foodie<span className="text-brand-500">Finder</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => go(link.route)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(link.route)
                      ? 'text-brand-600'
                      : 'text-ink-600 hover:text-ink-900'
                  }`}
                >
                  {link.label}
                  {isActive(link.route) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button onClick={() => go({ name: 'discover' })} className="btn-primary">
              Explore Now
            </button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-800 ring-1 ring-ink-200 transition hover:bg-white md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden border-b border-ink-100 bg-cream transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="section flex flex-col gap-1 py-4">
          {links.map((link) => (
            <li key={link.label}>
              <button
                onClick={() => go(link.route)}
                className={`w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition ${
                  isActive(link.route)
                    ? 'bg-brand-100 text-brand-700'
                    : 'text-ink-700 hover:bg-ink-100'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="mt-2">
            <button onClick={() => go({ name: 'discover' })} className="btn-primary w-full">
              Explore Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
