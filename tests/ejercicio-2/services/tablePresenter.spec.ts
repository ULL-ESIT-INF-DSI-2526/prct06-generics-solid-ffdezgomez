import { describe, expect, test } from 'vitest'

import type { TableRenderer } from '../../../src/ejercicio-2/services/tablePresenter'
import { TablePresenter } from '../../../src/ejercicio-2/services/tablePresenter'

describe('TablePresenter', () => {
  test('present delega en TableRenderer con el mapeo', () => {
    const calls: unknown[][] = []
    const renderer: TableRenderer = {
      render: (rows) => calls.push(rows as unknown[]),
    }

    const presenter = new TablePresenter(renderer, (n: number) => ({ n, double: n * 2 }))
    presenter.present([1, 2, 3])

    expect(calls).toHaveLength(1)
    expect(calls[0]).toEqual([{ n: 1, double: 2 }, { n: 2, double: 4 }, { n: 3, double: 6 }])
  })
})
