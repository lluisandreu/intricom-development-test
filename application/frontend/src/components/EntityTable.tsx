import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../api';

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => ReactNode;
}

interface EntityTableProps<T extends { id: number }> {
  resource: string;
  columns: Column<T>[];
  refreshToken?: number;
}

export function EntityTable<T extends { id: number }>({ resource, columns, refreshToken }: EntityTableProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .list<T>(resource)
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resource, refreshToken]);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        {loading && <span className="loading loading-spinner" />}

        {!loading && error && (
          <div role="alert" className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  {columns.map((c) => (
                    <th key={String(c.key)}>{c.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {columns.map((c) => (
                      <td key={String(c.key)}>{c.render ? c.render(item) : String(item[c.key])}</td>
                    ))}
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center opacity-60">
                      No records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
