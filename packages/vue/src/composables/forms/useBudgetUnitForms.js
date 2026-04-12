export default function useBudgetUnitForms() {
  const { parseLimitProps } = useParse()
  const { dateMask } = useMaska()
  const groups = (backVars, options) => {
    const groupBase = [
      {
        title: 'Identificação do registro',
        forms: [
          {
            colProps: { md: '12', lg: '2' },
            label: 'Código *',
            component: 'b-form-input',
            limitChars: 6,
          },
          {
            colProps: { md: '12', lg: '10' },
            label: 'Nome',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Tipo Administrativo',
            component: 'v-select',
            othersProps: {
              options: options.administrationType,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Tipo do Órgão',
            component: 'v-select',
            othersProps: {
              options: options.organType,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Unidade Gestora',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.managementUnit,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Horas de Trabalho',
            component: 'b-form-input',
            limitChars: 11,
            othersProps: {
              type: 'number',
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Data de Envio do SIM',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            formKey: 'delegationCompetence',
            templateDescKey: 'delComp',
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Delegação de Competência',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.delegation,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Gerar Remessa Separada?',
            component: 'b-form-checkbox',
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars, 8)
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