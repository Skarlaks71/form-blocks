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
import { useParse, useYup } from '@form-blocks/core'
import { ValidationError } from 'yup'

export default {
  name: 'FormBlocks',
  props: {
    modelValue: { type: Object, default: () => ({}) },
    errors: { type: [Object, null], default: () => ({}) },
    groups: { type: Array, required: true },
    mode: { 
      type: String, 
      default: 'form',
      validator: (value) => ['form', 'traditional', 'filter'].includes(value)
    }
  },
  emits: ['update:modelValue', 'submit', 'invalid'],
  setup(props, { slots, emit, expose }) {
    const fbClass = `${PREFIX}-form-blocks`
    // 1. Gerenciamento do Estado Global do Formulário
    const formData = computed(() => props.modelValue)

    const localErrors = ref({})

    // 2. Provedores (Injeção de dependência para todos os filhos)
    // Usamos toRef para manter a reatividade do objeto de erros
    provide('errors', computed(() => {
      // Cria um único objeto plano combinando o validador interno e os erros externos
      const externalErrors = props.errors || {}
      return { 
        ...localErrors.value, 
        ...externalErrors 
      }
    }))
    provide('formData', formData)

    const validate = async () => {
      let isFormValid = true
      let accumulatedErrors = {}

      // Varre cada grupo declarado no groupBase
      for (const group of props.groups) {
        // Se o grupo não tiver a propriedade rules definida, pula para o próximo
        if (!group.rules || Object.keys(group.rules).length === 0) {
          continue
        }

        try {
          const yupSchema = useYup().buildYupSchema(group.rules)
          
          if (!yupSchema) continue

          // Valida o formData atual contra o esquema específico DESTE grupo
          await yupSchema.validate(toRaw(formData.value), { abortEarly: false })
        } catch (err) {
          isFormValid = false

          if (err instanceof ValidationError) {
            // Extrai os erros do grupo atual e funde no objeto acumulador
            const groupErrors = useParse().parseYupErrors(err)
            accumulatedErrors = { ...accumulatedErrors, ...groupErrors }
          } else {
            console.error(err)
          }
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
      const { groups, mode } = props

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

      const isTraditional = mode === 'traditional'
      const tagBase = isTraditional ? 'div' : 'form'

      const containerProps = {
        class: fbClass,
      }

      if (!isTraditional) {
        containerProps.onSubmit = async (event) => {
          event.preventDefault()

          const isValid = await validate()
          if (isValid) {
            emit('submit', formData.value)
          }
        }
      }

      const childrenNodes = [renderGroups()]

      if (!isTraditional) {
        const submitButtonNode = slots['submit-button']
          ? slots['submit-button']()
          : h(FbRow, {}, {
              default: () => h(FbCol, { cols: 12 }, {
                default: () => h(FbButton, { type: 'submit', variant: 'outline-complementary', clean: true }, {
                  default: () => 'enviar'
                })
              })
            })
            
        childrenNodes.push(submitButtonNode)
      }

      return h(tagBase, containerProps, childrenNodes)
    }
  }
}