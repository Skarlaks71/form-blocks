import { useCore, useParse } from "@form-blocks/core"

export const useFormHandle = () => {
  const { parseLimitProps, parseStringShorthand } = useParse()
  const { createInternalProps } = useCore()
  const makeGroups = (backVars, groupBase, groupProps, options = {}) => {

    const parseFunction = options.parse || parseLimitProps

    const normalizedGroups = groupBase.map(group => ({
      ...group,
      forms: group.forms.map(input => {
        // Se for string, vira objeto com label e model (baseado no label)
        if (typeof input === 'string') {
          return parseStringShorthand(input)
        }
        return input
      })
    }))

    createInternalProps(normalizedGroups, backVars, groupProps, parseFunction)

    return normalizedGroups
  }

  return {
    makeGroups,
  }
}