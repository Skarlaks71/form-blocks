import { h } from 'vue'

export default {
  name: 'FbRow',
  props: {
    tag: { type: String, default: 'div' },
    noGutters: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    return () => h(
      props.tag,
      {
        class: [
          'fb-row',
          { 'no-gutters': props.noGutters }
        ]
      },
      slots.default?.()
    )
  }
}