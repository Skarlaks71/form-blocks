import { 
  h, 
  inject, 
  resolveDirective, 
  withDirectives, 
  resolveDynamicComponent 
} from 'vue'

import FbRow from '../grid/FbRow'
import FbCol from '../grid/FbCol'
import { BFormGroup, BFormInvalidFeedback, BFormInput } from 'bootstrap-vue-next'
import VSelect from 'vue-select'

export default {
  name: 'FormBlocksRepeaterItem',
  props: {
    forms: { type: Array, default: () => [] },
    formData: { type: Object, default: () => ({}) }
  },
  setup(props, { slots }) {
    const errors = inject('errors', {}) // Fallback para objeto vazio

    const mapComponent = {
      'b-form-input': BFormInput,
      'v-select': VSelect
    }

    return () => {
      const { forms, formData } = props

      // 1. Container lateral (equivalente ao b-col md="12" lg="10")
      return h(FbCol, { md: 12, lg: 10 }, {
        default: () => h(FbRow, null, {
          default: () => forms.map((input, formKey) => {
            const slotName = `input(${input.formKey || formKey})`

            // 2. Lógica de Slot (Permite customizar um input específico do repetidor)
            if (slots[slotName]) {
              return slots[slotName]({ input, index: formKey })
            }

            // 3. Resolver componente e diretivas
            const componentTarget = mapComponent[input.component] || resolveDynamicComponent(input.component)
            const maskaDir = resolveDirective('maska')
            const limitCharsDir = resolveDirective('limit-chars')

            // 4. Montar o nó do Input (com v-model e diretivas)
            const inputNode = withDirectives(
              h(componentTarget, {
                modelValue: formData[input.model],
                'onUpdate:modelValue': (val) => (formData[input.model] = val),
                state: errors[input.back] ? false : null,
                ...input.othersProps,
                ...(input.maskaOptions || {})
              }, {
                'no-options': () => 'Desculpe, sem opções no momento!'
              }),
              [
                [maskaDir, input.maska],
                [limitCharsDir, input.limitChars]
              ]
            )

            // 5. Estrutura do Item: FbCol > BFormGroup
            return h(FbCol, { key: formKey, ...input.colProps }, {
              default: () => h(BFormGroup, {
                label: input.label,
                ...input.formGroupProps
              }, {
                default: () => [
                  inputNode,
                  h(BFormInvalidFeedback, {
                    state: errors[input.back] ? false : null
                  }, {
                    default: () => errors[input.back]
                  })
                ]
              })
            })
          })
        })
      })
    }
  }
}