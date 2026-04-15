import { h } from 'vue'

const BREAKPOINTS = ['sm', 'md', 'lg', 'xl']

export default {
  name: 'FbCol',
  props: {
    tag: { type: String, default: 'div' },
    cols: { type: [String, Number], default: null },
    sm: { type: [String, Number], default: null },
    md: { type: [String, Number], default: null },
    lg: { type: [String, Number], default: null },
    xl: { type: [String, Number], default: null },
  },
  setup(props, { slots }) {
    return () => {
      const classes = ['fb-col']

      // 1. Classe base (ex: fb-col-6)
      if (props.cols) classes.push(`fb-col-${props.cols}`)

      // 2. Classes responsivas (ex: fb-col-md-4)
      BREAKPOINTS.forEach(bp => {
        if (props[bp]) {
          classes.push(`fb-col-${bp}-${props[bp]}`)
        }
      })

      return h(props.tag, { class: classes }, slots.default?.())
    }
  }
}