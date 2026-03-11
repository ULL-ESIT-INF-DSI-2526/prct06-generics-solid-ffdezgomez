import { BasicGalacticCollection } from "./basicGalacticCollection"
import { GalacticRegistry } from "../interfaces/galacticRegistry"
import { SearchByPower } from "../interfaces/searches"
import { JediMaster } from "../objects/jediMaster"

/**
 * Clase que representa una colección de Jedi Masters en el universo de Star Wars.
 */
export class JediMasterCollection extends BasicGalacticCollection<JediMaster> 
implements GalacticRegistry<JediMaster>, SearchByPower<JediMaster> {
  constructor(collection: JediMaster[] = []) {
    super(collection)
  }

  /**
   * Busca y devuelve un array de Jedi Masters que pertenecen a una facción específica.
   * @param faction - La facción a la que pertenecen los Jedi Masters que se desean buscar.
   * @returns Un array de Jedi Masters que pertenecen a la facción especificada.
   */
  public searchByFaction(faction: string): JediMaster[] {
    return this.collection.filter(jedi => jedi.faction === faction)
  }

  /**
   * Busca y devuelve un array de Jedi Masters que tienen un nivel de poder específico.
   * @param power - El nivel de poder que se desea buscar entre los Jedi Masters.
   * @returns Un array de Jedi Masters que tienen el nivel de poder especificado.
   */
  public searchByPower(power: number): JediMaster[] {
    return this.collection.filter(jedi => jedi.power === power)
  }

  /**
   * Busca y devuelve un array de Jedi Masters que fueron creados en un año específico.
   * @param year - El año de creación que se desea buscar entre los Jedi Masters.
   * @returns Un array de Jedi Masters que fueron creados en el año especificado.
   */
  public searchByYear(year: number): JediMaster[] {
    return this.collection.filter(jedi => jedi.year === year)
  }
}