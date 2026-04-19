import { h, computed } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbRadio',
  props: {
    modelValue: { type: [String, Number, Boolean, Object], default: null },
    options: { type: Array, default: () => [] }, // Expects [{ label: 'Sim', value: 'yes', disabled: false }]
    name: { type: String, required: true }, // Importante para o agrupamento nativo
    state: { type: Boolean, default: null },
    button: { type: Boolean, default: false }, // Variante de botão
    buttonVariant: { type: String, default: 'primary' }, // ex: primary, outline-danger
    inline: { type: Boolean, default: false } // Se os itens ficam um ao lado do outro
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const onChange = (value) => {
      emit('update:modelValue', value)
      emit('change', value)
    }

    const containerClasses = computed(() => [
      `${PREFIX}-radio-group`,
      { [`${PREFIX}-radio-group--stacked`]: !props.inline },
      { [`${PREFIX}-radio-group--inline`]: props.inline },
    ])

    const getOptionClasses = (option) => [
      props.button ? `${PREFIX}-radio__label--button` : `${PREFIX}-radio__label`,
      {
        [`${PREFIX}-radio__label--button--${props.buttonVariant}`]: props.button,
        [`${PREFIX}-radio__label--button--active`]: props.button && props.modelValue === option.value,
        'is-invalid': props.state === false,
        'is-valid': props.state === true,
        'disabled': option.disabled,
      }
    ]

    return () => h('div', { class: containerClasses.value }, 
      props.options.map((option, index) => {
        const id = `${props.name}-${index}`
        const isChecked = props.modelValue === option.value

        return h('div', { class: `${PREFIX}-radio`, key: index }, [
          h('input', {
            type: 'radio',
            id,
            name: props.name,
            value: option.value,
            checked: isChecked,
            disabled: option.disabled ?? false,
            class: `${PREFIX}-radio__input`,
            onChange: () => onChange(option.value)
          }),
          h('label', { 
            class: [
              ...getOptionClasses(option),
              (index === 0 ? `${PREFIX}-radio__label--button--is-first`: ''),
              (index === props.options.length - 1 ? `${PREFIX}-radio__label--button--is-last`: ''),
            ], 
            for: id 
          }, option.label)
        ])
      })
    )
  }
}