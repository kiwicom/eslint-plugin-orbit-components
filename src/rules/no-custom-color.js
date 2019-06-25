import isStyledTagname from '../common/isStyledTagname'
import parser from '../parser'

const isVariable = value => /\$.*/.test(value)

export const noCustomColor = {
  meta: {
    messages: {
      useToken: `please use token instead of hex`
    }
  },
  create: context => {
    return {
      TaggedTemplateExpression(node) {
        if (isStyledTagname(node)) {
          const { parsedCSS } = parser(node)

          parsedCSS.nodes.forEach(rules => {
            rules.nodes.forEach(rule => {
              const loc = rule.source.start

              if (rule.prop === 'color' && !isVariable(rule.value)) {
                context.report({
                  loc,
                  node,
                  messageId: 'useToken'
                })
              }

            })
          })
        }
      }
    }
  }
}
