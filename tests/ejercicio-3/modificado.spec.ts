import { describe, expect, test, vi } from 'vitest'

import { AreaCalculator, Circle, Rectangle, Triangle } from '../../src/ejercicio-3/modificado'

describe('ejercicio-3/modificado', () => {
  test('Circle.area calcula πr^2', () => {
    const circle = new Circle({ kind: 'circle', radius: 2 })
    expect(circle.area()).toBeCloseTo(Math.PI * 4)
  })

  test('Rectangle.area calcula width*height', () => {
    const rect = new Rectangle({ kind: 'rect', width: 3, height: 5 })
    expect(rect.area()).toBe(15)
  })

  test('Triangle.area calcula (base*height)/2', () => {
    const tri = new Triangle({ kind: 'tri', base: 10, height: 4 })
    expect(tri.area()).toBe(20)
  })

  test('AreaCalculator.area delega en s.area()', () => {
    const shape = { area: vi.fn(() => 123) }
    const calc = new AreaCalculator<typeof shape>()

    expect(calc.area(shape)).toBe(123)
    expect(shape.area).toHaveBeenCalledTimes(1)
  })
})
