import test from 'ava'
import { assertEqualAst } from './utils.mjs'

test('identical asts are equal', t => {
    assertEqualAst(t, 'a = 1', 'a = 1')
})

test('locations are irrelevant', t => {
    assertEqualAst(t, 'a = 1', 'a =1')
})
