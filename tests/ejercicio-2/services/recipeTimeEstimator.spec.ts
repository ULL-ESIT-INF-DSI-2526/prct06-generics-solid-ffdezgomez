import { describe, expect, test } from 'vitest'

import { RecipeTimeEstimator } from '../../../src/ejercicio-2/services/recipeTimeEstimator'
import type { Receta } from '../../../src/ejercicio-2/receta'
import type { Paso } from '../../../src/ejercicio-2/paso'

describe('RecipeTimeEstimator', () => {
  test('countSteps devuelve el número total de pasos', () => {
    const estimator = new RecipeTimeEstimator<Paso>()

    const recipe: Receta<Paso> = {
      id: 1,
      name: 'R1',
      year: 2024,
      pasos: [
        { id: 1, name: 'A', segundos: 10, opcional: false, completado: 0, tags: [] },
        { id: 2, name: 'B', segundos: 20, opcional: true, completado: 0, tags: [] },
      ],
    }

    expect(estimator.countSteps(recipe)).toBe(2)
  })

  test('estimateTime devuelve número si no hay opcionales', () => {
    const estimator = new RecipeTimeEstimator<Paso>()

    const recipe: Receta<Paso> = {
      id: 1,
      name: 'R',
      year: 2024,
      pasos: [
        { id: 1, name: 'A', segundos: 10, opcional: false, completado: 0, tags: [] },
        { id: 2, name: 'B', segundos: 20, opcional: false, completado: 0, tags: [] },
      ],
    }

    expect(estimator.estimateTime(recipe)).toBe(30)
  })

  test('estimateTime devuelve rango si hay opcionales', () => {
    const estimator = new RecipeTimeEstimator<Paso>()

    const recipe: Receta<Paso> = {
      id: 1,
      name: 'R',
      year: 2024,
      pasos: [
        { id: 1, name: 'A', segundos: 10, opcional: false, completado: 0, tags: [] },
        { id: 2, name: 'B', segundos: 20, opcional: true, completado: 0, tags: [] },
      ],
    }

    expect(estimator.estimateTime(recipe)).toEqual({ min: 10, max: 30 })
  })
})
