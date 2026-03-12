import { Elaborable } from "./elaborable"
import { SweetDescription } from "./sweetDescription"

/**
 * Clase que representa una Receta de un dulce
 */
export class Sweet<T extends SweetDescription> implements Elaborable<T> {
  constructor(private readonly _name: string,
              private readonly _difficulty: number,
              private readonly _prep_time: number,
              private readonly _oven_time: number,
              private readonly _fridge_time: number) {
    if (_name.length === 0) throw Error('name no puede estar vacio')
    if (_difficulty > 10 || _difficulty < 0) throw Error('difficulty debe estar entre 0-10')
    if (_prep_time < 0) throw Error('prep_time no puede ser negativo')
    if (_oven_time < 0) throw Error('oven_time no puede ser negativo')
    if (_fridge_time < 0) throw Error('fridge_time no puede ser negativo')
  }

  /**
   * Retorna el nombre y la difficultad de la receta dulce
   * @returns Objeto T formado por name y dificulta
   */
  desc(): T {
    const result: unknown = { name: this._name, difficult: this._difficulty }
    return result as T
  }

  /**
   * Retorna el tiempo de preparacion de la receta dulce
   * @returns tiempo de preparación e n minutos
   */
  time(): number {
    return this._prep_time + this._oven_time + this._fridge_time
  }

  /**
   * getter del nombre
   */
  get name() { return this._name }

  /**
   * getter de la dificultad
   */
  get difficulty() {return this._difficulty }

  /**
   * getter del tiempo de preparacion
   */
  get prep_time() { return this._prep_time}

  /**
   * getter de oventime
   */
  get oven_time() {return this._oven_time}

  /**
   * getter de fridgetime
   */
  get fridge_time() {return this._fridge_time }
}