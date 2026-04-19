import { h, computed } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbCheckbox',
  props: {
    modelValue: { type: [Array, Boolean, String, Number], default: () => [] },
    options: { type: Array, default: () => [] }, // [{ label: 'Aceito', value: 'yes' }]
    name: { type: String, required: true },
    state: { type: Boolean, default: null },
    inline: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    buttonVariant: { type: String, default: 'primary' },
    switch: { type: Boolean, default: false } // Nova variante Switch
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    const isChecked = (value) => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(value)
      }
      return props.modelValue === value
    }

    const onChange = (value) => {
      let newValue
      if (Array.isArray(props.modelValue)) {
        newValue = [...props.modelValue]
        const index = newValue.indexOf(value)
        if (index > -1) newValue.splice(index, 1)
        else newValue.push(value)
      } else {
        // Toggle para valor booleano ou único
        newValue = props.modelValue === value ? null : value
      }
      emit('update:modelValue', newValue)
      emit('change', newValue)
    }

    const containerClasses = computed(() => [
      `${PREFIX}-checkbox-group`,
      { 
        [`${PREFIX}-checkbox-group--inline`]: props.inline,
        [`${PREFIX}-checkbox-group--vertical`]: !props.inline 
      }
    ])

    const getOptionClasses = (option) => [
      props.button ? `${PREFIX}-checkbox__label--button` : 
      props.switch ? `${PREFIX}-checkbox__label--switch` : `${PREFIX}-checkbox`,
      {
        [`${PREFIX}-checkbox__label--button--${props.buttonVariant}`]: props.button,
        [`${PREFIX}-checkbox__label--button--active`]: props.button && isChecked(option.value),
        'is-invalid': props.state === false,
        'is-valid': props.state === true,
        'disabled': option.disabled
      }
    ]

    return () => h('div', { class: containerClasses.value }, 
      props.options.map((option, index) => {
        const id = `${props.name}-${index}`
        const active = isChecked(option.value)

        return h('div', { class: `${PREFIX}-checkbox`, key: index }, [
          h('input', {
            type: 'checkbox',
            id,
            name: props.name,
            value: option.value,
            checked: active,
            disabled: option.disabled,
            class: `${PREFIX}-checkbox__input`,
            onChange: () => onChange(option.value)
          }),
          h('label', { class: getOptionClasses(option), for: id }, option.label)
        ])
      })
    )
  }
}