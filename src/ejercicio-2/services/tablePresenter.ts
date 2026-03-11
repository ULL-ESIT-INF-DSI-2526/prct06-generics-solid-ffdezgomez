export interface TableRenderer {
  render(rows: unknown[]): void
}

/** Implementación concreta para consola (único lugar que usa console.table). */
export class ConsoleTableRenderer implements TableRenderer {
  public render(rows: unknown[]): void {
    console.table(rows)
  }
}

export type RowMapper<T> = (item: T) => Record<string, unknown>

/**
 * Presentador genérico para tablas.
 * - DIP: depende de la abstracción TableRenderer.
 * - SRP: solo transforma datos y delega render.
 */
export class TablePresenter<T> {
  readonly #renderer: TableRenderer
  readonly #mapper: RowMapper<T>

  constructor(renderer: TableRenderer, mapper: RowMapper<T>) {
    this.#renderer = renderer
    this.#mapper = mapper
  }

  public present(items: T[]): void {
    this.#renderer.render(items.map(this.#mapper))
  }
}
