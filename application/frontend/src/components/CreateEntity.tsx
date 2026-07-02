import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api';

export interface FieldConfig<T> {
  key: keyof T;
  label: string;
  type?: 'text' | 'number' | 'tel' | 'select';
  required?: boolean;
  helpText?: string;
  /** For type: 'select' — resource to fetch options from (e.g. 'hotels'). Options are shown as "name (#id)". */
  optionsResource?: string;
}

interface SelectOption {
  id: number;
  name: string;
}

interface CreateEntityProps<T> {
  resource: string;
  title: string;
  fields: FieldConfig<T>[];
  onCreated: () => void;
}

export function CreateEntity<T>({ resource, title, fields, onCreated }: CreateEntityProps<T>) {
  const drawerId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [options, setOptions] = useState<Record<string, SelectOption[]>>({});

  useEffect(() => {
    fields.forEach((f) => {
      if (f.type === 'select' && f.optionsResource) {
        api.list<SelectOption>(f.optionsResource).then((data) => {
          setOptions((prev) => ({ ...prev, [String(f.key)]: data }));
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    if (checkboxRef.current) checkboxRef.current.checked = false;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const dto: Record<string, unknown> = {};
    fields.forEach((f) => {
      const raw = form[String(f.key)] ?? '';
      dto[String(f.key)] = f.type === 'number' || f.type === 'select' ? Number(raw) : raw;
    });

    try {
      await api.create(resource, dto);
      setForm({});
      close();
      onCreated();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="drawer drawer-end w-auto">
      <input id={drawerId} ref={checkboxRef} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <label htmlFor={drawerId} className="btn btn-primary btn-sm">
          + New {title}
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor={drawerId} aria-label="close" className="drawer-overlay"></label>

        <div className="bg-base-100 min-h-full w-96 p-6">
          <h2 className="text-lg font-semibold mb-4">New {title}</h2>

          {error && (
            <div role="alert" className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.map((f) => (
              <label key={String(f.key)} className="form-control">
                <span className="label-text">{f.label}</span>
                {f.type === 'select' ? (
                  <select
                    className="select select-bordered w-full"
                    required={f.required}
                    value={form[String(f.key)] ?? ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [String(f.key)]: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select {f.label}
                    </option>
                    {(options[String(f.key)] ?? []).map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name} (#{opt.id})
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="input input-bordered w-full"
                    type={f.type === 'number' ? 'number' : f.type === 'tel' ? 'tel' : 'text'}
                    required={f.required}
                    value={form[String(f.key)] ?? ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, [String(f.key)]: e.target.value }))}
                  />
                )}
                {f.helpText && <span className="label-text-alt opacity-60">{f.helpText}</span>}
              </label>
            ))}

            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Creating…' : 'Create'}
              </button>
              <button type="button" className="btn" onClick={close}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
