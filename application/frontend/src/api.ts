const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// Let's create a generic request function that will handle all API requests and responses, including error handling.
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.message ?? res.statusText;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}

export const api = {
  list: <T>(resource: string) => request<T[]>(`/${resource}`),
  create: <T>(resource: string, dto: unknown) =>
    request<T>(`/${resource}`, { method: "POST", body: JSON.stringify(dto) }),
  update: <T>(resource: string, id: number, dto: unknown) =>
    request<T>(`/${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    }),
};
