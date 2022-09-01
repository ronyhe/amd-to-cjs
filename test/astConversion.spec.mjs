import test from 'ava'
import { convert } from '../src/astConversion.mjs'
import { assertEqualAst } from './utils.mjs'
import { parse } from '@babel/parser'

test('non-define nodes remain the same', t => {
    assertConversion(t, '1', '1')
})

function assertConversion(t, actual, expected) {
    assertEqualAst(t, convert(parse(actual)), expected)
}
