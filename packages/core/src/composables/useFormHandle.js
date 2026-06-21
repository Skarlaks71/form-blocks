import useParse from "../utils/useParse"
import { useCore } from "./useCore"

/**
 * 🔥 Vincula explicitamente a tipagem genérica do index.d.ts
 * @returns {import("../index").IUseFormHandle}
 */
export const useFormHandle = () => {
  const defineGroupBase = (groups) => groups;

  const { toCamelCase, parseStringShorthand } = useParse()
  const { createInternalProps } = useCore()
  const makeGroups = (backVars, groupBase, groupProps, options = {}) => {

    const parseFunction = options.parse || toCamelCase

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
    defineGroupBase,
  }
}