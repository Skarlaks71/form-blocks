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
        'Name',
        'Login::email:12:md3',
        'Senha::password:6',
        'Age::search:md2',
        ['Tipo do Órgão::select:md12:lg4:filterable', administrationTypeOptions],
        'Flatpickr::date',
        ['Radio::radio:name=things:inline:button=true|b', radioOptions],
        ['Checkbox::checkbox:name=thingsC', radioOptions],
        // {
        //   label: 'Checkbox',
        //   component: 'checkbox',
        //   iProps: {
        //     name: 'thingsC',
        //     options: [
        //       { label: 'carro', value: 'car' },
        //       { label: 'Gato', value: 'cat' },
        //       { label: 'baleia', value: 'whale' },
        //     ],
        //     // inline: true,
        //     // button: true,
        //     // switch: true,
        //   },
        // },
      ]
    },
    {
      title: 'Contatos',
      isRepeater: true,
      groupModel: 'contacts',
      groupFormData: { type: null, value: '' },
      repeaterProps: {
        btnAddVariant: 'outline-success',
        dileted: true,
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