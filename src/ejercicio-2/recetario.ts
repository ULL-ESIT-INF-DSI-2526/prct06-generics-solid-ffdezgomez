import type { Receta } from './receta'
import type { PasoBase } from './paso'

/**
 * Recetario: colección de recetas.
 * Mantiene el modelo del ejercicio anterior (una lista de recetas) pero como entidad propia.
 */
export type Recetario<TPaso extends PasoBase = PasoBase> = {
  id: string | number
  name: string
  recetas: Receta<TPaso>[]
}
