import { describe, expect, expectTypeOf, test } from 'vitest'

import type { JediMaster } from '../../../src/ejercicio-1/objects/jediMaster'

describe('JediMaster (type)', () => {
  test('un objeto puede satisfacer el tipo', () => {
    const kenobi = {
      name: 'Obi-Wan Kenobi',
      faction: 'Republic',
      power: 850,
      year: 1977,
      planet: 'Stewjon',
    } satisfies JediMaster

    expect(kenobi.name).toBe('Obi-Wan Kenobi')
  })

  test('incluye las propiedades esperadas (chequeo de tipos)', () => {
    type Keys = keyof JediMaster
    expectTypeOf<Keys>().toEqualTypeOf<'name' | 'faction' | 'power' | 'year' | 'planet'>()
  })
})
