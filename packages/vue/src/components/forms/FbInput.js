import { h, resolveDirective, withDirectives, computed, ref, resolveComponent } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbInput',
  props: {
    modelValue: { type: [String, Number], default: '' },
    // Propriedade opcional de formatação
    formatter: { type: Function, default: undefined },
    // Estado de validação (compatível com o padrão bootstrap)
    // true: is-valid, false: is-invalid, null: neutro
    state: { type: Boolean, default: null },
    mask: { type: [String, Object], default: null },
    limit: { type: [Number, String], default: null },
  },
  emits: ['update:modelValue', 'blur', 'focus'],
  setup(props, { emit, attrs }) {
    const ibControlClass = `${PREFIX}-input-block__control`

    const showPassword = ref(false)
    const vMaska = resolveDirective('maska')
    const vLimitChars = resolveDirective('limit-chars')

    const handleInput = (event) => {
      let value = event.target.value

      // Se existir um formatter, processamos o valor antes de emitir
      if (typeof props.formatter === 'function') {
        value = props.formatter(value, event)
      }

      emit('update:modelValue', value)
    }

    const onBlur = (event) => {
      emit('blur', event)
    }

    const onFocus = (event) => {
      emit('focus', event)
    }

    return () => {
      const fallbackId = `fb-input-${Math.random().toString(36).slice(2, 9)}`
      const finalId = computed(() => attrs.id || fallbackId)

      const inputNode = h('input', {
        // 1. Herda todos os atributos naturais (type, placeholder, id, maxlength, etc.)
        ...attrs,
        type: attrs.type === 'password' ? (showPassword.value ? 'text' : 'password') : attrs.type,
        id: finalId.value,
        // 2. Classes dinâmicas baseadas no estado
        class: [
          ibControlClass,
          {
            [`${ibControlClass}--valid`]: props.state === true,
            [`${ibControlClass}--invalid`]: props.state === false
          }
        ],

        // 3. Binding de valor
        value: props.modelValue,

        // 4. Listeners
        onInput: handleInput,
        onBlur: onBlur,
        onFocus: onFocus
      })

      const directives = []
      if (props.mask && vMaska) {
        directives.push([vMaska, props.mask])
      }
      if (props.limit && vLimitChars) {
        directives.push([vLimitChars, props.limit])
      }

      const inputWithDirectives = withDirectives(inputNode, directives)

      if (attrs.type !== 'password') return inputWithDirectives

      const vIcon = resolveComponent('v-icon')
      const toggleBtn = h('button', {
        type: 'button',
        class: `${PREFIX}-input-block__password-toggle`,
        onClick: () => { showPassword.value = !showPassword.value }
      }, [h(vIcon, { name: showPassword.value ? 'hi-eye-off' : 'hi-eye', scale: '1' })])

      return h('div', { class: `${PREFIX}-input-block__password-wrapper` }, [
        inputWithDirectives,
        toggleBtn
      ])
    }
  }
}