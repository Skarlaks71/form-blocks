import { h, resolveDirective, withDirectives, resolveDynamicComponent } from 'vue'
import { getRegistry } from './componentRegistry'
import FbInput from '../components/forms/FbInput'
import { PREFIX } from '@form-blocks/core/constants'

export const createInputNode = ({ input, formData, errors, slotProps }) => {
  const registry = getRegistry()

  // 1. Resolver o componente
  const componentName = input.component || 'input'
  const registryItem = registry[componentName]
  const componentTarget = registryItem.component || resolveDynamicComponent(input.component)

  const supportsLabelFor = registryItem.supportsLabelFor ?? true

  // 2. Normalizar valor (Evitar undefined para Flatpickr/VSelect)
  const currentValue = formData.value[input.model]
  let normalizedValue = currentValue

  if (normalizedValue === undefined) {
    switch (componentName) {
      case 'checkbox':
        normalizedValue = undefined
        break
      case 'select':
        normalizedValue = null
        break
      default:
        normalizedValue = ''
    }
  }

  // 3. Atributos comuns
  const commonProps = {
    id: slotProps.id,
    modelValue: normalizedValue,
    'onUpdate:modelValue': (val) => (formData.value[input.model] = val),
    state: slotProps.state,
    'aria-describedby': slotProps.ariaDescribedby,
    ...input.iProps,
    // ...(input.maskaOptions || {}),
    // mask: input.maska,
    // limit: input.limitChars,
    ...Object.fromEntries(
      Object.entries(input.events || {}).map(([event, handler]) => [
        `on${event.charAt(0).toUpperCase() + event.slice(1)}`, 
        (eventData) => handler(eventData, formData)
      ])
    )
  }

  // common class
  const ibControlClass = `${PREFIX}-input-block__control`

  // 4. Renderização do VNode
  const isFlatpickr = componentName === 'flatpickr'
  
  const vnode = h(componentTarget, {
    ...commonProps,
    class: [
      (isFlatpickr) ? ibControlClass : '',
      { [`${ibControlClass}--invalid`]: slotProps.state === false }
    ],
  }, {
    'no-options': () => 'Desculpe, sem opções no momento!'
  })

  // 5. Aplicar diretivas se não for o nosso FbInput nativo
  if (componentTarget !== FbInput) {
    const maskaDir = resolveDirective('maska')
    const limitCharsDir = resolveDirective('limit-chars')
    const directives = []
    
    if (input.maska && maskaDir) directives.push([maskaDir, input.maska])
    if (input.limitChars && limitCharsDir) directives.push([limitCharsDir, input.limitChars])
    
    return directives.length ? withDirectives(vnode, directives) : vnode
  }

  return vnode
}