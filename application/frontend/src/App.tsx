const siteName = import.meta.env.VITE_SITE_NAME ?? 'Booking Manager';

const cards = [
  {
    key: 'hotels',
    title: 'Hotels',
    description: 'Browse, create and update hotels.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10">
        <path d="M3 21h18" />
        <path d="M5 21V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14" />
        <path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />
      </svg>
    ),
  },
  {
    key: 'clients',
    title: 'Clients',
    description: 'Browse, create and update clients.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.418 3.582-7 8-7s8 2.582 8 7" />
      </svg>
    ),
  },
  {
    key: 'hotel-bookings',
    title: 'Hotel Bookings',
    description: 'Browse, create and update bookings.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
];

function App() {
  return (
    <div className="min-h-screen bg-base-200">
      <header className="navbar bg-base-100 shadow-sm px-6">
        <span className="text-xl font-semibold">{siteName}</span>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold mb-8 text-center">What would you like to manage?</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.key} className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="card-body items-center text-center">
                <div className="text-primary">{card.icon}</div>
                <h2 className="card-title">{card.title}</h2>
                <p className="opacity-70">{card.description}</p>
                <div className="card-actions mt-2">
                  <button className="btn btn-primary btn-sm">Open</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
