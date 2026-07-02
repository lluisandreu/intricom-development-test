import { EntityTable } from '../../components/EntityTable';
import { BackButton } from '../../components/BackButton';
import type { HotelBooking } from '../../types';

function HotelBookingsPage() {
  return (
    <section>
      <BackButton />
      <h1 className="text-2xl font-semibold mb-8">Hotel Bookings</h1>
      <EntityTable<HotelBooking>
        resource="hotel-bookings"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          { key: 'hotelId', label: 'Hotel ID' },
          { key: 'clientId', label: 'Client ID' },
          { key: 'createdDate', label: 'Created' },
        ]}
      />
    </section>
  );
}

export default HotelBookingsPage;
