import { h } from 'vue'

export default {
  name: 'FbContainer',
  props: {
    fluid: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },
  setup(props, { slots }) {
    return () => h(
      props.tag,
      {
        class: [
          props.fluid ? 'fb-container-fluid' : 'fb-container'
        ]
      },
      slots.default?.()
    )
  }
}