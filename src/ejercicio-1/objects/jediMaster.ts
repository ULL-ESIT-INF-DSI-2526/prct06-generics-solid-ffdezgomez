import { Faction } from '../types/faction'

/**
 * Tipo que representa a un Jedi Master en el universo de Star Wars, con propiedades para su nombre, afiliación a una facción, nivel de poder, año de creación y planeta de origen. Este tipo se utiliza para definir la estructura de los objetos que se almacenarán en la colección de Jedi Masters y para realizar búsquedas basadas en estas propiedades.
 */
export type JediMaster = {
  name: string
  faction: Faction
  power: number
  year: number
  planet: string
}