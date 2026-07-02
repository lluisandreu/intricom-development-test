import { Link, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HotelsPage from './pages/hotels/HotelsPage';
import ClientsPage from './pages/clients/ClientsPage';
import HotelBookingsPage from './pages/hotel-bookings/HotelBookingsPage';

const siteName = import.meta.env.VITE_SITE_NAME ?? 'Booking Manager';

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-sm px-6">
        <Link to="/" className="text-xl font-semibold">
          {siteName}
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/hotel-bookings" element={<HotelBookingsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
