import { parse } from '@babel/parser'
import { convert as convertAst } from './astConversion.mjs'
import _generate from '@babel/generator'
const generate = _generate.default

export function convert(source, fileName) {
    const ast = parse(source)
    const converted = convertAst(ast)
    const { code } = generate(converted, {
        sourceMaps: true,
        sourceFilename: fileName
    })
    return code
}
