import { getTokens } from '@kiwicom/orbit-design-tokens'

const tokens = getTokens()

export const parseExpression = node => {
  if (node.type !== 'ArrowFunctionExpression') return
  if (node.body.type !== 'MemberExpression') return

  let possibleValues = []
  possibleValues.push(node.body.property.name)

  return possibleValues
}

export const isToken = variable => {
  if (Object.keys(tokens).includes(variable)) return '$token'
  return '$variable'
}
