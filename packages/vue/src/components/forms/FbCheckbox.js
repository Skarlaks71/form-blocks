import { h, computed, onMounted } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbCheckbox',
  props: {
    id: { type: String, default: undefined },
    modelValue: { type: [Boolean, Array, String, Number], default: undefined },
    multiple: { type: Boolean, default: false },
    options: { type: Array, default: () => [] }, // [{ label: 'Aceito', value: 'yes' }]
    value: { type: [Boolean, String, Number, Function], default: true },
    unvalue: { type: [Boolean, String, Number, Function], default: false },
    name: { type: String, required: true },
    state: { type: Boolean, default: null },
    inline: { type: Boolean, default: false },
    button: { type: Boolean, default: false },
    buttonVariant: { type: String, default: 'primary' },
    switch: { type: Boolean, default: false } // Nova variante Switch
  },
  emits: ['update:modelValue', 'change'],

  setup(props, { emit }) {
    if (props.modelValue === undefined) {
      const defaultValue = props.multiple ? [] : props.unvalue;
      emit('update:modelValue', defaultValue);
    }

    const isChecked = (value) => {
      if(!props.modelValue || value === undefined) return false

      if (props.multiple) {
        return Array.isArray(props.modelValue) && props.modelValue.includes(value)
      }

      // Se não for multiple
      return props.modelValue === value
    }

    const onChange = (value) => {
      let newValue
      if (props.multiple) {
        newValue = [...props.modelValue]
        const index = newValue.indexOf(value)
        if (index > -1) newValue.splice(index, 1)
        else newValue.push(value)
      } else {
        if (props.modelValue === value) newValue = props.unvalue
        else newValue = value
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
      props.switch ? `${PREFIX}-checkbox__label--switch` : `${PREFIX}-checkbox__label`,
      {
        [`${PREFIX}-checkbox__label--button--${props.buttonVariant}`]: props.button,
        [`${PREFIX}-checkbox__label--button--active`]: props.button && isChecked(option.value),
        'is-invalid': props.state === false,
        'is-valid': props.state === true,
        'disabled': option.disabled
      }
    ]

    const checkboxRender = () => {
      if (props.multiple) {
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
              h('label', {
                class: [
                  ...getOptionClasses(option),
                  ((index === 0 && props.button) ? `${PREFIX}-checkbox__label--button--is-first`: ''),
                  ((index === props.options.length - 1 && props.button) ? `${PREFIX}-checkbox__label--button--is-last`: ''),
                ], for: id }, option.label)
            ])
          })
        )
      } else {
        const id = props.id || `${props.name}`

        return () => h('div', { class: `${PREFIX}-checkbox ${PREFIX}-checkbox--is-simple` }, [
          h('input', {
            type: 'checkbox',
            id,
            name: props.name,
            value: props.value,
            checked: isChecked(props.value),
            // disabled: option.disabled,
            class: `${PREFIX}-checkbox__input`,
            onChange: () => onChange(props.value)
          }),
          h('span', {
            class: [
              ...getOptionClasses(props),
              ((props.button) ? `${PREFIX}-checkbox__label--button--is-simple`: ''),
            ], for: id }, '')
        ])
      }
    }

    return checkboxRender()
  }
}