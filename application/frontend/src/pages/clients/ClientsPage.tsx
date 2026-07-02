import { EntityTable } from '../../components/EntityTable';
import { BackButton } from '../../components/BackButton';
import type { Client } from '../../types';

function ClientsPage() {
  return (
    <section>
      <BackButton />
      <h1 className="text-2xl font-semibold mb-8">Clients</h1>
      <EntityTable<Client>
        resource="clients"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          { key: 'phone', label: 'Phone' },
          { key: 'createdDate', label: 'Created' },
        ]}
      />
    </section>
  );
}

export default ClientsPage;
