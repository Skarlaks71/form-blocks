import useParse from "../../../../core/src/utils/useParse"
import useMaska from "../../../../core/src/utils/useMaska"

export default function useOrganForms() {
  const { parseLimitProps } = useParse()
  const { cepMask, docCNPJ } = useMaska()
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
            colProps: { md: '10' },
            label: 'Nome *',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'CNPJ',
            component: 'b-form-input',
            maska: docCNPJ,
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Legislação',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Data de Envio do SIM',
            component: 'b-form-input',
            maska: '##/##/####',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Tipo do Órgão',
            component: 'v-select',
            othersProps: {
              options: options?.organType,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', class: 'mt-2' },
            label: 'Atribuição',
            component: 'b-form-textarea',
            limitChars: 11,
          },
        ],
      },
      {
        title: 'Endereço',
        forms: [
          {
            formKey: 'cep',
            colProps: { md: '12', lg: '3' },
            label: 'CEP',
            component: 'b-form-input',
            maska: cepMask,
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '9' },
            label: 'Logradouro',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Número',
            component: 'b-form-input',
            othersProps: {
              type: 'number',
            },
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '9', class: 'mt-2' },
            label: 'Complemento',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Bairro',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            formKey: 'states',
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Estado',
            limitChars: 11,
          },
          {
            formKey: 'cities',
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Cidade',
            limitChars: 11,
          },
        ],
      },
      {
        title: 'Contatos',
        isRepeater: true,
        groupModel: 'contacts',
        groupFormData: { type: null, value: '' },
        forms: [
          {
            colProps: { md: '12', lg: '3' },
            label: 'Tipo',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options?.contactType,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3' },
            label: 'Valor',
            component: 'b-form-input',
            limitChars: 50,
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars, 7)
    const groupProps2 = parseLimitProps(backVars, [7, 8])
    const groupProps3 = parseLimitProps(backVars, [8, 9])
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