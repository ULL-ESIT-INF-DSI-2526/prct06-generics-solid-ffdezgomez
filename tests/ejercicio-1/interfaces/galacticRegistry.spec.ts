import { describe, expect, expectTypeOf, test } from 'vitest'

import { JediMasterCollection } from '../../../src/ejercicio-1/classes/jediMasterCollection'
import type { GalacticRegistry } from '../../../src/ejercicio-1/interfaces/galacticRegistry'
import type { JediMaster } from '../../../src/ejercicio-1/objects/jediMaster'

describe('GalacticRegistry (interface)', () => {
  test('JediMasterCollection cumple la interfaz (chequeo de tipos)', () => {
    const collection = new JediMasterCollection()
    expectTypeOf(collection).toMatchTypeOf<GalacticRegistry<JediMaster>>()
  })

  test('contrato mínimo: add/getAll funcionan', () => {
    const collection: GalacticRegistry<JediMaster> = new JediMasterCollection()

    const yoda: JediMaster = {
      name: 'Yoda',
      faction: 'Republic',
      power: 900,
      year: 1980,
      planet: 'Dagobah',
    }

    collection.add(yoda)
    expect(collection.getAll()).toEqual([yoda])
  })
})
