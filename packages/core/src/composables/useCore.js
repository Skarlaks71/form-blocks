import useParse from "../utils/useParse"

export const useCore = () => {
  const { parseLimitProps } = useParse()
  const createInternalProps = (groupBase, backVars, groupProps, parseFunction = parseLimitProps) => {
    const props = []
    groupProps.forEach(gp => props.push(parseFunction(backVars, gp)))
    groupBase.forEach((group, index) => {
      group.forms = group.forms.map((input, indexForm) => ({
        ...input,
        ...props[index][indexForm],
      }))
    })
  }

  return {
    createInternalProps,
  }
}