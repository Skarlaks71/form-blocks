import { defineGroupBase } from "@form-blocks/core";

export const useTest2Form = () => {
  //options

  //groupBase
  const groupBase = defineGroupBase([
    //groups
    {
      title: 'Meu Grupo',
      groupModel: 'model do grupo',
      groupKey: 'chave do grupo',
      repeaterProps: {

      },
      // Forms
      forms: [
        {
          label: 'Nome',
          colProps: {

          },
          iProps: {

          },
          inputBlockProps: {

          },
          events: {
            
          }
        }
      ], // inputs + labels
      // Rules
      rules: {
        type: 'string',
        global: {
          required: {
            args: [3],
            msg: 'test',
          },
        },
        name: { min: { args: [5], msg: 'teste' } },
        email: {
          min: { args: [3] }
        }
      },
    }
  ])

  return {
    groupBase,
  }
} 