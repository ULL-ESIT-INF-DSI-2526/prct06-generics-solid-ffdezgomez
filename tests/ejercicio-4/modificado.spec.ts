import { describe, expect, test, vi } from 'vitest'

import { AllInOnePrinter, FaxMachine, Printer, Scanner, sendFax } from '../../src/ejercicio-4/modificado'

describe('ejercicio-4/modificado', () => {
  test('Scanner.scan devuelve el documento escaneado', () => {
    const scanner = new Scanner()
    expect(scanner.scan('doc')).toBe('Scanned: doc')
  })

  test('sendFax llama a Faxable.fax (DIP: usa solo la interfaz necesaria)', () => {
    const faxer = { fax: vi.fn() }
    sendFax(faxer, 'hola')
    expect(faxer.fax).toHaveBeenCalledWith('hola')
    expect(faxer.fax).toHaveBeenCalledTimes(1)
  })

  test('Printer.print y FaxMachine.fax usan console.log', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    new Printer().print('x')
    new FaxMachine().fax('y')

    expect(logSpy).toHaveBeenCalledWith('Printing:', 'x')
    expect(logSpy).toHaveBeenCalledWith('Faxing:', 'y')

    logSpy.mockRestore()
  })

  test('AllInOnePrinter implementa print/scan/fax', () => {
    const aio = new AllInOnePrinter()

    expect(aio.scan('a')).toBe('All-in-one Scanned: a')

    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    aio.print('p')
    aio.fax('f')

    expect(logSpy).toHaveBeenCalledWith('All-in-one Printing:', 'p')
    expect(logSpy).toHaveBeenCalledWith('All-in-one Faxing:', 'f')

    logSpy.mockRestore()
  })
})
