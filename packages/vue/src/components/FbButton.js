import { h, computed } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbButton',
  props: {
    label: { type: String, default: '' },
    type: { type: String, default: 'button' },

    variant: { type: String, default: 'primary' },
    texture: { type: String, default: 'carbon' },
    clean: { type: Boolean, default: false },

    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },

    pill: { type: Boolean, default: false },
    circle: { type: Boolean, default: false },
    flat: { type: Boolean, default: false },
  },

  emits: ['click'],

  setup(props, { emit, slots }) {
    const isDisabled = computed(() => props.disabled || props.loading)

    const btnClass = `${PREFIX}-button`

    const classes = computed(() => [
      btnClass,
      `${btnClass}--${props.variant}`,
      {
        [`${btnClass}--pill`]: props.pill,
        [`${btnClass}--circle`]: props.circle,
        [`${btnClass}--flat`]: props.flat,
        [`${btnClass}--loading`]: props.loading,
        [`${btnClass}--disabled`]: isDisabled.value,

        [`${btnClass}--texture-${props.texture}`]: !props.clean,
        [`${btnClass}--clean`]: props.clean,
      }
    ])

    const handleClick = (e) => {
      if (isDisabled.value) return
      emit('click', e)
    }

    return () => h('button', {
      type: props.type,
      class: classes.value,
      disabled: isDisabled.value,
      onClick: handleClick,
    }, [
      // Loader
      props.loading
        ? h('span', { class: `${PREFIX}-button__loader` })
        : null,

      // Conteúdo (slot tem prioridade)
      h('span', { class: `${PREFIX}-button__content` }, 
        slots.default ? slots.default() : props.label
      )
    ])
  }
}