export default () => {
  const administrationTypeOptions = [
    { label: 'Administração Direta', value: 'D' },
    { label: 'Administração Indireta', value: 'I' },
  ]

  const radioOptions = [
    { label: 'carro', value: 'car' },
    { label: 'gato', value: 'cat' },
    { label: 'baleia', value: 'whale' },
  ]

  const groupBase = [
    {
      title: 'Meu Formulário',
      forms: [
        {
          label: 'Nome',
          iProps: {
            class: 'my-custom-class'
          }
        },
        'Login::email:12:md3',
        'Senha::formKey>f=password',
        'Age::search:md2',
        ['Tipo do Órgão::select:md12:lg4:filterable', administrationTypeOptions],
        'Flatpickr::range',
        ['Checkbox::checkbox:name=things:multiple:class=my-custom-class', radioOptions],
        {
          label: 'Checkbox',
          component: 'checkbox',
          iProps: {
            name: 'thingsC',
            value: 'car',
            unvalue: 2,
            switch: true,
            class: 'my-custom-class',
          },
        },
      ],
      rules: {
        name: {
          required: { msg: 'o campo é obrigatório' }, 
          min: { args: [3], msg: 'Deve conter ao menos 3 caracteres' },
        },
      }
    },
    {
      title: 'Contatos',
      isRepeater: true,
      groupModel: 'contacts',
      groupFormData: { type: null, value: '' },
      repeaterProps: {
        btnAddVariant: 'success',
      },
      forms: [
        ['Tipo::select:md12:lg3:filterable', administrationTypeOptions],
        'Valor::mask=####-##:md12:lg3',
        'nome',
        'login',
      ],
    },
  ]

  return {
    groupBase,
  }
}