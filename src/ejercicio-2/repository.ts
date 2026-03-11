export interface Repository<T, K> {
  add(item: T): void;
  remove(id: K): void;
  getById(id: K): T | undefined;
  getAll(): T[];
}

export type IdSelector<T, K> = (item: T) => K

/**
 * Implementación en memoria de un repositorio genérico.
 * - Cumple SRP (almacenamiento) y DIP (se consume por la interfaz Repository).
 * - No impone que T tenga la propiedad `id` (usa un selector de id).
 */
export class InMemoryRepository<T, K> implements Repository<T, K> {
  readonly #items = new Map<K, T>()
  readonly #getId: IdSelector<T, K>

  constructor(getId: IdSelector<T, K>, initialItems: T[] = []) {
    this.#getId = getId
    initialItems.forEach((item) => this.add(item))
  }

  public add(item: T): void {
    const id = this.#getId(item)
    if (this.#items.has(id)) {
      throw new Error(`Item con id '${String(id)}' ya existe en el repositorio`)
    }
    this.#items.set(id, item)
  }

  public remove(id: K): void {
    if (!this.#items.delete(id)) {
      throw new Error(`Item con id '${String(id)}' no encontrado en el repositorio`)
    }
  }

  public getById(id: K): T | undefined {
    return this.#items.get(id)
  }

  public getAll(): T[] {
    return Array.from(this.#items.values())
  }
}