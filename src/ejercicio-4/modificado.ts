// Una responsabilidad por interfaz/clase
export interface Printable { print(doc: string): void; }
export interface Scannable { scan(doc: string): string; }
export interface Faxable { fax(doc: string): void; }

export class Printer implements Printable {  // Solo imprime
  print(doc: string): void {
    console.log("Printing:", doc);
  }
}

export class Scanner implements Scannable {  // Solo escanea
  scan(doc: string): string {
    return `Scanned: ${doc}`;
  }
}

export class FaxMachine implements Faxable {  // Solo fax
  fax(doc: string): void {
    console.log("Faxing:", doc);
  }
}

export class AllInOnePrinter implements Printable, Scannable, Faxable {  // Compone responsabilidades
  print(doc: string): void { console.log("All-in-one Printing:", doc); }
  scan(doc: string): string { return `All-in-one Scanned: ${doc}`; }
  fax(doc: string): void { console.log("All-in-one Faxing:", doc); }
}

// Clientes usan solo lo necesario
export function sendFax(faxer: Faxable, doc: string) { faxer.fax(doc); }
