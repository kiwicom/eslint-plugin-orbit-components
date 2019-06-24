import isStyledTagname from '../common/isStyledTagname'

const getNodeStyles = node => {
  const [firstQuasi, ...quasis] = node.quasi.quasis
  // remove line break added to the first quasi
  const lineBreakCount = node.quasi.loc.start.line - 1
  let styles = `${'\n'.repeat(lineBreakCount)}${' '.repeat(
    node.quasi.loc.start.column + 1
  )}${firstQuasi.value.raw}`

  // replace expression by spaces and line breaks
  quasis.forEach(({ value, loc }, idx) => {
    const prevLoc = idx === 0 ? firstQuasi.loc : quasis[idx - 1].loc
    const lineBreaksCount = loc.start.line - prevLoc.end.line
    const spacesCount =
      loc.start.line === prevLoc.end.line
        ? loc.start.column - prevLoc.end.column + 2
        : loc.start.column + 1
    styles = `${styles}${' '}${'\n'.repeat(lineBreaksCount)}${' '.repeat(
      spacesCount
    )}${value.raw}`
  })

  return styles
}

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
          return context.report({
            messageId: 'useToken'
          })
        }
      }
    }
  }
}
