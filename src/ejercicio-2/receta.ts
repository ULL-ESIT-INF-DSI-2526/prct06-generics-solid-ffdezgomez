import type { PasoBase } from './paso'

/**
 * Receta type that represents a recipe with a name, year of creation, and an array of steps (pasos). Each step is represented by a Paso object, which includes details about the step such as its name, duration in seconds, whether it is optional, and how many times it has been completed.
 */
export type Receta<TPaso extends PasoBase = PasoBase> = {
  id: string | number
  name: string
  year: number
  pasos: TPaso[]
}