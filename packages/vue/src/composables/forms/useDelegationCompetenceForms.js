export default function useDelegationCompetenceForms() {
  const { parseLimitProps } = useParse()
  const { dateMask } = useMaska()
  const groups = (backVars, options) => {
    const groupBase = [
      {
        title: 'Identificação do registro',
        forms: [
          {
            colProps: { md: '12', lg: '3' },
            label: 'Data de Início *',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Data de Término',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Nº da Delegação',
            component: 'b-form-input',
            limitChars: 50,
            othersProps: {
              type: 'number',
            },
          },
          {
            formKey: 'creditor',
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Pessoa Física *',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Cargo *',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.positions,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Título para Assinatua *',
            component: 'b-form-input',
            limitChars: 255,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Sigla do Partido Político *',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Vice',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.vice,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Partido Político do Vice *',
            component: 'b-form-input',
            limitChars: 255,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Data de Nomeação *',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Nº da Delegação',
            component: 'b-form-input',
            othersProps: {
              type: 'number',
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Data da Publicação *',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', class: 'mt-2' },
            label: 'Descrição das Atribuições',
            component: 'b-form-textarea',
            limitChars: 500,
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