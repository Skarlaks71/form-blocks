import * as Yup from 'yup'

const yupTypes = {
  string: Yup.string,
  number: Yup.number,
  boolean: Yup.boolean,
  array: Yup.array,
  object: Yup.object,
  date: Yup.date
}

/**
 * Transforma o objeto de regras simplificado do FormBlocks em um Schema nativo do Yup
 * @param {Object} groupRules - Ex: { name: { required: 'Obrigatório' }, age: { min: 'Mínimo 18' } }
 */
export const buildYupSchema = (groupRules) => {
  if (!groupRules || typeof groupRules !== 'object') return null

  const shape = {}

  // Varre cada campo/input que possui regras definidas
  Object.entries(groupRules).forEach(([fieldName, rules]) => {
    // Inicializa o validador como string por padrão (comum para a maioria dos inputs)
    let validator = (yupTypes[type] || Yup.string)()

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