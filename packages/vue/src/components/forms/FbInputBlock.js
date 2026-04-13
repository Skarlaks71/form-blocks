import { h, computed } from 'vue'

export default {
  name: 'FbInputBlock',
  props: {
    // Identificação (Essencial para WCAG)
    id: { type: String, default: () => `fb-field-${Math.random().toString(36).slice(2, 9)}` },
    
    // Label
    label: { type: String, default: null },
    labelAlign: { type: String, default: 'left' }, // ex: left, center, right
    labelClass: { type: [String, Array, Object], default: '' },
    
    // Feedback e Estado
    state: { type: Boolean, default: null },
    invalidFeedback: { type: String, default: '' },
    
    // Descrição
    description: { type: String, default: null },
    descriptionClass: { type: [String, Array, Object], default: '' },
    
    // Acessibilidade Extra
    labelSrOnly: { type: Boolean, default: false },
    labelFor: { type: [String, Boolean], default: true },
  },
  setup(props, { slots }) {
    
    // IDS para Acessibilidade
    const feedbackId = computed(() => `${props.id}__feedback`)
    const descriptionId = computed(() => `${props.id}__description`)

    return () => {
      const isNativeLabel = props.labelFor !== false;
      const labelTag = isNativeLabel ? 'label' : 'span'
      // 1. Renderização do Label (WCAG: htmlFor vincula ao ID do input)
      const labelAttr = isNativeLabel 
                          ? { id: `${props.id}__label`, for: props.id }
                          : { id: `${props.id}__label` }

      const labelNode = props.label ? h(labelTag, {
        ...labelAttr,
        class: [
          'form-label',
          props.labelClass,
          {
            'form-label--block': !isNativeLabel,
            'visually-hidden': props.labelSrOnly,
            [`text-${props.labelAlign}`]: props.labelAlign 
          }
        ]
      }, props.label) : null

      // 2. Renderização da Descrição (Help Text)
      const descriptionNode = props.description ? h('div', {
        id: descriptionId.value,
        class: ['form-text', props.descriptionClass]
      }, props.description) : null

      // 3. Renderização do Erro (Só aparece se state === false)
      const errorNode = (props.state === false && props.invalidFeedback) ? h('div', {
        id: feedbackId.value,
        class: 'invalid-feedback',
        style: { display: 'block' }, // Garante visibilidade no Bootstrap sem depender de irmãos
        'aria-live': 'assertive' // WCAG: Anuncia o erro imediatamente
      }, props.invalidFeedback) : null

      // 4. O Slot (Onde entrará o FbInput)
      // Passamos o id e os campos aria para o slot, para que o componente interno os herde via attrs
      const mainContent = slots.default ? slots.default({
        id: props.id,
        state: props.state,
        ariaDescribedby: [
          props.description ? descriptionId.value : null,
          (props.state === false && props.invalidFeedback) ? feedbackId.value : null
        ].filter(Boolean).join(' ')
      }) : null

      return h('div', { 
        class: 'fb-input-block mb-3',
        // Container pode ter atributos de validação se necessário
      }, [
        labelNode,
        mainContent,
        errorNode,
        descriptionNode
      ])
    }
  }
}