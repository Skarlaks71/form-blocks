import { 
  h, 
  inject, 
  resolveDirective, 
  withDirectives, 
  resolveDynamicComponent,
  toRef,
} from 'vue'

import FbRow from '../grid/FbRow'
import FbCol from '../grid/FbCol'
import FbInputBlock from '../forms/FbInputBlock'
import FbInput from '../forms/FbInput'
import VSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { createInputNode } from '../../composables/formRenderer'

export default {
  name: 'FormBlocksRepeaterItem',
  props: {
    forms: { type: Array, default: () => [] },
    formData: { type: Object, default: () => ({}) }
  },
  setup(props, { slots }) {
    const errors = inject('errors', {}) // Fallback para objeto vazio

    return () => {
      const { forms } = props

      const formData = toRef(props, 'formData')

      // 1. Container lateral (equivalente ao b-col md="12" lg="10")
      return h(FbCol, { md: 12, lg: 10 }, {
        default: () => h(FbRow, null, {
          default: () => forms.map((input, formKey) => {
            const slotName = `input(${input.formKey || formKey})`

            // 2. Lógica de Slot (Permite customizar um input específico do repetidor)
            if (slots[slotName]) {
              return slots[slotName]({ input, index: formKey })
            }

            // 5. Estrutura do Item: FbCol > BFormGroup
            return h(FbCol, { key: formKey, cols: 12, ...input.colProps }, {
              default: () => h(FbInputBlock, {
                id: `input-${input.model}`,
                label: input.label,
                labelFor: input.labelFor,
                state: errors[input.back] ? false : null,
                invalidFeedback: errors[input.back],
                ...input.inputBlockProps,
              }, {
                default: slotProps => createInputNode({ input, formData, errors, slotProps }),
              })
            })
          })
        })
      })
    }
  }
}