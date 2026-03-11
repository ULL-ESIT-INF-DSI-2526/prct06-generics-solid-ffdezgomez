import { describe, expect, test } from 'vitest'

import { InMemoryRepository } from '../../src/ejercicio-2/repository'

describe('InMemoryRepository', () => {
  test('add/getById/getAll funcionan', () => {
    const repo = new InMemoryRepository<{ id: number; name: string }, number>((x) => x.id)

    repo.add({ id: 1, name: 'a' })
    repo.add({ id: 2, name: 'b' })

    expect(repo.getById(1)).toEqual({ id: 1, name: 'a' })
    expect(repo.getAll()).toHaveLength(2)
  })

  test('add lanza error si el id ya existe', () => {
    const repo = new InMemoryRepository<{ id: number }, number>((x) => x.id)
    repo.add({ id: 1 })

    expect(() => repo.add({ id: 1 })).toThrow("Item con id '1' ya existe en el repositorio")
  })

  test('remove lanza error si no existe', () => {
    const repo = new InMemoryRepository<{ id: number }, number>((x) => x.id)

    expect(() => repo.remove(123)).toThrow("Item con id '123' no encontrado en el repositorio")
  })
})
