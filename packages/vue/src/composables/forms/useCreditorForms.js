export default function useCreditorForms() {
  const { parseLimitProps } = useParse()
  const { cepMask, docCNPJ, docCPF, dateMask } = useMaska()

  const groups = (backVars, options, targets, events) => {
    const targetType = computed(() => targets.type)
    const groupBase = [
      {
        title: 'Identificação do registro',
        forms: [
          {
            colProps: { md: '12', lg: '2' },
            label: 'Tipo',
            component: 'v-select',
            othersProps: {
              options: options.creditorsType,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '2' },
            label: 'Código',
            component: 'b-form-input',
            limitChars: 6,
          },
          {
            colProps: { md: '12', lg: '8' },
            label: 'Nome',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Regida pela 4.320/64?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Isento de ISS?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Isento de INSS?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Isento de IRPF?',
            component: 'b-form-checkbox',
          },
          {
            dependent: computed(() => targets.irpfDependent),
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Nº de Dependentes',
            component: 'b-form-input',
            limitChars: 50,
          },
        ],
      },
      {
        noTitle: true,
        dependent: targetType,
        forms: [
          {
            colProps: { md: '12' },
            label: 'Observação',
            component: 'b-form-textarea',
            limitChars: 255,
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'Habilitado a Contratar?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '2', class: 'mt-2' },
            label: 'é licitante?',
            component: 'b-form-checkbox',
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Data de Envio do SIM',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Inscrição Municipal',
            component: 'b-form-input',
            limitChars: 20,
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
            events: {
              input: events?.cep,
            },
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
            component: 'v-select',
            othersProps: {
              options: computed(() => options.states),
              label: 'nome',
              filterable: true,
              reduce: val => val.sigla,
            },
            events: {
              'update:modelValue': events?.cities
            },
          },
          {
            formKey: 'cities',
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Cidade',
            component: 'v-select',
            othersProps: {
              options: computed(() => options.cities),
              filterable: true,
              reduce: val => val.value,
            },
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
              options: options.contactType,
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
      {
        title: 'Banco',
        dependent: targetType,
        forms: [
          {
            colProps: { md: '12' },
            label: 'Instituição Financeira',
            component: 'v-select',
            othersProps: {
              options: options.banks ?? [],
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Agência',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Conta',
            component: 'b-form-input',
            othersProps: {
              type: 'number',
            },
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Código de Operação',
            component: 'b-form-input',
            limitChars: 11,
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Tipo de Chave PIX',
            component: 'v-select',
            limitChars: 11,
            othersProps: {
              options: options.pixKey,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '3', class: 'mt-2' },
            label: 'Chave PIX',
            component: 'b-form-input',
            limitChars: 11,
          },
        ],
      },
      {
        title: 'Pessoa Física',
        dependent: computed(() => targets.typePF),
        forms: [
          {
            colProps: { md: '12', lg: '4' },
            label: 'CPF',
            component: 'b-form-input',
            maska: docCPF,
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '4' },
            label: 'Apelido',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '4' },
            label: 'RG',
            component: 'b-form-input',
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Data de Nascimento',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Profissão',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Estado Civil',
            component: 'v-select',
            othersProps: {
              options: options.civilState,
              filterable: true,
              reduce: val => val.value,
            },
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Naturalidade',
            component: 'b-form-input',
            limitChars: 50, 
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Tipo de Identificação',
            component: 'b-form-input',
            limitChars: 50, 
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Data de Emissão',
            component: 'b-form-input',
            maska: dateMask,
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Agência de Emissão',
            component: 'b-form-input',
            limitChars: 10,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'UF de Emissão',
            component: 'b-form-input',
            limitChars: 2,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'NIT',
            component: 'b-form-input',
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'PIS',
            component: 'b-form-input',
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'PASEP',
            component: 'b-form-input',
            limitChars: 15,
          },
        ],
      },
      {
        title: 'Pessoa Júridica',
        dependent: computed(() => targets.typePJ),
        forms: [
          {
            colProps: { md: '12', lg: '4' },
            label: 'CNPJ',
            component: 'b-form-input',
            maska: docCNPJ,
            limitChars: 19,
          },
          {
            colProps: { md: '12', lg: '4' },
            label: 'Nome Fantasia',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '4' },
            label: 'Inscrição Estadual',
            component: 'b-form-input',
            limitChars: 15,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Nome do Representante',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Nome para Contato',
            component: 'b-form-input',
            limitChars: 50,
          },
          {
            colProps: { md: '12', lg: '4', class: 'mt-2' },
            label: 'Website',
            component: 'b-form-input',
            limitChars: 50,
          },
        ],
      },
    ]

    const groupProps1 = parseLimitProps(backVars, 7)
    const groupProps2 = parseLimitProps(backVars, [8, 13])
    const groupProps3 = parseLimitProps(backVars, [33, 34])
    const groupProps4 = parseLimitProps(backVars, [34, 35])
    const groupProps5 = parseLimitProps(backVars, [35, 36])
    const groupProps6 = parseLimitProps(backVars, [13, 27])
    const groupProps7 = parseLimitProps(backVars, [27, 33])
    const props = [groupProps1, groupProps2, groupProps3, groupProps4, groupProps5, groupProps6, groupProps7]
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