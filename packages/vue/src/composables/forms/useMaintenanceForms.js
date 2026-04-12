export default function useMaintenanceForms() {
  const { parseLimitProps } = useParse()
  const { configMoney, docMask } = useMaska()
  const groups = (backVars, options) => {
    const groupBase = [
      {
        title: 'Identificação do registro',
        forms: [
          {
            colProps: { md: '12', lg: '2' },
            label: 'Código do Órgão',
            component: 'v-select',
            othersProps: {
              options: options.organ,
              filterable: true,
              reduce: val => val.value,
            },
            limitChars: 2,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Código da U.O.',
            formGroupProps: {
              title: 'Código da Unidade Orçamentária',
            },
            component: 'v-select',
            othersProps: {
              options: options.budgetUnit,
              filterable: true,
              reduce: val => val.value,
            },
            limitChars: 4,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data de Inclusão',
            formGroupProps: {
              title: 'Data de Inclusão na Unidade Orçamentária',
            },
            component: 'b-form-input',
            maska: '##/##/####',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Código RENAVAM *',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.vehicleOptions,
              filterable: true,
              reduce: val => val.value,
            },
          },
        ],
      },
      {
        title: 'Dados da manutenção',
        forms: [
          {
            colProps: { md: '12', lg: '2' },
            label: 'Número da O.S.',
            formGroupProps: {
              title: 'Número da Ordem de Serviço',
            },
            component: 'b-form-input',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data da Manutenção',
            component: 'b-form-input',
            maska: '##/##/####',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Odômetro',
            component: 'b-form-input',
            othersProps: {
              type: 'number',
            },
            limitChars: 6,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'CPF/CNPJ',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.docOptions,
              filterable: true,
              label: 'text',
              reduce: val => val.value,
            },
          },
          {
            formKey: 'cpfCnpjInput',
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Digite CPF/CNPJ',
            component: 'b-form-input',
            maskaOptions: docMask,
            limitChars: 25,
          },
          {
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Nome ou Razão Social do Prestador de Serviço',
            component: 'b-form-input',
            limitChars: 60,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Valor Total do(s) Serviço(s)',
            component: 'b-form-input',
            maska: '999#.##',
            maskaOptions: configMoney,
            limitChars: 13,
          },
          {
            colProps: { md: '12', class: 'mt-2' },
            label: 'Descrição do(s) Serviço(s)',
            component: 'b-form-textarea',
            limitChars: 255,
          },
        ],
      },
      {
        title: 'Dados do empenho da despesa com manutenção',
        forms: [
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data de Emissão',
            formGroupProps: {
              title: 'Data da Emissão da Nota de Empenho',
            },
            component: 'b-form-input',
            maska: '##/##/####',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '2'},
            label: 'Número da N.E.',
            formGroupProps: {
              title: 'Número da Nota de Empenho',
            },
            component: 'b-form-input',
            limitChars: 8,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Referência',
            component: 'b-form-input',
            maska: '##/####',
            limitChars: 7,
          },
        ],
      },
      {
        title: 'Dados do responsável pela manutenção',
        forms: [
          {
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'CPF do Servidor Responsável pela Manutenção',
            component: 'b-form-input',
            maska: '###.###.###-##',
            limitChars: 25,
          },
          {
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Nome ou Razão Social do Responsavel pela Manutenção',
            component: 'b-form-input',
            limitChars: 60,
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars, 4)
    const groupProps2 = parseLimitProps(backVars, [4, 12])
    const groupProps3 = parseLimitProps(backVars, [12, 15])
    const groupProps4 = parseLimitProps(backVars, [15, 17])
    const props = [groupProps1, groupProps2, groupProps3, groupProps4]
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