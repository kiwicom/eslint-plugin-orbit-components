export const unnecessaryText = {
  create: context => {
    let importedOrbitComponents = []
    let JSXElements = []

    const doNotUseTextIn = ['Button', 'Heading']

    const isOrbitComponent = name => {
      return /@kiwicom\/orbit-components/.test(name)
    }

    const detectOrbitName = node => {
      const specifier = node.specifiers[0]
      // IF NAMED import
      if (specifier.imported) {
        return specifier.imported.name
      }
      const originalImport = node.source.value.match(
        /@kiwicom\/orbit-components\/(?:lib|es)\/([^\/]*)/
      )
      return originalImport[1]
    }

    const registerImport = (context, node, name) => {
      if (isOrbitComponent(name)) {
        const ORIGINAL_ORBIT_NAME = detectOrbitName(node)
        const LOCAL_NAME = node.specifiers[0].local.name
        importedOrbitComponents[LOCAL_NAME] = ORIGINAL_ORBIT_NAME
      }
    }

    return {
      JSXElement(node) {
        JSXElements.push(node)
      },

      ImportDeclaration: node => {
        if (node.specifiers.length) {
          const name = node.source.value
          registerImport(context, node, name)
        }
      },

      'Program:exit': () => {
        JSXElements.forEach(node => {
          const openingEl = node.openingElement
          const localName = openingEl.name.name
          if (
            localName in importedOrbitComponents &&
            doNotUseTextIn.find(
              x => x === importedOrbitComponents[localName]
            ) &&
            node.children
          ) {
            {
              node.children.map(child => {
                if (!child.openingElement) return
                const childElement = child.openingElement.name
                const childElementName = childElement.name
                if (importedOrbitComponents[childElementName] === 'Text') {
                  context.report({
                    node: child,
                    messageId: 'unnecessaryText'
                  })
                }
              })
            }
          }
        })
      }
    }
  },
  meta: {
    messages: {
      unnecessaryText: `do not wrap to Text component`
    }
  }
}
