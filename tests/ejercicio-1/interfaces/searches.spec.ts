import { describe, expect, expectTypeOf, test } from 'vitest'

import { JediMasterCollection } from '../../../src/ejercicio-1/classes/jediMasterCollection'
import type {
  SearchByClass,
  SearchByFaction,
  SearchByPlanet,
  SearchByPower,
  SearchByYear,
} from '../../../src/ejercicio-1/interfaces/searches'
import type { JediMaster } from '../../../src/ejercicio-1/objects/jediMaster'

describe('Search interfaces', () => {
  test('JediMasterCollection implementa búsquedas relevantes (chequeo de tipos)', () => {
    const collection = new JediMasterCollection()
    expectTypeOf(collection).toMatchTypeOf<SearchByFaction<JediMaster>>()
    expectTypeOf(collection).toMatchTypeOf<SearchByYear<JediMaster>>()
    expectTypeOf(collection).toMatchTypeOf<SearchByPower<JediMaster>>()
  })

  test('SearchByPlanet puede implementarse con un objeto', () => {
    type PlanetEntity = { planet: string }
    const searcher: SearchByPlanet<PlanetEntity> = {
      searchByPlanet: (planet) => [{ planet }],
    }

    expect(searcher.searchByPlanet('Dagobah')).toEqual([{ planet: 'Dagobah' }])
  })

  test('SearchByClass puede implementarse con un objeto', () => {
    type ClassEntity = { classType: string }
    const searcher: SearchByClass<ClassEntity> = {
      searchByClass: (classType) => [{ classType }],
    }

    expect(searcher.searchByClass('Jedi')).toEqual([{ classType: 'Jedi' }])
  })
})
