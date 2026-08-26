import { RouterProvider, useRouter } from '@/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { DiscoverPage } from '@/pages/DiscoverPage';
import { MenuPage } from '@/pages/MenuPage';
import { ExperiencePage } from '@/pages/ExperiencePage';
import { ReviewsPage } from '@/pages/ReviewsPage';

function Routes() {
  const { route } = useRouter();

  return (
    <>
      <Navbar />
      <main>
        {route.name === 'home' && <HomePage />}
        {route.name === 'discover' && <DiscoverPage />}
        {route.name === 'menu' && <MenuPage />}
        {route.name === 'experience' && <ExperiencePage restaurantId={route.restaurantId} />}
        {route.name === 'reviews' && <ReviewsPage />}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  );
}

export default App;
