import { useEffect, useState } from 'react';
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

export function useSelectOptions<T>(fields: FieldConfig<T>[]) {
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

  return options;
}

interface EntityFormFieldsProps<T> {
  fields: FieldConfig<T>[];
  form: Record<string, string>;
  options: Record<string, SelectOption[]>;
  onChange: (key: string, value: string) => void;
}

export function EntityFormFields<T>({ fields, form, options, onChange }: EntityFormFieldsProps<T>) {
  return (
    <>
      {fields.map((f) => (
        <label key={String(f.key)} className="form-control">
          <span className="label-text">{f.label}</span>
          {f.type === 'select' ? (
            <select
              className="select select-bordered w-full"
              required={f.required}
              value={form[String(f.key)] ?? ''}
              onChange={(e) => onChange(String(f.key), e.target.value)}
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
              onChange={(e) => onChange(String(f.key), e.target.value)}
            />
          )}
          {f.helpText && <span className="label-text-alt opacity-60">{f.helpText}</span>}
        </label>
      ))}
    </>
  );
}
