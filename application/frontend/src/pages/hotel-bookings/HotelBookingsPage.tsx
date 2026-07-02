import { useEffect, useState } from 'react';
import { EntityTable } from '../../components/EntityTable';
import { CreateEntity } from '../../components/CreateEntity';
import { BackButton } from '../../components/BackButton';
import { api } from '../../api';
import type { Client, Hotel, HotelBooking } from '../../types';

const fields = [
  { key: 'hotelId' as const, label: 'Hotel', type: 'select' as const, optionsResource: 'hotels', required: true, helpText: 'The hotel this booking belongs to.' },
  { key: 'clientId' as const, label: 'Client', type: 'select' as const, optionsResource: 'clients', required: true, helpText: 'The client this booking belongs to.' },
  { key: 'name' as const, label: 'Name', required: true, helpText: 'A short label for this booking.' },
  { key: 'address' as const, label: 'Address', required: true, helpText: 'Address associated with this booking.' },
];

function HotelBookingsPage() {
  const [refreshToken, setRefreshToken] = useState(0);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    api.list<Hotel>('hotels').then(setHotels).catch(() => {});
    api.list<Client>('clients').then(setClients).catch(() => {});
  }, [refreshToken]);

  return (
    <section>
      <BackButton />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Hotel Bookings</h1>
        <CreateEntity<HotelBooking>
          resource="hotel-bookings"
          title="Hotel Booking"
          fields={fields}
          onCreated={() => setRefreshToken((t) => t + 1)}
        />
      </div>

      <EntityTable<HotelBooking>
        resource="hotel-bookings"
        refreshToken={refreshToken}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          {
            key: 'hotelId',
            label: 'Hotel',
            render: (item) => hotels.find((h) => h.id === item.hotelId)?.name ?? `#${item.hotelId}`,
          },
          {
            key: 'clientId',
            label: 'Client',
            render: (item) => clients.find((c) => c.id === item.clientId)?.name ?? `#${item.clientId}`,
          },
          { key: 'createdDate', label: 'Created' },
        ]}
      />
    </section>
  );
}

export default HotelBookingsPage;
