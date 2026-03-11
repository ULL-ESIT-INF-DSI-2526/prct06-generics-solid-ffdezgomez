import { describe, expect, test } from 'vitest'

import { JediMasterCollection } from '../../../src/ejercicio-1/classes/jediMasterCollection'
import type { JediMaster } from '../../../src/ejercicio-1/objects/jediMaster'

const yoda: JediMaster = {
  name: 'Yoda',
  faction: 'Republic',
  power: 900,
  year: 1980,
  planet: 'Dagobah',
}

const vader: JediMaster = {
  name: 'Vader',
  faction: 'Empire',
  power: 950,
  year: 1977,
  planet: 'Tatooine',
}

const dooku: JediMaster = {
  name: 'Dooku',
  faction: 'Sith',
  power: 900,
  year: 2002,
  planet: 'Serenno',
}

describe('JediMasterCollection', () => {
  test('searchByFaction filtra por facción', () => {
    const collection = new JediMasterCollection([yoda, vader, dooku])

    expect(collection.searchByFaction('Republic')).toEqual([yoda])
    expect(collection.searchByFaction('Sith')).toEqual([dooku])
  })

  test('searchByPower filtra por poder', () => {
    const collection = new JediMasterCollection([yoda, vader, dooku])

    expect(collection.searchByPower(900)).toEqual([yoda, dooku])
    expect(collection.searchByPower(950)).toEqual([vader])
  })

  test('searchByYear filtra por año', () => {
    const collection = new JediMasterCollection([yoda, vader, dooku])

    expect(collection.searchByYear(1977)).toEqual([vader])
  })

  test('getByName funciona con la implementación heredada', () => {
    const collection = new JediMasterCollection([yoda, vader])

    expect(collection.getByName('Yoda')).toEqual(yoda)
    expect(collection.getByName('Nope')).toBeUndefined()
  })
})
