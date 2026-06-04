import useParse from "../utils/useParse"

const registry = {}

export const useCore = () => {
  const { parseLimitProps, toCamelCase } = useParse()
  const createInternalProps = (groupBase, backVars, groupProps, parseFunction = toCamelCase) => {
    const props = []
    groupProps.forEach(gp => props.push(parseLimitProps(backVars, gp, parseFunction)))
    groupBase.forEach((group, index) => {
      group.forms = group.forms.map((input, indexForm) => ({
        ...input,
        ...props[index][indexForm],
      }))
    })
  }

  /**
   * Permite ao desenvolvedor registrar componentes customizados globalmente no FormBlocks
   * @param {string} name - O nome que será usado no Objeto (input.component)
   * @param {Component} component - O componente Vue importado
   */
  const registerComponent = (name, component, meta = {}) => {
    registry[name] = {
      component,
      supportsLabelFor: meta.supportsLabelFor ?? 'true',
      ...meta,
    }
  }

  /**
   * Permite ao desenvolvedor registrar vários componentes customizados de uma única vez.
   * @param {Object} componentsRegistry - Objeto contendo os componentes e seus metadados.
   */
  const registerMultipleComponents = (componentsRegistry) => {
    if (!componentsRegistry || typeof componentsRegistry !== 'object') {
      throw new Error('FB 002: registerMultipleComponents expects an object as argument.')
    }

    // Itera sobre cada chave do objeto recebido
    Object.entries(componentsRegistry).forEach(([name, config]) => {
      // Destrutura o componente e separa o restante como meta do componente
      const { component, ...meta } = config

      if (!component) {
        console.warn(`[FormBlocks]: Component for registry key "${name}" was not found and skipped.`)
        return
      }

      // Reaproveita sua função original para registrar um por um de forma segura
      registerComponent(name, component, meta)
    })
  }

  const getRegistry = () => registry

  return {
    createInternalProps,
    registerComponent,
    registerMultipleComponents,
    getRegistry,
  }
}