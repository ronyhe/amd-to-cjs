import test from 'ava'
import { convert } from '../src/sourceConversion.mjs'

test('return converted code', t => {
    const result = convert('define(() => 1)')
    t.true(result.startsWith('module.exports = (() => 1)()'))
    convert('define(() => 1)')
})
