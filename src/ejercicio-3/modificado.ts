export type CircleType = { kind: "circle", radius: number }
export type RectangleType = { kind: "rect", width: number, height: number }
export type TriangleType = { kind: "tri", base: number, height: number }

export type Shape = CircleType | RectangleType | TriangleType

export abstract class FiguraGeometrica<T extends Shape> {
  protected figura: T
  
  constructor(figura: T) {
    this.figura = figura
  }
  
  abstract area(): number
}

export class Circle extends FiguraGeometrica<CircleType> {
  area(): number {
    return Math.PI * this.figura.radius * this.figura.radius
  }
}

export class Rectangle extends FiguraGeometrica<RectangleType> {
  area(): number {
    return this.figura.width * this.figura.height
  }
}

export class Triangle extends FiguraGeometrica<TriangleType> {
  area(): number {
    return (this.figura.base * this.figura.height) / 2
  }
}

export class AreaCalculator<T extends { area: () => number }> {
  area(s: T): number {
    return s.area()
  }
}