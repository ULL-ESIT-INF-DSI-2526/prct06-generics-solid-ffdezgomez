import { describe, expect, test } from 'vitest'

import { Chef } from '../../../src/ejercicio-2/chef'
import type { Recetario } from '../../../src/ejercicio-2/recetario'
import type { Receta } from '../../../src/ejercicio-2/receta'
import type { Paso } from '../../../src/ejercicio-2/paso'
import { ChefSearchService, RecipeSearchService, StepSearchService } from '../../../src/ejercicio-2/services/searchServices'

describe('Search services', () => {
  const steps: Paso[] = [
    { id: 1, name: 'Cortar', segundos: 10, opcional: false, completado: 0, tags: ['prep'] },
    { id: 2, name: 'Hornear', segundos: 60, opcional: true, completado: 0, tags: ['cook', 'hot'] },
  ]

  const recipes: Receta<Paso>[] = [
    { id: 1, name: 'Tarta', year: 2020, pasos: steps },
    { id: 2, name: 'Ensalada', year: 2024, pasos: [steps[0]] },
  ]

  const recipeBook: Recetario<Paso> = { id: 1, name: 'Favoritas', recetas: recipes }

  test('ChefSearchService busca por nombre y mínimo seguidores', () => {
    const chefs = [new Chef(1, 'Ana', 10, [recipeBook]), new Chef(2, 'Beto', 100, [recipeBook])]
    const service = new ChefSearchService(() => chefs)

    expect(service.searchByName('A')).toHaveLength(1)
    expect(service.searchByMinFollowers(50)).toEqual([chefs[1]])
  })

  test('RecipeSearchService busca por nombre y rango de años', () => {
    const service = new RecipeSearchService(() => recipes)

    expect(service.searchByName('Ta')).toEqual([recipes[0]])
    expect(service.searchByYearRange(2021, 2024)).toEqual([recipes[1]])
  })

  test('StepSearchService busca por nombre, tags y opcionalidad', () => {
    const service = new StepSearchService(() => steps)

    expect(service.searchByName('Hor')).toEqual([steps[1]])
    expect(service.searchByTags(['cook'])).toEqual([steps[1]])
    expect(service.searchByOptional(false)).toEqual([steps[0]])
  })
})
