import { parse } from '@babel/parser'
import { cloneDeepWithoutLoc } from '@babel/types'

const isString = s => typeof s === 'string'

const toAst = source => (isString(source) ? parse(source) : source)

export function assertEqualAst(t, a, b) {
    const process = source => cloneDeepWithoutLoc(toAst(source))
    t.deepEqual(process(a), process(b))
}
