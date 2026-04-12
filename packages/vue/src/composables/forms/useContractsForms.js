export default function useContractsForms() {
  const { parseLimitProps } = useParse()
  const { docCPF, dateMask, dateMonthMask, configMoney } = useMaska()
  const groups = (backVars, options) => {
    const groupBase = [
      {
        title: 'Identificação do registro',
        forms: [
          {
            colProps: { md: '12', lg: '3' },
            label: 'CPF do Gestor',
            formGroupProps: {
              title: 'Número do CPF do Gestor Responsável pela Celebração do Contrato',
            },
            component: 'b-form-input',
            maska: docCPF,
            limitChars: 14,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Nº do Contrato',
            component: 'b-form-input',
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data do Contrato',
            formGroupProps: {
              title: 'Data de Celebração do Contrato',
            },
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
        ],
      },
      {
        title: 'Dados do Contrato',
        forms: [
          {
            colProps: { md: '12', lg: '5' },
            label: 'Tipo de Contrato',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.type,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '4' },
            label: 'Modalidade do Contrato',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.modality,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            formKey: 'cpf',
            label: 'CPF do Gestor',
            title: 'Número do CPF do Gestor Responsável pela celebração do Contrato Original',
            maska: docCPF,
            limitChars: 14,
          },
          {
            formKey: 'contract-number',
            label: 'Nº do Contrato',
            title: 'Número do Contrato Original',
            maska: docCPF,
            limitChars: 15,
          },
          {
            formKey: 'contract-date',
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Data do Contrato',
            title: 'Data que o Contrato Original foi celebrado',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Data do Início',
            component: 'b-form-input',
            formGroupProps: {
              title: 'Data de Início da Vigência do Contrato',
            },
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Data do Fim',
            component: 'b-form-input',
            formGroupProps: {
              title: 'Data Prevista para o Fim da Vigência do Contrato',
            },
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', class: 'mt-2' },
            label: 'Descrição do Contrato',
            component: 'b-form-textarea',
            formGroupProps: {
              title: 'Descrição do Objeto do Contrato',
            },
            limitChars: 255,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Valor Total',
            component: 'b-form-input',
            formGroupProps: {
              title: 'Valor Total do Contrato',
            },
            maska: '999#.##',
            maskaOptions: configMoney,
            limitChars: 13,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Data de Autuação',
            component: 'b-form-input',
            formGroupProps: {
              title: 'Data de Autuação do Processo Administrativo para Contratação',
            },
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Nº do P.A.C',
            formGroupProps: {
              title: 'Número do Processo Administrativo para Contratação',
            },
            component: 'b-form-input',
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'CPF do Fiscal',
            component: 'b-form-input',
            formGroupProps: {
              title: 'Número do CPF do Fiscal do Contrato',
            },
            maska: docCPF,
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Nome do Fiscal',
            component: 'b-form-input',
            limitChars: 40,
          },
          {
            colProps: { md: '12', lg: '6', class: 'mt-2' },
            label: 'Id do Contrato PNCP',
            formGroupProps: {
              title: 'Número do Id Contrato PNCP',
            },
            component: 'b-form-input',
            limitChars: 25,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Referência',
            component: 'b-form-input',
            maska: dateMonthMask,
            limitChars: 7,
          },
        ],
      },
      {
        key: 'construction',
        title: 'Dados Adicionais de Contratos de Obras',
        forms: [
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data de Início',
            formGroupProps: {
              title: 'Data de Início da Obra ou Serviço de Engenharia',
            },
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Tipo',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.constructionType,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Nº da Obra ou Serviço',
            formGroupProps: {
              title: 'Número da Obra ou Serviço de Engenharia',
            },
            component: 'b-form-input',
            limitChars:  4,
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Data do Fim',
            formGroupProps: {
              title: 'Data Prevista para o Término da Obra',
            },
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars, 3)
    const groupProps2 = parseLimitProps(backVars, [3, 18])
    const groupProps3 = parseLimitProps(backVars, [18, 22])
    const props = [groupProps1, groupProps2, groupProps3]
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