
/**
 * Interfaz genérica que define lo minimo que debería de tener una receta
*/
export interface Elaborable<T> {
  time(): number /// Tiempo desarrollo en minutos
  desc(): T /// Información descriptiva de la receta
}