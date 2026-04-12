export default function useManagementUnitForms() {
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
            colProps: { md: '12', lg: '5' },
            label: 'Nome',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Sigla',
            component: 'b-form-input',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Área de Atuação',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.operatingArea,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'É Centralisadora?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Digitação Detalhada?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Possui Receita Própria?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Inicio Digitação Detalhada',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Fim Digitação Detalhada',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Número da Lei',
            component: 'b-form-input',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Entidade de Remessa',
            component: 'b-form-input',
            limitChars: 255,
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
            colProps: { md: '12', lg: '5', class: 'mt-2' },
            label: 'Tipo',
            component: 'v-select',
            othersProps: {
              options: options.type,
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

    const groupProps1 = parseLimitProps(backVars)
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