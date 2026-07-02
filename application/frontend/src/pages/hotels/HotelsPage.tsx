import { useState } from 'react';
import { EntityTable } from '../../components/EntityTable';
import { CreateEntity } from '../../components/CreateEntity';
import { UpdateEntity } from '../../components/UpdateEntity';
import { BackButton } from '../../components/BackButton';
import type { Hotel } from '../../types';

const fields = [
  { key: 'name' as const, label: 'Name', required: true, helpText: 'The hotel’s display name.' },
  { key: 'address' as const, label: 'Address', required: true, helpText: 'Full street address of the hotel.' },
];

function HotelsPage() {
  const [refreshToken, setRefreshToken] = useState(0);

  return (
    <section>
      <BackButton />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Hotels</h1>
        <CreateEntity<Hotel>
          resource="hotels"
          title="Hotel"
          fields={fields}
          onCreated={() => setRefreshToken((t) => t + 1)}
        />
      </div>

      <EntityTable<Hotel>
        resource="hotels"
        refreshToken={refreshToken}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          { key: 'createdDate', label: 'Created' },
        ]}
        actions={(item) => (
          <UpdateEntity<Hotel>
            resource="hotels"
            title="Hotel"
            fields={fields}
            item={item}
            onUpdated={() => setRefreshToken((t) => t + 1)}
          />
        )}
      />
    </section>
  );
}

export default HotelsPage;
