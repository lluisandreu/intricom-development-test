import { EntityTable } from '../../components/EntityTable';
import { BackButton } from '../../components/BackButton';
import type { Hotel } from '../../types';

function HotelsPage() {
  return (
    <section>
      <BackButton />
      <h1 className="text-2xl font-semibold mb-8">Hotels</h1>
      <EntityTable<Hotel>
        resource="hotels"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          { key: 'createdDate', label: 'Created' },
        ]}
      />
    </section>
  );
}

export default HotelsPage;
