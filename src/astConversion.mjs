import { strict as assert } from 'node:assert'
import t from '@babel/types'
import { modifyPath, map } from 'ramda'

const REQUIRE = t.identifier('require')
const EXPORTS = t.memberExpression(
    t.identifier('module'),
    t.identifier('exports')
)

export function convert(ast) {
    t.assertFile(ast)
    return modifyPath(
        ['program', 'body'],
        map(node =>
            isDefineExpressionNode(node) ? convertDefineExpression(node) : node
        ),
        ast
    )
}

function convertDefineExpression(defineExpressionNode) {
    const call = defineExpressionNode.expression
    const args = call.arguments
    assert(args.length > 0 && args.length <= 2)
    const [deps, func] = splitDepsAndFunc(call)
    return convertDefine(deps, func)
}

function convertDefine(deps, func) {
    const requires = deps.elements.map(dep => t.callExpression(REQUIRE, [dep]))
    const exportsDeclaration = t.assignmentExpression(
        '=',
        EXPORTS,
        t.callExpression(t.parenthesizedExpression(func), requires)
    )
    return t.expressionStatement(exportsDeclaration)
}

function splitDepsAndFunc(node) {
    const hasDeps = node.arguments.length > 1
    if (hasDeps) {
        return [node.arguments[0], node.arguments[1]]
    }
    return [t.arrayExpression([]), node.arguments[0]]
}

function isDefineExpressionNode(node) {
    return (
        t.isExpressionStatement(node) &&
        t.isCallExpression(node.expression) &&
        t.isIdentifier(node.expression.callee) &&
        node.expression.callee.name === 'define'
    )
}
