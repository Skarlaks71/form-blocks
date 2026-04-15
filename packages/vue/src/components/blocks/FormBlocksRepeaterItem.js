import { 
  h, 
  inject, 
  resolveDirective, 
  withDirectives, 
  resolveDynamicComponent 
} from 'vue'

import FbRow from '../grid/FbRow'
import FbCol from '../grid/FbCol'
import FbInputBlock from '../forms/FbInputBlock'
import FbInput from '../forms/FbInput'
import VSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'FormBlocksRepeaterItem',
  props: {
    forms: { type: Array, default: () => [] },
    formData: { type: Object, default: () => ({}) }
  },
  setup(props, { slots }) {
    const errors = inject('errors', {}) // Fallback para objeto vazio

    const mapComponent = {
      'input': FbInput,
      'select': VSelect,
      'flatpickr': flatPickr,
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
            const componentName = input.component || 'input'
            const componentTarget = mapComponent[componentName] || resolveDynamicComponent(input.component)
            const maskaDir = resolveDirective('maska')
            const limitCharsDir = resolveDirective('limit-chars')

            const finalColProps = { 
              cols: 12, 
              ...input.colProps 
            }

            const currentValue = formData.value[input.model]

            // Criar os atributos base que Todos os inputs recebem
            const commonProps = slotProps => ({
              id: slotProps.id,
              modelValue: currentValue !== undefined ? currentValue : '',
              'onUpdate:modelValue': (val) => (formData.value[input.model] = val),
              state: slotProps.state,
              'aria-describedby': slotProps.ariaDescribedby,
              ...input.othersProps,
              ...(input.maskaOptions || {}),
              // Passamos as props de mask/limit mesmo que o componente ignore (não quebra)
              mask: input.maska,
              limit: input.limitChars,
              // Eventos mapeados
              ...Object.fromEntries(
                Object.entries(input.events || {}).map(([event, handler]) => [
                  `on${event.charAt(0).toUpperCase() + event.slice(1)}`, 
                  (eventData) => handler(eventData, formData)
                ])
              )
            })

            // Montar o componente de Input com suas diretivas
            const inputNode = slotProps => {
              const isFlatpickr = input.component === 'flatpickr';

              const vnode = h(componentTarget, {
                ...commonProps(slotProps),
                class: [
                  (isFlatpickr) ? 'fb-input-block__control' :
                  { 'fb-input-block__control--invalid': slotProps.state === false }
                ],
              }, {
                // Slot de 'no-options' para o v-select
                'no-options': () => 'Desculpe, sem opções no momento!'
              })
      
              if (componentTarget !== FbInput) {
                // Resolver diretivas
                const maskaDir = resolveDirective('maska')
                const limitCharsDir = resolveDirective('limit-chars')
      
                const directives = []
                if (input.maska && maskaDir) directives.push([maskaDir, input.maska])
                if (input.limitChars && limitCharsDir) directives.push([limitCharsDir, input.limitChars])
      
                return withDirectives(vnode, directives)
              }
      
              return vnode
            }

            // 5. Estrutura do Item: FbCol > BFormGroup
            return h(FbCol, { key: formKey, finalColProps }, {
              default: () => h(FbInputBlock, {
                id: `input-${input.model}`,
                label: input.label,
                labelFor: input.labelFor,
                state: errors[input.back] ? false : null,
                invalidFeedback: errors[input.back],
                ...input.inputBlockProps,
              }, {
                default: slotProps => inputNode(slotProps),
              })
            })
          })
        })
      })
    }
  }
}