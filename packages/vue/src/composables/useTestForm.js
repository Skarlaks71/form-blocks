export default () => {
  const administrationTypeOptions = [
    { label: 'Administração Direta', value: 'D' },
    { label: 'Administração Indireta', value: 'I' },
  ]

  const groupBase = [
    {
      title: 'Meu Formulário',
      forms: [
        {
          label:'Name',
          inputBlockProps: {
            description: 'test'
          }
        },
        'Login::email:6',
        'Senha::password:6',
        'Age::number:md2',
        {
          colProps: { md: '12', lg: '4', class: 'mt-2' },
          label: 'Tipo do Órgão',
          labelFor: false,
          component: 'select',
          othersProps: {
            options: administrationTypeOptions,
            filterable: true,
            reduce: val => val.value,
          },
        },
        {
          label: 'Flatpickr',
          component: 'flatpickr',
          labelFor: false,
        },
        {
          label: 'Radio',
          component: 'radio',
          othersProps: {
            name: 'things',
            options: [
              { label: 'carro', value: 'car' },
              { label: 'gato', value: 'cat' },
              { label: 'baleia', value: 'whale' },
            ],
            inline: true,
            button: true,
          },
        },
        {
          label: 'Checkbox',
          component: 'checkbox',
          othersProps: {
            name: 'thingsC',
            options: [
              { label: 'carro', value: 'car' },
              { label: 'Gato', value: 'cat' },
              { label: 'baleia', value: 'whale' },
            ],
            // inline: true,
            // button: true,
            // switch: true,
          },
        },
      ]
    },
    {
      title: 'Contatos',
      isRepeater: true,
      groupModel: 'contacts',
      groupFormData: { type: null, value: '' },
      repeaterProps: {
        btnAddVariant: 'outline-success',
      },
      forms: [
        {
          colProps: { md: '12', lg: '3' },
          label: 'Tipo',
          labelFor: false,
          component: 'select',
          limitChars: 11,
          othersProps: {
            options: administrationTypeOptions,
            filterable: true,
            reduce: val => val.value,
          },
        },
        {
          colProps: { md: '12', lg: '3' },
          label: 'Valor',
          component: 'input',
          limitChars: 50,
        },
        'nome',
        'login',
      ],
    },
  ]

  return {
    groupBase,
  }
}