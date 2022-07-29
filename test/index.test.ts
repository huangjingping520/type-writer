import { describe, expect, it } from 'vitest'
import { applyPatches, calculatePatch, diff } from '../src/index'

const input = `
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})
`

const output = `
import { describe, expect, it } from 'vitest'

describe('should', () => {
  it('one', () => {
    expect(one).toEqual(1)
    expect(two).toEqual(2)
  })
})
`

describe('should', () => {
  it('exported', () => {
    const delta = diff(input, output)
    expect(delta).toMatchSnapshot('delta')

    const patches = calculatePatch(delta)
    expect(patches).toMatchSnapshot('patches')

    const applied = applyPatches(input, patches)
    expect(applied.output).toMatchSnapshot('output')
    expect(applied.output).toEqual(output)
  })
})
