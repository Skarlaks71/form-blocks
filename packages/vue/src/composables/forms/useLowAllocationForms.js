export default function useLowAllocationForms() {
  const { parseLimitProps } = useParse()
  const { getVehiclePurpose } = useSelectVehicleHelp()
  const groups = (backVars, options) => {
    const groupBase = [
      {
        title: 'Dados da baixa na destinação do veículo',
        forms: [
          {
            colProps: { md: '12', lg: '7' },
            label: 'Destinação *',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.destination,
              getOptionLabel: options => `${options.text} - ${getVehiclePurpose(options.label)}`,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data da Baixa',
            formGroupProps: {
              title: 'Data de Baixa na Unidade Orçamentária',
            },
            component: 'b-form-input',
            maska: '##/##/####',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Motivo da Baixa',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.lowMotive,
              filterable: true,
              label: 'text',
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Odômetro',
            component: 'b-form-input',
            othersProps: {
              type: 'number',
            },
            limitChars: 6,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Referência',
            component: 'b-form-input',
            maska: '##/####',
            limitChars: 7,
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars, 5)
    const props = [groupProps1]
    groupBase.forEach((group, index) => {
      group.forms = group.forms.map((input, indexForm) => ({
        ...input,
        ...props[index][indexForm],
      }))
    })


    return groupBase
  }

  return {
    groups,
  }
}