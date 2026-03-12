import { describe, expect, test } from 'vitest'
import { Sweet } from '../../src/ejercicio-modi/sweet'
import { SweetDescription } from '../../src/ejercicio-modi/sweetDescription'

const receta2: Sweet<SweetDescription> = new Sweet('dulcito', 10, 60, 120, 30)

describe('Sweet class tests', () => {
  test('Inicializa correctamente', () => {
    expect(receta2.name).toEqual('dulcito')
    expect(receta2.difficulty).toEqual(10)
    expect(receta2.prep_time).toEqual(60)
    expect(receta2.oven_time).toEqual(120)
    expect(receta2.fridge_time).toEqual(30)
  })

  test('Responde bien a errores', () => {
    expect(() => new Sweet('', 10, 60, 120, 30)).toThrowError('name no puede estar vacio')
    expect(() => new Sweet('dulcito', 50, 60, 120, 30)).toThrowError('difficulty debe estar entre 0-10')
    expect(() => new Sweet('dulcito', -50, 60, 120, 30)).toThrowError('difficulty debe estar entre 0-10')
    expect(() => new Sweet('dulcito', 10, -60, 120, 30)).toThrowError('prep_time no puede ser negativo')
    expect(() => new Sweet('dulcito', 10, 60, -120, 30)).toThrowError('oven_time no puede ser negativo')
    expect(() => new Sweet('dulcito', 10, 60, 120, -30)).toThrowError('fridge_time no puede ser negativo')
  })

  test('Descripcion correcta', () => {
    expect(receta2.desc()).toEqual({name: 'dulcito', difficult: 10})
  })

  test('Devuelve el tiempo correcto', () => {
    expect(receta2.time()).toEqual(210)
  })
})
