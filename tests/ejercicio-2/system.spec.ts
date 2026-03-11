import { describe, expect, test } from 'vitest'

import { Chef } from '../../src/ejercicio-2/chef'
import { System } from '../../src/ejercicio-2/system'
import type { Paso } from '../../src/ejercicio-2/paso'
import type { Receta } from '../../src/ejercicio-2/receta'
import type { Recetario } from '../../src/ejercicio-2/recetario'

describe('System (ejercicio-2)', () => {
  test('almacena chefs y permite búsquedas requeridas', () => {
    const steps: Paso[] = [
      { id: 1, name: 'Cortar', segundos: 10, opcional: false, completado: 0, tags: ['prep'] },
      { id: 2, name: 'Hornear', segundos: 60, opcional: true, completado: 0, tags: ['cook'] },
    ]

    const recipe: Receta<Paso> = { id: 1, name: 'Tarta', year: 2020, pasos: steps }
    const recipeBook: Recetario<Paso> = { id: 1, name: 'Favoritas', recetas: [recipe] }

    const chef = new Chef(1, 'Ana', 100, [recipeBook])
    const system = new System([chef])

    expect(system.searchChefsByName('An')).toEqual([chef])
    expect(system.searchChefsByMinFollowers(50)).toEqual([chef])

    expect(system.searchRecipesByName('Tar')).toEqual([recipe])
    expect(system.searchRecipesByYearRange(2019, 2021)).toEqual([recipe])

    expect(system.searchStepsByName('Hor')).toEqual([steps[1]])
    expect(system.searchStepsByTags(['prep'])).toEqual([steps[0]])
    expect(system.searchStepsByOptional(true)).toEqual([steps[1]])
  })
})
