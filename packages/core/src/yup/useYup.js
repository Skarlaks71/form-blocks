import * as Yup from 'yup'

const yupTypes = {
  string: Yup.string,
  number: Yup.number,
  boolean: Yup.boolean,
  array: Yup.array,
  object: Yup.object,
  date: Yup.date
}

export const useYup = () => {

  /**
   * Transforma o objeto de regras simplificado do FormBlocks em um Schema nativo do Yup
   * @param {Object} groupRules - Ex: { name: { required: 'Obrigatório' }, age: { min: 'Mínimo 18' } }
   */
  const buildYupSchema = (groupRules) => {
    if (!groupRules || typeof groupRules !== 'object') return null
  
    const shape = {}

    const {
      type: groupGlobalType = 'string',
      global = {}, // regras globais que devem ser atribuidas a todos os campos do grupo sem precisar passar individualmente ex: required
      ...fields
    } = groupRules

    const {
      except = [],
      ...globalRules
    } = global
  
    // Varre cada campo/input que possui regras definidas
    Object.entries(fields).forEach(([fieldName, config]) => {
      // Inicializa o validador como string por padrão (comum para a maioria dos inputs)
  
      const fieldType = config.type || groupGlobalType
      let validator = (yupTypes[fieldType] || Yup.string)()

      const { type, ...fieldRules } = config

      const rules = except.includes(fieldName)
        ? fieldRules
        : {
            ...globalRules,
            ...fieldRules
          }
  
      // Varre cada regra aplicada a esse campo específico
      Object.entries(rules).forEach(([ruleName, config]) => {
        if (typeof validator[ruleName] !== 'function') {
          console.warn(
            `[FormBlocks] Regra Yup "${ruleName}" não encontrada.`
          )
          return
        }
  
        const args = config?.args ?? []
        const msg = config?.msg
  
        validator = msg
          ? validator[ruleName](...args, msg)
          : validator[ruleName](...args)
      })
  
      // Adiciona o validador construído para o campo atual no shape do objeto
      shape[fieldName] = validator
    })
  
    // Retorna o esquema do Yup prontinho para execução
    return Yup.object().shape(shape)
  }

  return {
    buildYupSchema,
  }
}
