import test from 'ava'
import { convert } from '../src/astConversion.mjs'
import { assertEqualAst } from './utils.mjs'
import { parse } from '@babel/parser'

test('non-define nodes remain the same', t => {
    assertConversion(t, '1', '1')
})

test('defines with no deps are supported', t => {
    assertConversion(t, 'define(() => 1)', 'module.exports = ((() => 1))()')
})

function assertConversion(t, actual, expected) {
    assertEqualAst(t, convert(parse(actual)), expected)
}
