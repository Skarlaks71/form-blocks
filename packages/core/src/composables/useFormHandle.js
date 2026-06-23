import useParse from "../utils/useParse"
import { useCore } from "./useCore"

/**
 * 🔥 Vincula explicitamente a tipagem genérica do index.d.ts
 * @returns {import("../index").IUseFormHandle}
 */
export const useFormHandle = () => {
  const defineGroupBase = (groups) => groups;

  const { toCamelCase, parseStringShorthand, parseStringShorthandForForms } = useParse()
  const { createInternalProps } = useCore()
  const makeGroups = (backVars, groupBase, groupProps, options = {}) => {

    const parseFunction = options.parse || toCamelCase

    const normalizedGroups = groupBase.map(group => ({
      ...group,
      forms: group.forms.map(input => {
        // Se for string, vira objeto com label
        if (typeof input === 'string') {
          return parseStringShorthand(input)
        }

        // se for um TypeDSL = ['DSL', Options]
        if (Array.isArray(input)) {
          if (typeof input[0] !== 'string') {
            throw new Error('FB 001: The first element needs to be String!')
          }

          const parse = parseStringShorthand(input[0])
          parse.iProps = { ...parse.iProps, options: input[1] }
          return parse
        }

        // se for um objeto com dsl -> string | TypeCascadeDSL = pode separar por linha ou :
        // if (input && typeof input === 'object' && 'dsl' in input) {
        //   let dslParsed = {}

        //   // Se a dsl interna for uma string (ex: dsl: 'Checkbox::checkbox')
        //   if (typeof input.dsl === 'string') {
        //     dslParsed = parseStringShorthandForForms(input.dsl)
        //   }

        //   // Se a dsl interna for um array
        //   // ex: dsl: ['Checkbox::checkbox', 'md6', 'name=thingsC']
        //   // ex: dsl: [['checkbox', radioOptions], 'Checkbox::md6', 'Email::name=thingsC']
        //   // ex: dsl: [['Email::email', getFormatName, 'i.name'], ['Checkbox::md6']]
        //   const dsl = [
        //     ['Email::email', () => {
        //       return {
        //         ['i.name']: getNameFormat,
        //         ['b.labelClass']: myLabelClass,
        //       }
        //     }],
        //     'placehoder=meu@email.com',
        //     ['i.name@getNameFormat:b.labelClass@myLabelClass', getNameFormat, myLabelClass]
        //   ]
        //   else if (Array.isArray(input.dsl)) {
        //     dslParsed = parseStringShorthandForForms(input.dsl[0])
        //     dslParsed.iProps = { ...dslParsed.iProps, options: input.dsl[1] }
        //   }

        //   // Remove a chave 'dsl' do objeto original para não sujar o resultado final
        //   const { dsl, ...restOfInput } = input

        //   // Mescla tudo com prioridade para o que o dev escreveu manualmente no objeto
        //   return {
        //     ...dslParsed,
        //     ...restOfInput,
        //   }
        // }
        
        return input
      })
    }))

    createInternalProps(normalizedGroups, backVars, groupProps, parseFunction)

    return normalizedGroups
  }

  return {
    makeGroups,
    defineGroupBase,
  }
}