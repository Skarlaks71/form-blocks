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

  const dslContext = {
    radioOptions,
    administrationTypeOptions,
    reduceAdm: val => val.value,
  }

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
        'Login::12:md3',
        'Senha::password:f.formKey=password:md9',
        'Age::search:md2',
        'Tipo do Órgão::select:md12:lg4:filterable:options@administrationTypeOptions:reduce@reduceAdm',
        'Flatpickr::range',
        'Checkbox::checkbox:name=things:multiple:class=my-custom-class:options@radioOptions',
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
        {
          label: 'My Component',
          dsl: [
            'md6:name=thingsC:value=car',
            'unvalue=2|n:switch',
            'class=my-custom-class',
          ]
        }
      ],
      rules: {
        type: 'string', // tipo global para todos os campos do grupo
        global: {
          required: { msg: '$field é obrigatório' }, 
          min: { args: [4], msg: 'Deve conter ao menos 3 caracteres' },
        },
        name: {
          
        },
        login: {
          email: { msg: 'deve ser um email valido' },
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
        'Tipo::select:md12:lg3:filterable:options@administrationTypeOptions',
        'Valor::mask=####-##:md12:lg3',
        'nome',
        'login',
      ],
    },
  ]

  return {
    groupBase,
    dslContext,
  }
}