import { GalacticRegistry } from '../interfaces/galacticRegistry'
import { SearchByFaction } from '../interfaces/searches'
import { SearchByYear } from '../interfaces/searches'
import { Faction } from '../types/faction'

/**
 * Clase abstracta que implementa la interfaz GalacticRegistry para proporcionar una implementación básica de un registro galáctico.
 * Esta clase maneja una colección de objetos genéricos que deben tener una propiedad 'name' para ser almacenados en la colección.
 * Proporciona métodos para agregar, eliminar, obtener por nombre y obtener todos los elementos del registro, con validaciones para evitar duplicados y manejar errores.
 */
export abstract class BasicGalacticCollection<T extends { name: string, faction: Faction, year: number }> implements GalacticRegistry<T>, SearchByFaction<T>, SearchByYear<T> {
  protected _collection: T[] = []

  /**
   * Constructor de la clase BasicGalacticCollection que permite inicializar la colección con un array de elementos opcional. Cada elemento del array se agrega a la colección utilizando el método add, lo que garantiza que se apliquen las validaciones correspondientes.
   * @param collection - Un array opcional de elementos para inicializar la colección. Cada elemento debe tener una propiedad 'name' y se agregará a la colección utilizando el método add, lo que garantiza que no se agreguen elementos duplicados. Si no se proporciona ningún array, la colección se inicializa como un array vacío.
   */
  constructor(collection: T[] = []) {
    collection.forEach(item => this.add(item))
  }

  /**
   * Getter para acceder a la colección de elementos almacenados en el registro galáctico. Devuelve un array con todos los elementos de la colección.
   */
  get collection(): T[] {
    return this._collection
  }

  /**
   * Agrega un nuevo elemento a la colección si no existe un elemento con el mismo nombre. Si ya existe, lanza un error.
   * @param item - El elemento a agregar a la colección, que debe tener una propiedad 'name'.
   */
  public add(item: T): void {
    if (this.collection.some(existingItem => existingItem.name === item.name)) {
      throw new Error(`Item con el nombre '${item.name}' ya existe en la colección`)
    } else {
      this.collection.push(item)
    }
  }

  /**
   * Elimina un elemento de la colección si existe. Si el elemento no se encuentra, lanza un error.
   * @param item - El elemento a eliminar de la colección, que debe tener una propiedad 'name'.
   */
  public remove(item: T): void {
    const index = this.collection.indexOf(item)
    if (index > -1) {
      this.collection.splice(index, 1)
    } else {
      throw new Error('Item no encontrado en la colección')
    }
  }

  /**
   * Obtiene un elemento de la colección por su nombre. Si no se encuentra ningún elemento con el nombre especificado, devuelve undefined.
   * @param name - El nombre del elemento a buscar en la colección.
   * @returns El elemento encontrado con el nombre especificado, o undefined si no se encuentra ningún elemento con ese nombre.
   */
  public getByName(name: string): T | undefined {
    return this.collection.find((item: T) => item.name === name)
  }

  /**
   * Obtiene todos los elementos almacenados en la colección.
   * @returns Un array con todos los elementos de la colección.
   */
  public getAll(): T[] {
    return this.collection
  }

  abstract searchByYear(year: number): T[];

  abstract searchByFaction(faction: string): T[];
}