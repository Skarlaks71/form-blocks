import { h, computed, onMounted, watch, nextTick, ref } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbTextarea',
  props: {
    modelValue: { type: [String, Number], default: '' },
    state: { type: Boolean, default: null },
    formatter: { type: Function, default: null },
    lazyFormatter: { type: Boolean, default: false },
    // Props específicas de Textarea
    rows: { type: [String, Number], default: 2 },
    maxRows: { type: [String, Number], default: null },
    noResize: { type: Boolean, default: false },
    noAutoShrink: { type: Boolean, default: false }, // Placeholder para lógica de auto-grow se desejar futuramente
    wrap: { type: String, default: 'soft' },
    // Consistência com FbInput
    mask: { type: String, default: null },
    limit: { type: [Number, String], default: null }
  },
  emits: ['update:modelValue', 'change', 'blur', 'input'],
  
  setup(props, { emit, attrs }) {
    const textareaRef = ref(null)
    const currentHeight = ref('auto')

    const setHeight = () => {
      const el = textareaRef.value
      if (!el) return

      // Se maxRows for definido, calculamos o limite
      // (Aproximadamente 1.5 de line-height * 16px de base)
      const lineHeight = 24 
      const maxHeight = props.maxRows ? props.maxRows * lineHeight : null

      // Lógica de Shrink: Só resetamos a altura se noAutoShrink for falso
      if (!props.noAutoShrink) {
        el.style.height = 'auto'
      }

      const newHeight = el.scrollHeight
      
      if (maxHeight && newHeight > maxHeight) {
        el.style.height = `${maxHeight}px`
        el.style.overflowY = 'scroll'
      } else {
        el.style.height = `${newHeight}px`
        el.style.overflowY = 'hidden'
      }
    }
    
    const formatValue = (value, event) => {
      if (props.formatter && (!props.lazyFormatter || event.type === 'change')) {
        return props.formatter(value, event)
      }
      return value
    }

    const onInput = (event) => {
      const { value } = event.target
      const formatted = formatValue(value, event)
      
      if (formatted !== value) {
        event.target.value = formatted
      }
      
      emit('update:modelValue', formatted)
      emit('input', formatted)
    }

    onMounted(() => {
      nextTick(setHeight)
    })

    // Se o valor mudar externamente, precisamos reajustar a altura
    watch(() => props.modelValue, () => {
      nextTick(setHeight)
    })

    const onChange = (event) => {
      const { value } = event.target
      const formatted = formatValue(value, event)
      emit('change', formatted)
    }

    const computedClasses = computed(() => [
      `${PREFIX}-textarea`,
      {
        [`${PREFIX}-textarea--invalid`]: props.state === false,
        [`${PREFIX}-textarea--valid`]: props.state === true,
        [`${PREFIX}-textarea--no-resize`]: props.noResize
      }
    ])

    return () => h('textarea', {
      ...attrs,
      class: computedClasses.value,
      value: props.modelValue,
      rows: props.rows,
      wrap: props.wrap,
      // Se limit existir, usamos o maxlength nativo
      maxlength: props.limit,
      onInput,
      onChange,
      onBlur: (e) => emit('blur', e),
      style: {
        height: currentHeight.value,
        overflowY: props.maxRows ? 'auto' : 'hidden',
      },
    })
  }
}