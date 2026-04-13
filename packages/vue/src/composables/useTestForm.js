export default () => {
  const administrationTypeOptions = [
    { label: 'Administração Direta', value: 'D' },
    { label: 'Administração Indireta', value: 'I' },
  ]

  const groupBase = [
    {
      noTitle: true,
      forms: [
        {
          colProps: { md: 12 },
          label: 'Name',
          component: 'input',
        },
        {
          colProps: { md: 6 },
          label: 'Login',
          component: 'input',
        },
        {
          label: 'senha',
          component: 'input',
          othersProps: {
            type: 'password',
          }
        },
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
      ]
    }
  ]

  return {
    groupBase,
  }
}