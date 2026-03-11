import { describe, expect, expectTypeOf, test } from 'vitest'

import type { Faction } from '../../../src/ejercicio-1/types/faction'

describe('Faction (type)', () => {
  test('acepta valores válidos', () => {
    const faction = 'Republic' as const satisfies Faction
    expect(faction).toBe('Republic')
  })

  test('es una unión de literales de string (chequeo de tipos)', () => {
    expectTypeOf<Faction>().toEqualTypeOf<'Republic' | 'Empire' | 'Sith' | 'Independent'>()
  })
})
