import { h, provide, computed, toRef } from 'vue'
import FormGroupBlocks from './blocks/FormGroupBlocks'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FormBlocks',
  props: {
    modelValue: { type: Object, default: () => ({}) },
    errors: { type: [Object, null], default: () => ({}) },
    groups: { type: Array, required: true }
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit, expose }) {
    const fbClass = `${PREFIX}-form-blocks`
    // 1. Gerenciamento do Estado Global do Formulário
    const formData = computed(() => props.modelValue)

    // 2. Provedores (Injeção de dependência para todos os filhos)
    // Usamos toRef para manter a reatividade do objeto de erros
    provide('errors', toRef(props, 'errors'))
    provide('formData', formData)

    // 3. Exposição (Equivalente ao defineExpose)
    // Se precisar de referências internas, você pode adicioná-las aqui
    expose({
      formData
    })

    return () => {
      const { groups } = props

      // Renderização da lista de grupos
      const renderGroups = () => {
        return groups.map((group, key) => {
          const slotName = `group(${group.key || key})`

          // Se houver um slot customizado para o grupo
          if (slots[slotName]) {
            return slots[slotName]({ group, index: key })
          }

          // Renderização padrão usando o FormGroupBlocks
          // Repassamos TODOS os slots para que os níveis inferiores (inputs) os alcancem
          return h(FormGroupBlocks, {
            key: group.key || key,
            group,
            groupKey: key
          }, slots)
        })
      }

      return h('div', { class: fbClass }, renderGroups())
    }
  }
}