import { Elaborable } from "./elaborable"

/**
 * Clase que funciona para gestionar un libro de recetas
 */
export class CookBook<T extends Elaborable<T>> {
  constructor(private readonly collection: T[]) {}

  /**
   * Añade una receta
   * @param recipe - Receta a añadir
   */
  public add(recipe: T): void { 
    if (!this.collection.includes(recipe)) this.collection.push(recipe) 
    else throw Error('Receta ya incluida')
  }
  
  /**
   * Elimina receta
   * @param recipe - receta a eliminar
   */
  public remove(recipe: T): void {
    if (this.collection.findIndex(value => recipe === value) === -1)
      throw Error('La receta no esta en el libro')
    else {
      this.collection.splice(this.collection.findIndex(value => recipe === value), 1)
    }
  }

  /**
   * Devuelve receta en indice concreto
   * @param index - Indice de la receta a devolver
   * @returns Receta en dicho indice
   */
  public get(index: number): T {
    if (index < 0 || index > this.collection.length - 1) throw Error('Overflow')
    else return this.collection[index]
  }

  /**
   * Devuelve cantidad de recetas
   * @returns cantidad de recetas
   */
  public size(): number { return this.collection.length }

  /**
   * Devuelve un nuevo libro de recetas que cumplen predicado logico
   * @param logic - predicado logico 
   * @returns CookBook con las recetas que pasaron el predicado logico
   */
  public filter(logic: () => boolean): CookBook<T> {
    return new CookBook(this.collection.filter(logic))
  }

  /**
   * Calcula media de tiempo de elaboracion de las recetas
   * @returns media de elaboracion de las recetas
   */
  public avgTime(): number {
    const only_times = this.collection.map(value => value.time())
    return only_times.reduce((acc, curr) => acc += curr) / this.collection.length
  }

}