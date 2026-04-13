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
      'input': FbInput,
      'select': VSelect,
      // Se for um componente que o usuário registrou globalmente, 
      // o resolveDynamicComponent cuidará disso abaixo.
    }

    return () => {
      const { input } = props
      
      // Lógica de dependência (v-if do template)
      if (input.dependent?.value === false) return null

      // Resolver o componente principal
      const componentTarget = mapComponent[input.component] || resolveDynamicComponent(input.component)

      // Criar os atributos base que Todos os inputs recebem
      const commonProps = slotProps => ({
        id: slotProps.id,
        modelValue: formData.value[input.model],
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
        const vnode = h(componentTarget, commonProps(slotProps), {
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

      // 4. Montar a estrutura completa (Transition > FbCol > FbInputBlock)
      return h(Transition, { name: 'fade' }, {
        default: () => h(FbCol, { ...input.colProps }, {
          default: () => h(FbInputBlock, {
            id: `input-${input.model}`,
            label: input.label,
            labelFor: input.labelFor,
            state: errors[input.back] ? false : null,
            invalidFeedback: errors[input.back],
            ...input.inputBlockProps,
          }, {
            // Slot de descrição dinâmico
            // description: () => input.templateDescKey && slots[`description(${input.templateDescKey})`] 
            //   ? slots[`description(${input.templateDescKey})`]() 
            //   : null,
            
            // O input e o feedback de erro
            default: slotProps => inputNode(slotProps),
          })
        })
      })
    }
  }
}