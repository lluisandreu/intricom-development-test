// Usamos una interfaz genérica para los repositorios, de manera que podamos tener implementaciones diferentes según el tipo de persistencia (DB o FS).
export interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
}
