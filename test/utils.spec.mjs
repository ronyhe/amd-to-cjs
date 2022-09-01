import test from 'ava'
import { assertEqualAst } from './utils.mjs'
import { parse } from '@babel/parser'

test('identical asts are equal', t => {
    assertEqualAst(t, 'a = 1', 'a = 1')
})

test('accepts strings or asts', t => {
    assertEqualAst(t, 'a = 1', parse('a = 1'))
})

test('locations are irrelevant', t => {
    assertEqualAst(t, 'a = 1', 'a =1')
})
