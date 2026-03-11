import type { Receta } from '../receta'
import type { PasoBase } from '../paso'

export type TimeRange = { min: number; max: number }

/**
 * Servicio de cálculo desacoplado de las entidades.
 * Opera sobre el contrato mínimo de Receta/Paso (segundos + opcionalidad).
 */
export class RecipeTimeEstimator<TPaso extends PasoBase = PasoBase> {
  public countSteps(recipe: Receta<TPaso>): number {
    return recipe.pasos.length
  }

  /**
   * Estima el tiempo total en segundos.
   * - Si no hay pasos opcionales: devuelve un número.
   * - Si hay pasos opcionales: devuelve un rango {min, max}.
   */
  public estimateTime(recipe: Receta<TPaso>): number | TimeRange {
    const mandatorySeconds = recipe.pasos
      .filter((step) => !step.opcional)
      .reduce((acc, step) => acc + step.segundos, 0)

    const allSeconds = recipe.pasos.reduce((acc, step) => acc + step.segundos, 0)

    const hasOptional = recipe.pasos.some((step) => step.opcional)
    return hasOptional ? { min: mandatorySeconds, max: allSeconds } : allSeconds
  }
}
