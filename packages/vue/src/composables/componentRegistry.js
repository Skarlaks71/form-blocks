import FbInput from '../components/forms/FbInput'
import VSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import FbTextarea from '../components/forms/FbTextarea'
import FbRadio from '../components/forms/FbRadio'
import FbCheckbox from '../components/forms/FbCheckbox'

// Mapa inicial padrão
const registry = {
  'input': {
    component: FbInput,
    supportsLabelFor: true,
  },
  'select': {
    component: VSelect,
    supportsLabelFor: false,
  },
  'flatpickr': {
    component: flatPickr,
    supportsLabelFor: false,
  },
  'textarea': {
    component: FbTextarea,
    supportsLabelFor: true,
  },
  'radio': {
    component: FbRadio,
    supportsLabelFor: false,
  },
  'checkbox': {
    component: FbCheckbox,
    supportsLabelFor: false,
  },
}

/**
 * Permite ao desenvolvedor registrar componentes customizados globalmente no FormBlocks
 * @param {string} name - O nome que será usado no Objeto (input.component)
 * @param {Component} component - O componente Vue importado
 */
export const registerComponent = (name, component, meta = {}) => {
  registry[name] = {
    component,
    supportsLabelFor: meta.supportsLabelFor ?? 'true',
    ...meta,
  }
}

export const getRegistry = () => registry