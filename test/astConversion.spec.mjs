import test from 'ava'
import { convert } from '../src/astConversion.mjs'
import { assertEqualAst } from './utils.mjs'
import { parse } from '@babel/parser'

test('non-define nodes remain the same', t => {
    assertConversion(t, '1', '1')
})

test('no deps', t => {
    assertConversion(t, 'define(() => 1)', 'module.exports = ((() => 1))()')
})

test('empty dep array', t => {
    assertConversion(t, 'define([], () => 1)', 'module.exports = ((() => 1))()')
})

test('single dep', t => {
    assertConversion(
        t,
        'define(["a"], (a) => 1)',
        'module.exports = (((a) => 1))(require("a"))'
    )
})

function assertConversion(t, actual, expected) {
    assertEqualAst(t, convert(parse(actual)), expected)
}
