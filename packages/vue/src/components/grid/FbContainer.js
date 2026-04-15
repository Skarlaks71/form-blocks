import { h } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbContainer',
  props: {
    fluid: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },
  setup(props, { slots }) {
    const containerClass = `${PREFIX}-container`

    return () => h(
      props.tag,
      {
        class: [
          props.fluid ? `${containerClass}-fluid` : containerClass
        ]
      },
      slots.default?.()
    )
  }
}