import isStyledTagname from '../common/isStyledTagname'
import parser from '../parser'

const isOrbitToken = value => /\$token/.test(value)

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
              if (rule.prop === 'color' && !isOrbitToken(rule.value)) {
                const loc = {
                  start: {
                    line: node.loc.start.line + rule.source.start.line - 1,
                    column: rule.source.start.column
                  },
                  end: {
                    line: node.loc.end.line - rule.source.end.line + 2,
                    column: rule.source.end.column
                  }
                }

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
