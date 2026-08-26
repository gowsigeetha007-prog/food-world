import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'discover' }
  | { name: 'menu' }
  | { name: 'experience'; restaurantId: string }
  | { name: 'reviews' };

type Ctx = {
  route: Route;
  navigate: (route: Route) => void;
};

const RouterCtx = createContext<Ctx | null>(null);

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const [path, param] = hash.split('/');
  switch (path) {
    case 'discover':
      return { name: 'discover' };
    case 'menu':
      return { name: 'menu' };
    case 'experience':
      return { name: 'experience', restaurantId: param || 'saffron-house' };
    case 'reviews':
      return { name: 'reviews' };
    default:
      return { name: 'home' };
  }
}

function toHash(route: Route): string {
  switch (route.name) {
    case 'home':
      return '#/';
    case 'discover':
      return '#/discover';
    case 'menu':
      return '#/menu';
    case 'experience':
      return `#/experience/${route.restaurantId}`;
    case 'reviews':
      return '#/reviews';
  }
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      route,
      navigate: (next) => {
        const hash = toHash(next);
        if (window.location.hash !== hash) {
          window.location.hash = hash;
        } else {
          setRoute(next);
        }
      },
    }),
    [route]
  );

  return <RouterCtx.Provider value={value}>{children}</RouterCtx.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterCtx);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
