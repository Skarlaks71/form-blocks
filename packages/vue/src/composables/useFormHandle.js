import { useCore, useMaska } from "@form-blocks/core"

export const useFormHandle = () => {
  const { createInternalProps } = useCore()
  const { cepMask, docCNPJ } = useMaska()
  const groups = (backVars, groupBase, groupProps, options) => {

    createInternalProps(groupBase, backVars, groupProps)

    return groupBase
  }

  return {
    groups,
  }
}