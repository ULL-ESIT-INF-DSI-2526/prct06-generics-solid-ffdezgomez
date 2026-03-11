import { describe, expect, test } from 'vitest'

import { BasicGalacticCollection } from '../../../src/ejercicio-1/classes/basicGalacticCollection'
import type { JediMaster } from '../../../src/ejercicio-1/objects/jediMaster'

class TestJediCollection extends BasicGalacticCollection<JediMaster> {
  public searchByYear(year: number): JediMaster[] {
    return this.collection.filter((jedi) => jedi.year === year)
  }

  public searchByFaction(faction: string): JediMaster[] {
    return this.collection.filter((jedi) => jedi.faction === faction)
  }
}

const makeJedi = (name: string, overrides: Partial<JediMaster> = {}): JediMaster => {
  return {
    name,
    faction: 'Republic',
    power: 900,
    year: 1977,
    planet: 'Coruscant',
    ...overrides,
  }
}

describe('BasicGalacticCollection', () => {
  test('constructor agrega elementos iniciales', () => {
    const luke = makeJedi('Luke')
    const yoda = makeJedi('Yoda')

    const collection = new TestJediCollection([luke, yoda])

    expect(collection.getAll()).toHaveLength(2)
    expect(collection.getByName('Luke')).toEqual(luke)
  })

  test('add añade un elemento nuevo', () => {
    const collection = new TestJediCollection()
    const obiWan = makeJedi('Obi-Wan')

    collection.add(obiWan)

    expect(collection.getAll()).toEqual([obiWan])
  })

  test('add lanza error si se repite el nombre', () => {
    const collection = new TestJediCollection([makeJedi('Anakin')])

    expect(() => collection.add(makeJedi('Anakin', { power: 1000 }))).toThrow(
      "Item con el nombre 'Anakin' ya existe en la colección",
    )
  })

  test('remove elimina si el objeto existe en la colección (por identidad)', () => {
    const ahsoka = makeJedi('Ahsoka')
    const collection = new TestJediCollection([ahsoka])

    collection.remove(ahsoka)

    expect(collection.getAll()).toEqual([])
  })

  test('remove lanza error si el objeto no está en la colección', () => {
    const collection = new TestJediCollection([makeJedi('Mace')])

    expect(() => collection.remove(makeJedi('Mace'))).toThrow('Item no encontrado en la colección')
  })

  test('getByName devuelve undefined si no existe', () => {
    const collection = new TestJediCollection([makeJedi('Leia')])

    expect(collection.getByName('Han')).toBeUndefined()
  })
})
