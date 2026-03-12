import { Elaborable } from "./elaborable"
import { PlatoType } from "./platoType"

/**
 * Clase que representa una receta salada
 */
export class Salty implements Elaborable<string> {
  private readonly _name: string
  private readonly _origin: string
  private readonly _type: PlatoType
  private readonly _time: number

  constructor(name: string, origin: string, type: PlatoType, time: number) {
    if (name.length === 0) throw Error('name no puede estar vacio')
    if (origin.length === 0) throw Error('origin no puede estar vacio')
    if (time < 0) throw Error('time no puede ser negativo')

    this._name = name
    this._origin = origin
    this._type = type
    this._time = time
  }

  /**
   * Calcula el tiempo de elaboracion de la receta
   * @returns tiempo de elaboracion
   */
  public time(): number { return this._time }
  
  /**
   * Devuelve la descripcion de la receta
   * @returns Cadena con la descripcion de la receta
   */
  public desc(): string {
    return `Plato dulce llamado ${this._name}, originario de ${this._origin}`
  }

  /**
   * getter de name
   */
  get name() { return this._name }
  
  
  /**
   * geter de origin
   */
  get origin() { return this._origin }
  
  /**
   * getter de type
   */
  get type() { return this._type }
}