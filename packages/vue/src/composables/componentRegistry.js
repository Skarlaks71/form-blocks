import FbInput from '../components/forms/FbInput'
import VSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import FbTextarea from '../components/forms/FbTextarea'
import FbRadio from '../components/forms/FbRadio'
import FbCheckbox from '../components/forms/FbCheckbox'

// Mapa inicial padrão
const registry = {
  'input': FbInput,
  'select': VSelect,
  'flatpickr': flatPickr,
  'textarea': FbTextarea,
  'radio': FbRadio,
  'checkbox': FbCheckbox,
}

/**
 * Permite ao desenvolvedor registrar componentes customizados globalmente no FormBlocks
 * @param {string} name - O nome que será usado no Objeto (input.component)
 * @param {Component} component - O componente Vue importado
 */
export const registerComponent = (name, component) => {
  registry[name] = component
}

export const getRegistry = () => registry