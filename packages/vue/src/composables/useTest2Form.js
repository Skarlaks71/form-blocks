export const useTest2Form = () => {
  //options

  //groupBase
  const groupBase = [
    //groups
    {
      title: 'Meu Grupo',
      groupModel: 'model do grupo',
      groupKey: 'chave do grupo',
      // Forms
      forms: [
        {
          label: 'Nome',
          rId: 'name'
        }
      ], // inputs + labels
      // Rules
      rules: {
        name: { ['regra']: 'mensagem' }
      },
    }
  ]

  return {
    groupBase,
  }
} 