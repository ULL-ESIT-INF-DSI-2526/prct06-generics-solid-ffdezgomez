/**
 * Interfaz genérica para realizar búsquedas en un registro galáctico basado en la afiliación a una faccion
 */
export interface SearchByFaction<T extends { faction: string }> {
  searchByFaction(faction: string): T[]
}

/**
 * Interfaz genérica para realizar búsquedas en un registro galáctico basado en el poder de los objetos registrados
 */
export interface SearchByPower <T extends { power: number }> {
  searchByPower(power: number): T[]
}

/**
 * Interfaz genérica para realizar búsquedas en un registro galáctico basado en la clase de los objetos registrados
 */
export interface SearchByClass<T extends { classType: string }> {
  searchByClass(classType: string): T[]
}

/**
 * Interfaz genérica para realizar búsquedas en un registro galáctico basado en el año de creación de los objetos registrados
 */
export interface SearchByYear<T extends { year: number }> {
  searchByYear(year: number): T[]
}

/**
 * Interfaz genérica para realizar búsquedas en un registro galáctico basado en el planeta de origen de los objetos registrados
 */
export interface SearchByPlanet<T extends { planet: string }> {
  searchByPlanet(planet: string): T[]
}