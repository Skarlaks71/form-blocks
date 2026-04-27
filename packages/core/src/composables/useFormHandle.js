import useParse from "../utils/useParse"
import { useCore } from "./useCore"

export const useFormHandle = () => {
  const { parseLimitProps, parseStringShorthand } = useParse()
  const { createInternalProps } = useCore()
  const makeGroups = (backVars, groupBase, groupProps, options = {}) => {

    const parseFunction = options.parse || parseLimitProps

    const normalizedGroups = groupBase.map(group => ({
      ...group,
      forms: group.forms.map(input => {
        // Se for string, vira objeto com label
        if (typeof input === 'string') {
          return parseStringShorthand(input)
        }
        if (Array.isArray(input)) {
          if (typeof input[0] !== 'string') {
            throw new Error('FB 001: The first element needs to be String!')
          }

          const parse = parseStringShorthand(input[0])
          parse.iProps = { ...parse.iProps, options: input[1] }
          return parse
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