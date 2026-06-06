import {
  h,
  provide,
  computed,
  toRef,
  ref,
  toRaw
} from 'vue'
import FormGroupBlocks from './blocks/FormGroupBlocks'
import { PREFIX } from '@form-blocks/core/constants'
import FbRow from './grid/FbRow'
import FbCol from './grid/FbCol'
import FbButton from './FbButton'
import { useParse } from '@form-blocks/core'

export default {
  name: 'FormBlocks',
  props: {
    modelValue: { type: Object, default: () => ({}) },
    errors: { type: [Object, null], default: () => ({}) },
    groups: { type: Array, required: true },
  },
  emits: ['update:modelValue', 'submit', 'invalid'],
  setup(props, { slots, emit, expose }) {
    const fbClass = `${PREFIX}-form-blocks`
    // 1. Gerenciamento do Estado Global do Formulário
    const formData = computed(() => props.modelValue)

    const localErrors = ref({})

    // 2. Provedores (Injeção de dependência para todos os filhos)
    // Usamos toRef para manter a reatividade do objeto de erros
    provide('errors', toRef(props, 'errors'))
    provide('formData', formData)

    const validate = async () => {
      let isFormValid = true
      let accumulatedErrors = {}

      // Varre cada grupo declarado no groupBase
      for (const group of props.groups) {
        console.log(group)
        // Se o grupo não tiver a propriedade rules definida, pula para o próximo
        if (!group.rules || Object.keys(group.rules).length === 0) {
          continue
        }

        try {
          const yupSchema = buildYupSchema(group.rules)
          
          if (!yupSchema) continue

          // Valida o formData atual contra o esquema específico DESTE grupo
          await group.rules.validate(toRaw(formData.value), { abortEarly: false })
        } catch (err) {
          isFormValid = false
          // Extrai os erros do grupo atual e funde no objeto acumulador
          const groupErrors = useParse().parseYupErrors(err)
          accumulatedErrors = { ...accumulatedErrors, ...groupErrors }
        }
      }

      // Atualiza o estado reativo global de erros para os inputs pintarem na tela
      localErrors.value = accumulatedErrors

      if (!isFormValid) {
        emit('invalid', localErrors.value)
      }

      return isFormValid
    }

    // 3. Exposição (Equivalente ao defineExpose)
    // Se precisar de referências internas, você pode adicioná-las aqui
    expose({
      formData,
      localErrors,
      validate,
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

      return h('form', {
          class: fbClass,
          onSubmit: async event => {
            event.preventDefault()

            const isValid = await validate()
            console.log('isValid', isValid)
            if (isValid) {
              emit('submit', formData.value)
            }
          }
        }, [
          renderGroups(),
          slots['submit-button']
            ? slots['submit-button']()
            : h(FbRow, {}, {
              default: () => h(FbCol, { cols: 12 }, {
                default: () => h(FbButton, { type: 'submit', variant: 'outline-complementary', clean: true }, {
                  default: () => 'enviar'
                })
              })
            })
        ]
      )
    }
  }
}