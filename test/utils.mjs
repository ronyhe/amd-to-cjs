import { parse } from '@babel/parser'
import { cloneDeepWithoutLoc } from '@babel/types'

export function assertEqualAst(t, a, b) {
    const process = source => cloneDeepWithoutLoc(parse(source))
    t.deepEqual(process(a), process(b))
}
