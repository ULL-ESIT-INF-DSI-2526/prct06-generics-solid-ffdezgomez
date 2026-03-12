import { describe, test, expect } from 'vitest'
import { Salty } from '../../src/ejercicio-modi/salty'

const salty1: Salty = new Salty('receta1', 'spain', 'Principal', 60)

describe('Salty class tests', () => {
  test('Salty inicializa correctamente', () => {
    expect(salty1.name).toEqual('receta1')
    expect(salty1.origin).toEqual('spain')
    expect(salty1.type).toEqual('Principal')
  })

  test('Errores funcionan correctamente', () => {
    expect(() => new Salty('', 'spain', 'Principal', 60)).toThrowError('name no puede estar vacio')
    expect(() => new Salty('hola', '', 'Principal', 60)).toThrowError('origin no puede estar vacio')
    expect(() => new Salty('hola', 'spain', 'Principal', -60)).toThrowError('time no puede ser negativo')
  })

  test('time funciona correctamente', () => {
    expect(salty1.time()).toEqual(60)
  })

  test('desc devuelve cadena con la info', () => {
    expect(salty1.desc()).toEqual('Plato dulce llamado receta1, originario de spain')
  })
})