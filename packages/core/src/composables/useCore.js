import useParse from "../utils/useParse"

export const useCore = () => {
  const { parseLimitProps } = useParse()
  const createInternalProps = (groupBase, backVars, groupProps) => {
    const props = []
    groupProps.forEach(gp => props.push(parseLimitProps(backVars, gp)))
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