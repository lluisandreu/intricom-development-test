import { useId, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { api } from '../api';
import { EntityFormFields, useSelectOptions } from './EntityFormFields';
import type { FieldConfig } from './EntityFormFields';

interface UpdateEntityProps<T extends { id: number }> {
  resource: string;
  title: string;
  fields: FieldConfig<T>[];
  item: T;
  onUpdated: () => void;
}

export function UpdateEntity<T extends { id: number }>({ resource, title, fields, item, onUpdated }: UpdateEntityProps<T>) {
  const drawerId = useId();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const options = useSelectOptions(fields);

  const open = () => {
    const next: Record<string, string> = {};
    fields.forEach((f) => {
      next[String(f.key)] = String(item[f.key] ?? '');
    });
    setForm(next);
    setError(null);
    if (checkboxRef.current) checkboxRef.current.checked = true;
  };

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
      await api.update(resource, item.id, dto);
      close();
      onUpdated();
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
        <button type="button" className="btn btn-ghost btn-xs" aria-label={`Edit ${title}`} onClick={open}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4">
            <path d="M16.862 3.487a2.06 2.06 0 0 1 2.914 2.914L7.5 18.677l-4 1 1-4L16.862 3.487Z" />
          </svg>
        </button>
      </div>

      <div className="drawer-side">
        <label htmlFor={drawerId} aria-label="close" className="drawer-overlay"></label>

        <div className="bg-base-100 min-h-full w-96 p-6">
          <h2 className="text-lg font-semibold mb-4">Edit {title}</h2>

          {error && (
            <div role="alert" className="alert alert-error mb-4">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <EntityFormFields
              fields={fields}
              form={form}
              options={options}
              onChange={(key, value) => setForm((prev) => ({ ...prev, [key]: value }))}
            />

            <div className="flex gap-2 mt-2">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save'}
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
