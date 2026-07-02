import { useState } from 'react';
import { EntityTable } from '../../components/EntityTable';
import { CreateEntity } from '../../components/CreateEntity';
import { UpdateEntity } from '../../components/UpdateEntity';
import { BackButton } from '../../components/BackButton';
import type { Client } from '../../types';

const fields = [
  { key: 'name' as const, label: 'Name', required: true, helpText: 'The client’s full name.' },
  { key: 'address' as const, label: 'Address', required: true, helpText: 'The client’s home or billing address.' },
  { key: 'phone' as const, label: 'Phone', type: 'tel' as const, required: true, helpText: 'Include the country code, e.g. +34600000000.' },
];

function ClientsPage() {
  const [refreshToken, setRefreshToken] = useState(0);

  return (
    <section>
      <BackButton />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <CreateEntity<Client>
          resource="clients"
          title="Client"
          fields={fields}
          onCreated={() => setRefreshToken((t) => t + 1)}
        />
      </div>

      <EntityTable<Client>
        resource="clients"
        refreshToken={refreshToken}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          { key: 'phone', label: 'Phone' },
          { key: 'createdDate', label: 'Created' },
        ]}
        actions={(item) => (
          <UpdateEntity<Client>
            resource="clients"
            title="Client"
            fields={fields}
            item={item}
            onUpdated={() => setRefreshToken((t) => t + 1)}
          />
        )}
      />
    </section>
  );
}

export default ClientsPage;
