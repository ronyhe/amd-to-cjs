import { parse } from '@babel/parser'

const isString = s => typeof s === 'string'

const toAst = source => (isString(source) ? parse(source) : source)

export function assertEqualAst(t, a, b) {
    const process = source => removeAstIncidentals(toAst(source))
    t.deepEqual(process(a), process(b))
}

function removeAstIncidentals(ast) {
    const serialized = JSON.stringify(ast)
    return JSON.parse(serialized, (k, v) =>
        isIncidental(k, v) ? undefined : v
    )
}

function isIncidental(k, v) {
    return (
        ['loc', 'start', 'end', 'parenStart'].includes(k) ||
        (k === 'optional' && v === null)
    )
}
