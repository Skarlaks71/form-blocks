export default function useFileGeneratorForms() {
  const { parseLimitProps } = useParse()
  const groups = (backVars, options) => {
    const groupBase = [
      {
        noTitle: true,
        forms: [
          {
            colProps: { md: '12', lg: '3' },
            label: 'Mês',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.month,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Ano',
            component: 'b-form-input',
            limitChars: 4,
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars)
    const props = [groupProps1]
    groupBase.forEach((group, index) => {
      group.forms = group.forms.map((input, indexForm) => ({
        ...input,
        ...props[index][indexForm],
      }))
    })
    console.log('groupBase', groupBase)

    return groupBase
  }

  return {
    groups,
  }
}