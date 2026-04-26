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
import { getRegistry } from '../../composables/componentRegistry'

export default {
  name: 'FormBlocksRepeaterItem',
  props: {
    forms: { type: Array, default: () => [] },
    formData: { type: Object, default: () => ({}) },
    uid: { type: String, default: 'uid' },
    index: Number,
  },
  setup(props, { slots }) {
    const errors = inject('errors', {}) // Fallback para objeto vazio

    const registry = getRegistry()

    return () => {
      const { forms, uid, index } = props

      const formData = toRef(props, 'formData')

      // 1. Container lateral (equivalente ao b-col md="12" lg="10")
      return h(FbCol, { cols: 12 }, {
        default: () => h(FbRow, null, {
          default: () => forms.map((input, formKey) => {
            const slotName = `input(${input.formKey || formKey})`

            // 2. Lógica de Slot (Permite customizar um input específico do repetidor)
            if (slots[slotName]) {
              return slots[slotName]({ input, index: formKey })
            }

            const uniqueId = `fb-${props.uid}-${props.index}-${input.model}`;

            const registryItem = registry[input.component] || {}
            const supportsLabelFor = registryItem.supportsLabelFor ?? true

            // 5. Estrutura do Item: FbCol > BFormGroup
            return h(FbCol, { key: formKey, cols: 12, ...input.colProps }, {
              default: () => h(FbInputBlock, {
                id: uniqueId,
                label: input.label,
                labelFor: input.labelFor ? uniqueId : supportsLabelFor,
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