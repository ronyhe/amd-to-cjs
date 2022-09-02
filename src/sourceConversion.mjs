import { Buffer } from 'node:buffer'
import { parse } from '@babel/parser'
import { convert as convertAst } from './astConversion.mjs'
import _generate from '@babel/generator'
const generate = _generate.default

export function convert(source, fileName) {
    const ast = parse(source)
    const converted = convertAst(ast)
    const { code, map } = generate(converted, {
        sourceMaps: true,
        sourceFilename: fileName
    })
    return code + sourceMapToComment(map)
}

/** Implementation modified from `https://github.com/sindresorhus/source-map-to-comment/blob/main/index.js` */
function sourceMapToComment(sourceMap) {
    const base64 = Buffer.from(JSON.stringify(sourceMap)).toString('base64')
    const contents = `sourceMappingURL=data:application/json;base64,${base64}`
    return `//# ${contents}`
}
