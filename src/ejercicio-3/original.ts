// type Shape =
//   | { kind: "circle"; radius: number }
//   | { kind: "rect"; width: number; height: number }
//   | { kind: "tri"; base: number; height: number };

// class AreaCalculator {
//   area(s: Shape): number {
//     switch (s.kind) {
//       case "circle": return Math.PI * s.radius * s.radius;
//       case "rect": return s.width * s.height;
//       case "tri": return (s.base * s.height) / 2;
//       default: throw new Error("Unknown shape");
//     }
//   }
// }