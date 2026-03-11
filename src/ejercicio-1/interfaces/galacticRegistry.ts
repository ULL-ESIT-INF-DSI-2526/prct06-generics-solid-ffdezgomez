/**
 * Interfaz genérica para un registro galáctico que puede almacenar cualquier tipo de objeto que tenga una propiedad 'name'.
 * Define métodos para agregar, eliminar, obtener por nombre y obtener todos los elementos del registro.
 */
export interface GalacticRegistry<T extends { name: string }> {
  add(item: T): void
  remove(item: T): void
  getByName(name: string): T | undefined
  getAll(): T[]
}