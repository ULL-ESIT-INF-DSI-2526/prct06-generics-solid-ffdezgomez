import { describe, test, expect } from 'vitest'

describe('ejercicio-3/original', () => {
  test('el módulo carga sin errores', async () => {
    await expect(import('../../src/ejercicio-3/original')).resolves.toBeDefined()
  })
})
