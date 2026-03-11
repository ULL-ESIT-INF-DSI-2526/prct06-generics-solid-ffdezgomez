import { describe, test, expect } from 'vitest'

describe('ejercicio-4/original', () => {
  test('el módulo carga sin errores (archivo vacío)', async () => {
    await expect(import('../../src/ejercicio-4/original')).resolves.toBeDefined()
  })
})
