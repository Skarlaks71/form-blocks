import { h } from 'vue'
import { PREFIX } from '@form-blocks/core/constants'

export default {
  name: 'FbRow',
  props: {
    tag: { type: String, default: 'div' },
    noGutters: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    const rowClass = `${PREFIX}-row`
    const noGuttersClass = `${PREFIX}-no-gutters`

    return () => h(
      props.tag,
      {
        class: [
          rowClass,
          { [noGuttersClass]: props.noGutters }
        ]
      },
      slots.default?.()
    )
  }
}