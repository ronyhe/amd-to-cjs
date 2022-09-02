import test from 'ava'
import { convert } from '../src/sourceConversion.mjs'

test('returns converted code', t => {
    const result = convert('define(() => 1)', 'fileName.js')
    t.true(result.startsWith('module.exports = (() => 1)()'))
})

test('includes source map', t => {
    const result = convert('define(() => 1)', 'fileName.js')
    t.true(
        result.includes('//# sourceMappingURL=data:application/json;base64,')
    )
})
