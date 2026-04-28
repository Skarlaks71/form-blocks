import { 
  h, 
  inject, 
  resolveComponent, 
  resolveDirective, 
  withDirectives, 
  resolveDynamicComponent,
  Transition 
} from 'vue'

// Importamos seus componentes estruturais de render function
import FbCol from '../grid/FbCol'
import FbInputBlock from '../forms/FbInputBlock'
import FbInput from '../forms/FbInput'
import VSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component';
import { createInputNode } from '../../composables/formRenderer'
import { getRegistry } from '../../composables/componentRegistry'

export default {
  name: 'FormInputsBlocks',
  props: {
    input: { type: Object, required: true },
    inputKey: { type: [Number, String], default: 0 }
  },
  setup(props) {
    // Injeção dos dados globais do formulário
    const formData = inject('formData')
    const errors = inject('errors')

    const registry = getRegistry()

    return () => {
      const { input } = props
      if (input.dependent?.value === false) return null

      const registryItem = registry[input.component] || {}
      const supportsLabelFor = registryItem.supportsLabelFor ?? true

      return h(Transition, { name: 'fade' }, {
        default: () => h(FbCol, { cols: 12, ...input.colProps }, {
          default: () => h(FbInputBlock, {
            id: `input-${input.model}`,
            label: input.label,
            labelFor: input.labelFor ? input.labelFor : supportsLabelFor,
            state: errors.value?.[input.back] ? false : null,
            invalidFeedback: errors.value?.[input.back],
            ...input.inputBlockProps,
          }, {
            // Chamada mágica para o renderer isolado
            default: slotProps => createInputNode({ input, formData, errors, slotProps }),
          })
        })
      })
    }
  }
}