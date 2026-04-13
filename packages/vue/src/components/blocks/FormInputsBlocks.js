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
import { BFormGroup, BFormInvalidFeedback, BFormInput } from 'bootstrap-vue-next'
import VSelect from 'vue-select'

export default {
  name: 'FormInputsBlocks',
  props: {
    input: { type: Object, required: true },
    inputKey: { type: [Number, String], default: 0 }
  },
  setup(props, { slots }) {
    // Injeção dos dados globais do formulário
    const formData = inject('formData')
    const errors = inject('errors')

    // Mapeamento interno de componentes
    const mapComponent = {
      'b-form-input': BFormInput,
      'v-select': VSelect,
      // Se for um componente que o usuário registrou globalmente, 
      // o resolveDynamicComponent cuidará disso abaixo.
    }

    return () => {
      const { input } = props
      
      // Lógica de dependência (v-if do template)
      if (input.dependent?.value === false) return null

      // 1. Resolver o componente principal
      const componentTarget = mapComponent[input.component] || resolveDynamicComponent(input.component)

      // 2. Resolver diretivas
      const maskaDir = resolveDirective('maska')
      const limitCharsDir = resolveDirective('limit-chars')

      // 3. Montar o componente de Input com suas diretivas
      const inputNode = withDirectives(
        h(componentTarget, {
          // v-model manual
          modelValue: formData[input.model],
          'onUpdate:modelValue': (val) => (formData[input.model] = val),
          
          // Estado de erro (BootstrapVueNext)
          state: errors[input.back] ? false : null,
          
          // Props dinâmicas
          ...input.othersProps,
          ...(input.maskaOptions || {}),
          
          // Eventos dinâmicos com injeção do formData no handler
          ...Object.fromEntries(
            Object.entries(input.events || {}).map(([event, handler]) => [
              `on${event.charAt(0).toUpperCase() + event.slice(1)}`, 
              (eventData) => handler(eventData, formData)
            ])
          )
        }, {
          // Slot de 'no-options' para o v-select
          'no-options': () => 'Desculpe, sem opções no momento!'
        }),
        [
          [maskaDir, input.maska],
          [limitCharsDir, input.limitChars]
        ]
      )

      // 4. Montar a estrutura completa (Transition > FbCol > BFormGroup)
      return h(Transition, { name: 'fade' }, {
        default: () => h(FbCol, { ...input.colProps }, {
          default: () => h(BFormGroup, {
            label: input.label,
            ...input.formGroupProps
          }, {
            // Slot de descrição dinâmico
            description: () => input.templateDescKey && slots[`description(${input.templateDescKey})`] 
              ? slots[`description(${input.templateDescKey})`]() 
              : null,
            
            // O input e o feedback de erro
            default: () => [
              inputNode,
              h(BFormInvalidFeedback, { 
                id: 'input-live-feedback',
                // Forçamos a exibição se houver erro
                state: errors[input.back] ? false : null 
              }, {
                default: () => errors[input.back]
              })
            ]
          })
        })
      })
    }
  }
}